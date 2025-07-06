import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDatabase } from './mongodb';
import User from '../models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          await connectToDatabase();
          
          // Check if user already exists
          const existingUser = await User.findOne({ googleId: account.providerAccountId });
          
          if (existingUser) {
            // Update last login
            await existingUser.incrementLoginCount();
            return true;
          }
          
          // Check if user exists with this email (for linking accounts)
          const userByEmail = await User.findOne({ email: user.email! });
          
          if (userByEmail) {
            // Link Google account to existing user
            userByEmail.googleId = account.providerAccountId;
            userByEmail.isEmailVerified = true;
            userByEmail.avatar = user.image;
            await userByEmail.save();
            await userByEmail.incrementLoginCount();
            return true;
          }
          
          // Create new user
          const newUser = new User({
            email: user.email,
            firstName: (profile as any)?.given_name || user.name?.split(' ')[0] || '',
            lastName: (profile as any)?.family_name || user.name?.split(' ').slice(1).join(' ') || '',
            googleId: account.providerAccountId,
            avatar: user.image,
            isEmailVerified: true,
            isActive: true,
          });
          
          await newUser.save();
          await newUser.incrementLoginCount();
          return true;
        } catch (error) {
          console.error('Error during Google sign in:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === 'google') {
        try {
          await connectToDatabase();
          const dbUser = await User.findOne({ googleId: account.providerAccountId });
          
          if (dbUser) {
            token.userId = dbUser._id.toString();
            token.email = dbUser.email;
            token.firstName = dbUser.firstName;
            token.lastName = dbUser.lastName;
            token.avatar = dbUser.avatar;
            token.plan = dbUser.plan;
            token.isEmailVerified = dbUser.isEmailVerified;
          }
        } catch (error) {
          console.error('Error in JWT callback:', error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId as string;
        session.user.email = token.email as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.avatar = token.avatar as string;
        session.user.plan = token.plan as any;
        session.user.isEmailVerified = token.isEmailVerified as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

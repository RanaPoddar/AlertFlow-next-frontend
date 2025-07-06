# AlertFlow - Email Notification SaaS Platform

A modern SaaS platform built with Next.js 15 and TypeScript that allows users to receive email notifications via WhatsApp, Telegram, and SMS.

## Features

- **User Authentication**: Secure login and registration
- **Email Integration**: Connect multiple email accounts (Gmail, Outlook, etc.)
- **Multi-channel Notifications**: WhatsApp, Telegram, and SMS alerts
- **Smart Filtering**: Advanced email filtering based on sender, subject, and keywords
- **Real-time Dashboard**: Monitor email activity and notification status
- **Customizable Settings**: Configure notification frequency and quiet hours

## Project Structure

```
src/
├── app/
│   ├── api/                    # API routes (placeholder for backend integration)
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   └── user/
│   │       └── profile/
│   ├── dashboard/              # Main dashboard page
│   ├── login/                  # Login page
│   ├── signup/                 # Registration page
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── components/
│   ├── ui/                     # Shadcn/ui components
│   └── dashboard/              # Dashboard-specific components
│       ├── AlertSettings.tsx   # Email filtering and notification settings
│       ├── DashboardStats.tsx  # Statistics and activity overview
│       ├── EmailSetup.tsx      # Email account connection
│       └── NotificationSetup.tsx # WhatsApp/Telegram/SMS setup
└── lib/
    └── utils.ts                # Utility functions
```

## User Flow

1. **Landing Page** → User sees features and benefits
2. **Sign Up/Login** → User creates account or logs in
3. **Email Setup** → User connects email accounts (Gmail, Outlook, etc.)
4. **Notification Setup** → User configures WhatsApp/Telegram/SMS
5. **Alert Configuration** → User sets up email filters and preferences
6. **Dashboard** → User monitors activity and manages settings

## Technology Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)
- **Backend**: Your separate Node.js backend (API integration ready)

## Backend Integration

The frontend is designed to work with your separate Node.js backend. The current API routes in `src/app/api/` are placeholders. To connect to your backend:

1. **Update API calls**: Replace the placeholder API routes with calls to your backend endpoints
2. **Authentication**: Implement proper JWT token handling
3. **Email Integration**: Connect to your email monitoring service
4. **Notification Services**: Integrate with WhatsApp Business API, Telegram Bot API, and SMS providers

### Example Backend Endpoints Needed

```
POST /api/auth/login           # User login
POST /api/auth/signup          # User registration
GET  /api/user/profile         # Get user profile
POST /api/email/connect        # Connect email account
POST /api/notifications/whatsapp # Setup WhatsApp
POST /api/notifications/telegram # Setup Telegram
POST /api/notifications/sms    # Setup SMS
PUT  /api/settings/alerts      # Save alert settings
GET  /api/dashboard/stats      # Get dashboard statistics
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view the application

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Your backend API base URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# JWT secret for client-side token validation (optional)
JWT_SECRET=your-jwt-secret

# Other environment variables as needed
```

## Components Overview

### Dashboard Components

- **EmailSetup**: Handles OAuth connection to email providers
- **NotificationSetup**: Configures WhatsApp, Telegram, and SMS notifications
- **AlertSettings**: Manages email filters and notification preferences
- **DashboardStats**: Displays real-time statistics and activity

### Key Features

1. **Email Filtering**: Create rules based on sender, subject, or keywords
2. **Notification Channels**: Support for WhatsApp, Telegram, and SMS
3. **Quiet Hours**: Configure when not to receive notifications
4. **Real-time Stats**: Monitor email activity and notification delivery
5. **Responsive Design**: Works on desktop and mobile devices

## Security Considerations

- All API calls include JWT token authentication
- Email passwords are never stored (OAuth only)
- User data is encrypted and handled securely
- HTTPS enforced for all communications

## Deployment

The application is ready for deployment on Vercel, Netlify, or any other Next.js hosting platform:

1. Build the application:
```bash
npm run build
```

2. Deploy to your preferred platform
3. Update environment variables in your deployment platform
4. Connect to your production backend API

## License

This project is licensed under the MIT License.

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageCircle, Phone, Bell, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">AlertFlow</h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-sm sm:text-base">Login</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="text-sm sm:text-base">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Never Miss an Important Email Again
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Get instant notifications on WhatsApp, Telegram, and SMS when you receive important emails. 
            Set up custom filters and manage your notification preferences with ease.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/signup">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Connect Your Email</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm sm:text-base">
                  Securely connect your email accounts using OAuth authentication. 
                  We support Gmail, Outlook, and other major providers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Setup Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm sm:text-base">
                  Configure WhatsApp, Telegram, or SMS notifications. 
                  Set up custom filters based on sender, subject, or keywords.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-purple-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Get Instant Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm sm:text-base">
                  Receive real-time notifications on your preferred platforms. 
                  Never miss important emails again!
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Notification Channels */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Notification Channels</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="mx-auto bg-green-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">WhatsApp</h4>
              <p className="text-gray-600 text-sm sm:text-base">Get notifications directly in WhatsApp</p>
            </div>
            <div className="text-center">
              <div className="mx-auto bg-blue-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Telegram</h4>
              <p className="text-gray-600 text-sm sm:text-base">Receive alerts in your Telegram</p>
            </div>
            <div className="text-center">
              <div className="mx-auto bg-orange-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Phone className="h-8 w-8 sm:h-10 sm:w-10 text-orange-600" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">SMS</h4>
              <p className="text-gray-600 text-sm sm:text-base">Get text messages on your phone</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Why Choose AlertFlow?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="bg-blue-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2">Secure & Private</h4>
                <p className="text-gray-600 text-sm sm:text-base">Your data is encrypted and never stored permanently. We only read email headers, not content.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="bg-green-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2">Lightning Fast</h4>
                <p className="text-gray-600 text-sm sm:text-base">Get notifications within seconds of receiving an email. Real-time monitoring 24/7.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="bg-purple-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
                <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2">Smart Filtering</h4>
                <p className="text-gray-600 text-sm sm:text-base">Advanced filters to only get notifications for emails that matter to you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Get Started?</h3>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8">Join thousands of users who never miss important emails.</p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="text-base sm:text-lg px-6 sm:px-8">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-6 sm:py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p className="text-sm sm:text-base">&copy; 2025 AlertFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Plus, Settings, LogOut, Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Components
import EmailSetup from "@/components/dashboard/EmailSetup";
import NotificationSetup from "@/components/dashboard/NotificationSetup";
import AlertSettings from "@/components/dashboard/AlertSettings";
import DashboardStats from "@/components/dashboard/DashboardStats";
import SubscriptionServices from "@/components/dashboard/SubscriptionServices";

export default function Dashboard() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Fetch user data
    fetchUserData();
  }, [router]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      router.push("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
              <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">AlertFlow</h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-6">
            <div className="text-right hidden sm:block">
              <span className="text-sm text-gray-500">Welcome back,</span>
              <p className="font-semibold text-gray-900">{user?.name || "User"}!</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="h-8 px-2 sm:h-10 sm:px-4">
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 max-w-7xl">
        <div className="mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">Dashboard</h2>
          <p className="text-base sm:text-lg text-gray-600">
            Manage your email alerts and notification preferences
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 sm:space-y-8">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto bg-gray-100 p-1 rounded-lg gap-1 sm:gap-0 min-w-full">
              <TabsTrigger value="overview" className="text-xs sm:text-sm font-medium py-2 px-2 sm:px-4 rounded-md whitespace-nowrap">Overview</TabsTrigger>
              <TabsTrigger value="email" className="text-xs sm:text-sm font-medium py-2 px-2 sm:px-4 rounded-md whitespace-nowrap">Email</TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs sm:text-sm font-medium py-2 px-2 sm:px-4 rounded-md whitespace-nowrap">Notify</TabsTrigger>
              <TabsTrigger value="services" className="text-xs sm:text-sm font-medium py-2 px-2 sm:px-4 rounded-md whitespace-nowrap">Services</TabsTrigger>
              <TabsTrigger value="settings" className="text-xs sm:text-sm font-medium py-2 px-2 sm:px-4 rounded-md whitespace-nowrap">Settings</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6 sm:space-y-8">
            <DashboardStats />
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              <Card className="shadow-sm border-0 bg-white">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl">
                    <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                      <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <span>Email Accounts</span>
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Connected email accounts for monitoring
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 text-center">
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                      No email accounts connected yet
                    </p>
                    <Button 
                      onClick={() => setActiveTab("email")}
                      className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium"
                      size="lg"
                    >
                      <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Connect Email Account
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-0 bg-white">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl">
                    <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                    </div>
                    <span>Notification Channels</span>
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Configure where you receive alerts
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 text-center">
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                      No notification channels configured
                    </p>
                    <Button 
                      onClick={() => setActiveTab("notifications")}
                      variant="outline"
                      className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium"
                      size="lg"
                    >
                      <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Setup Notifications
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-0 bg-white md:col-span-2 xl:col-span-1">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl">
                    <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg">
                      <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                    </div>
                    <span>Subscription Services</span>
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Subscribe to news and updates
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 text-center">
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                      No subscriptions active yet
                    </p>
                    <Button 
                      onClick={() => setActiveTab("services")}
                      variant="outline"
                      className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium"
                      size="lg"
                    >
                      <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Browse Services
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="email">
            <EmailSetup />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationSetup />
          </TabsContent>

          <TabsContent value="services">
            <SubscriptionServices />
          </TabsContent>

          <TabsContent value="settings">
            <AlertSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

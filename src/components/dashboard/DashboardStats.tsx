"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageCircle, Phone, TrendingUp, Users, Clock, AlertCircle } from "lucide-react";

interface StatsData {
  totalEmails: number;
  notificationsSent: number;
  connectedAccounts: number;
  activeFilters: number;
  uptime: string;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<StatsData>({
    totalEmails: 0,
    notificationsSent: 0,
    connectedAccounts: 0,
    activeFilters: 0,
    uptime: "99.9%",
  });

  useEffect(() => {
    // Fetch stats from API
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const statCards = [
    {
      title: "Emails Monitored",
      value: stats.totalEmails.toLocaleString(),
      description: "Total emails processed",
      icon: Mail,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Notifications Sent",
      value: stats.notificationsSent.toLocaleString(),
      description: "Alerts delivered to you",
      icon: MessageCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Connected Accounts",
      value: stats.connectedAccounts.toString(),
      description: "Email accounts monitored",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Active Filters",
      value: stats.activeFilters.toString(),
      description: "Email filters configured",
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, index) => (
          <Card key={index} className="shadow-sm border-0 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">{card.title}</CardTitle>
              <div className={`p-2 sm:p-3 rounded-xl ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 sm:h-6 sm:w-6 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-xl sm:text-3xl font-bold text-gray-900 mb-1">{card.value}</div>
              <p className="text-xs sm:text-sm text-gray-500">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl">
              <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
                <div className="bg-green-100 p-1.5 sm:p-2 rounded-full">
                  <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">WhatsApp notification sent</p>
                  <p className="text-xs sm:text-sm text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-1.5 sm:p-2 rounded-full">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">New email from boss@company.com</p>
                  <p className="text-xs sm:text-sm text-gray-500">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
                <div className="bg-purple-100 p-1.5 sm:p-2 rounded-full">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">SMS notification sent</p>
                  <p className="text-xs sm:text-sm text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl">
              <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <span>Service Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900 text-sm sm:text-base">Email Monitoring</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm font-medium text-green-600">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900 text-sm sm:text-base">WhatsApp Integration</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm font-medium text-green-600">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900 text-sm sm:text-base">Telegram Integration</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm font-medium text-green-600">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900 text-sm sm:text-base">SMS Service</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm font-medium text-green-600">Operational</span>
                </div>
              </div>
              <div className="pt-3 sm:pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 text-sm sm:text-base">System Uptime</span>
                  <span className="text-base sm:text-lg font-bold text-green-600">{stats.uptime}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

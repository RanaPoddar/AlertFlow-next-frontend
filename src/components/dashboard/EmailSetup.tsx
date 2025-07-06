"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Plus, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const EMAIL_PROVIDERS = [
  { id: "gmail", name: "Gmail", icon: "📧", color: "bg-red-100 text-red-800" },
  { id: "outlook", name: "Outlook", icon: "📮", color: "bg-blue-100 text-blue-800" },
  { id: "yahoo", name: "Yahoo", icon: "💌", color: "bg-purple-100 text-purple-800" },
  { id: "imap", name: "IMAP/POP3", icon: "📬", color: "bg-gray-100 text-gray-800" },
];

export default function EmailSetup() {
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async (providerId: string) => {
    setIsConnecting(true);
    try {
      // This would typically redirect to OAuth or open a setup modal
      const response = await fetch("/api/email/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ provider: providerId }),
      });

      if (response.ok) {
        toast.success("Email account connected successfully!");
        // Refresh connected accounts
        // fetchConnectedAccounts();
      } else {
        toast.error("Failed to connect email account");
      }
    } catch (error) {
      toast.error("An error occurred while connecting");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center px-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Connect Your Email</h3>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Choose your email provider to start receiving notifications. We use secure OAuth authentication - no passwords needed.
        </p>
      </div>

      {/* Connected Accounts */}
      {connectedAccounts.length > 0 && (
        <Card className="shadow-sm border-0 bg-white mx-4 sm:mx-0">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl">
              <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                <Check className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <span>Connected Accounts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 sm:space-y-4">
              {connectedAccounts.map((account: any) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-3 sm:p-4 bg-green-50 rounded-xl border border-green-200"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                    <div className="text-2xl sm:text-3xl">{account.icon}</div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{account.email}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{account.provider}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm ml-2">
                    Disconnect
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Providers */}
      <Card className="shadow-sm border-0 bg-white mx-4 sm:mx-0">
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl">
            <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
              <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <span>Choose Your Email Provider</span>
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Select your email service to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {EMAIL_PROVIDERS.map((provider) => (
              <Card key={provider.id} className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-blue-200">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                      <div className="text-2xl sm:text-4xl">{provider.icon}</div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-base sm:text-lg text-gray-900">{provider.name}</h4>
                        <p className="text-gray-600 text-sm sm:text-base">
                          {provider.id === "imap" ? "Custom email server" : "One-click setup"}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleConnect(provider.id)}
                      disabled={isConnecting}
                      className="h-8 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm ml-2"
                      size="sm"
                    >
                      {isConnecting ? "Connecting..." : "Connect"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="shadow-sm border-0 bg-blue-50 mx-4 sm:mx-0">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl">
            <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
              <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <span>How It Works</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-sm sm:text-lg font-bold">
                1
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Secure Connection</p>
                <p className="text-gray-700 text-sm sm:text-base">
                  We use OAuth 2.0 for secure authentication. Your passwords are never stored or accessed.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-sm sm:text-lg font-bold">
                2
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Privacy First</p>
                <p className="text-gray-700 text-sm sm:text-base">
                  We only read email headers (sender, subject, date). Your email content is never accessed.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-sm sm:text-lg font-bold">
                3
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Real-time Monitoring</p>
                <p className="text-gray-700 text-sm sm:text-base">
                  Once connected, we monitor your inbox 24/7 and send notifications instantly.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

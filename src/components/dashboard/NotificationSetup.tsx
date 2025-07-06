"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Phone, Send, Plus, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function NotificationSetup() {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [telegramId, setTelegramId] = useState("");
  const [smsNumber, setSmsNumber] = useState("");
  const [connectedChannels, setConnectedChannels] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleWhatsAppSetup = async () => {
    if (!whatsappNumber) {
      toast.error("Please enter your WhatsApp number");
      return;
    }

    setIsConnecting(true);
    try {
      const response = await fetch("/api/notifications/whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ phoneNumber: whatsappNumber }),
      });

      if (response.ok) {
        toast.success("WhatsApp setup initiated! Please check your phone for verification.");
      } else {
        toast.error("Failed to setup WhatsApp notifications");
      }
    } catch (error) {
      toast.error("An error occurred while setting up WhatsApp");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleTelegramSetup = async () => {
    if (!telegramId) {
      toast.error("Please enter your Telegram chat ID");
      return;
    }

    setIsConnecting(true);
    try {
      const response = await fetch("/api/notifications/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ chatId: telegramId }),
      });

      if (response.ok) {
        toast.success("Telegram notifications configured successfully!");
      } else {
        toast.error("Failed to setup Telegram notifications");
      }
    } catch (error) {
      toast.error("An error occurred while setting up Telegram");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSmsSetup = async () => {
    if (!smsNumber) {
      toast.error("Please enter your phone number");
      return;
    }

    setIsConnecting(true);
    try {
      const response = await fetch("/api/notifications/sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ phoneNumber: smsNumber }),
      });

      if (response.ok) {
        toast.success("SMS notifications configured successfully!");
      } else {
        toast.error("Failed to setup SMS notifications");
      }
    } catch (error) {
      toast.error("An error occurred while setting up SMS");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Setup Notifications</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose how you want to receive email alerts - WhatsApp, Telegram, or SMS
        </p>
      </div>

      {/* Connected Channels */}
      {connectedChannels.length > 0 && (
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="p-2 bg-green-100 rounded-lg">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <span>Connected Channels</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {connectedChannels.map((channel: any) => (
                <div
                  key={channel.id}
                  className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{channel.icon}</div>
                    <div>
                      <p className="font-semibold text-gray-900">{channel.name}</p>
                      <p className="text-sm text-gray-600">{channel.identifier}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-10 px-4">
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Setup Tabs */}
      <Tabs defaultValue="whatsapp" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-14 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="whatsapp" className="text-base font-medium">
            <MessageCircle className="h-5 w-5 mr-2" />
            WhatsApp
          </TabsTrigger>
          <TabsTrigger value="telegram" className="text-base font-medium">
            <Send className="h-5 w-5 mr-2" />
            Telegram
          </TabsTrigger>
          <TabsTrigger value="sms" className="text-base font-medium">
            <Phone className="h-5 w-5 mr-2" />
            SMS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="whatsapp" className="space-y-6 mt-8">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <div className="p-3 bg-green-100 rounded-lg">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                </div>
                <span>WhatsApp Notifications</span>
              </CardTitle>
              <CardDescription className="text-base">
                Get instant email alerts directly in your WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="space-y-3">
                <Label htmlFor="whatsapp" className="text-base font-medium">WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="h-12 text-base"
                />
                <p className="text-sm text-gray-600">
                  Include country code (e.g., +1 for US, +44 for UK)
                </p>
              </div>
              <Button
                onClick={handleWhatsAppSetup}
                disabled={isConnecting}
                className="w-full h-12 text-base font-medium"
                size="lg"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                {isConnecting ? "Setting up..." : "Setup WhatsApp"}
              </Button>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>📱 Verification Required:</strong> You'll receive a verification message on WhatsApp to confirm your number.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="telegram" className="space-y-6 mt-8">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Send className="h-8 w-8 text-blue-600" />
                </div>
                <span>Telegram Notifications</span>
              </CardTitle>
              <CardDescription className="text-base">
                Receive email alerts in your Telegram chat
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="space-y-3">
                <Label htmlFor="telegram" className="text-base font-medium">Telegram Chat ID</Label>
                <Input
                  id="telegram"
                  type="text"
                  placeholder="123456789"
                  value={telegramId}
                  onChange={(e) => setTelegramId(e.target.value)}
                  className="h-12 text-base"
                />
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 mb-3">
                    <strong>🔍 How to get your Telegram Chat ID:</strong>
                  </p>
                  <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside">
                    <li>Open Telegram and search for "@userinfobot"</li>
                    <li>Start a chat with the bot</li>
                    <li>Send any message to the bot</li>
                    <li>The bot will reply with your Chat ID</li>
                  </ol>
                </div>
              </div>
              <Button
                onClick={handleTelegramSetup}
                disabled={isConnecting}
                className="w-full h-12 text-base font-medium"
                size="lg"
              >
                <Send className="h-5 w-5 mr-2" />
                {isConnecting ? "Setting up..." : "Setup Telegram"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms" className="space-y-6 mt-8">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Phone className="h-8 w-8 text-orange-600" />
                </div>
                <span>SMS Notifications</span>
              </CardTitle>
              <CardDescription className="text-base">
                Get text message alerts directly on your phone
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="space-y-3">
                <Label htmlFor="sms" className="text-base font-medium">Phone Number</Label>
                <Input
                  id="sms"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={smsNumber}
                  onChange={(e) => setSmsNumber(e.target.value)}
                  className="h-12 text-base"
                />
                <p className="text-sm text-gray-600">
                  Include country code (e.g., +1 for US, +44 for UK)
                </p>
              </div>
              <Button
                onClick={handleSmsSetup}
                disabled={isConnecting}
                className="w-full h-12 text-base font-medium"
                size="lg"
              >
                <Phone className="h-5 w-5 mr-2" />
                {isConnecting ? "Setting up..." : "Setup SMS"}
              </Button>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-800">
                  <strong>💰 Pricing Note:</strong> SMS notifications may incur charges based on your subscription plan.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

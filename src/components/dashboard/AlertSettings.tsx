"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Filter, Clock, Bell, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface EmailFilter {
  id: string;
  name: string;
  type: "sender" | "subject" | "keyword";
  value: string;
  action: "include" | "exclude";
}

export default function AlertSettings() {
  const [filters, setFilters] = useState<EmailFilter[]>([]);
  const [newFilter, setNewFilter] = useState({
    name: "",
    type: "sender" as const,
    value: "",
    action: "include" as const,
  });
  const [alertFrequency, setAlertFrequency] = useState("instant");
  const [quietHours, setQuietHours] = useState({
    enabled: false,
    start: "22:00",
    end: "08:00",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFilter = () => {
    if (!newFilter.name || !newFilter.value) {
      toast.error("Please fill in all filter fields");
      return;
    }

    const filter: EmailFilter = {
      id: Date.now().toString(),
      ...newFilter,
    };

    setFilters([...filters, filter]);
    setNewFilter({
      name: "",
      type: "sender",
      value: "",
      action: "include",
    });
    toast.success("Filter added successfully!");
  };

  const handleRemoveFilter = (id: string) => {
    setFilters(filters.filter(filter => filter.id !== id));
    toast.success("Filter removed");
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/settings/alerts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          filters,
          alertFrequency,
          quietHours,
        }),
      });

      if (response.ok) {
        toast.success("Settings saved successfully!");
      } else {
        toast.error("Failed to save settings");
      }
    } catch (error) {
      toast.error("An error occurred while saving settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Alert Settings</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Configure when and how you receive email notifications with smart filters
        </p>
      </div>

      <Tabs defaultValue="filters" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-14 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="filters" className="text-base font-medium">
            <Filter className="h-5 w-5 mr-2" />
            Email Filters
          </TabsTrigger>
          <TabsTrigger value="frequency" className="text-base font-medium">
            <Clock className="h-5 w-5 mr-2" />
            Frequency
          </TabsTrigger>
          <TabsTrigger value="schedule" className="text-base font-medium">
            <Bell className="h-5 w-5 mr-2" />
            Schedule
          </TabsTrigger>
        </TabsList>

        <TabsContent value="filters" className="space-y-6 mt-8">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Filter className="h-8 w-8 text-blue-600" />
                </div>
                <span>Smart Email Filters</span>
              </CardTitle>
              <CardDescription className="text-base">
                Create rules to control which emails trigger notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              {/* Existing Filters */}
              {filters.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">Active Filters</h4>
                  {filters.map((filter) => (
                    <div
                      key={filter.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          filter.action === "include" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {filter.action === "include" ? "✓ Include" : "✗ Exclude"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{filter.name}</p>
                          <p className="text-sm text-gray-600">
                            {filter.type === "sender" ? "From" : filter.type === "subject" ? "Subject" : "Keywords"}: {filter.value}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveFilter(filter.id)}
                        className="h-10 px-4"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Filter */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Add New Filter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="filterName" className="text-base font-medium">Filter Name</Label>
                      <Input
                        id="filterName"
                        placeholder="e.g., Important Clients"
                        value={newFilter.name}
                        onChange={(e) => setNewFilter({...newFilter, name: e.target.value})}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="filterType" className="text-base font-medium">Filter Type</Label>
                      <Select
                        value={newFilter.type}
                        onValueChange={(value) => setNewFilter({...newFilter, type: value as any})}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sender">Sender Email</SelectItem>
                          <SelectItem value="subject">Subject Contains</SelectItem>
                          <SelectItem value="keyword">Body Keywords</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="filterValue" className="text-base font-medium">Filter Value</Label>
                      <Input
                        id="filterValue"
                        placeholder="e.g., boss@company.com"
                        value={newFilter.value}
                        onChange={(e) => setNewFilter({...newFilter, value: e.target.value})}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="filterAction" className="text-base font-medium">Action</Label>
                      <Select
                        value={newFilter.action}
                        onValueChange={(value) => setNewFilter({...newFilter, action: value as any})}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="include">Include (send notification)</SelectItem>
                          <SelectItem value="exclude">Exclude (don't notify)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleAddFilter} className="w-full h-12 text-base font-medium">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Filter
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frequency" className="space-y-6 mt-8">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <span>Notification Frequency</span>
              </CardTitle>
              <CardDescription className="text-base">
                Choose how often you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border-2 border-transparent hover:border-blue-200 transition-colors">
                  <input
                    type="radio"
                    id="instant"
                    name="frequency"
                    value="instant"
                    checked={alertFrequency === "instant"}
                    onChange={(e) => setAlertFrequency(e.target.value)}
                    className="h-5 w-5"
                  />
                  <div className="flex-1">
                    <Label htmlFor="instant" className="text-base font-semibold text-gray-900">
                      ⚡ Instant Notifications
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Get notified immediately when matching emails arrive
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border-2 border-transparent hover:border-blue-200 transition-colors">
                  <input
                    type="radio"
                    id="digest"
                    name="frequency"
                    value="digest"
                    checked={alertFrequency === "digest"}
                    onChange={(e) => setAlertFrequency(e.target.value)}
                    className="h-5 w-5"
                  />
                  <div className="flex-1">
                    <Label htmlFor="digest" className="text-base font-semibold text-gray-900">
                      📋 Hourly Digest
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Get a summary of all matching emails every hour
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border-2 border-transparent hover:border-blue-200 transition-colors">
                  <input
                    type="radio"
                    id="daily"
                    name="frequency"
                    value="daily"
                    checked={alertFrequency === "daily"}
                    onChange={(e) => setAlertFrequency(e.target.value)}
                    className="h-5 w-5"
                  />
                  <div className="flex-1">
                    <Label htmlFor="daily" className="text-base font-semibold text-gray-900">
                      📅 Daily Summary
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Get a daily summary of all important emails
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6 mt-8">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Bell className="h-8 w-8 text-purple-600" />
                </div>
                <span>Quiet Hours</span>
              </CardTitle>
              <CardDescription className="text-base">
                Set hours when you don't want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <Label htmlFor="quietHours" className="text-base font-semibold text-gray-900">
                    🌙 Enable Quiet Hours
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Pause notifications during your specified hours
                  </p>
                </div>
                <Switch
                  id="quietHours"
                  checked={quietHours.enabled}
                  onCheckedChange={(checked) => 
                    setQuietHours({...quietHours, enabled: checked})
                  }
                />
              </div>
              
              {quietHours.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="space-y-2">
                    <Label htmlFor="startTime" className="text-base font-medium">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={quietHours.start}
                      onChange={(e) => setQuietHours({...quietHours, start: e.target.value})}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime" className="text-base font-medium">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={quietHours.end}
                      onChange={(e) => setQuietHours({...quietHours, end: e.target.value})}
                      className="h-12"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center pt-6">
        <Button 
          onClick={handleSaveSettings} 
          disabled={isLoading}
          className="px-12 h-12 text-base font-medium"
          size="lg"
        >
          {isLoading ? "Saving..." : "💾 Save All Settings"}
        </Button>
      </div>
    </div>
  );
}

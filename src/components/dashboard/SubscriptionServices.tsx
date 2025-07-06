"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Newspaper, 
  Briefcase, 
  Trophy, 
  GraduationCap, 
  TrendingUp, 
  Heart, 
  Car,
  Home,
  Check,
  Clock,
  Star
} from "lucide-react";
import { toast } from "sonner";

interface Service {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
  frequency: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  isSubscribed?: boolean;
}

const SUBSCRIPTION_SERVICES: Service[] = [
  {
    id: "current-affairs",
    name: "Current Affairs Daily",
    description: "Stay updated with latest news, politics, and world events",
    icon: Newspaper,
    category: "News",
    frequency: "Daily",
    price: 99,
    features: [
      "Daily news digest",
      "Political updates",
      "World news summary",
      "Breaking news alerts"
    ],
    isPopular: true,
    isSubscribed: false
  },
  {
    id: "job-updates",
    name: "Job & Career Updates",
    description: "Latest job openings, career opportunities, and industry trends",
    icon: Briefcase,
    category: "Career",
    frequency: "Every 2 days",
    price: 149,
    features: [
      "Job postings",
      "Career advice",
      "Industry insights",
      "Salary trends"
    ],
    isSubscribed: false
  },
  {
    id: "hackathon-news",
    name: "Hackathon & Tech Events",
    description: "Programming contests, hackathons, and tech event notifications",
    icon: Trophy,
    category: "Technology",
    frequency: "Every 2 days",
    price: 79,
    features: [
      "Hackathon announcements",
      "Tech conferences",
      "Programming contests",
      "Deadlines & reminders"
    ],
    isSubscribed: false
  },
  {
    id: "govt-exam-updates",
    name: "Government Exam Updates",
    description: "Notifications about government job exams, results, and admissions",
    icon: GraduationCap,
    category: "Education",
    frequency: "Weekly",
    price: 199,
    features: [
      "Exam notifications",
      "Result announcements",
      "Admission updates",
      "Application deadlines"
    ],
    isSubscribed: false
  },
  {
    id: "stock-market",
    name: "Stock Market Insights",
    description: "Daily stock market updates, investment tips, and financial news",
    icon: TrendingUp,
    category: "Finance",
    frequency: "Daily",
    price: 299,
    features: [
      "Market analysis",
      "Stock recommendations",
      "Economic indicators",
      "Investment tips"
    ],
    isSubscribed: false
  },
  {
    id: "health-wellness",
    name: "Health & Wellness Tips",
    description: "Daily health tips, wellness advice, and medical updates",
    icon: Heart,
    category: "Health",
    frequency: "Daily",
    price: 129,
    features: [
      "Health tips",
      "Wellness advice",
      "Medical breakthroughs",
      "Fitness guidance"
    ],
    isSubscribed: false
  },
  {
    id: "automobile",
    name: "Automobile News",
    description: "Latest car launches, reviews, and automotive industry news",
    icon: Car,
    category: "Automotive",
    frequency: "Every 3 days",
    price: 89,
    features: [
      "New car launches",
      "Car reviews",
      "Industry updates",
      "Buying guides"
    ],
    isSubscribed: false
  },
  {
    id: "real-estate",
    name: "Real Estate Updates",
    description: "Property market trends, investment opportunities, and policy changes",
    icon: Home,
    category: "Real Estate",
    frequency: "Weekly",
    price: 179,
    features: [
      "Market trends",
      "Investment opportunities",
      "Policy updates",
      "Property listings"
    ],
    isSubscribed: false
  }
];

export default function SubscriptionServices() {
  const [services, setServices] = useState<Service[]>(SUBSCRIPTION_SERVICES);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: "all", name: "All Services", count: services.length },
    { id: "News", name: "News & Updates", count: services.filter(s => s.category === "News").length },
    { id: "Career", name: "Career & Jobs", count: services.filter(s => s.category === "Career").length },
    { id: "Technology", name: "Technology", count: services.filter(s => s.category === "Technology").length },
    { id: "Education", name: "Education", count: services.filter(s => s.category === "Education").length },
    { id: "Finance", name: "Finance", count: services.filter(s => s.category === "Finance").length },
    { id: "Health", name: "Health & Wellness", count: services.filter(s => s.category === "Health").length },
  ];

  const filteredServices = selectedCategory === "all" 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const handleSubscribe = async (serviceId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/services/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ serviceId }),
      });

      if (response.ok) {
        setServices(services.map(service => 
          service.id === serviceId 
            ? { ...service, isSubscribed: true }
            : service
        ));
        toast.success("Successfully subscribed to service!");
      } else {
        toast.error("Failed to subscribe to service");
      }
    } catch (error) {
      toast.error("An error occurred while subscribing");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribe = async (serviceId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/services/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ serviceId }),
      });

      if (response.ok) {
        setServices(services.map(service => 
          service.id === serviceId 
            ? { ...service, isSubscribed: false }
            : service
        ));
        toast.success("Successfully unsubscribed from service!");
      } else {
        toast.error("Failed to unsubscribe from service");
      }
    } catch (error) {
      toast.error("An error occurred while unsubscribing");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Subscription Services</h3>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Subscribe to various notification services to stay updated with what matters most to you
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 justify-center px-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="h-8 sm:h-10 text-xs sm:text-sm"
          >
            {category.name}
            <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Active Subscriptions */}
      {services.some(s => s.isSubscribed) && (
        <Card className="shadow-sm border-0 bg-gradient-to-r from-green-50 to-blue-50 mx-4 sm:mx-0">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl">
              <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                <Check className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <span>Active Subscriptions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {services.filter(s => s.isSubscribed).map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-xl border border-green-200"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                    <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                      <service.icon className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{service.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{service.frequency}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUnsubscribe(service.id)}
                    disabled={isLoading}
                    className="h-8 sm:h-9 text-xs sm:text-sm ml-2"
                  >
                    Unsubscribe
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className={`relative shadow-sm border-0 bg-white hover:shadow-md transition-all duration-200 ${
              service.isPopular ? "ring-2 ring-blue-200" : ""
            }`}
          >
            {service.isPopular && (
              <div className="absolute -top-2 -right-2">
                <Badge className="bg-blue-600 text-white text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
                  <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-base sm:text-lg truncate">{service.name}</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {service.category}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span className="truncate">{service.frequency}</span>
                    </div>
                  </div>
                </div>
              </div>
              <CardDescription className="text-sm">
                {service.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3 sm:space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">What you'll get:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">
                    ₹{service.price}
                    <span className="text-xs sm:text-sm font-normal text-gray-500">/month</span>
                  </div>
                  
                  {service.isSubscribed ? (
                    <Button
                      variant="outline"
                      onClick={() => handleUnsubscribe(service.id)}
                      disabled={isLoading}
                      className="h-9 sm:h-10 px-4 sm:px-6 text-xs sm:text-sm"
                    >
                      Unsubscribe
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleSubscribe(service.id)}
                      disabled={isLoading}
                      className="h-9 sm:h-10 px-4 sm:px-6 text-xs sm:text-sm"
                    >
                      Subscribe
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Section */}
      <Card className="shadow-sm border-0 bg-blue-50 mx-4 sm:mx-0">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-xl sm:text-2xl text-center">Why Subscribe to Our Services?</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="p-2 sm:p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-2 sm:mb-3">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Timely Updates</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Get information exactly when you need it, with customized frequency
              </p>
            </div>
            <div className="text-center">
              <div className="p-2 sm:p-3 bg-green-100 rounded-lg w-fit mx-auto mb-2 sm:mb-3">
                <Check className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Curated Content</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Hand-picked, relevant information filtered by our expert team
              </p>
            </div>
            <div className="text-center">
              <div className="p-2 sm:p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-2 sm:mb-3">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Premium Quality</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                High-quality, verified information from trusted sources
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

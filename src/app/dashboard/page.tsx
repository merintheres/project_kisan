"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  TrendingUp,
  FileText,
  Bell,
  User,
  Sun,
  Cloud,
  Droplets,
  Wind,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"

export default function Dashboard() {
  const [selectedLanguage, setSelectedLanguage] = useState("English")

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="text-xl font-bold text-green-800">Project Kisan</span>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border rounded-lg px-3 py-1 text-sm"
              >
                <option value="English">English</option>
                <option value="Kannada">ಕನ್ನಡ</option>
                <option value="Hindi">हिंदी</option>
                <option value="Tamil">தமிழ்</option>
              </select>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Rohan!</h1>
          <p className="text-gray-600">Here's what's happening with your farm today</p>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Today's Weather</CardTitle>
                <CardDescription className="text-blue-100">Bangalore, Karnataka</CardDescription>
              </div>
              <Sun className="w-12 h-12 text-yellow-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">28°C</div>
                <div className="text-sm text-blue-100">Temperature</div>
              </div>
              <div className="text-center">
                <Droplets className="w-6 h-6 mx-auto mb-1" />
                <div className="text-lg font-semibold">65%</div>
                <div className="text-sm text-blue-100">Humidity</div>
              </div>
              <div className="text-center">
                <Wind className="w-6 h-6 mx-auto mb-1" />
                <div className="text-lg font-semibold">12 km/h</div>
                <div className="text-sm text-blue-100">Wind Speed</div>
              </div>
              <div className="text-center">
                <Cloud className="w-6 h-6 mx-auto mb-1" />
                <div className="text-lg font-semibold">20%</div>
                <div className="text-sm text-blue-100">Rain Chance</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions with Gemini Assistant */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <Link href="/crop-diagnosis">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-green-200">
              <CardHeader className="text-center">
                <Camera className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Crop Doctor</CardTitle>
                <CardDescription>Diagnose plant diseases instantly</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-green-600 hover:bg-green-700">Take Photo & Diagnose</Button>
              </CardContent>
            </Card>

          </Link>

          {/* Crop Identification Feature */}
          <Link href="/crop-identification">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-emerald-200">
              <CardHeader className="text-center">
                <Camera className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <CardTitle className="text-emerald-800">Crop Identification</CardTitle>
                <CardDescription>Identify crops from photos</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Identify Crop</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/market-prices">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-200">
              <CardHeader className="text-center">
                <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-800">Market Prices</CardTitle>
                <CardDescription>Real-time mandi rates</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Check Current Prices</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/government-schemes">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-200">
              <CardHeader className="text-center">
                <FileText className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-purple-800">Gov Schemes</CardTitle>
                <CardDescription>Find subsidies & benefits</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Explore Schemes</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/ask-assistant">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-yellow-200">
              <CardHeader className="text-center">
                <User className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                <CardTitle className="text-yellow-800">Ask AI Assistant</CardTitle>
                <CardDescription>Voice your doubts, get answers</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">Talk to Gemini</Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Market Highlights */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Today's Market Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Tomato</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    +12%
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-green-600">₹45/kg</div>
                <div className="text-sm text-gray-600">Bangalore Mandi</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Onion</span>
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    <ArrowDown className="w-3 h-3 mr-1" />
                    -8%
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-red-600">₹32/kg</div>
                <div className="text-sm text-gray-600">Mysore Mandi</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Rice</span>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                    <Minus className="w-3 h-3 mr-1" />
                    0%
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-gray-600">₹28/kg</div>
                <div className="text-sm text-gray-600">Hassan Mandi</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                <Camera className="w-8 h-8 text-green-600" />
                <div className="flex-1">
                  <div className="font-semibold">Crop diagnosis completed</div>
                  <div className="text-sm text-gray-600">Tomato leaf spot identified - Treatment recommended</div>
                  <div className="text-xs text-gray-500">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <div className="flex-1">
                  <div className="font-semibold">Price alert triggered</div>
                  <div className="text-sm text-gray-600">Tomato prices increased by 12% in Bangalore</div>
                  <div className="text-xs text-gray-500">4 hours ago</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
                <FileText className="w-8 h-8 text-purple-600" />
                <div className="flex-1">
                  <div className="font-semibold">New scheme available</div>
                  <div className="text-sm text-gray-600">PM-KISAN subsidy application now open</div>
                  <div className="text-xs text-gray-500">1 day ago</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

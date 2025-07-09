"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Search, MapPin, Calendar, Bell } from "lucide-react"

export default function MarketPrices() {
  const [selectedCrop, setSelectedCrop] = useState("tomato")
  const [selectedLocation, setSelectedLocation] = useState("bangalore")

  const marketData = {
    tomato: {
      current: 45,
      change: 12,
      trend: "up",
      markets: [
        { name: "Bangalore Mandi", price: 45, change: 12, distance: "2.3 km" },
        { name: "Mysore Mandi", price: 42, change: 8, distance: "145 km" },
        { name: "Hassan Mandi", price: 38, change: 5, distance: "180 km" },
        { name: "Tumkur Mandi", price: 40, change: -2, distance: "70 km" },
      ],
      forecast: [
        { date: "Today", price: 45, trend: "up" },
        { date: "Tomorrow", price: 47, trend: "up" },
        { date: "Day 3", price: 46, trend: "down" },
        { date: "Day 4", price: 44, trend: "down" },
        { date: "Day 5", price: 43, trend: "down" },
      ],
    },
  }

  const currentData = marketData[selectedCrop as keyof typeof marketData]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-blue-800">Market Prices</h1>
              <p className="text-sm text-gray-600">Real-time mandi rates and trends</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Market Prices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Crop</label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tomato">🍅 Tomato</SelectItem>
                    <SelectItem value="onion">🧅 Onion</SelectItem>
                    <SelectItem value="potato">🥔 Potato</SelectItem>
                    <SelectItem value="rice">🌾 Rice</SelectItem>
                    <SelectItem value="wheat">🌾 Wheat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Your Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="mysore">Mysore</SelectItem>
                    <SelectItem value="hassan">Hassan</SelectItem>
                    <SelectItem value="tumkur">Tumkur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Search Crop</label>
                <Input placeholder="Type crop name..." />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Price Overview */}
        <Card className="mb-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-white">Tomato Prices</CardTitle>
                <CardDescription className="text-blue-100">Current market rates</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">₹{currentData.current}/kg</div>
                <Badge className={`${currentData.trend === "up" ? "bg-green-500" : "bg-red-500"} text-white`}>
                  {currentData.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {currentData.change > 0 ? "+" : ""}
                  {currentData.change}%
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-blue-100">Yesterday</div>
                <div className="text-lg font-semibold">₹40/kg</div>
              </div>
              <div>
                <div className="text-sm text-blue-100">Last Week</div>
                <div className="text-lg font-semibold">₹38/kg</div>
              </div>
              <div>
                <div className="text-sm text-blue-100">Last Month</div>
                <div className="text-lg font-semibold">₹35/kg</div>
              </div>
              <div>
                <div className="text-sm text-blue-100">Best Time to Sell</div>
                <div className="text-lg font-semibold">Tomorrow</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Comparison */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Nearby Markets Comparison
            </CardTitle>
            <CardDescription>Compare prices across different mandis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentData.markets.map((market, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-semibold">{market.name}</div>
                      <div className="text-sm text-gray-600">{market.distance} away</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">₹{market.price}/kg</div>
                    <Badge
                      variant={market.change > 0 ? "default" : market.change < 0 ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {market.change > 0 ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : market.change < 0 ? (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      ) : (
                        <Minus className="w-3 h-3 mr-1" />
                      )}
                      {market.change > 0 ? "+" : ""}
                      {market.change}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Price Forecast */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              5-Day Price Forecast
            </CardTitle>
            <CardDescription>AI-powered price predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              {currentData.forecast.map((day, index) => (
                <div
                  key={index}
                  className={`text-center p-4 rounded-lg ${index === 0 ? "bg-blue-50 border-2 border-blue-200" : "bg-gray-50"}`}
                >
                  <div className="text-sm font-medium mb-2">{day.date}</div>
                  <div className="text-2xl font-bold mb-2">₹{day.price}</div>
                  <Badge variant={day.trend === "up" ? "default" : "secondary"} className="text-xs">
                    {day.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">AI Recommendation</h4>
                  <p className="text-sm text-green-700">
                    Based on market trends, tomorrow would be the best time to sell your tomatoes. Prices are expected
                    to peak at ₹47/kg before declining later in the week.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Set Price Alerts
            </CardTitle>
            <CardDescription>Get notified when prices reach your target</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Target Selling Price</label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter price" defaultValue="50" />
                    <span className="flex items-center text-sm text-gray-600">₹/kg</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Alert Type</label>
                  <Select defaultValue="above">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="above">When price goes above</SelectItem>
                      <SelectItem value="below">When price goes below</SelectItem>
                      <SelectItem value="change">When price changes by %</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Set Alert</Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Active Alerts</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <div className="font-medium">Tomato ≥ ₹50/kg</div>
                      <div className="text-sm text-gray-600">Bangalore Mandi</div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div>
                      <div className="font-medium">Onion ≤ ₹30/kg</div>
                      <div className="text-sm text-gray-600">Mysore Mandi</div>
                    </div>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

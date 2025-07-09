"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  FileText,
  Search,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Banknote,
  Tractor,
} from "lucide-react"

export default function GovernmentSchemes() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const schemes = [
    {
      id: 1,
      name: "PM-KISAN Samman Nidhi",
      category: "subsidy",
      description: "Direct income support of ₹6,000 per year to small and marginal farmers",
      eligibility: ["Small and marginal farmers", "Land holding up to 2 hectares", "Valid Aadhaar card"],
      benefits: "₹2,000 every 4 months (₹6,000/year)",
      status: "active",
      deadline: "Ongoing",
      documents: ["Aadhaar Card", "Bank Account Details", "Land Records"],
      applicationLink: "https://pmkisan.gov.in",
      estimatedTime: "15-30 days",
      icon: <Banknote className="w-6 h-6" />,
    },
    {
      id: 2,
      name: "Pradhan Mantri Fasal Bima Yojana",
      category: "insurance",
      description: "Crop insurance scheme providing financial support to farmers in case of crop loss",
      eligibility: ["All farmers", "Sharecroppers and tenant farmers", "Valid land documents"],
      benefits: "Up to ₹2 lakh coverage per farmer",
      status: "active",
      deadline: "Before sowing season",
      documents: ["Aadhaar Card", "Bank Account", "Land Records", "Sowing Certificate"],
      applicationLink: "https://pmfby.gov.in",
      estimatedTime: "7-15 days",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: 3,
      name: "Kisan Credit Card (KCC)",
      category: "credit",
      description: "Credit facility for farmers to meet their agricultural and allied activities",
      eligibility: ["All farmers", "Tenant farmers", "Sharecroppers with valid documents"],
      benefits: "Credit up to ₹3 lakh at 4% interest",
      status: "active",
      deadline: "Ongoing",
      documents: ["Aadhaar Card", "PAN Card", "Land Documents", "Income Certificate"],
      applicationLink: "https://kcc.gov.in",
      estimatedTime: "7-21 days",
      icon: <Banknote className="w-6 h-6" />,
    },
    {
      id: 4,
      name: "Sub-Mission on Agricultural Mechanization",
      category: "equipment",
      description: "Financial assistance for purchase of agricultural machinery and equipment",
      eligibility: ["Individual farmers", "Self Help Groups", "Farmer Producer Organizations"],
      benefits: "25-50% subsidy on agricultural equipment",
      status: "active",
      deadline: "March 31, 2024",
      documents: ["Aadhaar Card", "Bank Account", "Land Records", "Quotation"],
      applicationLink: "https://agrimachinery.nic.in",
      estimatedTime: "30-45 days",
      icon: <Tractor className="w-6 h-6" />,
    },
  ]

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesCategory = selectedCategory === "all" || scheme.category === selectedCategory
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "closing":
        return "bg-amber-100 text-amber-800"
      case "closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "closing":
        return <Clock className="w-4 h-4" />
      case "closed":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

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
              <h1 className="text-xl font-bold text-purple-800">Government Schemes</h1>
              <p className="text-sm text-gray-600">Find subsidies and benefits for farmers</p>
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
              Find Relevant Schemes
            </CardTitle>
            <CardDescription>Search and filter schemes based on your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Search Schemes</label>
                <Input
                  placeholder="Search by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="subsidy">💰 Subsidies</SelectItem>
                    <SelectItem value="insurance">🛡️ Insurance</SelectItem>
                    <SelectItem value="credit">💳 Credit & Loans</SelectItem>
                    <SelectItem value="equipment">🚜 Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{filteredSchemes.length}</div>
              <div className="text-sm text-green-700">Available Schemes</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">₹12L+</div>
              <div className="text-sm text-blue-700">Total Benefits</div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">15 min</div>
              <div className="text-sm text-purple-700">Avg. Application Time</div>
            </CardContent>
          </Card>
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">85%</div>
              <div className="text-sm text-amber-700">Success Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Schemes List */}
        <div className="space-y-6">
          {filteredSchemes.map((scheme) => (
            <Card key={scheme.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg">{scheme.icon}</div>
                    <div>
                      <CardTitle className="text-xl mb-2">{scheme.name}</CardTitle>
                      <CardDescription className="text-base">{scheme.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(scheme.status)}>
                    {getStatusIcon(scheme.status)}
                    <span className="ml-1 capitalize">{scheme.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">💰 Benefits</h4>
                      <p className="text-green-700 bg-green-50 p-3 rounded-lg">{scheme.benefits}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-blue-800 mb-2">✅ Eligibility</h4>
                      <ul className="space-y-1">
                        {scheme.eligibility.map((criteria, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-blue-700">
                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                            {criteria}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2">📄 Required Documents</h4>
                      <ul className="space-y-1">
                        {scheme.documents.map((doc, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-purple-700">
                            <FileText className="w-4 h-4 text-purple-600 mt-0.5" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-700">Deadline</h5>
                        <p className="text-sm text-gray-600">{scheme.deadline}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700">Processing Time</h5>
                        <p className="text-sm text-gray-600">{scheme.estimatedTime}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t">
                  <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                    <a href={scheme.applicationLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Apply Online
                    </a>
                  </Button>
                  <Button variant="outline">Check Eligibility</Button>
                  <Button variant="ghost">Get Help</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No schemes found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search criteria or category filter</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="text-white">Need Help with Applications?</CardTitle>
            <CardDescription className="text-purple-100">
              Our experts can guide you through the application process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <User className="w-8 h-8 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Personal Guidance</h4>
                <p className="text-sm text-purple-100">One-on-one help with applications</p>
              </div>
              <div className="text-center">
                <FileText className="w-8 h-8 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Document Assistance</h4>
                <p className="text-sm text-purple-100">Help with document preparation</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Application Tracking</h4>
                <p className="text-sm text-purple-100">Track your application status</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <Button variant="secondary" size="lg">
                Get Expert Help
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

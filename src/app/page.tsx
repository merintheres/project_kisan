import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, TrendingUp, FileText, Leaf, Mic } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">Project Kisan</h1>
            </div>
            <nav className="flex space-x-8">
              <Link href="/dashboard" className="text-gray-600 hover:text-green-600">
                Dashboard
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-green-600">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-green-600">
                Contact
              </Link>
            </nav>
            <div className="flex space-x-4">
              <Button variant="outline">Sign In</Button>
              <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Your AI-Powered <span className="text-green-600">Agricultural Assistant</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get instant crop diagnosis, real-time market prices, and navigate government schemes with ease. Your expert
            agronomist, market analyst, and scheme navigator - all in one place.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8 py-3">
                Start Farming Smarter
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-3 bg-transparent">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h3>
          <p className="text-lg text-gray-600">Three powerful tools designed specifically for farmers</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-green-200 transition-colors">
            <CardContent className="p-8 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-4">Instant Crop Diagnosis</h4>
              <p className="text-gray-600 mb-6">
                Take a photo of your diseased plant and get instant AI-powered diagnosis with actionable treatment
                recommendations.
              </p>
              <Link href="/crop-diagnosis">
                <Button variant="outline" className="w-full bg-transparent">
                  Try Crop Doctor
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-green-200 transition-colors">
            <CardContent className="p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-4">Real-Time Market Prices</h4>
              <p className="text-gray-600 mb-6">
                Get live market prices, trends, and selling recommendations to maximize your profits.
              </p>
              <Link href="/market-prices">
                <Button variant="outline" className="w-full bg-transparent">
                  Check Prices
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-green-200 transition-colors">
            <CardContent className="p-8 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-4">Government Schemes</h4>
              <p className="text-gray-600 mb-6">
                Navigate complex government schemes, check eligibility, and get direct links to applications.
              </p>
              <Link href="/government-schemes">
                <Button variant="outline" className="w-full bg-transparent">
                  Explore Schemes
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">🎤 Voice-Based Assistant</h4>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Talk to your AI assistant in your local language. Ask crop, weather, or government-related queries — get clear spoken answers.
          </p>
          <Link href="/ask-assistant">
            <Button className="bg-green-600 hover:bg-green-700 px-8 py-3 flex items-center gap-2 mx-auto">
              <Mic className="h-5 w-5" /> Use Voice Assistant
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-green-100">Farmers Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-green-100">Diagnosis Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-green-100">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">Project Kisan</span>
              </div>
              <p className="text-gray-400">Empowering farmers with AI-powered agricultural intelligence.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Features</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Crop Diagnosis</li>
                <li>Market Prices</li>
                <li>Government Schemes</li>
                <li>Weather Updates</li>
                <li>Voice Assistant</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Documentation</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Languages</h5>
              <ul className="space-y-2 text-gray-400">
                <li>English</li>
                <li>हिंदी</li>
                <li>ಕನ್ನಡ</li>
                <li>తెలుగు</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Project Kisan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
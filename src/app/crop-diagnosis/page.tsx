"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, ArrowLeft, CheckCircle, AlertTriangle, Info, ExternalLink } from "lucide-react"

export default function CropDiagnosis() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [diagnosis, setDiagnosis] = useState<any>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeCrop = () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setDiagnosis({
        disease: "Early Blight (Alternaria solani)",
        confidence: 92,
        severity: "Moderate",
        description:
          "Early blight is a common fungal disease affecting tomato plants, characterized by dark spots with concentric rings on leaves.",
        symptoms: [
          "Dark brown spots with concentric rings on older leaves",
          "Yellow halo around spots",
          "Leaf yellowing and dropping",
          "Reduced fruit quality",
        ],
        treatment: {
          immediate: [
            "Remove affected leaves immediately",
            "Improve air circulation around plants",
            "Avoid overhead watering",
          ],
          chemical: [
            "Apply copper-based fungicide (Copper oxychloride 50% WP)",
            "Use Mancozeb 75% WP at 2g/liter",
            "Spray every 7-10 days until symptoms reduce",
          ],
          organic: [
            "Neem oil spray (5ml/liter water)",
            "Baking soda solution (1 tsp/liter)",
            "Compost tea application",
          ],
        },
        prevention: [
          "Crop rotation with non-solanaceous crops",
          "Proper spacing between plants",
          "Mulching to prevent soil splash",
          "Regular monitoring and early detection",
        ],
        localStores: [
          "Raitha Samparka Kendra - 2.3 km",
          "Karnataka Agro Chemicals - 4.1 km",
          "Farmers Choice Store - 5.8 km",
        ],
      })
      setIsAnalyzing(false)
    }, 3000)
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
              <h1 className="text-xl font-bold text-green-800">Crop Doctor</h1>
              <p className="text-sm text-gray-600">AI-powered plant disease diagnosis</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {!selectedImage ? (
          /* Upload Section */
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <Camera className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">Take or Upload Plant Photo</CardTitle>
              <CardDescription>
                Get instant diagnosis by capturing a clear photo of the affected plant part
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                  <Camera className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Take Photo</h3>
                  <p className="text-sm text-gray-600 mb-4">Use your camera to capture the plant</p>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="camera-input"
                  />
                  <label htmlFor="camera-input">
                    <Button className="bg-green-600 hover:bg-green-700">Open Camera</Button>
                  </label>
                </div>

                <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Upload Photo</h3>
                  <p className="text-sm text-gray-600 mb-4">Select from your gallery</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="upload-input"
                  />
                  <label htmlFor="upload-input">
                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                      Choose File
                    </Button>
                  </label>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Tips for Best Results:</h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• Take photos in good natural light</li>
                      <li>• Focus on the affected area (leaves, stems, fruits)</li>
                      <li>• Ensure the image is clear and not blurry</li>
                      <li>• Include some healthy parts for comparison</li>
                      <li>• Take multiple angles if needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Analysis Section */
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedImage || "/placeholder.svg?height=256&width=384"}
                      alt="Uploaded crop"
                      className="w-full h-64 object-cover rounded-lg border"
                    />
                    <div className="flex gap-2 mt-4">
                      <Button onClick={analyzeCrop} disabled={isAnalyzing} className="bg-green-600 hover:bg-green-700">
                        {isAnalyzing ? "Analyzing..." : "Analyze Plant"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedImage(null)
                          setDiagnosis(null)
                        }}
                      >
                        Upload New Photo
                      </Button>
                    </div>
                  </div>

                  {isAnalyzing && (
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
                        <h3 className="font-semibold mb-2">AI Analysis in Progress</h3>
                        <p className="text-sm text-gray-600">
                          Our AI is examining your plant image using advanced computer vision...
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {diagnosis && (
              <div className="space-y-6">
                {/* Diagnosis Results */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                      <div>
                        <CardTitle className="text-green-800">Diagnosis Complete</CardTitle>
                        <CardDescription>AI Analysis Results</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">{diagnosis.disease}</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Confidence:</span>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {diagnosis.confidence}%
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Severity:</span>
                            <Badge variant="outline" className="border-amber-300 text-amber-700">
                              {diagnosis.severity}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-4">{diagnosis.description}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Observed Symptoms:</h4>
                        <ul className="space-y-2">
                          {diagnosis.symptoms.map((symptom: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" />
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Treatment Options */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-red-200">
                    <CardHeader>
                      <CardTitle className="text-red-800 text-lg">Immediate Action</CardTitle>
                      <CardDescription>Do this right now</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {diagnosis.treatment.immediate.map((action: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-red-600 mt-0.5" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-800 text-lg">Chemical Treatment</CardTitle>
                      <CardDescription>Recommended fungicides</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {diagnosis.treatment.chemical.map((treatment: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                            {treatment}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-800 text-lg">Organic Treatment</CardTitle>
                      <CardDescription>Natural alternatives</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {diagnosis.treatment.organic.map((treatment: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                            {treatment}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Local Stores */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ExternalLink className="w-5 h-5" />
                      Nearby Agricultural Stores
                    </CardTitle>
                    <CardDescription>Where to buy recommended treatments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {diagnosis.localStores.map((store: string, index: number) => (
                        <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                          <div className="font-semibold">{store.split(" - ")[0]}</div>
                          <div className="text-sm text-gray-600">{store.split(" - ")[1]} away</div>
                          <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                            Get Directions
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Prevention Tips */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-800">Prevention for Future</CardTitle>
                    <CardDescription>Avoid this problem in the next season</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {diagnosis.prevention.map((tip: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

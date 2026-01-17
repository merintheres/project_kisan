"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Camera, Info, Loader2 } from "lucide-react"

export default function CropIdentification() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setPreview(URL.createObjectURL(file))
      setResult(null)
      setError("")
    }
  }

  const handleIdentify = async () => {
    if (!selectedImage) return
    setLoading(true)
    setResult(null)
    setError("")
    const formData = new FormData()
    formData.append("image", selectedImage)
    try {
      const res = await fetch("/api/crop-identification", {
        method: "POST",
        body: formData
      })
      const data = await res.json()
      if (data.error) setError(data.error)
      else setResult(data)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <Camera className="w-14 h-14 text-emerald-600 mx-auto mb-2" />
            <CardTitle className="text-2xl">Crop Identification</CardTitle>
            <CardDescription>
              Upload a clear photo of a crop, leaf, or plant. Our AI will identify the crop and provide basic info.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <span className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-md bg-white hover:bg-gray-100 text-gray-900 shadow-sm">
                  <Camera className="w-4 h-4" /> Upload Image
                </span>
              </label>
              {preview && (
                <img src={preview} alt="Preview" className="w-64 h-64 object-cover rounded-lg border" />
              )}
              {selectedImage && (
                <Button onClick={handleIdentify} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 w-full">
                  {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : null}
                  Identify Crop
                </Button>
              )}
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-center">
                {error}
              </div>
            )}
            {result && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h3 className="font-semibold text-emerald-800 mb-2">Result</h3>
                <ul className="space-y-1">
                  <li><span className="font-medium">Crop Name:</span> {result.cropName}</li>
                  <li><span className="font-medium">Crop Type:</span> {result.cropType}</li>
                  <li><span className="font-medium">Growth Stage:</span> {result.growthStage}</li>
                  <li><span className="font-medium">Care Tips:</span> {result.careTips}</li>
                </ul>
              </div>
            )}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2 text-amber-800 text-sm">
              <Info className="w-4 h-4" />
              For best results, use a clear, close-up photo of the crop or leaf.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

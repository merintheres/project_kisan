import { Leaf } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Leaf className="h-8 w-8 text-green-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">About Project Kisan</h1>
        </div>
        <p className="text-lg text-gray-700 mb-6">
          Project Kisan is a mission-driven initiative to empower Indian farmers with accessible, AI-powered tools that break down
          barriers of language, literacy, and limited access to expert help.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">🌾 Our Vision</h2>
        <p className="text-gray-700 mb-6">
          To transform agriculture in India by equipping farmers with smart technology that speaks their language, understands their
          needs, and delivers real-time guidance—right from their mobile phone.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">🔍 What We Offer</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>📸 Instant crop disease detection via image analysis</li>
          <li>📈 Real-time market price updates to boost profits</li>
          <li>📑 Simplified discovery of government schemes</li>
          <li>🎤 Voice-first interaction with an AI assistant in local languages</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">👩‍🌾 Why It Matters</h2>
        <p className="text-gray-700 mb-6">
          Many farmers face challenges accessing timely, expert-level information due to language or digital literacy barriers. By
          using AI and voice technology, Project Kisan bridges this gap, making support accessible to every farmer—anytime,
          anywhere.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">🤝 Our Commitment</h2>
        <p className="text-gray-700 mb-6">
          We're committed to making agriculture smarter, fairer, and more inclusive—starting from the grassroots. Project Kisan is
          built with empathy, innovation, and a farmer-first mindset.
        </p>

        <div className="mt-10 text-center">
          <p className="text-green-700 font-semibold">🌱 Project Kisan – Growing with Farmers, Empowering Every Field</p>
        </div>
      </div>
    </div>
  )
}

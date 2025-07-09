"use client"
import { useEffect, useRef, useState } from "react"
import {
  Mic, Send, Leaf, MessageCircle, Globe,
  Volume2, VolumeX
} from "lucide-react"

const translations: any = {
  "en-US": {
    title: "Farmer AI Assistant",
    subtitle: "Smart Farming Chatbot • Gemini Powered",
    selectLanguage: "Select Language",
    placeholder: "Ask your question...",
    thinking: "Gemini is thinking...",
    listening: "Listening...",
    speaking: "Speaking...",
    you: "You",
    bot: "Gemini",
    idle: "Hello Farmer! Ask about crops, weather, or any scheme.",
    footer: "Designed for Indian Farmers • Powered by Gemini AI",
    chatTitle: "Chat",
    processing: "Processing...",
  },
  "hi-IN": {
    title: "किसान सहायक AI",
    subtitle: "स्मार्ट खेती चैटबॉट • Gemini द्वारा समर्थित",
    selectLanguage: "भाषा चुनें",
    placeholder: "अपना सवाल पूछें...",
    thinking: "Gemini जवाब सोच रहा है...",
    listening: "सुन रहे हैं...",
    speaking: "बोल रहे हैं...",
    you: "आप",
    bot: "Gemini",
    idle: "नमस्ते किसान भाई! फसल, मौसम या योजना से जुड़ा कोई सवाल पूछें।",
    footer: "भारतीय किसानों के लिए • Gemini AI द्वारा समर्थित",
    chatTitle: "चैट",
    processing: "प्रोसेसिंग...",
  },
  "ml-IN": {
    title: "കർഷക സഹായി AI",
    subtitle: "സ്മാർട്ട് കാർഷിക ചാറ്റ്‌ബോട്ട് • Gemini പിന്തുണ",
    selectLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക",
    placeholder: "നിങ്ങളുടെ ചോദ്യം ചോദിക്കുക...",
    thinking: "Gemini ചിന്തിക്കുന്നു...",
    listening: "കേൾക്കുന്നു...",
    speaking: "പറയുന്നു...",
    you: "നിങ്ങൾ",
    bot: "Gemini",
    idle: "ഹലോ കർഷകരേ! വിള, കാലാവസ്ഥ, പദ്ധതികൾ എന്നിവയെ കുറിച്ച് ചോദിക്കൂ.",
    footer: "ഇന്ത്യൻ കർഷകരിനായി രൂപകൽപ്പന ചെയ്തിരിക്കുന്നു • Gemini AI പിന്തുണ",
    chatTitle: "ചാറ്റ്",
    processing: "പ്രോസസ്സ് ചെയ്യുന്നു...",
  },
  // Add more languages as needed
}

const languages = [
  { code: "en-US", label: "English", flag: "🇺🇸" },
  { code: "hi-IN", label: "हिंदी", flag: "🇮🇳" },
  { code: "ml-IN", label: "മലയാളം", flag: "🇮🇳" },
  { code: "ta-IN", label: "தமிழ்", flag: "🇮🇳" },
  { code: "kn-IN", label: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "te-IN", label: "తెలుగు", flag: "🇮🇳" },
  { code: "mr-IN", label: "मराठी", flag: "🇮🇳" },
  { code: "gu-IN", label: "ગુજરાતી", flag: "🇮🇳" },
]

export default function UnifiedVoiceChat() {
  const [language, setLanguage] = useState("en-US")
  const t = translations[language] || translations["en-US"]
  const [question, setQuestion] = useState("")
  const [chat, setChat] = useState<{ sender: string; text: string; timestamp: Date }[]>([])
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isListening, setIsListening] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""

  useEffect(() => {
    const loadVoices = () => {
      const synthVoices = window.speechSynthesis.getVoices()
      if (synthVoices.length > 0) setVoices(synthVoices)
    }
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat])

  const formatReply = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1")
  }

  const speakIfBot = (sender: string, text: string) => {
    if (sender !== "Gemini" || voices.length === 0) return
    setIsSpeaking(true)
    const synth = window.speechSynthesis
    const preferred = voices.find(v => v.lang === language)
    const fallback = voices.find(v => v.lang.startsWith("en"))
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = preferred?.lang || fallback?.lang || "en-US"
    utter.voice = preferred || fallback || null
    utter.rate = 0.9
    utter.pitch = 1.1
    utter.onend = () => setIsSpeaking(false)
    utter.onerror = () => setIsSpeaking(false)
    synth.cancel()
    synth.speak(utter)
  }

  const appendMessage = (sender: string, text: string) => {
    const cleanText = formatReply(text)
    setChat(prev => [...prev, { sender, text: cleanText, timestamp: new Date() }])
    if (soundEnabled) speakIfBot(sender, cleanText)
  }

  const askGemini = async () => {
    if (!question.trim()) return
    setIsLoading(true)
    appendMessage("You", question)
    const userPrompt = {
      role: "user",
      parts: [{ text: question }]
    }
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [userPrompt] })
        }
      )
      const data = await res.json()
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response."
      appendMessage("Gemini", reply)
    } catch {
      appendMessage("Gemini", "Error fetching response.")
    } finally {
      setIsLoading(false)
      setQuestion("")
    }
  }

  const startVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert("Speech recognition not supported.")
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = language
    recognition.continuous = false
    recognition.interimResults = false
    setIsListening(true)
    recognition.start()
    recognition.onresult = (event: any) => {
      const spoken = event.results[0][0].transcript
      setQuestion(spoken)
      setIsListening(false)
      setTimeout(() => askGemini(), 500)
    }
    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)
  }

  const formatTime = (date: Date) => date.toLocaleTimeString("hi-IN", { hour: "2-digit", minute: "2-digit", hour12: true })

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white/90 rounded-3xl p-6 border border-green-200 shadow">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="text-green-600 w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold text-green-800">{t.title}</h1>
              <p className="text-green-600">{t.subtitle}</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <Globe className="text-green-600 w-5 h-5" />
            <label className="text-green-700">{t.selectLanguage}:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-1 border border-green-300 rounded-lg"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.label}
                </option>
              ))}
            </select>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className="ml-auto">
              {soundEnabled ? <Volume2 className="text-green-600" /> : <VolumeX className="text-gray-400" />}
            </button>
          </div>
        </div>

        <div className="bg-white/80 rounded-3xl p-4 border border-green-200 shadow h-[400px] overflow-y-auto">
          <div className="text-xl font-semibold text-green-700 flex items-center mb-2">
            <MessageCircle className="w-5 h-5 mr-2" /> {t.chatTitle}
          </div>
          {chat.length === 0 ? (
            <div className="text-center text-green-600 mt-16">
              <p>{t.idle}</p>
            </div>
          ) : (
            chat.map((msg, i) => (
              <div key={i} className={`mb-4 flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${msg.sender === "You" ? "bg-green-600 text-white" : "bg-white border border-green-200 text-gray-800"}`}>
                  <div className="text-xs mb-1 flex justify-between font-semibold">
                    <span>{msg.sender === "You" ? t.you : t.bot}</span>
                    <span>{formatTime(msg.timestamp)}</span>
                  </div>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && <p className="text-gray-600 text-sm">{t.thinking}</p>}
          <div ref={chatEndRef} />
        </div>

        <div className="bg-white/90 rounded-3xl p-4 border border-green-200 shadow">
          <div className="flex gap-3">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={t.placeholder}
              rows={2}
              className="flex-1 p-3 border border-green-300 rounded-lg resize-none"
              disabled={isLoading}
            />
            <div className="flex flex-col gap-2">
              <button onClick={askGemini} disabled={!question.trim() || isLoading} className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg">
                <Send />
              </button>
              <button onClick={startVoice} disabled={isListening || isLoading} className={`${isListening ? "bg-red-500 animate-pulse" : "bg-emerald-600 hover:bg-emerald-700"} text-white p-3 rounded-lg`}>
                <Mic />
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-600 mt-2 flex justify-between">
            <span>
              {isListening && t.listening}
              {isLoading && t.processing}
              {isSpeaking && t.speaking}
            </span>
            <span>{languages.find(l => l.code === language)?.label}</span>
          </div>
        </div>

        <div className="text-center text-green-700">
          <p className="text-sm">{t.footer}</p>
        </div>
      </div>
    </div>
  )
}

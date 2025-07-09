'use client'
import { useState, useRef } from 'react'
import { Mic, MicOff, X, Bot, Volume2, VolumeX } from 'lucide-react'

export default function FarmerChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi there 👋 How can I help you today?' }])
  const [input, setInput] = useState('')
  const [listening, setListening] = useState(false)
  const [language, setLanguage] = useState('en-IN')
  const [soundOn, setSoundOn] = useState(true)
  const recognitionRef = useRef<any>(null)

  const toggleListening = () => {
    window.speechSynthesis.cancel() // stop any speaking now

    if (!('webkitSpeechRecognition' in window)) return alert('Speech Recognition not supported')
    if (!recognitionRef.current) {
      const r = new (window as any).webkitSpeechRecognition()
      r.continuous = false
      r.interimResults = false
      r.maxAlternatives = 1
      r.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript
        setInput(transcript)
        handleSend(transcript)
      }
      recognitionRef.current = r
    }

    recognitionRef.current.lang = language

    if (listening) {
      recognitionRef.current.stop()
      setListening(false)
    } else {
      recognitionRef.current.start()
      setListening(true)
    }
  }

  const handleSend = async (msg?: string) => {
    const newMsg = msg || input.trim()
    if (!newMsg) return
    setMessages(prev => [...prev, { sender: 'user', text: newMsg }])
    setInput('')

    const res = await fetch('/api/gemini-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `You are a helpful farmers assistant. Reply concisely (2–3 paragraphs max). Language code: ${language}. User said: ${newMsg}`
      })
    })

    const data = await res.json()
    const reply = data.reply
    setMessages(prev => [...prev, { sender: 'bot', text: reply }])

    if (soundOn) speakReply(reply)
  }

  const speakReply = (text: string) => {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language
    window.speechSynthesis.speak(utterance)
  }

  const toggleSound = () => {
    window.speechSynthesis.cancel()
    setSoundOn(prev => !prev)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open && (
        <button onClick={() => setOpen(true)} className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700">
          <Bot className="w-6 h-6" />
        </button>
      )}

      {open && (
        <div className="w-[380px] sm:w-[420px] h-[500px] bg-white border border-green-300 rounded-xl shadow-xl flex flex-col overflow-hidden">
          <div className="bg-green-600 text-white p-3 flex justify-between items-center">
            <span>Farmer's Assistant</span>
            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          <div className="p-2 border-b flex justify-between items-center">
            <div>
              <label className="text-sm text-green-700 mr-2">Language:</label>
                <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="border border-green-400 rounded px-2 py-1 text-sm"
                >
                <option value="en-IN">English (India)</option>
                <option value="hi-IN">Hindi</option>
                <option value="ml-IN">Malayalam</option>
                <option value="ta-IN">Tamil</option>
                <option value="te-IN">Telugu</option>
                <option value="kn-IN">Kannada</option>
                <option value="bn-IN">Bengali</option>
                <option value="gu-IN">Gujarati</option>
                <option value="mr-IN">Marathi</option>
                <option value="ur-IN">Urdu</option>
                <option value="pa-IN">Punjabi</option>
                <option value="or-IN">Odia</option>
                </select>

            </div>
            <button onClick={toggleSound}>
              {soundOn ? <Volume2 className="text-green-700" /> : <VolumeX className="text-red-600" />}
            </button>
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-[450px]">
            {messages.map((m, i) => (
              <div key={i} className={`p-2 rounded-lg max-w-[80%] ${m.sender === 'bot' ? 'bg-green-100 text-green-900 self-start' : 'bg-green-200 text-green-900 self-end ml-auto'}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="p-2 border-t flex items-center gap-2">
            <input
              className="flex-1 px-2 py-1 border rounded border-green-400"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button onClick={toggleListening}>
              {listening ? <MicOff className="text-red-600" /> : <Mic className="text-green-600" />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

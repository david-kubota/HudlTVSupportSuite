"use client"

import { useState } from "react"
import { X, Send, MessageCircle } from "lucide-react"

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ id: string; text: string; sender: "user" | "bot" }>>([
    { id: "1", text: "Hi! I'm Hudl Assistant. How can I help you today?", sender: "bot" }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = { id: Date.now().toString(), text: inputValue, sender: "user" as const }
    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I understand! Let me help you with that. You can access livestream settings from the grid view, or navigate to the detail page for more options.",
        "That's a great question! Check out the Production Truck tab for our comprehensive academy training. It covers everything from setup to advanced features.",
        "You can select multiple livestreams using the checkboxes and batch update their streaming source. Just select the ones you want and use the dropdown menu.",
        "To manage team members, go to the Users tab. You can add users, assign roles, and manage permissions from there.",
        "For analytics, head to the Analytics tab to see viewership trends by sport, team, and level. You'll find insights on your most popular events.",
      ]
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: randomResponse, sender: "bot" }])
      setIsLoading(false)
    }, 800)
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center z-40"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs font-bold">H</span>
            <MessageCircle className="h-4 w-4" />
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-96 rounded-xl border border-border bg-card shadow-xl flex flex-col z-40">
          {/* Header */}
          <div className="border-b border-border bg-primary text-primary-foreground p-4 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <span className="text-sm font-bold">H</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Hudl Assistant</p>
                  <p className="text-xs opacity-90">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:opacity-80 transition-opacity"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-secondary text-foreground rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary text-foreground px-4 py-2 rounded-lg text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 rounded-b-xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

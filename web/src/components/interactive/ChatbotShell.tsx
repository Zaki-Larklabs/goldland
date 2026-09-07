"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { MessageSquare, X, Send, Bot, User, Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
}

export function ChatbotShell() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>([
    { id: "init", role: "assistant", content: "Hello. I am the Goldland Engineering Assistant. How can I help you with your project approvals today?" }
  ])
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [requiresHuman, setRequiresHuman] = React.useState(false)
  
  const pathname = usePathname()
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          pageContext: pathname
        })
      })

      const data = await res.json()
      
      if (res.ok) {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: "assistant", content: data.reply }])
        if (data.requiresHuman) {
          setRequiresHuman(true)
        }
      } else {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: "assistant", content: "I'm currently experiencing a network issue. Please try again." }])
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: "assistant", content: "I'm currently experiencing a network issue. Please try again." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass ${isOpen ? 'bg-gray-200 text-ink' : 'bg-ink text-white hover:bg-brass hover:text-ink'}`}
        aria-label={isOpen ? "Close Assistant" : "Open Assistant"}
        aria-expanded={isOpen}
        aria-controls="chatbot-window"
      >
        {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <MessageSquare className="h-6 w-6" aria-hidden="true" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div id="chatbot-window" role="region" aria-label="Chatbot interface" className="fixed bottom-24 right-6 w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] bg-white dark:bg-ink-soft rounded-2xl shadow-2xl border border-border-light dark:border-border-dark flex flex-col z-50 overflow-hidden">
          
          {/* Header */}
          <div className="bg-ink text-white p-4 flex items-center gap-3 border-b border-border-dark shrink-0">
            <div className="bg-brass/20 p-2 rounded-full" aria-hidden="true">
              <Bot className="h-5 w-5 text-brass" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Goldland Assistant</h3>
              <p className="text-xs text-gray-400">Technical Knowledge Base</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-ink" aria-live="polite" aria-atomic="false">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-ink text-white rounded-br-none' 
                    : 'bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark text-ink dark:text-gray-200 rounded-bl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl rounded-bl-none p-3 text-sm flex gap-1">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Escalation Area */}
          {requiresHuman && (
            <div className="p-3 bg-brass/10 border-t border-brass/20 shrink-0">
              <div className="flex items-start gap-2 text-xs text-ink dark:text-white">
                <AlertTriangle className="h-4 w-4 text-brass shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold mb-1">Human Confirmation Required</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">I am strictly prohibited from guessing fees, timelines, or undocumented approvals. An engineer must review your request.</p>
                  <Button size="sm" className="w-full text-xs h-8" onClick={() => window.location.href = '/#assessment'}>
                    Request Assessment
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-ink border-t border-border-light dark:border-border-dark shrink-0">
            <form onSubmit={handleSubmit} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about approvals, authorities, etc..."
                className="w-full bg-gray-100 dark:bg-gray-800 text-ink dark:text-white rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-brass"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 bg-ink dark:bg-gray-700 text-white rounded-full hover:bg-brass hover:text-ink disabled:opacity-50 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="text-[10px] text-center text-gray-400 mt-2">
              Responses are strictly generated from verified Goldland records.
            </p>
          </div>
        </div>
      )}
    </>
  )
}

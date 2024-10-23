import { HTMLAttributes } from "react";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import ReactMarkdown from 'react-markdown'

interface Message {
  text: string
  isUser: boolean
}

interface ChatInterfaceProps {
  ticketId: string
  projectKey: string
}

export default function ChatInterface({ ticketId, projectKey }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSend = async () => {
    if (input.trim()) {
      try {
        setIsLoading(true)
        setMessages(prev => [...prev, { text: input, isUser: true }])
        
        const response = await fetch("http://127.0.0.1:8000/tickets/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ticket_id: ticketId,
            query: input,
            project_key: projectKey,
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        setMessages(prev => [...prev, { text: data.chatbot_response, isUser: false }])
      } catch (error) {
        console.error("Error in chat:", error)
        toast({
          title: "Error",
          description: "Failed to get response from chatbot",
          variant: "destructive",
        })
        setMessages(prev => [...prev, { 
          text: "Sorry, I couldn't process your message. Please try again.", 
          isUser: false 
        }])
      } finally {
        setIsLoading(false)
        setInput("")
      }
    }
  }

  return (
    <Card className="flex flex-col h-full bg-white/30 backdrop-blur-md shadow-2xl border border-white/20 rounded-lg p-6 transition-transform transform">
      <CardHeader>
        <CardTitle className="text-gray-800 font-bold text-2xl text-center">
          Chat with AI
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col space-y-4">
        <ScrollArea className="flex-grow mb-4 overflow-y-auto p-4 bg-white/40 backdrop-blur-lg rounded-lg shadow-inner">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`inline-block px-4 py-2 rounded-lg shadow-lg backdrop-blur-lg bg-white/30 border border-white/20 transform transition-transform ${
                  message.isUser
                    ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:scale-105"
                    : "bg-white/40 text-gray-800 hover:scale-105"
                }`}
              >
                <ReactMarkdown components={{
                  p: ({ children }) => <p className="mb-2">{children}</p>,
                  h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-base font-bold mb-2">{children}</h3>,
                  ul: ({ children }) => <ul className="list-disc pl-5 mb-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-5 mb-2">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  code: ({inline, className, children, ...props }: HTMLAttributes<HTMLElement> & { inline?: boolean }) => (
                    <code className={`${inline ? 'bg-gray-200 rounded px-1' : 'block bg-gray-200 p-2 rounded my-2'} ${className}`} {...props}>
                      {children}
                    </code>
                  ),
                }}>
                  {message.text}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            </div>
          )}
        </ScrollArea>
        <div className="flex space-x-2 items-center">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
            className="flex-grow bg-white/60 backdrop-blur-lg p-3 rounded-lg shadow-md border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg px-6 py-3 backdrop-blur-lg border border-white/20 hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-transform disabled:opacity-50"
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
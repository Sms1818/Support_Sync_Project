'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Paperclip, Send } from 'lucide-react'
import axios from 'axios'

export default function TicketSolution() {
    const location = useLocation()
    const { issue } = location.state || {}
    const [initialSolution, setInitialSolution] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [messages, setMessages] = useState<{ text: string; sender: string }[]>([])
    const [inputMessage, setInputMessage] = useState('')

    const [, setSelectedFiles] = useState<FileList | null>(null);
    const [, setChatHistory] = useState<{ type: string; content: string }[]>([]);
    const [, setLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const fetchTicketSolution = async () => {
            if (issue) {
                try {
                    const response = await axios.post(`https://support-sync-backend-production.up.railway.app/tickets/solve/${issue.issue_key}`, {
                        project_key: issue.projectKey,
                    })
                    setInitialSolution(response.data.initial_solution)
                } catch (error) {
                    console.error("Error fetching ticket solution:", error)
                } finally {
                    setIsLoading(false)
                }
            }
        }

        fetchTicketSolution()
    }, [issue])

    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            const userMessage = { text: inputMessage, sender: 'user' }
            setMessages(prev => [...prev, userMessage])
            setInputMessage('')

            try {
                const response = await axios.post('https://support-sync-backend-production.up.railway.app/tickets/chat', {
                    ticket_id: issue.issue_key,
                    query: inputMessage,
                    project_key: issue.projectKey
                })

                const botMessage = { text: response.data.chatbot_response, sender: 'ai' }
                setMessages(prev => [...prev, botMessage])
            } catch (error) {
                console.error("Error sending message to chatbot:", error)
                const errorMessage = { text: "There was an error communicating with the chatbot.", sender: 'ai' }
                setMessages(prev => [...prev, errorMessage])
            }
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(e.target.files);

            await handleProcess(e.target.files); 
        }
    };

    const handleProcess = async (files: FileList) => {
        setLoading(true);
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('pdf_files', files[i]);
        }

        try {
            await axios.post('https://support-sync-backend-production.up.railway.app/process_pdf/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('PDFs processed successfully!');
            setChatHistory((prev) => [...prev, { type: 'system', content: 'PDFs processed successfully!' }]);
        } catch (error) {
            console.error('Error processing PDFs:', error);
            setChatHistory((prev) => [...prev, { type: 'error', content: 'Failed to process PDFs.' }]);
        } finally {
            setLoading(false);
        }
    };

    // Function to trigger file input click
    const handleFileInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-[#001f3f] via-[#00172e] to-[#001030] text-white"
        >
            <nav className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-b border-white border-opacity-20 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <span className="font-bold text-xl">SupportSync</span>
                    <div>
                        <Button variant="ghost">Dashboard</Button>
                        <Button variant="ghost">Settings</Button>
                    </div>
                </div>
            </nav>

            <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
                <div className="w-full md:w-1/2 p-6 overflow-auto">
                    {issue ? (
                        <>
                            <h2 className="text-2xl font-bold mb-4">{issue.title}</h2>
                            <div className="mb-4">
                                <span className="font-semibold">Priority:</span> {issue.priority}
                            </div>
                            <div className="mb-4">
                                <span className="font-semibold">Created:</span> {new Date(issue.createdAt).toLocaleDateString()}
                            </div>
                            <div className="mb-4">
                                <span className="font-semibold">Assigned by:</span> {issue.assignedBy}
                            </div>
                            <div className="mb-6">
                                <span className="font-semibold">Description:</span>
                                <p className="mt-2">{issue.description}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Initial Solution</h3>
                                <ScrollArea className="h-[calc(100vh-400px)] bg-white bg-opacity-10 rounded-lg p-4">
                                    {isLoading ? (
                                        <div className="flex justify-center items-center h-full">
                                            <span>Loading...</span>
                                        </div>
                                    ) : (
                                        <ReactMarkdown className="prose prose-invert prose-sm max-w-none">
                                            {initialSolution}
                                        </ReactMarkdown>
                                    )}
                                </ScrollArea>
                            </div>
                        </>
                    ) : (
                        <p>No ticket data available.</p>
                    )}
                </div>

                <div className="w-full md:w-1/2 p-6 flex flex-col m-5 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg border border-white border-opacity-20">
                    <ScrollArea className="flex-grow mb-4">
                        {messages.map((message, index) => (
                            <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500' : 'bg-gray-700'}`}>
                                    {message.sender === 'user' ? (
                                        message.text
                                    ) : (
                                        <ReactMarkdown className="prose prose-invert prose-sm max-w-none">
                                            {message.text}
                                        </ReactMarkdown>
                                    )}
                                </span>
                            </div>
                        ))}
                    </ScrollArea>
                    <div className="flex">
                        <Input
                            type="text"
                            placeholder="Type your message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            className="flex-grow mr-2 bg-white bg-opacity-10 text-white placeholder-gray-400"
                        />
                        <Button size="icon" className="mr-2" onClick={handleFileInputClick}>
                            <Paperclip className="h-4 w-4" />
                        </Button>
                        <input
                            ref={fileInputRef} // Attach ref here
                            id="file-input"
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                        <Button onClick={handleSendMessage}>
                            <Send className="h-4 w-4 mr-2" />
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
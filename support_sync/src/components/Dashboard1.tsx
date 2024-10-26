"use client"

import { SetStateAction, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'
import { Trello, Cloud, Database, BarChart2, Key, List, MessageSquare } from 'lucide-react'
import logo from '../Assets/logo.png'
import logoclickup from '../Assets/logoclickup.png'
import logosalesforce from '../Assets/logosalesforce.jpeg'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import NavBar from "@/components/NavBar"

const platforms = [
  { name: 'Jira', icon: Trello, color: 'bg-blue-500', logo: logo },
  { name: 'Clickup', icon: Trello, color: 'bg-green-500', logo: logoclickup },
  { name: 'Salesforce', icon: Cloud, color: 'bg-indigo-500', logo: logosalesforce },
  { name: 'Custom API', icon: Database, color: 'bg-purple-500', logo: logo },
]

const tutorialSteps = [
  { icon: Trello, title: "Select Platform", description: "Choose your preferred ticket management platform" },
  { icon: Key, title: "Enter Project Key", description: "Provide your project key to access tickets" },
  { icon: List, title: "View Tickets", description: "Browse and select an open ticket for resolution" },
  { icon: MessageSquare, title: "Get AI Solution", description: "Receive an AI-generated solution based on similar closed tickets" },
  { icon: BarChart2, title: "Refine with Chatbot", description: "Use our AI chatbot for further assistance if needed" },
]

export default function Dashboard() {

  const [text] = useTypewriter({
    words: ['SupportSync'],
    loop: 0,
    deleteSpeed: 50,
    typeSpeed: 100,
  })


  const [selectedPlatform, setSelectedPlatform] = useState<{ name: string; icon: any; color: string; logo: string } | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [projectKey, setProjectKey] = useState('')
  const navigate = useNavigate()

  const handlePlatformClick = (platform: SetStateAction<{ name: string; icon: any; color: string; logo: string } | null>) => {
    setSelectedPlatform(platform)
    setIsDialogOpen(true)
  }

  const handleProjectKeySubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (selectedPlatform && projectKey) {
      console.log(`Connecting to ${selectedPlatform.name} with project key: ${projectKey}`)
      navigate(`/project/${projectKey}`)
    }
    setIsDialogOpen(false)
    setProjectKey('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001f3f] via-[#00172e] to-[#001030] text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <NavBar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-bold mb-8">Welcome to <span>{text}</span><Cursor cursorColor='#FF69B4' /> </h1>

        <div className="mb-12">
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-white border-opacity-20 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6">
              {tutorialSteps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${platforms[index % platforms.length].color}`}>
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-white">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>

                  {index < tutorialSteps.length - 1 && (
                    <div className="flex items-center justify-center mx-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-6">Select your Platform</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="relative h-24 overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => handlePlatformClick(platform)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-300 filter blur-sm group-hover:blur-none"
                style={{ backgroundImage: `url(${platform.logo})` }}
              ></div>
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300 flex flex-col items-center justify-center">
                <platform.icon className="h-8 w-8 text-white transition-opacity duration-300 opacity-100 group-hover:opacity-0" />
                <span className="text-sm font-semibold text-white mt-2 transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                  {platform.name}
                </span>
              </div>
            </div>

          ))}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-white border-opacity-20 p-6 rounded-lg space-y-6">

            <div>
              <h3 className="text-xl font-bold text-white">⚡ Real-Time Solutions</h3>
              <p className="text-sm text-muted-foreground">
                Get instant resolutions to any type of ticket within seconds using our AI-powered system.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">🖼️ Media Support</h3>
              <p className="text-sm text-muted-foreground">
                Upload documents, screenshots, or media files to receive more detailed and accurate solutions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">🔍 Experience-Based Solutions</h3>
              <p className="text-sm text-muted-foreground">
                Our solutions are powered by experience, drawing from previous tickets to give the most relevant answers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">🔗 Seamless Multi-Platform Integration</h3>
              <p className="text-sm text-muted-foreground">
                Easily connect and manage tickets from multiple platforms like JIRA, Salesforce, and more, all in one dashboard.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">🤖 AI-Powered Ticket Classification</h3>
              <p className="text-sm text-muted-foreground">
                Automatically categorize and prioritize incoming tickets to improve workflow efficiency.
              </p>
            </div>

          </div>
        </div>

      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Connect to {selectedPlatform?.name}</DialogTitle>
            <DialogDescription>
              Enter your project key to connect to {selectedPlatform?.name}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleProjectKeySubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="projectKey" className="text-right">
                  Project Key
                </Label>
                <Input
                  id="projectKey"
                  value={projectKey}
                  onChange={(e) => setProjectKey(e.target.value)}
                  className="col-span-3 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Connect</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Zap, CheckCircle, Clock, BarChart } from 'lucide-react'
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [activeUsers] = useState(4)
  const [supportedPlatforms] = useState(4)

  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 space-y-6 mr-8">
        <h2 className="text-3xl text-center md:text-6xl md:text-left font-bold leading-tight">
          The New Standard for{' '}
          <span className="text-cyan-400">AI-Powered</span> Support{' '}
          <span className="text-indigo-400">Ticket Resolution</span>
        </h2>
        <p className="text-center md:text-xl md:text-left text-gray-300">
          SupportSync is an AI-driven platform that streamlines your support ticket resolution across multiple platforms like Jira, Clickup, Salesforce, and more.
        </p>
        <div className="space-x-4 w-full md:justify-start flex justify-center items-center">
          <Button
            className="
            bg-gradient-to-r from-blue-500 to-indigo-600 
            text-white font-bold py-3 px-8 rounded-full 
            hover:from-indigo-600 hover:to-blue-500 
            transition-transform transform hover:scale-105 
            shadow-lg hover:shadow-2xl 
            focus:outline-none focus:ring-4 focus:ring-indigo-400 
            animate-pulse"
            size="lg"
            onClick={handleStartClick}
          >
            Get Started
          </Button>

        </div>
        <div className="flex md:justify-start justify-center space-x-8 text-sm text-gray-400">
          <p>{activeUsers} ACTIVE USERS</p>
          <p>{supportedPlatforms} SUPPORTED PLATFORMS</p>
        </div>

      </div>
      <div className="md:w-1/2 mt-12 md:mt-0 z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-lg filter blur-3xl opacity-30"></div>
          <div className="relative bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-2xl border border-white border-opacity-20">
            <div className="grid grid-cols-2 gap-8">
              {['Jira', 'Clickup', 'Salesforce', 'Custom API'].map((platform) => (
                <div key={platform} className="flex items-center space-x-4 bg-white bg-opacity-5 p-4 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">{platform[0]}</span>
                  </div>
                  <span className="font-semibold">{platform}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-white bg-opacity-5 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">AI-Powered Resolution</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Zap className="text-yellow-400" />
                  <span>Instant solution to any issue of any category</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="text-green-400" />
                  <span>Automated responses for common issues</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="text-blue-400" />
                  <span>Reduced average resolution time by 65%</span>
                </div>
                <div className="flex items-center space-x-4">
                  <BarChart className="text-purple-400" />
                  <span>Continuous learning and improvement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
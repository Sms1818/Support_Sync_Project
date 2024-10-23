"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import { BackgroundGradient } from "./Background";
import ChatInterface from "./ChatInterface";
import TicketDetails from "./TicketDetails";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useToast } from "../hooks/use-toast";

interface Ticket {
  issue_key: string;
  title: string;
  description: string;
  priority: string;
  platform: string;
  projectKey: string;
}

const platforms = ["Jira", "ClickUp"]; // Reduced to only supported platforms

const Dashboard: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [projectKey, setProjectKey] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [tempProjectKey, setTempProjectKey] = useState<string>("");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const fetchTickets = async (platform: string, projectKey: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/tickets/open/${platform.toLowerCase()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ project_key: projectKey }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Handle both Jira and ClickUp responses
      const ticketData = data.open_tickets || data.open_tasks || [];
      setTickets(ticketData);

      toast({
        title: "Success",
        description: `Successfully fetched tickets from ${platform}`,
      });
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast({
        title: "Error",
        description: `Failed to fetch tickets from ${platform}`,
        variant: "destructive",
      });
      setTickets([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectKeySubmit = () => {
    if (!tempProjectKey.trim()) {
      toast({
        title: "Error",
        description: "Project key cannot be empty",
        variant: "destructive",
      });
      return;
    }
    setProjectKey(tempProjectKey);
    setIsDialogOpen(false);
    if (selectedPlatform) {
      fetchTickets(selectedPlatform, tempProjectKey);
    }
  };

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
    setTempProjectKey("");
    setProjectKey(null);
    setSelectedTicket(null);
    setTickets([]);
    setIsDialogOpen(true);
  };

  const getPriorityColor = (priority: string) => {
    const normalizedPriority = priority.toLowerCase();
    switch (normalizedPriority) {
      case "high":
        return "bg-red-500 hover:bg-red-600";
      case "medium":
      case "normal":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "low":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="relative z-20 flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col">
        <div className="flex items-center justify-center h-16 bg-gray-900 border-b border-gray-700">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="text-white bg-transparent !border-none p-0 shadow-none hover:bg-transparent">
                Select Platform
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-800 text-white">
              <DropdownMenuSeparator />
              {platforms.map((platform) => (
                <DropdownMenuItem
                  key={platform}
                  onClick={() => handlePlatformSelect(platform)}
                  className="hover:bg-gray-700 hover:text-white"
                >
                  {platform}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {selectedPlatform && (
          <div className="flex items-center justify-center h-16 bg-gradient-to-r from-gray-800 to-gray-700 text-sm text-white font-semibold shadow-md border-b border-gray-600 rounded-md mx-4 mt-4 px-6">
            <span className="text-gray-300">Selected Platform:</span>
            <span className="ml-2 text-blue-400">{selectedPlatform}</span>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <BackgroundGradient
        blur={15}
        waveWidth={60}
        waveOpacity={0.6}
        colors={["#fbcfe8", "#e9d5ff", "#f3e8ff", "#f9f5ff", "#f0abfc"]}
      />
      <div className="flex-grow flex flex-col">
        <main className="flex-grow p-6 overflow-hidden">
          {!selectedTicket && selectedPlatform && projectKey && (
            <>
              <h1 className="text-2xl font-bold mb-6 text-gray-800">
                {selectedPlatform}/{projectKey}
              </h1>

              <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
                {isLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tickets.length > 0 ? (
                      tickets.map((ticket) => (
                        <Card
                          key={ticket.issue_key}
                          className="bg-white/30 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer border border-white/20 rounded-lg"
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-800">
                              {ticket.title}
                            </CardTitle>
                            <Badge
                              className={`${getPriorityColor(
                                ticket.priority
                              )} text-white`}
                            >
                              {ticket.priority}
                            </Badge>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600 mb-4">
                              {ticket.description}
                            </p>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>ID: {ticket.issue_key}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <p className="text-gray-600">
                        No tickets found for this platform/project.
                      </p>
                    )}
                  </div>
                )}
              </ScrollArea>
            </>
          )}

          {/* 50-50 Split Layout when a ticket is selected */}
          {selectedTicket && (
            <div className="flex h-full">
              <div className="w-1/2 pr-4">
                <TicketDetails ticket={selectedTicket} projectKey={projectKey || ''} />
              </div>
              <div className="w-1/2 pl-4">
                <ChatInterface ticketId={selectedTicket.issue_key} projectKey={projectKey || ''} />
              </div>
            </div>
          )}

        </main>

        {/* Dialog for project key input */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter Project Key</DialogTitle>
            </DialogHeader>
            <Input
              value={tempProjectKey}
              onChange={(e) => setTempProjectKey(e.target.value)}
              placeholder="Enter project key"
            />
            <DialogFooter>
              <Button onClick={handleProjectKeySubmit}>Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Dashboard;
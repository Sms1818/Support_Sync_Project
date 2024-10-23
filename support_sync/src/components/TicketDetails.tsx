import { HTMLAttributes } from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown';
import { ScrollArea } from "@/components/ui/scroll-area";

interface Ticket {
  issue_key: string;
  platform: string;
  projectKey: string;
  title: string;
  description: string;
  priority: string;
}

interface TicketDetailsProps {
  ticket: Ticket;
  projectKey: string;
}

interface SolutionResponse {
  ticket: any;
  similar_ticket_solutions: string;
  initial_solution: string;
}

export default function TicketDetails({ ticket, projectKey }: TicketDetailsProps) {
  const [solution, setSolution] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSolution = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/tickets/solve/${ticket.issue_key}`,
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
        const data: SolutionResponse = await response.json();
        setSolution(data.initial_solution);
      } catch (error) {
        console.error("Error fetching solution:", error);
        toast({
          title: "Error",
          description: "Failed to fetch ticket solution",
          variant: "destructive",
        });
        setSolution("Failed to load solution. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSolution();
  }, [ticket.issue_key, projectKey, toast]);

  return (
    <Card className="flex flex-col h-full bg-white/30 backdrop-blur-lg shadow-2xl border border-white/20 rounded-lg p-6 transition-transform transform overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wide line-clamp-2">
          {ticket.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-4 text-gray-900 overflow-hidden">
        <ScrollArea className="h-[calc(50vh-100px)] md:h-[calc(60vh-100px)] w-full pr-4">
          <div className="bg-white/40 backdrop-blur-md p-4 rounded-lg shadow-lg text-gray-600 leading-relaxed mb-4">
            <h3 className="font-bold text-lg text-gray-700 mb-2">Description:</h3>
            <ReactMarkdown components={{
              p: ({ children }) => <p className="mb-2">{children}</p>,
              h1: ({ children }) => <h1 className="text-2xl font-bold mb-2">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl font-bold mb-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg font-bold mb-2">{children}</h3>,
              ul: ({ children }) => <ul className="list-disc pl-5 mb-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-5 mb-2">{children}</ol>,
              li: ({ children }) => <li className="mb-1">{children}</li>,
              code: ({ inline, className, children, ...props }: HTMLAttributes<HTMLElement> & { inline?: boolean }) => (
                <code className={`${inline ? 'bg-gray-200 rounded px-1' : 'block bg-gray-200 p-2 rounded'} ${className}`} {...props}>
                  {children}
                </code>
              ),
            }}>
              {ticket.description}
            </ReactMarkdown>
          </div>

          <div className="bg-white/40 backdrop-blur-md p-4 rounded-lg shadow-lg text-gray-600 leading-relaxed">
            <h3 className="font-bold text-lg text-gray-700 mb-2">Initial Solution:</h3>
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <ReactMarkdown components={{
                p: ({ children }) => <p className="mb-2">{children}</p>,
                h1: ({ children }) => <h1 className="text-2xl font-bold mb-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl font-bold mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg font-bold mb-2">{children}</h3>,
                ul: ({ children }) => <ul className="list-disc pl-5 mb-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-5 mb-2">{children}</ol>,
                li: ({ children }) => <li className="mb-1">{children}</li>,
                code: ({ inline, className, children, ...props }: HTMLAttributes<HTMLElement> & { inline?: boolean }) => (
                  <code className={`${inline ? 'bg-gray-200 rounded px-1' : 'block bg-gray-200 p-2 rounded'} ${className}`} {...props}>
                    {children}
                  </code>
                ),
              }}>
                {solution}
              </ReactMarkdown>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
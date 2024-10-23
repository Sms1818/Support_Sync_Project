from fetcher.jira_fetcher import fetch_open_tickets, fetch_closed_tickets
from fetcher.embedder import embed_ticket_content
from fetcher.vector_store import search_similar_tickets, store_ticket_embedding, fetch_stored_tickets  
from llm.chatbot import get_openai_solution, chatbot_response

def update_vector_database_with_closed_tickets():
    print("Fetching closed tickets...")  
    closed_tickets = fetch_closed_tickets("KAN")

    if not closed_tickets:
        print("No closed tickets found.") 
        return

    print(f"Found {len(closed_tickets)} closed tickets.")  

    stored_ticket_keys = [ticket['Issue Key'] for ticket in fetch_stored_tickets()] 

    for ticket in closed_tickets:
        print(f"Processing ticket: {ticket['Issue Key']}")  
        ticket_embedding = embed_ticket_content(ticket)
        
        metadata = {
            "Comments": ticket['Comments']  
        }
        
        if ticket['Issue Key'] not in stored_ticket_keys:
            store_ticket_embedding(ticket['Issue Key'], ticket_embedding, metadata)
            print(f"Stored new resolved ticket: {ticket['Issue Key']}")  
        else:
            print(f"Ticket {ticket['Issue Key']} already stored.")

def generate_solutions_for_open_tickets():
    open_tickets = fetch_open_tickets()
    solutions = []

    for ticket in open_tickets:
        ticket_embedding = embed_ticket_content(ticket)
        
        similar_tickets = search_similar_tickets(ticket_embedding)
        similar_ticket_solutions = "\n".join([t['metadata']['Comments'] for t in similar_tickets if 'metadata' in t])
        
        openai_solution = get_openai_solution(ticket,similar_ticket_solutions)
        
        ticket_content = f"Issue Key: {ticket['Issue Key']}, Summary: {ticket['Summary']}, Description: {ticket['Description']}"
        
        print(f"Initial Solution:\n{openai_solution}")
        print("\nStill confused? Chat with our smart chatbot for personalized help!")

        user_query = input("Enter your query: ")
        
        if user_query.strip():
            chatbot_solution = chatbot_response(ticket_content, similar_ticket_solutions, user_query)
            print(f"\nChatbot's Response:\n{chatbot_solution}")
        
        solutions.append({
            "ticket": ticket,
            "initial_solution": openai_solution,
            "chatbot_solution": chatbot_solution if user_query.strip() else "No chatbot interaction."
        })
    
    return solutions

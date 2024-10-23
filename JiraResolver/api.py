from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fetcher.jira_fetcher import fetch_open_tickets
from fetcher.clickup_fetcher import fetch_all_tasks, filter_and_format_tasks
from fetcher.embedder import embed_ticket_content
from fetcher.vector_store import search_similar_tickets
from llm.chatbot import get_openai_solution, chatbot_response
from llm.solution_generation import update_vector_database_with_closed_tickets
from fastapi.middleware.cors import CORSMiddleware
import logging
from typing import Optional, Dict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

class UserQuery(BaseModel):
    ticket_id: str
    query: str
    project_key: str  

class ProjectKeyRequest(BaseModel):
    project_key: str

ticket_contexts: Dict[str, dict] = {}

@app.post("/tickets/open/jira")
async def get_open_tickets(request: ProjectKeyRequest):
    try:
        open_tickets = fetch_open_tickets(request.project_key)
        ticket_list = [
            {
                "issue_key": ticket["Issue Key"],
                "title": ticket["Summary"],
                "description": ticket["Description"],
                "priority": ticket["Priority"],
                "platform": "JIRA",
                "projectKey": request.project_key
            }
            for ticket in open_tickets
        ]
        return {"open_tickets": ticket_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching open tickets: {e}")

@app.post("/tickets/open/clickup")
async def get_open_clickup_tasks(request: ProjectKeyRequest):
    try:
        tasks = fetch_all_tasks(request.project_key)  
        open_tasks = filter_and_format_tasks(tasks, 'open') 
        logging.info("Open Tasks: %s", open_tasks)

        ticket_list = [
            {
                "issue_key": task["Task Id"],
                "title": task["Task Name"],
                "description": task["Description"] if task["Description"] else "No description available",
                "priority": task["Priority"] if task["Priority"] else "No priority",
                "platform": "ClickUp",
                "projectKey": request.project_key
            }
            for task in open_tasks
        ]
        return {"open_tasks": ticket_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching open ClickUp tasks: {e}")


@app.post("/tickets/solve/{ticket_id}")
async def get_ticket_solution(ticket_id: str, request: ProjectKeyRequest):
    try:
        open_tickets = fetch_open_tickets(request.project_key)
        selected_ticket = next((ticket for ticket in open_tickets if ticket["Issue Key"] == ticket_id), None)
        
        if not selected_ticket:
            raise HTTPException(status_code=404, detail="Ticket not found")
            
        ticket_embedding = embed_ticket_content(selected_ticket)
        similar_tickets = search_similar_tickets(ticket_embedding)
        similar_ticket_solutions = "\n".join([t['metadata']['Comments'] for t in similar_tickets if 'metadata' in t])
        
        initial_solution = get_openai_solution(selected_ticket, similar_ticket_solutions)
        
        ticket_contexts[ticket_id] = {
            'ticket_details': selected_ticket,
            'initial_solution': initial_solution,
            'similar_solutions': similar_ticket_solutions,
            'chat_history': []
        }
        
        return {
            "ticket": selected_ticket,
            "similar_ticket_solutions": similar_ticket_solutions,
            "initial_solution": initial_solution
        }
        
    except Exception as e:
        logging.error(f"Error generating solution: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/tickets/chat")
async def chat_with_chatbot(user_query: UserQuery):
    try:
        ticket_context = ticket_contexts.get(user_query.ticket_id)
        
        if not ticket_context:
            raise HTTPException(
                status_code=400,
                detail="Please get an initial solution first using /tickets/solve endpoint"
            )
            
        response = chatbot_response(ticket_context, user_query.query)
        
        ticket_context['chat_history'].append(f"User: {user_query.query}")
        ticket_context['chat_history'].append(f"Assistant: {response}")
        
        if len(ticket_context['chat_history']) > 20:
            ticket_context['chat_history'] = ticket_context['chat_history'][-20:]
            
        return {"chatbot_response": response}
        
    except Exception as e:
        logging.error(f"Error in chatbot interaction: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

# update_vector_database_with_closed_tickets()

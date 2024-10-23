import os
import sys
import json
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import openai
from groq import Groq
from config import OPENAI_API_KEY, GROQ_API_KEY

openai.api_key = OPENAI_API_KEY
client = Groq(api_key=GROQ_API_KEY)

chat_memory = []

def chatbot_response(ticket_context, user_query):
    conversation_history = ticket_context.get('chat_history', [])
    initial_solution = ticket_context.get('initial_solution', '')
    ticket_details = ticket_context.get('ticket_details', {})

    prompt = f"""
    You are an IT support assistant with access to the following context:

    1. Ticket Details:
    - Issue Key: {ticket_details.get('Issue Key')}
    - Summary: {ticket_details.get('Summary')}
    - Description: {ticket_details.get('Description')}

    2. Initial Solution Provided:
    {initial_solution}

    3. Previous Conversation:
    {'\n'.join(conversation_history)}

    The user query is: {user_query}

    **IMPORTANT**: Provide a response between 150 and 700 characters. If you must exceed this, ensure the response remains as close to 60 characters as possible.
    """

    response = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama-3.2-1b-preview",
        max_tokens=700  
    )

    response_content = response.choices[0].message.content

    if len(response_content) > 700:
        response_content = response_content[:700]  
    elif len(response_content) < 150:
        response_content = response_content.ljust(150) 

    return response_content

def get_openai_solution(ticket, similar_ticket_solutions):
    text = f"Issue Key: {ticket['Issue Key']}\nSummary: {ticket['Summary']}\nDescription: {ticket['Description']}\nComments: {ticket['Comments']}"
    
    prompt = f"""
    Analyze the following IT support ticket and similar solutions to provide a structured response:

    **Ticket Details**:
    {text}
    **Similar Tickets**:
    {similar_ticket_solutions}

    Provide a comprehensive solution following this structure:
    1. Root cause analysis
    2. Step-by-step solution
    3. Prevention recommendations

    Keep the response professional and detailed.
    """

    response = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama-3.2-1b-preview",
    )
    
    return response.choices[0].message.content

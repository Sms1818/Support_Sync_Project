import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from pinecone import Pinecone
from config import PINECONE_API_KEY, PINECONE_INDEX_NAME

try:
    pinecone = Pinecone(api_key=PINECONE_API_KEY)
    print("Pinecone initialized successfully")

    existing_indexes = pinecone.list_indexes()
    print("Existing Pinecone indexes:")
    for index in existing_indexes:
        print(f"- {index}") 

    if PINECONE_INDEX_NAME not in existing_indexes:
        print(f"Index '{PINECONE_INDEX_NAME}' does not exist.")
    else:
        print(f"Index '{PINECONE_INDEX_NAME}' exists.")

    index = pinecone.Index(PINECONE_INDEX_NAME)

    def store_ticket_embedding(ticket_id, embedding, metadata):
        try:
            index.upsert([(ticket_id, embedding, metadata)])  
            print(f"Successfully stored embedding for {ticket_id}")
        except Exception as e:
            print(f"Error storing embedding for {ticket_id}: {e}")

    def search_similar_tickets(embedding, top_k=2):
        try:
            result = index.query(vector=embedding, top_k=top_k, include_metadata=True)
            return result['matches']
        except Exception as e:
            print(f"Error searching similar tickets: {e}")
            return []
    
    def fetch_stored_tickets():
        try:
            result = index.fetch_all()
            stored_tickets = []
            for item in result['vectors']:
                stored_tickets.append({
                    'Issue Key': item['id'],
                    'metadata': item['metadata'], 
                })
            return stored_tickets
        except Exception as e:
            print(f"Error fetching stored tickets: {e}")
            return []

except Exception as e:
    print(f"An error occurred: {e}")
    print(f"Error type: {type(e)}")

# **SupportSync 🚀**


![image](https://github.com/user-attachments/assets/bf3c1093-87fd-42a6-ad21-13eb8a0dc8a2) ![image](https://github.com/user-attachments/assets/e1399686-627c-4656-b7c8-e5e23b543e40) ![image](https://github.com/user-attachments/assets/e4c6b01d-39a4-4446-b3cc-52e4c634ce59) ![image](https://github.com/user-attachments/assets/b27bb201-b6c5-4dc3-93ad-836b1434fa33) ![image](https://github.com/user-attachments/assets/0a7fbd67-3b2f-47ef-bdb5-823437594bcf) ![image](https://github.com/user-attachments/assets/5cf0b2cb-5236-45e5-a70e-8b34093ef341) ![image](https://github.com/user-attachments/assets/0098e1f4-95a5-49c7-902b-98e5bafe307b)







FastAPI Vite Tailwind CSS Docker LangChain Llama Pinecone

SupportSync is an AI-powered ticketing solution that streamlines issue resolution across multiple platforms. It leverages past solutions to provide intelligent, context-aware responses to new tickets.

![image](https://github.com/user-attachments/assets/f9046f60-4e88-4202-81b9-018617b9db9a)


🌟 Features
Support for multiple ticketing platforms: JIRA, ClickUp, and Salesforce
AI-powered ticket resolution using Llama 3.2 90B model
Context-aware solutions based on past resolved tickets
Interactive chatbot for detailed issue discussions
Unified platform for managing tickets from various sources
Document attachment support: Users can attach documents for more personalized and accurate responses from the chatbot

📸 Screenshots

![image](https://github.com/user-attachments/assets/24145caf-fbad-49bf-b641-2cba7358c38a)


Streamlined Open Issues/Tickets

![image](https://github.com/user-attachments/assets/6655ef10-34ab-4ef6-8525-78167413beb9)


TICKET RESOLUTION AND AI Chatbot

![image](https://github.com/user-attachments/assets/6eb46ccc-acfb-4429-b4c2-56f55ee773f1)


# 🚀 Getting Started

## 📦 Clone the Repository

```bash
git clone https://github.com/Sms1818/Support_Sync_Project

cd support-sync
```


Backend Setup

1. Navigate to the backend directory:
```
cd support-sync-backend
```

2. Create and activate a virtual environment:
```
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

3. Install dependencies:
```
pip install -r requirements.txt
```

4. Configure the .env file with the following variables:

```
# JIRA
JIRA_API_URL=your_jira_api_url
JIRA_EMAIL=your_jira_email
JIRA_API_TOKEN=your_jira_api_token
JIRA_PROJECT_KEY=your_jira_project_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Pinecone
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENV=your_pinecone_environment
PINECONE_INDEX_NAME=your_pinecone_index_name
VECTOR_DB_NAME=your_vector_db_name
PINECONE_HOST=your_pinecone_host

# GROQ
GROQ_API_KEY=your_groq_api_key

# Salesforce
USERNAME=your_salesforce_username
PASSWORD=your_salesforce_password
SECURITY_TOKEN=your_salesforce_security_token
CONSUMER_KEY=your_salesforce_consumer_key
CONSUMER_SECRET=your_salesforce_consumer_secret

# ClickUp
CLICKUP_API_URL=your_clickup_api_url
CLICKUP_API_TOKEN=your_clickup_api_token
```
5. Run the backend server:
```
uvicorn api:app --reload
```


Frontend Setup

1. Navigate to the frontend directory:
```
cd ../support-sync-frontend
```

2. Install dependencies:
```
npm install
```

3. Run the frontend development server:
```
npm run dev
```


🐳 Docker Setup

If you prefer using Docker, follow these steps:

1. Ensure you have Docker and Docker Compose installed on your system.

2. Configure the .env file as mentioned in the Backend Setup section.

3. From the root directory, run:
```
docker-compose up --build
```

4. Once the build is complete, you'll see the port number in the console where the application is running.

🎭 Usage

1. Access the SupportSync dashboard through your browser.
2. Connect your ticketing platforms (JIRA, ClickUp, Salesforce).
3. View and select tickets from the unified dashboard.
4. Click on a ticket to see the AI-generated solution.
5. Use the chatbot for more detailed discussions or clarifications.

![image](https://github.com/user-attachments/assets/0d446949-1b29-48da-b058-4a19f74ab126)


## 🛠️ Tech Stack

- **Backend:** Python, FastAPI, LLMs (LLaMA 3.2 90B), VectorDB  
- **Frontend:** Vite.js, Tailwind CSS, Framer Motion, shadcn/ui  
- **Database:** Pinecone (Vector Database)  
- **AI Model:** GROQ API (LLaMA 3.2 90B Text Preview Model)  
- **Containerization:** Docker

🧠 How It Works

1. Ticket Collection: SupportSync gathers tickets from JIRA, ClickUp, and Salesforce.
2. Context Analysis: The system analyzes past solved tickets related to the current issue.
3. AI Solution Generation: Using the Llama 3.2 90B model, SupportSync generates a solution, considering the historical context.
4. Interactive Refinement: Users can further discuss the issue with the AI chatbot for more detailed solutions.
   
📝 Note

This project is designed for streamlining support processes. Please ensure you have the necessary permissions to access and process ticket data from the integrated platforms.



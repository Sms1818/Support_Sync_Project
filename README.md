SupportSync 🚀
FastAPI Vite Tailwind CSS Docker LangChain Llama Pinecone

SupportSync is an AI-powered ticketing solution that streamlines issue resolution across multiple platforms. It leverages past solutions to provide intelligent, context-aware responses to new tickets.

![image](https://github.com/user-attachments/assets/f9046f60-4e88-4202-81b9-018617b9db9a)


SupportSync Hero

🌟 Features
Support for multiple ticketing platforms: JIRA, ClickUp, and Salesforce
AI-powered ticket resolution using Llama 3.2 90B model
Context-aware solutions based on past resolved tickets
Interactive chatbot for detailed issue discussions
Unified platform for managing tickets from various sources
Document attachment support: Users can attach documents for more personalized and accurate responses from the chatbot
📸 Screenshots
Dashboard
Dashboard

Dashboard

Streamlined Open Issues/Tickets
Ticket Resolution

TICKET RESOLUTION AND AI Chatbot
AI Chatbot

🚀 Getting Started
Clone the Repository
git clone https://github.com/Prathamesh72003/support-sync.git
cd support-sync
Backend Setup
Navigate to the backend directory:

cd support-sync-backend
Create and activate a virtual environment:

python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
Install dependencies:

pip install -r requirements.txt
Configure the .env file with the following variables:

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
Run the backend server:

uvicorn api:app --reload
Frontend Setup
Navigate to the frontend directory:

cd ../support-sync-frontend
Install dependencies:

npm install
Run the frontend development server:

npm run dev
🐳 Docker Setup
If you prefer using Docker, follow these steps:

Ensure you have Docker and Docker Compose installed on your system.

Configure the .env file as mentioned in the Backend Setup section.

From the root directory, run:

docker-compose up --build
Once the build is complete, you'll see the port number in the console where the application is running.

🎭 Usage
Access the SupportSync dashboard through your browser.
Connect your ticketing platforms (JIRA, ClickUp, Salesforce).
View and select tickets from the unified dashboard.
Click on a ticket to see the AI-generated solution.
Use the chatbot for more detailed discussions or clarifications.
Usage Demo

🛠️ Technologies Used
Backend: Python, FastAPI, LLMs (Llama 3.2 90B), VectorDB
Frontend: Vite.js, Tailwind CSS, Framer Motion, shadcn/ui
Database: Pinecone (Vector Database)
AI: GROQ API (Llama 3.2 90B Text Preview Model)
Containerization: Docker
🧠 How It Works
Ticket Collection: SupportSync gathers tickets from JIRA, ClickUp, and Salesforce.
Context Analysis: The system analyzes past solved tickets related to the current issue.
AI Solution Generation: Using the Llama 3.2 90B model, SupportSync generates a solution, considering the historical context.
Interactive Refinement: Users can further discuss the issue with the AI chatbot for more detailed solutions.
📝 Note
This project is designed for streamlining support processes. Please ensure you have the necessary permissions to access and process ticket data from the integrated platforms.

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check issues page.

📜 License
This project is AGPL-3.0 licensed.

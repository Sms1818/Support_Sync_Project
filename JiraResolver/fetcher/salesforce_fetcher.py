import os
import sys
import requests
from simple_salesforce import Salesforce
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from config import USERNAME, PASSWORD, SECURITY_TOKEN, CONSUMER_KEY, CONSUMER_SECRET

def salesforce_login():
    url = 'https://login.salesforce.com/services/oauth2/token'
    data = {
        'grant_type': 'password',
        'client_id': CONSUMER_KEY,
        'client_secret': CONSUMER_SECRET,
        'username': USERNAME,
        'password': PASSWORD + SECURITY_TOKEN
    }
    
    response = requests.post(url, data=data)
    response.raise_for_status()
    access_token = response.json().get('access_token')
    instance_url = response.json().get('instance_url')
    
    sf = Salesforce(instance_url=instance_url, session_id=access_token)
    return sf

# Fetch cases for a specific project
def fetch_cases_by_project(project_name):
    sf = salesforce_login()
    query = f"""
        SELECT Id, CaseNumber, Subject, Status, Priority, CreatedDate, Description
        FROM Case
        WHERE Project__c = '{project_name}'  // Replace with the actual project field
        LIMIT 10
    """
    cases = sf.query(query).get('records', [])
    return format_cases(cases)

def fetch_comments(case_id):
    sf = salesforce_login()
    query = f"SELECT CommentBody FROM CaseComment WHERE ParentId = '{case_id}'"
    comments = sf.query(query).get('records', [])
    return [comment.get('CommentBody', '') for comment in comments]

def format_cases(cases):
    formatted_cases = []
    for case in cases:
        comments = fetch_comments(case['Id'])
        comment_text = "\n".join(comments) if comments else "No comments"
        description_text = case.get('Description', 'No description')

        formatted_cases.append({
            'Case Id': case['Id'],
            'Case Number': case['CaseNumber'],
            'Subject': case['Subject'],
            'Status': case['Status'],
            'Priority': case['Priority'],
            'Created Date': case['CreatedDate'],
            'Description': description_text,
            'Comments': comment_text
        })

    return formatted_cases

def print_case_details(cases):
    for case in cases:
        print("---------------------------------------------------")
        print(f"Case Number: {case['Case Number']}")
        print(f"Subject: {case['Subject']}")
        print(f"Status: {case['Status']}")
        print(f"Priority: {case['Priority']}")
        print(f"Created Date: {case['Created Date']}")
        print(f"Description: {case['Description']}")
        print(f"Comments: {case['Comments']}")
        print("---------------------------------------------------")

if __name__ == "__main__":
    project_name = 'YOUR_PROJECT_NAME'  
    print(f"Fetching cases for project: {project_name}...")
    cases = fetch_cases_by_project(project_name)
    print(f"Cases for project '{project_name}':")
    print_case_details(cases)

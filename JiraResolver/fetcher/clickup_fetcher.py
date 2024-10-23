import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import requests
from config import CLICKUP_API_URL, CLICKUP_API_TOKEN

headers = {
    "Authorization": CLICKUP_API_TOKEN,
    "Content-Type": "application/json",
}

def fetch_all_tasks(CLICKUP_LIST_ID,page=0):
    """Fetch all tasks from the list, handling pagination, and filter by status locally."""
    tasks = []
    while True:
        response = requests.get(f'{CLICKUP_API_URL}list/{CLICKUP_LIST_ID}/task?archived=false&include_closed=true&page={page}', headers=headers)
        response.raise_for_status()

        data = response.json()
        tasks += data.get('tasks', [])
        
        if not data.get('tasks') or not data.get('pages') or page >= data['pages']['total']:
            break
        
        page += 1 

    return tasks

def fetch_comments(task_id):
    """Fetch comments for a specific task."""
    url = f'{CLICKUP_API_URL}task/{task_id}/comment'
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        comments_data = response.json()
        comments = comments_data.get('comments', [])
        return [comment.get('comment_text', '') for comment in comments]
    else:
        return []

def filter_and_format_tasks(tasks, status_filter):
    """Filter tasks by status and format their details."""
    formatted_tasks = []

    for task in tasks:
        if task['status']['status'].lower() != status_filter.lower():
            continue

        comments = fetch_comments(task['id'])
        comment_text = "\n".join(comments) if comments else "No comments"

        description_text = task.get('description', 'No description')

        # Safely access the priority field
        priority = task.get('priority')
        priority_text = priority.get('priority') if priority else 'No priority'

        formatted_tasks.append({
            'Task Id': task['id'],
            'Task Name': task['name'],
            'Assignee': task.get('assignees', [{}])[0].get('username', 'Unassigned'),
            'Description': description_text,
            'Priority': priority_text,
            'Comments': comment_text,
        })

    return formatted_tasks

def print_task_details(tasks):
    """Print the details of the tasks."""
    for task in tasks:
        print("---------------------------------------------------")
        print(f"Task ID: {task['Task Id']}")
        print(f"Task Name: {task['Task Name']}")
        print(f"Assignee: {task['Assignee']}")
        print(f"Description: {task['Description']}")
        print(f"Priority: {task['Priority']}")
        print(f"Comments: {task['Comments']}")
        print("---------------------------------------------------")

if __name__ == "__main__":

    list_id = input("Please enter the ClickUp List ID: ").strip()

    tasks = fetch_all_tasks(list_id)

    closed_tasks = filter_and_format_tasks(tasks, 'closed')
    print("Closed Tasks:")
    print_task_details(closed_tasks)

    open_tasks = filter_and_format_tasks(tasks, 'open')
    print("Open Tasks:")
    print_task_details(open_tasks)

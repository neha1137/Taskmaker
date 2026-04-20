import os
from fastapi import FastAPI, UploadFile, File
from groq import Groq
from dotenv import load_dotenv

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows any frontend to connect
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


load_dotenv()
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

all_tasks = []

@app.get("/tasks")
async def get_tasks():
    return all_tasks

@app.delete("/tasks/{task_id}")
async def delete_task(task_id: int):
    # Logic to remove task from all_tasks list
    return {"message": "Deleted"}

@app.post("/voice-to-task")
async def voice_to_task(file: UploadFile = File(...)):
    transcription = client.audio.transcriptions.create(
        file=(file.filename, await file.read()),
        model="whisper-large-v3",
    )
    
    user_text = transcription.text
    
    
    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a task assistant. Respond ONLY with a JSON object containing 'task', 'priority', and 'due_date'."},
            {"role": "user", "content": f"Create a task from this: {user_text}"}
        ],
        model="llama-3.3-70b-versatile", 
        response_format={"type": "json_object"}
    )
    
    return chat_completion.choices[0].message.content

@app.get("/")
async def root():
    return {"message": "AI Task Backend is running!"}

# AI Voice Task Master

A modern Task Manager built with **React** and **FastAPI** that uses **LLMs (Groq / Llama 3)** to convert voice commands into structured tasks.

---

##  Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo-name.git
cd your-repo-name
```

------

##  Backend Setup

### 1. Navigate to Backend

```bash
cd backend
```

### 2. Create & Activate Virtual Environment

```bash
python -m venv venv
```

- **Windows**

```bash
.\venv\Scripts\activate
```

- **Mac/Linux**

```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install fastapi uvicorn groq python-dotenv
```

### 4. Configure API Key

Create a `.env` file inside the `backend` folder:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### 5. Run Backend

```bash
uvicorn main:app --reload
```

------

##  Frontend Setup

### 1. Navigate to Frontend

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Frontend

```bash
npm run dev
```

------

##  How to Use the App

1. Open the URL provided by Vite (usually: `http://localhost:5173`)
2. Click **" Voice Command"** and allow microphone access
3. Speak your task (with or without deadline)
4. The AI will automatically:
   - Extract the task
   - Assign deadline
   - Set priority

------

##  Security Note

Make sure to add `.env` to your `.gitignore` file to prevent exposing your **Groq API Key** on GitHub.

```bash
.env
```

------

##  Tech Stack

- **Frontend:** React + Vite
- **Backend:** FastAPI
- **AI Engine:** Groq (Llama 3)
- **Voice Input:** Browser Speech API

-----

import React, { useState, useEffect } from 'react';
import VoiceRecorder from './VoiceRecorder';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("my_ai_tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    localStorage.setItem("my_ai_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addNewTask = (taskObj) => {
    const newTask = { 
      ...taskObj, 
      id: Date.now(), 
      completed: false 
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    addNewTask({ task: textInput, due_date: "Today", priority: "Normal" });
    setTextInput("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={{maxWidth: '600px', margin: '0 auto', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: 'purple', marginTop: '40px' }}>Task Tracker</h1>
      
      <div style={{ 
        background:'#e103c8',
        padding: '30px', 
        borderRadius: '15px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        border: '1px solid #eee' 
      }}>
        <VoiceRecorder onTaskCreated={addNewTask} />
        
        <div style={{ margin: '20px 0', color: '#220018' }}>— OR —</div>

        <form onSubmit={handleTextSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Type a task..."
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
          />
          <button type="submit" style={{ 
            padding: '10px 20px', 
            borderRadius: '8px', 
            background: '#03a106', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer' 
          }}>Add</button>
        </form>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'left' }}>
        {tasks.map((t) => (
          <div key={t.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '15px', 
            background: '#f6c8ee',
            borderRadius: '10px',
            marginBottom: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            borderLeft: t.completed ? '5px solid #cb0a8b' : '5px solid #430234'
          }}>
            <input 
              type="checkbox" 
              checked={t.completed} 
              onChange={() => toggleTask(t.id)} 
              style={{ width: '20px', height: '20px',border:'black', cursor: 'pointer' }}
            />
            <div style={{ flex: 1, marginLeft: '15px', textDecoration: t.completed ? 'line-through' : 'none', color: t.completed ? '#c2058d' : '#350228' }}>
              <div style={{ fontWeight: 'bold' }}>{t.task}</div>
              <div style={{ fontSize: '12px' }}>{t.due_date} - {t.priority}</div>
            </div>
            <button onClick={() => deleteTask(t.id)} style={{ color: '#e74c3c', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

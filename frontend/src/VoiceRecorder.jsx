import React, { useState } from 'react';
import axios from 'axios';

const VoiceRecorder = ({ onTaskCreated }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [loading, setLoading] = useState(false);

  const startRecording = async () => {
    // Getting permission to use the mic
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const newRecorder = new MediaRecorder(stream);
    let chunks = [];

    newRecorder.ondataavailable = (e) => chunks.push(e.data);
    
    newRecorder.onstop = async () => {
      setLoading(true);
      const audioBlob = new Blob(chunks, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.webm');

      try {
        // 2. Send the audio file to your FastAPI backend
        const response = await axios.post('http://127.0.0.1:8000/voice-to-task', formData);
        // Response is the JSON string from the LLM
        onTaskCreated(JSON.parse(response.data)); 
      } catch (error) {
        console.error("Error sending audio:", error);
        alert("Failed to process audio. Check backend terminal!");
      }
      setLoading(false);
    };

    newRecorder.start();
    setRecorder(newRecorder);
    setIsRecording(true);
  };

  const stopRecording = () => {
    recorder.stop();
    setIsRecording(false);
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <button 
        onClick={isRecording ? stopRecording : startRecording}
        style={{ padding: '10px 20px', fontSize: '16px', background: isRecording ? 'red' : '#220018', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer'     }}
      >
        {isRecording ? "Stop Recording" : "Start Voice Command"}
      </button>
      {loading && <p style={{ color: "purple" }}>Loading your task...</p>}
    </div>
  );
};

export default VoiceRecorder;

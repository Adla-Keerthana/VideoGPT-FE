import React, { useState } from "react";
import Navbar from "./Navbar";
import "./pagestyles/VideoQA.css";
import { FiUpload, FiSend } from "react-icons/fi";

const VideoQA = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [showIntro, setShowIntro] = useState(true);

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, type: "question" }]);
            setInput("");
            setShowIntro(false); // Hide intro when chat starts
            setTimeout(() => {
                setMessages((prev) => [...prev, { text: "Generating answer...", type: "answer" }]);
            }, 1000);
        }
    };

    const handleFileUpload = (e) => {
        if (e.target.files.length > 0) {
            setShowIntro(false); // Hide intro when file is uploaded
            setMessages([{ text: `File uploaded: ${e.target.files[0].name}`, type: "system" }]);
        }
    };

    return (
        <div className="videoqa-container">
            <Navbar />
            <div className="videoqa-content">
                {showIntro && (
                    <div className="intro-section">
                        <h1>VideoQA: Ask Your Questions</h1>
                        <p>Upload a video and ask any question related to its content. Our AI will analyze and provide answers instantly.</p>
                    </div>
                )}
                <div className={`chat-box ${!showIntro ? 'chat-box-expanded' : ''}`}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.type}`}>{msg.text}</div>
                    ))}
                </div>
                <div className="input-box">
                    <label htmlFor="file-upload" className="file-upload-btn">
                        <FiUpload /> Choose File
                    </label>
                    <input 
                        id="file-upload" 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileUpload}
                        accept="video/*"
                    />
                    <input
                        type="text"
                        placeholder="Ask a question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button onClick={handleSend} className="send-btn">
                        <FiSend />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoQA;
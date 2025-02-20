import React, { useState } from 'react';
import './styles.css';

function App() {
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [activeModule, setActiveModule] = useState(1);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="logo.png" alt="Logo" /> VideoGPT
        </div>
        <div className="module-buttons">
          {[1, 2, 3, 4].map((module) => (
            <button
              key={module}
              className={`module-btn ${activeModule === module ? 'active' : ''}`}
              onClick={() => setActiveModule(module)}
            >
              Module {module}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="content fade-in">
        <h1 className="slide-up">Welcome to VideoGPT</h1>
        <p className="slide-up">
          VideoGPT is an AI-powered tool that helps you analyze, generate, and understand video content through advanced machine learning models. Explore our modules to experience the future of AI-driven video intelligence.
        </p>
        <ul className="feature-list scale-up">
          <li>🔍 Video Content Analysis</li>
          <li>🎥 Automatic Video Summarization</li>
          <li>📝 AI-Powered Video Transcriptions</li>
          <li>📊 Deep Video Insights</li>
        </ul>
      </div>

      {/* Prompt Container */}
      <div className="prompt-container slide-up">
        <div className="prompt-box">
          <textarea
            className="prompt-input"
            placeholder="Ask your question here..."
            value={input}
            onChange={handleInputChange}
          />
          
          {/* Small "Choose File" Button Beside Input */}
          <label htmlFor="file-upload" className="file-upload-btn">
            📁
          </label>
          <input
            type="file"
            id="file-upload"
            className="file-input"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

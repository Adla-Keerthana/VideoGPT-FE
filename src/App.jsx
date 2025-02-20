import React, { useState, useEffect } from 'react';
import './styles.css';

function App() {
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [activeModule, setActiveModule] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    simulateUpload();
  };

  const simulateUpload = () => {
    setIsLoading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const moduleFeatures = {
    1: { title: "Video Analysis", icon: "🎥" },
    2: { title: "Content Generation", icon: "✨" },
    3: { title: "Smart Editing", icon: "✂️" },
    4: { title: "Analytics", icon: "📊" }
  };

  return (
    <div className="app-container">
      <div className="animated-background"></div>
      
      <nav className="navbar">
        <div className="logo reveal-slide-right">
          <div className="logo-icon">AI</div>
          <span>VideoGPT</span>
        </div>
        
        <div className="module-buttons reveal-slide-left">
          {Object.entries(moduleFeatures).map(([key, value]) => (
            <button
              key={key}
              className={`module-btn ${activeModule === parseInt(key) ? 'active' : ''}`}
              onClick={() => setActiveModule(parseInt(key))}
            >
              <span className="module-icon">{value.icon}</span>
              <span className="module-text">{value.title}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="content">
        <div className="hero-section reveal-slide-up">
          <h1 className="glowing-text">Welcome to the Future of Video AI</h1>
          <p className="typing-animation">
            Transform your video content with advanced AI intelligence
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card reveal-scale">
            <div className="feature-icon pulse">🔍</div>
            <h3>Intelligent Analysis</h3>
            <p>Advanced AI algorithms analyze your videos in real-time</p>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>

          <div className="feature-card reveal-scale" style={{animationDelay: '0.2s'}}>
            <div className="feature-icon pulse">🎯</div>
            <h3>Smart Summarization</h3>
            <p>Get instant insights and key moments from your videos</p>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>

          <div className="feature-card reveal-scale" style={{animationDelay: '0.4s'}}>
            <div className="feature-icon pulse">⚡</div>
            <h3>Real-time Processing</h3>
            <p>Lightning-fast video processing with our AI engine</p>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
        </div>

        <div className="stats-container reveal-slide-up">
          <div className="stat-item">
            <span className="counter">99%</span>
            <span>Accuracy</span>
          </div>
          <div className="stat-item">
            <span className="counter">10x</span>
            <span>Faster</span>
          </div>
          <div className="stat-item">
            <span className="counter">24/7</span>
            <span>Available</span>
          </div>
        </div>
      </div>

      <div className="prompt-container floating">
        <div className="prompt-box">
          <textarea
            className="prompt-input"
            placeholder="Enter your video processing instructions..."
            value={input}
            onChange={handleInputChange}
          />
          
          <div className="action-buttons">
            <label htmlFor="file-upload" className="file-upload-btn">
              <span className="btn-icon">📁</span>
              <span className="btn-text">Choose File</span>
            </label>
            <input
              type="file"
              id="file-upload"
              className="file-input"
              onChange={handleFileChange}
              accept="video/*"
            />
            
            <button className="process-btn">
              <span className="btn-icon">▶️</span>
              <span className="btn-text">Process</span>
            </button>
          </div>
        </div>
        
        {file && (
          <div className="upload-progress">
            <div className="progress-track">
              <div 
                className="progress-bar-fill"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <span className="progress-text">{uploadProgress}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
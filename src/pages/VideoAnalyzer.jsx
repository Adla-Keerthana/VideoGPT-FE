import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import "./pagestyles/VideoAnalyzer.css";

const VideoAnalyzer = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [summary, setSummary] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setVideoFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'video/*': [] },
    maxFiles: 1
  });

  const handleSummarize = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setSummary("Sample analysis: This video contains engaging content with multiple scenes and transitions. Key moments identified at 0:30, 1:45, and 2:15. Overall mood: energetic and informative.");
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📽️</span>
          <span className="logo-text">VideoGPT</span>
        </Link>
        <div className="nav-links">
          <Link to="/analyzer" className="nav-link active">Video Analyzer</Link>
          <Link to="/extractor" className="nav-link">Video Extractor</Link>
          <Link to="/qa" className="nav-link">Video Q&A</Link>
        </div>
      </nav>

      <main className="main-content">
        <div className="content-wrapper">
          <div className="left-panel">
            <h1 className="panel-title">Video Analysis</h1>
            <div 
              className={`upload-container ${isDragActive ? 'dragging' : ''} ${videoFile ? 'has-video' : ''}`} 
              {...getRootProps()}
            >
              {!videoFile ? (
                <div className="upload-content">
                  <div className="upload-icon-wrapper">
                    <span className="upload-icon">📤</span>
                  </div>
                  <h3 className="upload-title">
                    {isDragActive ? 'Drop your video here!' : 'Upload Your Video'}
                  </h3>
                  <p className="upload-description">
                    Drag & drop your video file here or click to browse
                  </p>
                  <button className="upload-button">
                    Choose File
                    <input {...getInputProps()} />
                  </button>
                </div>
              ) : (
                <div className="video-preview-container">
                  <video 
                    src={URL.createObjectURL(videoFile)} 
                    controls 
                    className="video-player"
                  />
                  <button 
                    className={`analyze-button ${isAnalyzing ? 'analyzing' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSummarize();
                    }}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <span className="loader"></span>
                        Analyzing Video...
                      </>
                    ) : 'Start Analysis'}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="right-panel">
            <h2 className="panel-title">Analysis Results</h2>
            <div className="results-container">
              {!videoFile && (
                <div className="placeholder-message">
                  <span className="placeholder-icon">🎥</span>
                  <p>Upload a video to see the analysis results</p>
                </div>
              )}
              {videoFile && !summary && !isAnalyzing && (
                <div className="placeholder-message">
                  <span className="placeholder-icon">⚡</span>
                  <p>Click "Start Analysis" to begin</p>
                </div>
              )}
              {isAnalyzing && (
                <div className="analyzing-message">
                  <div className="analysis-loader"></div>
                  <p>Analyzing your video...</p>
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                </div>
              )}
              {summary && (
                <div className="analysis-results">
                  <div className="result-card">
                    <h3>Video Summary</h3>
                    <p>{summary}</p>
                  </div>
                  <div className="insights-grid">
                    <div className="insight-card">
                      <span className="insight-icon">⏱️</span>
                      <h4>Duration</h4>
                      <p>3:45 minutes</p>
                    </div>
                    <div className="insight-card">
                      <span className="insight-icon">🎯</span>
                      <h4>Key Moments</h4>
                      <p>3 identified</p>
                    </div>
                    <div className="insight-card">
                      <span className="insight-icon">📊</span>
                      <h4>Quality</h4>
                      <p>1080p HD</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoAnalyzer;
import { useState } from "react";
import { Download, Clock, Upload, Film, X } from "lucide-react";
import Navbar from "./Navbar";
import "./pagestyles/VideoExtractor.css";

const VideoExtractor = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [segments, setSegments] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    }
  };

  const removeVideo = () => {
    setVideoFile(null);
    setSegments([]);
  };

  return (
    <div className="video-extractor-container">
      <Navbar />
      <div className="content-wrapper" style={{ marginTop: '60px' }}>
        <div className="main-section">
          {/* Upload Section */}
          <div
            className={`dropzone-area ${isDragging ? "dragging" : ""}`}
            onDragEnter={handleDragEnter}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{ backgroundColor: '#2a2a2a' }}
          >
            {videoFile ? (
              <div className="video-preview">
                <video src={URL.createObjectURL(videoFile)} controls className="uploaded-video" />
                <button onClick={removeVideo} className="remove-btn">
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="upload-placeholder">
                <Upload className="upload-icon" />
                <p className="upload-text">Drag & Drop Video Here</p>
                <span className="divider">or</span>
                <label className="upload-button">
                  Choose File
                  <input type="file" accept="video/*" onChange={handleFileSelect} hidden />
                </label>
              </div>
            )}
          </div>

          {/* Extracted Clips Section */}
          <div className="clips-section">
            <div className="clips-header">
              <Film className="clips-icon" />
              <span>Extracted Clips</span>
            </div>
            {segments.length > 0 ? (
              <div className="clips-grid">
                {segments.map((segment, index) => (
                  <div key={index} className="clip-item">
                    <video src={segment.url} controls className="clip-video" />
                    <div className="clip-footer">
                      <button className="timeframe-btn">
                        <Clock size={16} /> Timeframe
                      </button>
                      <button className="download-btn">
                        <Download size={16} /> Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-clips">No clips extracted yet</p>
            )}
          </div>
        </div>

        {/* Prompt Section */}
        <div className="prompt-container">
          <textarea placeholder="Describe the clip you want to extract..." />
          <button className="extract-btn">Extract Clip</button>
        </div>
      </div>
    </div>
  );
};

export default VideoExtractor;

import { useState } from "react";
import { Download, Clock, Upload, Film, X } from "lucide-react";
import Navbar from "./Navbar";
import "./pagestyles/VideoExtractor.css";

const VideoExtractor = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [segments, setSegments] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleExtractClip = async () => {
    if (!videoFile || !prompt.trim()) {
      alert("Please upload a video and enter a prompt!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("query", prompt);

    try {
      const response = await fetch("http://localhost:8000/extract_clips", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to extract clips.");
      }

      // Assume the backend sends a downloadable video file
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setSegments([{ url }]);
    } catch (error) {
      console.error("Error extracting clips:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="video-extractor-container">
      <Navbar />
      <div className="content-wrapper" style={{ marginTop: "60px" }}>
        <div className="main-section">
          {/* Upload Section */}
          <div
            className={`dropzone-area ${isDragging ? "dragging" : ""}`}
            onDragEnter={handleDragEnter}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{ backgroundColor: "#2a2a2a" }}
          >
            {videoFile ? (
              <div className="video-preview">
                <video
                  src={URL.createObjectURL(videoFile)}
                  controls
                  className="uploaded-video"
                />
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
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    hidden
                  />
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
            {loading ? (
              <p className="loading-text">Extracting clips...</p>
            ) : segments.length > 0 ? (
              <div className="clips-grid">
                {segments.map((segment, index) => (
                  <div key={index} className="clip-item">
                    <video src={segment.url} controls className="clip-video" />
                    <div className="clip-footer">
                      <button className="timeframe-btn">
                        <Clock size={16} /> Timeframe
                      </button>
                      <a
                        href={segment.url}
                        download={`extracted_clip_${index}.mp4`}
                        className="download-btn"
                      >
                        <Download size={16} /> Download
                      </a>
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
          <textarea
            placeholder="Describe the clip you want to extract..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="extract-btn"
            onClick={handleExtractClip}
            disabled={loading}
          >
            {loading ? "Extracting..." : "Extract Clip"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoExtractor;

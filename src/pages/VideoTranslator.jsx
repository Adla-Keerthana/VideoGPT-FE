import { useState } from "react";
import { Download, Upload, Film, X, Globe } from "lucide-react";
import Navbar from "./Navbar";
import "./pagestyles/VideoTranslator.css";

const VideoTranslator = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [translatedVideos, setTranslatedVideos] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("Spanish");
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
    setTranslatedVideos([]);
  };

  const handleTranslateVideo = async () => {
    if (!videoFile || !targetLanguage) {
      alert("Please upload a video and select a target language!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("target_language", targetLanguage);

    try {
      const response = await fetch("http://localhost:8000/translate_video", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to translate video.");
      }

      // Assume the backend sends a downloadable video file
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setTranslatedVideos([{ url, language: targetLanguage }]);
    } catch (error) {
      console.error("Error translating video:", error);
    } finally {
      setLoading(false);
    }
  };

  // Common language options
  const languageOptions = [
    "Spanish", "French", "German", "Italian", "Portuguese", 
    "Russian", "Japanese", "Chinese", "Korean", "Arabic", 
    "Hindi", "Dutch", "Swedish", "Greek", "Turkish","Telugu",
    "Marathi","Tamil","Urdu","Gujarati","Kannada","Punjabi"
  ];

  return (
    <div className="video-translator-container">
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

          {/* Translated Videos Section */}
          <div className="translated-section">
            <div className="clips-header">
              <Globe className="clips-icon" />
              <span>Translated Videos</span>
            </div>
            {loading ? (
              <p className="loading-text">Translating video...</p>
            ) : translatedVideos.length > 0 ? (
              <div className="clips-grid">
                {translatedVideos.map((video, index) => (
                  <div key={index} className="clip-item">
                    <video src={video.url} controls className="clip-video" />
                    <div className="clip-footer">
                      <div className="language-tag">
                        <Globe size={16} /> {video.language}
                      </div>
                      <a
                        href={video.url}
                        download={`translated_to_${video.language}.mp4`}
                        className="download-btn"
                      >
                        <Download size={16} /> Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-clips">No translated videos yet</p>
            )}
          </div>
        </div>

        {/* Translation Options Section */}
        <div className="translation-container">
          <div className="language-selection">
            <label htmlFor="language-select">Translate to:</label>
            <select 
              id="language-select"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              {languageOptions.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <button
            className="translate-btn"
            onClick={handleTranslateVideo}
            disabled={loading}
          >
            {loading ? "Translating..." : "Translate Video"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTranslator;
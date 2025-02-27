import { useState } from "react";
import { Download, Upload, Music, X, Headphones, FileAudio } from "lucide-react";
import Navbar from "./Navbar";
import "./pagestyles/AudioExtraction.css";

const AudioExtraction = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [audioFiles, setAudioFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [audioFormat, setAudioFormat] = useState("mp3");
  const [loading, setLoading] = useState(false);
  const [audioQuality, setAudioQuality] = useState("high");

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
    setAudioFiles([]);
  };

  const handleExtractAudio = async () => {
    if (!videoFile) {
      alert("Please upload a video first!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("format", audioFormat);
    formData.append("quality", audioQuality);

    try {
      const response = await fetch("http://localhost:8000/extract_audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to extract audio.");
      }

      // Assume the backend sends a downloadable audio file
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Use the original video filename but with audio extension
      const originalName = videoFile.name.split('.')[0];
      const fileName = `${originalName}.${audioFormat}`;

      setAudioFiles([{ 
        url, 
        format: audioFormat, 
        quality: audioQuality,
        name: fileName
      }]);
    } catch (error) {
      console.error("Error extracting audio:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="audio-extraction-container">
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
                <div className="video-info">
                  <p>{videoFile.name}</p>
                  <p>{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
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

          {/* Extracted Audio Section */}
          <div className="audio-section">
            <div className="audio-header">
              <Headphones className="audio-icon" />
              <span>Extracted Audio</span>
            </div>
            {loading ? (
              <p className="loading-text">Extracting audio...</p>
            ) : audioFiles.length > 0 ? (
              <div className="audio-grid">
                {audioFiles.map((audio, index) => (
                  <div key={index} className="audio-item">
                    <div className="audio-preview">
                      <FileAudio size={48} className="audio-file-icon" />
                      <div className="audio-details">
                        <span className="audio-name">{audio.name}</span>
                        <span className="audio-format">Format: {audio.format.toUpperCase()}</span>
                        <span className="audio-quality">Quality: {audio.quality}</span>
                      </div>
                    </div>
                    <audio src={audio.url} controls className="audio-player" />
                    <div className="audio-footer">
                      <a
                        href={audio.url}
                        download={audio.name}
                        className="download-btn"
                      >
                        <Download size={16} /> Download Audio
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-audio">
                <Music size={48} className="no-audio-icon" />
                <p>No audio extracted yet</p>
                <p className="no-audio-hint">Upload a video and configure extraction settings</p>
              </div>
            )}
          </div>
        </div>

        {/* Audio Options Section */}
        <div className="audio-options-container">
          <div className="options-grid">
            <div className="option-group">
              <label htmlFor="format-select">Audio Format:</label>
              <select 
                id="format-select"
                value={audioFormat}
                onChange={(e) => setAudioFormat(e.target.value)}
              >
                <option value="mp3">MP3</option>
                <option value="wav">WAV</option>
                <option value="aac">AAC</option>
                <option value="ogg">OGG</option>
                <option value="flac">FLAC</option>
              </select>
            </div>
            <div className="option-group">
              <label htmlFor="quality-select">Audio Quality:</label>
              <select 
                id="quality-select"
                value={audioQuality}
                onChange={(e) => setAudioQuality(e.target.value)}
              >
                <option value="low">Low (128 kbps)</option>
                <option value="medium">Medium (192 kbps)</option>
                <option value="high">High (320 kbps)</option>
                <option value="lossless">Lossless</option>
              </select>
            </div>
          </div>
          <button
            className="extract-btn"
            onClick={handleExtractAudio}
            disabled={loading || !videoFile}
          >
            {loading ? "Extracting..." : "Extract Audio"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioExtraction;
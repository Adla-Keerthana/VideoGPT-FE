import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Navbar from "./Navbar"; // Import Navbar component
import "./pagestyles/VideoAnalyzer.css";

const VideoAnalyzer = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [summary, setSummary] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setVideoFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
    maxFiles: 1,
  });

  const handleSummarize = async () => {
    if (!videoFile) return;

    setIsAnalyzing(true);
    setSummary("");

    const formData = new FormData();
    formData.append("file", videoFile);

    try {
      const response = await fetch("http://localhost:8000/summarize-video/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze the video");
      }

      const data = await response.json();
      setSummary(data.summary || "No summary provided.");
    } catch (error) {
      setSummary("Error analyzing video. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <div className="content-wrapper">
          <div className="left-panel">
            <h1 className="panel-title">Video Analysis</h1>
            <div
              className={`upload-container ${isDragActive ? "dragging" : ""} ${
                videoFile ? "has-video" : ""
              }`}
              {...getRootProps()}
            >
              {!videoFile ? (
                <div className="upload-content">
                  <div className="upload-icon-wrapper">
                    <span className="upload-icon">📤</span>
                  </div>
                  <h3 className="upload-title">
                    {isDragActive
                      ? "Drop your video here!"
                      : "Upload Your Video"}
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
                    className={`analyze-button ${
                      isAnalyzing ? "analyzing" : ""
                    }`}
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
                    ) : (
                      "Start Analysis"
                    )}
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

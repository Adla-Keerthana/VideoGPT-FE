import { useState } from 'react';

const VideoExtractor = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [segments, setSegments] = useState([]);

  return (
    <div className="min-h-screen extractor-container">
      {/* Video Workspace */}
      <div className="extractor-content">
        <div className="video-workspace">
          {/* Video Preview */}
          <div className="video-preview">
            {videoFile ? (
              <video src={URL.createObjectURL(videoFile)} controls className="video-player" />
            ) : (
              <div className="upload-placeholder">
                <div className="upload-icon">🎬</div>
                <p>Upload a video to start extracting clips</p>
                <label className="upload-button">
                  Choose File
                  <input type="file" onChange={(e) => setVideoFile(e.target.files[0])} />
                </label>
              </div>
            )}
          </div>

          {/* Timeline Editor */}
          <div className="timeline-editor">
            <h3 className="timeline-title">Timeline</h3>
            <div className="timeline-track"></div>
            <div className="timeline-controls">
              <button className="control-btn"><span className="btn-icon">⏮</span></button>
              <button className="control-btn"><span className="btn-icon">⏯</span></button>
              <button className="control-btn"><span className="btn-icon">⏭</span></button>
            </div>
          </div>
        </div>

        {/* Extraction Controls */}
        <div className="extraction-controls">
          <div className="segment-list">
            <h3>Segments</h3>
            {segments.length > 0 ? (
              segments.map((segment, index) => (
                <div key={index} className="segment-item">
                  <span className="segment-text">Segment {index + 1}</span>
                </div>
              ))
            ) : (
              <p className="no-segments">No segments extracted yet.</p>
            )}
          </div>
        </div>

        {/* Prompt Bar */}
        <div className="prompt-container">
          <textarea className="prompt-input" placeholder="Describe the clip you want to extract..."></textarea>
          <div className="prompt-actions">
            <button className="extract-btn">Extract Clip</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoExtractor;

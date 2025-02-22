import { useState } from 'react';

const VideoQA = () => {
  const [messages, setMessages] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  return (
    <div className="min-h-screen">
      <div className="qa-content">
        <div className="qa-workspace">
          <div className="video-section">
            {videoFile ? (
              <video src={URL.createObjectURL(videoFile)} controls />
            ) : (
              <div className="upload-placeholder">
                <div className="upload-icon">🎥</div>
                <p>Upload a video to start Q&A</p>
              </div>
            )}
          </div>

          <div className="chat-section">
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.type}`}>
                  {message.content}
                </div>
              ))}
            </div>

            <div className="chat-input">
              <textarea 
                placeholder="Ask anything about the video..."
                className="message-input"
              />
              <button className="send-button">
                <span className="btn-icon">↗️</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoQA;

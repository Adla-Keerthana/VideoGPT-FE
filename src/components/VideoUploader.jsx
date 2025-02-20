import React from "react";

const VideoUploader = ({ onUpload }) => {
  return (
    <div>
      <label htmlFor="video-upload" className="upload-btn">
        Choose Video
      </label>
      <input
        type="file"
        id="video-upload"
        style={{ display: "none" }}
        accept="video/*"
        onChange={onUpload}
      />
    </div>
  );
};

export default VideoUploader;

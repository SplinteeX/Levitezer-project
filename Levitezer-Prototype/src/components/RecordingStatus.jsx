import React from "react";

// This component mimics the status in ControlPanel, but is always visible in CameraView
const RecordingStatus = ({ time = "00:00", quality = "1080p", value = 5 }) => {
  return (
    <span className="status-text">
      <span className="recording-dot" style={{ marginRight: 8 }}>●</span>
      Recording | Time: {time} | Quality: {quality} | {value}
    </span>
  );
};

export default RecordingStatus;

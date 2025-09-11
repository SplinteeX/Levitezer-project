import { useState } from "react";
import "./ControlPanel.css";

const ControlPanel = ({ trackedDrone, setTrackedDrone, droneList = [] }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleTrackingClick = () => {
    if (trackedDrone) {
      setTrackedDrone(null); // Stop tracking
    } else {
      // Start tracking a random drone
      if (droneList.length > 0) {
        const randomIndex = Math.floor(Math.random() * droneList.length);
        setTrackedDrone(droneList[randomIndex]);
      }
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="control-panel">
      <div className="control-buttons">
        <button
          className={`control-btn recording-btn ${isRecording ? "active" : ""}`}
          onClick={toggleRecording}
        >
          <span className="btn-icon">●</span>
          <span className="btn-text">
            {isRecording ? "Stop Recording" : "Start Recording"}
          </span>
        </button>

        <button
          className={`control-btn tracking-btn ${trackedDrone ? "active" : ""}`}
          onClick={handleTrackingClick}
        >
          <span className="btn-icon">📍</span>
          <span className="btn-text">
            {trackedDrone ? "Stop Tracking" : "Start Tracking"}
          </span>
        </button>

        <button
          className={`control-btn fullscreen-btn ${
            isFullscreen ? "active" : ""
          }`}
          onClick={toggleFullscreen}
        >
          <span className="btn-icon">{isFullscreen ? "⬜" : "⛶"}</span>
          <span className="btn-text">
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;

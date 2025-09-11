import { useState, useRef, useEffect } from "react";
import "./ControlPanel.css";

const ControlPanel = ({
  trackedDrone,
  setTrackedDrone,
  droneList = [],
  isRecording,
  setIsRecording,
  recordedSeconds,
  setRecordedSeconds,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const timerRef = useRef(null);

  // Start/stop timer when recording toggles
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordedSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setRecordedSeconds(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording, setRecordedSeconds]);

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

  // Format seconds as mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div
      className="control-panel"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
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
      {/* Recording status removed from here, now handled in CameraView */}
    </div>
  );
};

export default ControlPanel;

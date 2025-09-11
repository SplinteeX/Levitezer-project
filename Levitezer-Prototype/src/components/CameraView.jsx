import "./CameraView.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import RecordingStatus from "./RecordingStatus";

// Helper to format time
function formatTime(secs) {
  const m = Math.floor(secs / 60)
    .toString()
    .padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const CameraView = ({
  trackedDrone,
  pinInfo,
  droneStats,
  setTrackedDrone,
  isRecording,
  recordedSeconds,
}) => {
  const [isMinimized, setIsMinimized] = useState(true);
  // Drone images from public folder
  const droneImages = {
    "Drone 1": "/Drone-1.png",
    "Drone 2": "/Drone-2.png",
    "Drone 3": "/Drone-3.png",
    "Drone 4": "/Drone-4.png",
    "4 drones": "/4-drones.png",
  };

  const getCurrentImage = () => {
    if (trackedDrone && droneImages[trackedDrone]) {
      return droneImages[trackedDrone];
    }
    return "4 drones" in droneImages ? droneImages["4 drones"] : "";
  };

  return (
    <div className="camera-view">
      <div
        className="camera-header"
        style={{ position: "relative", minHeight: 48 }}
      >
        {/* Tracking status left-aligned */}
        <div
          className="camera-status"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "0.5rem 1.2rem",
            borderRadius: 20,
            background: "rgba(44,62,80,0.8)",
            backdropFilter: "blur(10px)",
            position: "absolute",
            left: "1.5rem",
            top: 0,
            zIndex: 2,
          }}
        >
          <span
            style={{
              backgroundColor: trackedDrone ? "#27ae60" : "#e74c3c",
              marginRight: 8,
            }}
            className="status-indicator"
          ></span>
          <span className="status-text">
            {trackedDrone ? `Tracking: ${trackedDrone}` : "Tracking Disabled"}
          </span>
        </div>
        {/* Recording status centered */}
        {isRecording && (
          <div
            className="camera-status"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.5rem 1.2rem",
              borderRadius: 20,
              background: "rgba(44,62,80,0.8)",
              backdropFilter: "blur(10px)",
              position: "absolute",
              left: "50%",
              top: 0,
              transform: "translateX(-50%)",
              zIndex: 2,
            }}
          >
            <RecordingStatus
              time={formatTime(recordedSeconds)}
              quality="1080p"
              value={"60 fps"}
            />
          </div>
        )}
      </div>
      <div className="camera-display">
        <img
          src={getCurrentImage()}
          alt={
            trackedDrone ? `${trackedDrone} Camera View` : "Tracking Disabled"
          }
          className="camera-feed"
        />

        <div className="camera-overlay">
          <AnimatePresence>
            {pinInfo && (
              <motion.div
                className={`pinned-info-overlay ${
                  isMinimized ? "minimized" : ""
                }`}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 3 }}
                transition={{ duration: 0.09, ease: "linear" }}
              >
                {isMinimized ? (
                  <div className="pinned-minimized">
                    <h4>Control Panel</h4>
                    <button
                      className="minimize-btn minimize-btn-top-right"
                      onClick={() => setIsMinimized(false)}
                      title="Expand menu"
                    >
                      ↑
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      className="minimize-btn minimize-btn-top-right"
                      onClick={() => setIsMinimized(true)}
                      title="Minimize menu"
                    >
                      ↓
                    </button>
                    <div className="pinned-section">
                      <h4>Detected Objects</h4>
                      <ul className="pinned-drone-list">
                        {Object.keys(droneStats).map((drone) => (
                          <li
                            key={drone}
                            className={
                              trackedDrone === drone ? "pinned-tracked" : ""
                            }
                            style={{
                              cursor: "pointer",
                              border: "2px solid #27ae60",
                            }}
                            onClick={() =>
                              setTrackedDrone && setTrackedDrone(drone)
                            }
                          >
                            {drone}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pinned-section">
                      <h4>Target Information</h4>
                      <div className="pinned-target-info">
                        <div>
                          Target: <b>{trackedDrone || "None"}</b>
                        </div>
                        {trackedDrone && (
                          <>
                            <div>Speed: {droneStats[trackedDrone].speed}</div>
                            <div>
                              Distance: {droneStats[trackedDrone].distance}
                            </div>
                            <div>
                              Altitude: {droneStats[trackedDrone].altitude}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CameraView;

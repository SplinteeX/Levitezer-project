import './CameraView.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const CameraView = ({ trackedDrone, pinInfo, droneStats, setTrackedDrone }) => {
  const [isMinimized, setIsMinimized] = useState(true)
  // Drone images from public folder
  const droneImages = {
    'Drone 1': '/Drone-1.png',
    'Drone 2': '/Drone-2.png',
    'Drone 3': '/Drone-3.png',
    'Drone 4': '/Drone-4.png',
    '4 drones': '/4-drones.png'
  }

  const getCurrentImage = () => {
    if (trackedDrone && droneImages[trackedDrone]) {
      return droneImages[trackedDrone]
    }
    return '4 drones' in droneImages ? droneImages['4 drones'] : ''
  }

  return (
    <div className="camera-view">
      <div className="camera-header">
        <div className="camera-status">
          <span style={{ backgroundColor: trackedDrone ? '#27ae60' : '#e74c3c' }} className="status-indicator"></span>
          <span className="status-text">
            {trackedDrone ? `Tracking: ${trackedDrone}` : 'Tracking Disabled'}
          </span>
        </div>
      </div>

      <div className="camera-display">
        <img
          src={getCurrentImage()}
          alt={trackedDrone ? `${trackedDrone} Camera View` : 'Tracking Disabled'}
          className="camera-feed"
        />

        <div className="camera-overlay">
          <AnimatePresence>
            {pinInfo && (
              <motion.div
                className={`pinned-info-overlay ${isMinimized ? 'minimized' : ''}`}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 3 }}
                transition={{ duration: 0.09, ease: 'linear' }}
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
                            className={trackedDrone === drone ? 'pinned-tracked' : ''}
                            style={{ cursor: 'pointer', border: '2px solid #27ae60'}}
                            onClick={() => setTrackedDrone && setTrackedDrone(drone)}
                          >
                            {drone}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pinned-section">
                      <h4>Target Information</h4>
                      <div className="pinned-target-info">
                        <div>Target: <b>{trackedDrone || 'None'}</b></div>
                        {trackedDrone && (
                          <>
                            <div>Speed: {droneStats[trackedDrone].speed}</div>
                            <div>Distance: {droneStats[trackedDrone].distance}</div>
                            <div>Altitude: {droneStats[trackedDrone].altitude}</div>
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
  )
}

export default CameraView

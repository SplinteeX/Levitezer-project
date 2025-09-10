import { useState, useEffect } from 'react'
import './Navbar.css'
import levitezerLogo from '/Levitezer-logo.png'

const Navbar = ({ trackedDrone, setTrackedDrone }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [droneStats, setDroneStats] = useState({
    'Drone 1': { speed: '26km/h', distance: '121m', altitude: '45m' },
    'Drone 2': { speed: '18km/h', distance: '89m', altitude: '32m' },
    'Drone 3': { speed: '31km/h', distance: '156m', altitude: '67m' },
    'Drone 4': { speed: '22km/h', distance: '203m', altitude: '28m' }
  })

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const handleTracking = (droneName) => {
    if (trackedDrone === droneName) {
      // If clicking the same drone, stop tracking
      setTrackedDrone(null)
    } else {
      // Start tracking the selected drone
      setTrackedDrone(droneName)
    }
  }

  // Add/remove class to body when sidebar opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('sidebar-open')
    } else {
      document.body.classList.remove('sidebar-open')
    }

    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove('sidebar-open')
    }
  }, [isOpen])

  return (
    <>
      {/* Hamburger Button - Fixed Position */}
      <div className="hamburger-container">
        <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        </div>
      </div>

      {/* Sidebar */}
      <nav className={`sidebar ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <img src={levitezerLogo} alt="Levitezer Logo" className="sidebar-logo" />
          </div>
          <button className="close-btn" onClick={closeMenu}>
            <span>&times;</span>
          </button>
        </div>
        
        <div className="sidebar-content">
          <div className="detected-objects-section">
            <h3 className="section-title">Detected Objects</h3>
            <div className="drone-list">
              {['Drone 1', 'Drone 2', 'Drone 3', 'Drone 4'].map((droneName) => (
                <div key={droneName} className="drone-item">
                  <div className="drone-info">
                    <span className="drone-indicator"></span>
                    <span className="drone-name">{droneName}</span>
                  </div>
                  <button 
                    className={`tracking-btn ${trackedDrone === droneName ? 'tracking' : ''}`}
                    onClick={() => handleTracking(droneName)}
                  >
                    {trackedDrone === droneName ? 'Tracking' : 'Start Tracking'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="target-information-section">
            <h3 className="section-title">Target Information</h3>
            <div className="target-info-card">
              <div className="target-selection">
                <span className="target-label">Target</span>
                <div className="target-line"></div>
                <span className="target-value">
                  {trackedDrone || 'None'}
                </span>
              </div>
              {trackedDrone && (
                <div className="target-stats">
                  <div className="stat-row">
                    <span className="stat-label">Speed:</span>
                    <span className="stat-value">{droneStats[trackedDrone].speed}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Distance:</span>
                    <span className="stat-value">{droneStats[trackedDrone].distance}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Altitude:</span>
                    <span className="stat-value">{droneStats[trackedDrone].altitude}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar

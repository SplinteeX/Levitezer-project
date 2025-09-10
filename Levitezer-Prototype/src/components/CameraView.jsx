import './CameraView.css'

const CameraView = ({ trackedDrone }) => {
  // Drone images from public folder
  const droneImages = {
    'Drone 1': '/Drone-1.png',
    'Drone 2': '/Drone-2.png',
    'Drone 3': '/Drone-3.png',
    'Drone 4': '/Drone-4.png'
  }

  const getCurrentImage = () => {
    if (trackedDrone && droneImages[trackedDrone]) {
      return droneImages[trackedDrone]
    }
    return 'https://via.placeholder.com/800x600/2c3e50/ffffff?text=No+Target+Selected'
  }

  return (
    <div className="camera-view">
      <div className="camera-header">
        <div className="camera-status">
          <span className="status-indicator"></span>
          <span className="status-text">
            {trackedDrone ? `Tracking: ${trackedDrone}` : 'No Target Selected'}
          </span>
        </div>
      </div>
      
      <div className="camera-display">
        <img 
          src={getCurrentImage()} 
          alt={trackedDrone ? `${trackedDrone} Camera View` : 'No Target Selected'}
          className="camera-feed"
        />
        
        <div className="camera-overlay">
        </div>
      </div>
    </div>
  )
}

export default CameraView

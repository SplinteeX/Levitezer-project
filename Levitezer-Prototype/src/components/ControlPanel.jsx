import { useState } from 'react'
import './ControlPanel.css'

const ControlPanel = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [isTracking, setIsTracking] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  const toggleTracking = () => {
    setIsTracking(!isTracking)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="control-panel">
      <div className="control-buttons">
        <button 
          className={`control-btn recording-btn ${isRecording ? 'active' : ''}`}
          onClick={toggleRecording}
        >
          <span className="btn-icon">●</span>
          <span className="btn-text">
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </span>
        </button>

        <button 
          className={`control-btn tracking-btn ${isTracking ? 'active' : ''}`}
          onClick={toggleTracking}
        >
          <span className="btn-icon">📍</span>
          <span className="btn-text">
            {isTracking ? 'Stop Tracking' : 'Start Tracking'}
          </span>
        </button>

        <button 
          className={`control-btn fullscreen-btn ${isFullscreen ? 'active' : ''}`}
          onClick={toggleFullscreen}
        >
          <span className="btn-icon">
            {isFullscreen ? '⬜' : '⛶'}
          </span>
          <span className="btn-text">
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </span>
        </button>
      </div>
    </div>
  )
}

export default ControlPanel

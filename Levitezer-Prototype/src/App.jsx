import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import ControlPanel from './components/ControlPanel'
import CameraView from './components/CameraView'
import Joystick from './components/Joystick'

function App() {
  const [count, setCount] = useState(0)
  const [trackedDrone, setTrackedDrone] = useState('Drone 1')

  return (
    <div className="app-content">
      <Navbar trackedDrone={trackedDrone} setTrackedDrone={setTrackedDrone} />
      <CameraView trackedDrone={trackedDrone} />
      <ControlPanel />
      <Joystick />
    </div>
  )
}

export default App

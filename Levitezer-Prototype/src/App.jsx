import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ControlPanel from "./components/ControlPanel";
import CameraView from "./components/CameraView";
import Joystick from "./components/Joystick";

function App() {
  const [count, setCount] = useState(0);
  const [trackedDrone, setTrackedDrone] = useState("Drone 1");
  const [pinInfo, setPinInfo] = useState(true);
  const [showControlPanel, setShowControlPanel] = useState(true);

  // Example drone stats (should match Navbar)
  const droneStats = {
    "Drone 1": { speed: "26km/h", distance: "121m", altitude: "45m" },
    "Drone 2": { speed: "18km/h", distance: "89m", altitude: "32m" },
    "Drone 3": { speed: "31km/h", distance: "156m", altitude: "67m" },
    "Drone 4": { speed: "22km/h", distance: "203m", altitude: "28m" },
  };

  return (
    <div className="app-content">
      <Navbar
        trackedDrone={trackedDrone}
        setTrackedDrone={setTrackedDrone}
        onPinInfo={() => setPinInfo((p) => !p)}
        pinned={pinInfo}
        onToggleControlPanel={() => setShowControlPanel((s) => !s)}
        showControlPanel={showControlPanel}
      />
      <CameraView
        trackedDrone={trackedDrone}
        pinInfo={pinInfo}
        droneStats={droneStats}
        setTrackedDrone={setTrackedDrone}
      />
      {showControlPanel && (
        <ControlPanel
          trackedDrone={trackedDrone}
          setTrackedDrone={setTrackedDrone}
          droneList={Object.keys(droneStats)}
        />
      )}
      <Joystick />
    </div>
  );
}

export default App;

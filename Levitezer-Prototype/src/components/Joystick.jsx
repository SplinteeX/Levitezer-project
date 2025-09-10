import { useState, useRef, useEffect } from 'react'
import './Joystick.css'

const Joystick = ({ onMove }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [scale, setScale] = useState(0.7)
  const joystickRef = useRef(null)

  const maxDistance = 60
  const minScale = 0.7
  const maxScale = 1.5

  const updatePosition = (x, y) => {
    const distance = Math.sqrt(x * x + y * y)
    if (distance <= maxDistance) {
      setPosition({ x, y })
    } else {
      const angle = Math.atan2(y, x)
      setPosition({
        x: Math.cos(angle) * maxDistance,
        y: Math.sin(angle) * maxDistance
      })
    }
  }

  // --- Mouse ---
  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !joystickRef.current) return
    const rect = joystickRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    updatePosition(e.clientX - centerX, e.clientY - centerY)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setPosition({ x: 0, y: 0 })
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  // --- Touch ---
  const handleTouchStart = () => {
    setIsDragging(true)
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
  }

  const handleTouchMove = (e) => {
    if (!isDragging || !joystickRef.current) return
    e.preventDefault()
    const touch = e.touches[0]
    const rect = joystickRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    updatePosition(touch.clientX - centerX, touch.clientY - centerY)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setPosition({ x: 0, y: 0 })
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
  }

  // --- Scale wheel ---
  const handleWheel = (e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setScale(prevScale => Math.max(minScale, Math.min(maxScale, prevScale + delta)))
  }

  // Normalized values (-1 to 1)
  const joystickX = position.x / maxDistance
  const joystickY = -position.y / maxDistance

  useEffect(() => {
    if (onMove) {
      onMove({ x: joystickX, y: joystickY })
    }
  }, [position])

  return (
    <div className="joystick-container">
      <div 
        className="joystick"
        ref={joystickRef}
        style={{ transform: `scale(${scale})` }}
        onWheel={handleWheel}
      >
        {/* Crosshair */}
        <div className="joystick-crosshair">
          <div className="crosshair-line horizontal"></div>
          <div className="crosshair-line vertical"></div>
        </div>

        {/* Knob */}
        <div 
          className="joystick-knob"
          style={{
            "--x": `${position.x}px`,
            "--y": `${position.y}px`
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />

        {/* Scale indicator */}
        <div className="scale-indicator">
          {scale.toFixed(1)}x
        </div>
      </div>
    </div>
  )
}

export default Joystick

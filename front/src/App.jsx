import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Reserva from './pages/Reserva'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Reserva/>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SideNav from './Components/navBar/navBar'
import TesterFetch from './Components/TesterFetch'
import GeminiTextInput from './Components/GeminiTextInput'
import { Outlet, useLocation } from 'react-router-dom'

function App() {
  const location = useLocation();
  const [count, setCount] = useState(0)

  return (
    <>
    <SideNav />
    <GeminiTextInput />
    <Outlet/>
   </>
  )
}

export default App

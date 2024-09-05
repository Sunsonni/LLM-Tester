import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SideNav from './Components/navBar/navBar'
import TesterFetch from './Components/TesterFetch'
import GeminiTextInput from './Components/GeminiTextInput'
import { Outlet, useLocation } from 'react-router-dom'

function App() {
  return (
    <div className='layout'>
    <SideNav />
    
    <div className='content'>
      <Outlet/>
    </div>
   </div>
  )
}

export default App

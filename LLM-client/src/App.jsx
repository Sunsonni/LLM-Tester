import { useState } from 'react'
import './App.css'
import SideNav from './Components/navBar/navBar'
import { Outlet, useLocation } from 'react-router-dom'

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return ( 
    <div className='layout'>
    <SideNav isOpen={isNavOpen} toggleNav={toggleNav}/>
    <div className={`content ${isNavOpen} ? 'shifted' : ''}`}>
      <Outlet context={{ isNavOpen }}/>
    </div>
   </div>
  )
}

export default App

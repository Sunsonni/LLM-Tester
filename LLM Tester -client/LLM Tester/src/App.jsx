import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SideNav from './Components/navBar/navBar'
import TesterFetch from './Components/TesterFetch'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SideNav name='Jonathan'/>
    <TesterFetch />
   </>
  )
}

export default App

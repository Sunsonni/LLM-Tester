import React from 'react';
import '../../App.css';
import Header from '../header';
import "./navStyles.css"

const SideNav = (props)=> {
return(
    <div className='topNav'>
        <Header></Header>
    
    <div className="sidenav">
        
        <a href="#section">About</a>
        <a href="#section">Services</a>
        <a href="#section">Contact</a>
    </div>
    </div>
);
};
export default SideNav;
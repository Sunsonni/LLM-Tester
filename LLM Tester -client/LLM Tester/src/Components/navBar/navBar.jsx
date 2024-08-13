import React from 'react';
import '../../App.css';
import Header from '../header';
import "./navStyles.css"

const SideNav = (props)=> {
return(
    <div className='topNav'>
        <Header></Header>
    
    <div className="sidenav">
        
        <a href="#section" className='headerLink'>Episode Info </a>
        <a href="#section" className='headerLink'>Community </a>
        <a href="#section" className='headerLink'>Support </a>
    </div>
    </div>
);
};
export default SideNav;
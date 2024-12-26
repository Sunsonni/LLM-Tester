import React, {useState} from 'react';
import { Button } from 'reactstrap';
import '../../App.css';

const SideNav = ({ isOpen, toggleNav }) => {
return(
    <div className='nav-container'>
        <Button onClick={toggleNav} className='toggle-button'>
            ☰
        </Button>
        <div className={`sideNav ${isOpen? 'open': 'closed'}`}>
            <a href="/">Home</a>
            <a href="/Input">Input</a>
            <a href="/SignUp">Sign Up</a>
        </div>
    </div>
);
};
export default SideNav;
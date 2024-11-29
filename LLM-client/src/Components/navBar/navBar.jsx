import React, {useState} from 'react';
import { Button } from 'reactstrap';
import '../../App.css';

const SideNav = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

return(
    <div className='nav-container'>
        <Button onClick={toggleNav} className='toggle-button'>
            ☰
        </Button>
        <div className={`sideNav ${isOpen? 'open': 'closed'}`}>
            <a href="/">Home</a>
            <a href="/Input">Input</a>
        </div>
    </div>
);
};
export default SideNav;
import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css'

function NavButtons() {
    return (
        <nav className='nav'>
            <ul>
                <div><Link to="/" role="button">View All Creators</Link></div>
                <div><Link to="/add" role="button">Add a Creator</Link></div>
            </ul>
        </nav>
    );
}
export default NavButtons;
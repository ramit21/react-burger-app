import React from 'react';
import burgerLogo from '../../../assets/images/burger-logo.png';
import './Logo.css';

const logo = () => (
    <div>
        <img src={burgerLogo} alt="MyBurger" className="Logo" />
    </div>
)

export default logo;
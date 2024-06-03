import React from 'react';
import './Header.css';
import logo from './logo.png'; // Adjust the path as needed

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="PlanMaster Logo" />
      </div>
      <nav className="nav">
        <a href="#create">Create a Trip</a>
        <a href="#suggested-trips">Suggested Trips</a>
        <a href="#my-account">My Account</a>
      </nav>
    </header>
  );
}

export default Header;

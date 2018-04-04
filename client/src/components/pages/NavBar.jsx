import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <header className="mb-4">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to='/' className="navbar-brand">WeConnect</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to='/' className="nav-link">Businesses</Link>
          </li>
          <li className="nav-item">
            <Link to='/' className="nav-link">Signup</Link>
          </li>
          <li className="nav-item">
            <Link to='/signup' className="nav-link">Signin</Link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default NavBar;
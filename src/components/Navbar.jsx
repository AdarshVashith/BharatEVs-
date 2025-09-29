import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Battery, Menu, X } from 'lucide-react';
import './Navbar.css';
import scot from '../assests/nav.jpg';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <img
          src={scot}
          alt="Bharat EVs Logo" 
          className="logo-icon" 
          style={{ width: '28px', height: '28px' }} 
        />
          <span className="logo-text" style={{ 
            fontFamily: 'Inter, sans-serif',
            fontWeight: '600',
            fontSize: '1.5rem',
            color: '#333333',
            marginLeft: '0.5rem'
          }}>
            Bharat EVs
          </span>
        </Link>

        <nav className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/services" className="nav-link" onClick={() => setMenuOpen(false)}>
            Services
          </NavLink>
          <NavLink to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>
            Contact Us
          </NavLink>
          <NavLink to="/join-us" className="nav-link" onClick={() => setMenuOpen(false)}>
            Join Us
          </NavLink>
          <NavLink to="/sign-in" className="nav-link sign-in" onClick={() => setMenuOpen(false)}>
            Sign In
          </NavLink>
        </nav>

        <div className="mobile-menu-btn" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
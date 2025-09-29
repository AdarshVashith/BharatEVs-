import React from 'react';
import { Link } from 'react-router-dom';
import { Battery, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo-section">
            <Link to="/" className="footer-logo">
              <Battery className="footer-logo-icon" size={28} />
              <span className="footer-logo-text">BHARAT EVs</span>
            </Link>
            <p className="footer-tagline">
              Powering India's Electric Future
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div className="footer-links-section">
            <div className="footer-links-column">
              <h3 className="footer-heading">Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/join-us">Join Our Team</Link></li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3 className="footer-heading">Services</h3>
              <ul className="footer-links">
                <li><Link to="/battery-repair">Battery Repair</Link></li>
                <li><Link to="/vehicle-repair">Vehicle Repair</Link></li>
                <li><Link to="/battery-service">Battery Service</Link></li>
                <li><Link to="/vehicle-service">Vehicle Service</Link></li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3 className="footer-heading">Contact Info</h3>
              <ul className="footer-contact">
                <li>
                  <Phone size={16} />
                  <span>+91 94858 78695</span>
                </li>
                <li>
                  <Mail size={16} />
                  <span>info@bharatevs.com</span>
                </li>
                <li>
                  <MapPin size={16} />
                  <span>C-2 Circle road Bhavnagar Gujrat</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} BHARAT EVs. All Rights Reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
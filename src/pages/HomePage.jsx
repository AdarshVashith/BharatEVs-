import React from 'react';
import { Link } from 'react-router-dom';
import { Battery, Zap, Shield, Wrench, Users } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">India's Premier EV Battery Service & Repair</h1>
            <p className="hero-subtitle">
              Expert care for electric vehicles and batteries with state-of-the-art technology and certified technicians
            </p>
            <div className="hero-btns">
              <Link to="/services" className="btn btn-lg">Our Services</Link>
              <Link to="/contact" className="btn btn-lg btn-outline">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Our Specialized EV Services</h2>
            <p className="section-desc">Comprehensive care for your electric vehicle needs</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <Battery size={40} />
              </div>
              <h3>Battery Repair</h3>
              <p>Professional diagnosis and repair of EV batteries, extending life and improving performance.</p>
              <Link to="/battery-repair" className="service-link">Learn More</Link>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Zap size={40} />
              </div>
              <h3>Battery Service</h3>
              <p>Regular maintenance and optimization to ensure peak battery efficiency and longevity.</p>
              <Link to="/battery-service" className="service-link">Learn More</Link>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Wrench size={40} />
              </div>
              <h3>Vehicle Repair</h3>
              <p>Comprehensive diagnostic and repair services for all electric vehicle components and systems.</p>
              <Link to="/vehicle-repair" className="service-link">Learn More</Link>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Shield size={40} />
              </div>
              <h3>Vehicle Service</h3>
              <p>Regular maintenance to keep your EV running smoothly and prevent potential issues.</p>
              <Link to="/vehicle-service" className="service-link">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Why Choose BHARAT EVs?</h2>
            <p className="section-desc">We're committed to keeping India's electric vehicles running efficiently</p>
          </div>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <Users size={30} />
              </div>
              <h3>Expert Technicians</h3>
              <p>Certified professionals with specialized training in EV systems</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <Wrench size={30} />
              </div>
              <h3>Advanced Equipment</h3>
              <p>State-of-the-art diagnostic and repair tools for precision service</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <Shield size={30} />
              </div>
              <h3>Warranty Protection</h3>
              <p>15-90 days warranty on all repairs and services provided</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <Zap size={30} />
              </div>
              <h3>Quick Turnaround</h3>
              <p>Efficient service with minimal downtime for your vehicle</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to get your EV back to peak performance?</h2>
            <p>Schedule a service appointment or request a consultation today.</p>
            <Link to="/services" className="btn btn-lg">Book Now</Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>What Our Customers Say</h2>
            <p className="section-desc">Trusted by EV owners across India</p>
          </div>

          <div className="testimonial-slider">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "BHARAT EVs restored my electric scooter's battery performance when other shops couldn't figure out the issue. Highly recommended for any EV owner!"
              </p>
              <div className="testimonial-author">
                <div className="testimonial-author-name">Rajesh Kumar</div>
                <div className="testimonial-vehicle">Ather 450X Owner</div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Professional service, transparent pricing, and great results. My e-rickshaw battery capacity improved significantly after their service."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-author-name">Priya Singh</div>
                <div className="testimonial-vehicle">E-Rickshaw Operator</div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <p className="testimonial-text">
                "The technicians are extremely knowledgeable about EV systems. They diagnosed and fixed my Tata Nexon EV issue in just one day!"
              </p>
              <div className="testimonial-author">
                <div className="testimonial-author-name">Amit Patel</div>
                <div className="testimonial-vehicle">Tata Nexon EV Owner</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
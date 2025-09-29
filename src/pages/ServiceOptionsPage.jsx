import React from 'react';
import { Link } from 'react-router-dom';
import { Battery, Car, Wrench, Zap } from 'lucide-react';
import './ServiceOptionsPage.css';

const ServiceOptionsPage = () => {
  return (
    <div className="service-options-page">
      <div className="page-header">
        <div className="container">
          <h1>Our Services</h1>
          <p>Comprehensive EV battery and vehicle care solutions</p>
        </div>
      </div>

      <section className="service-categories-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Choose a Service Category</h2>
            <p className="section-desc">Select the type of service you need for your electric vehicle</p>
          </div>

          <div className="service-categories">
            <div className="category-column">
              <div className="category-header">
                <Wrench size={32} className="category-icon" />
                <h3>Repair Services</h3>
              </div>
              <p>Professional diagnosis and repair for EV components that aren't functioning properly</p>
              
              <div className="service-options">
                <Link to="/battery-repair" className="service-option">
                  <Battery size={24} />
                  <div className="option-content">
                    <h4>Battery Repair</h4>
                    <p>Expert repair for damaged or malfunctioning EV batteries</p>
                    <span className="option-link">View Details</span>
                  </div>
                </Link>
                
                <Link to="/vehicle-repair" className="service-option">
                  <Car size={24} />
                  <div className="option-content">
                    <h4>Vehicle Repair</h4>
                    <p>Comprehensive repair services for EV systems and components</p>
                    <span className="option-link">View Details</span>
                  </div>
                </Link>
              </div>
            </div>

            <div className="category-column">
              <div className="category-header">
                <Zap size={32} className="category-icon" />
                <h3>Maintenance Services</h3>
              </div>
              <p>Regular maintenance to keep your EV performing at its best and prevent issues</p>
              
              <div className="service-options">
                <Link to="/battery-service" className="service-option">
                  <Battery size={24} />
                  <div className="option-content">
                    <h4>Battery Service</h4>
                    <p>Preventive maintenance to extend battery life and performance</p>
                    <span className="option-link">View Details</span>
                  </div>
                </Link>
                
                <Link to="/vehicle-service" className="service-option">
                  <Car size={24} />
                  <div className="option-content">
                    <h4>Vehicle Service</h4>
                    <p>Regular maintenance checks and service for your EV</p>
                    <span className="option-link">View Details</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-process-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Our Service Process</h2>
            <p className="section-desc">How we provide exceptional service for your electric vehicle</p>
          </div>

          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Book Appointment</h3>
              <p>Schedule a service appointment through our website or by calling our service center</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Diagnostic Check</h3>
              <p>Our certified technicians perform a comprehensive diagnostic assessment</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Service Estimate</h3>
              <p>Receive a detailed cost estimate and service recommendation</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Repair/Service</h3>
              <p>Our experts perform the necessary repairs or maintenance</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">5</div>
              <h3>Quality Verification</h3>
              <p>Final checks to ensure everything is working properly</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">6</div>
              <h3>Delivery</h3>
              <p>Your fully serviced vehicle is returned with service documentation</p>
            </div>
          </div>
        </div>
      </section>

      <section className="service-cta-section">
        <div className="container">
          <div className="service-cta-content">
            <h2>Need help choosing the right service?</h2>
            <p>Our experts can help determine what your EV needs. Contact us for a consultation.</p>
            <Link to="/contact" className="btn btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceOptionsPage;
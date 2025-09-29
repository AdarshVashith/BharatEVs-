import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setFormSubmitted(true);
      // Here you would typically send the data to your server
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We're here to help with all your electric vehicle service needs</p>
        </div>
      </div>
      
      <div className="container">
        <div className="contact-section">
          {formSubmitted ? (
            <div className="contact-success">
              <div className="success-icon">✓</div>
              <h2>Message Sent Successfully!</h2>
              <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
              <button onClick={() => setFormSubmitted(false)} className="btn">Send Another Message</button>
            </div>
          ) : (
            <div className="contact-content">
              <div className="contact-info">
                <h2>Get in Touch</h2>
                <p className="contact-desc">
                  Have questions about our services or need to schedule an appointment? 
                  Contact us using the form or reach out directly through the information below.
                </p>
                
                <div className="contact-details">
                  <div className="contact-detail-item">
                    <div className="contact-icon">
                      <Phone size={20} />
                    </div>
                    <div className="contact-text">
                      <h3>Phone</h3>
                      <p>+91 94858 78695</p>
                    </div>
                  </div>
                  
                  <div className="contact-detail-item">
                    <div className="contact-icon">
                      <Mail size={20} />
                    </div>
                    <div className="contact-text">
                      <h3>Email</h3>
                      <p>info@bharatevs.com</p>
                      <p>service@bharatevs.com</p>
                    </div>
                  </div>
                  
                  <div className="contact-detail-item">
                    <div className="contact-icon">
                      <MapPin size={20} />
                    </div>
                    <div className="contact-text">
                      <h3>Address</h3>
                      <p>C-2 Circle road Bhavnagar Gujrat</p>
                      <p>India</p>
                    </div>
                  </div>
                  
                  <div className="contact-detail-item">
                    <div className="contact-icon">
                      <Clock size={20} />
                    </div>
                    <div className="contact-text">
                      <h3>Business Hours</h3>
                      <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                      <p>Sunday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="contact-map">
                  <iframe
                    src="https://www.google.com/maps?q=C-2%20Circle%20road%20Bhavnagar%20Gujrat%2C%20India&output=embed"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="BHARAT EVs Location"
                  ></iframe>
                </div>
              </div>
              
              <div className="contact-form-container">
                <h2>Send Us a Message</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Your Name <span className="required">*</span></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`form-control ${errors.name ? 'error' : ''}`}
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email Address <span className="required">*</span></label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form-control ${errors.email ? 'error' : ''}`}
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">Phone Number <span className="required">*</span></label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className={`form-control ${errors.phone ? 'error' : ''}`}
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && <div className="error-message">{errors.phone}</div>}
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Subject <span className="required">*</span></label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className={`form-control ${errors.subject ? 'error' : ''}`}
                      value={formData.subject}
                      onChange={handleChange}
                    />
                    {errors.subject && <div className="error-message">{errors.subject}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message <span className="required">*</span></label>
                    <textarea
                      id="message"
                      name="message"
                      className={`form-control ${errors.message ? 'error' : ''}`}
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                    ></textarea>
                    {errors.message && <div className="error-message">{errors.message}</div>}
                  </div>
                  
                  <button type="submit" className="btn btn-lg">
                    <MessageSquare size={20} />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="branches-section">
        <div className="container">
          <h2 className="text-center">Our Service Centers</h2>
          <p className="section-desc text-center">Visit our service centers located across major cities in India</p>
          
          <div className="branches-grid">
            <div className="branch-card">
              <h3>Gujrat (Head Office)</h3>
              <p>C-2 Circle road Bhavnagar Gujrat - 364001 ,India</p>
              <p>Phone:+91 94858 78695.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="faq-section">
        <div className="container">
          <h2 className="text-center">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How often should I service my EV?</h3>
              <p>We recommend servicing your electric vehicle every 5,000 kilometers or every 6 months, whichever comes first. Regular maintenance helps prevent major issues and extends vehicle lifespan.</p>
            </div>
            
            <div className="faq-item">
              <h3>What is included in a standard battery service?</h3>
              <p>Our standard battery service includes performance testing, terminal cleaning, cell balancing check, cooling system inspection, and a comprehensive health report with recommendations.</p>
            </div>
            
            <div className="faq-item">
              <h3>Do you provide home service?</h3>
              <p>Yes, we offer doorstep service for battery diagnostics and minor repairs. For major repairs, we may need to bring the vehicle to our service center.</p>
            </div>
            
            <div className="faq-item">
              <h3>How long does a typical service take?</h3>
              <p>A standard maintenance service typically takes 2-4 hours. Repairs can take from a few hours to a few days depending on the complexity and parts availability.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, User, ChevronRight, Building, FileText, Mail, Phone } from 'lucide-react';
import './SignInPage.css';

const SignInPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState('customer');
  const [formData, setFormData] = useState({
    // Sign In Fields
    email: '',
    password: '',
    rememberMe: false,
    
    // Sign Up Additional Fields
    fullName: '',
    phoneNumber: '',
    confirmPassword: '',
    
    // Service Provider Fields
    gstNumber: '',
    firmName: '',
    firmAddress: '',
    licenseNumber: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (isSignUp) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (userType === 'provider' && !isSignUp) {
      if (!formData.gstNumber.trim()) newErrors.gstNumber = 'GST number is required';
      if (!formData.firmName.trim()) newErrors.firmName = 'Firm name is required';
      if (!formData.firmAddress.trim()) newErrors.firmAddress = 'Firm address is required';
      if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (isSignUp) {
        setShowSuccess(true);
      } else {
        window.location.href = userType === 'customer' ? '/customer-dashboard' : '/provider-dashboard';
      }
    }
  };

  if (showSuccess) {
    return (
      <div className="sign-in-page">
        <div className="container">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Account Created Successfully!</h2>
            <p>Please check your email to verify your account.</p>
            <p>We've sent a verification link to: {formData.email}</p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setShowSuccess(false);
                setIsSignUp(false);
              }}
            >
              Return to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sign-in-page">
      <div className="container">
        <div className="sign-in-container">
          <div className="sign-in-content">
            <div className="sign-in-form-container">
              <div className="sign-in-header">
                <h2>{isSignUp ? 'Create an Account' : 'Sign In to Your Account'}</h2>
                <p>{isSignUp ? 'Join BHARAT EVs today' : 'Access your BHARAT EVs dashboard'}</p>
              </div>
              
              {!isSignUp && (
                <div className="user-type-selector">
                  <button 
                    className={`type-btn ${userType === 'customer' ? 'active' : ''}`}
                    onClick={() => setUserType('customer')}
                  >
                    <User size={20} />
                    Customer
                  </button>
                  <button 
                    className={`type-btn ${userType === 'provider' ? 'active' : ''}`}
                    onClick={() => setUserType('provider')}
                  >
                    <Building size={20} />
                    Service Provider
                  </button>
                </div>
              )}
              
              <form className="sign-in-form" onSubmit={handleSubmit}>
                {isSignUp && (
                  <div className="form-group">
                    <label htmlFor="fullName\" className="form-label">Full Name</label>
                    <div className="input-icon-wrapper">
                      <User size={18} className="input-icon" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name"
                        className={`form-control ${errors.fullName ? 'error' : ''}`}
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.fullName && <div className="error-message">{errors.fullName}</div>}
                  </div>
                )}

                {isSignUp && (
                  <div className="form-group">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <div className="input-icon-wrapper">
                      <Phone size={18} className="input-icon" />
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Enter your phone number"
                        className={`form-control ${errors.phoneNumber ? 'error' : ''}`}
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <div className="input-icon-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your email address"
                      className={`form-control ${errors.email ? 'error' : ''}`}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                
                <div className="form-group">
                  <div className="password-header">
                    <label htmlFor="password" className="form-label">Password</label>
                    {!isSignUp && <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>}
                  </div>
                  <div className="input-icon-wrapper">
                    <Lock size={18} className="input-icon" />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Your password"
                      className={`form-control ${errors.password ? 'error' : ''}`}
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.password && <div className="error-message">{errors.password}</div>}
                </div>

                {isSignUp && (
                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <div className="input-icon-wrapper">
                      <Lock size={18} className="input-icon" />
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        className={`form-control ${errors.confirmPassword ? 'error' : ''}`}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                  </div>
                )}

                {!isSignUp && userType === 'provider' && (
                  <div className="provider-fields">
                    <div className="form-group">
                      <label htmlFor="firmName" className="form-label">Firm Name</label>
                      <div className="input-icon-wrapper">
                        <Building size={18} className="input-icon" />
                        <input
                          type="text"
                          id="firmName"
                          name="firmName"
                          placeholder="Your firm name"
                          className={`form-control ${errors.firmName ? 'error' : ''}`}
                          value={formData.firmName}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.firmName && <div className="error-message">{errors.firmName}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="gstNumber" className="form-label">GST Number</label>
                      <div className="input-icon-wrapper">
                        <FileText size={18} className="input-icon" />
                        <input
                          type="text"
                          id="gstNumber"
                          name="gstNumber"
                          placeholder="Your GST number"
                          className={`form-control ${errors.gstNumber ? 'error' : ''}`}
                          value={formData.gstNumber}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.gstNumber && <div className="error-message">{errors.gstNumber}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="firmAddress" className="form-label">Firm Address</label>
                      <textarea
                        id="firmAddress"
                        name="firmAddress"
                        placeholder="Your firm address"
                        className={`form-control ${errors.firmAddress ? 'error' : ''}`}
                        value={formData.firmAddress}
                        onChange={handleChange}
                        rows="3"
                      />
                      {errors.firmAddress && <div className="error-message">{errors.firmAddress}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="licenseNumber" className="form-label">License Number</label>
                      <div className="input-icon-wrapper">
                        <FileText size={18} className="input-icon" />
                        <input
                          type="text"
                          id="licenseNumber"
                          name="licenseNumber"
                          placeholder="Your license number"
                          className={`form-control ${errors.licenseNumber ? 'error' : ''}`}
                          value={formData.licenseNumber}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.licenseNumber && <div className="error-message">{errors.licenseNumber}</div>}
                    </div>
                  </div>
                )}
                
                {!isSignUp && (
                  <div className="form-check remember-me">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <label htmlFor="rememberMe" className="form-check-label">Remember me on this device</label>
                  </div>
                )}
                
                <button type="submit" className="btn btn-sign-in">
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </button>
                
                <div className="sign-in-footer">
                  {isSignUp ? (
                    <p>Already have an account? <button className="link-button\" onClick={() => setIsSignUp(false)}>Sign In</button></p>
                  ) : (
                    <p>Don't have an account? <button className="link-button" onClick={() => setIsSignUp(true)}>Create Account</button></p>
                  )}
                </div>
              </form>
            </div>
            
            <div className="sign-in-info">
              <h3>{isSignUp ? 'Join BHARAT EVs' : (userType === 'customer' ? 'Customer Benefits' : 'Service Provider Benefits')}</h3>
              <ul className="benefits-list">
                {isSignUp ? (
                  <>
                    <li>
                      <ChevronRight size={16} className="list-icon" />
                      <span>Quick and easy registration process</span>
                    </li>
                    <li>
                      <ChevronRight size={16} className="list-icon" />
                      <span>Access to all EV services</span>
                    </li>
                    <li>
                      <ChevronRight size={16} className="list-icon" />
                      <span>Track service requests</span>
                    </li>
                    <li>
                      <ChevronRight size={16} className="list-icon" />
                      <span>Exclusive offers and updates</span>
                    </li>
                    <li>
                      <ChevronRight size={16} className="list-icon" />
                      <span>24/7 customer support</span>
                    </li>
                  </>
                ) : userType === 'customer' ? (
                  <>
                    <li>
                      <ChevronRight size={16} className="list-icon" />
                      <span>Track your service requests</span>
                    </li>
                    <li>
                      <ChevronRight size={16} className="list-icon" />
                      <span>View service history</span>
                    </li>
                    <li>
                      <ChevronRight size={16} className="list-icon" />
                      <span>Schedule maintenance</span>
                    </li>
                    <li>
                      <ChevronRight size={16} className="list-icon" />
                      <span>Get maintenance reminders</span>
                    </li>
                    <li>
                      <ChevronRight size={16} className="list-icon" />
                      <span>Access exclusive offers</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <ChevronRight size={16} className="list-icon" />
                      <span>Manage service requests</span>
                    </li>
                    <li>
                      <ChevronRight size={16} className="list-icon" />
                      <span>Track earnings</span>
                    </li>
                    <li>
                      <ChevronRight size={16} className="list-icon" />
                      <span>Access technical resources</span>
                    </li>
                    <li>
                      <ChevronRight size={16} className="list-icon" />
                      <span>Manage team members</span>
                    </li>
                    <li>
                      <ChevronRight size={16} className="list-icon" />
                      <span>Generate reports</span>
                    </li>
                  </>
                )}
              </ul>
              
              <div className="info-cta">
                <h4>{isSignUp ? 'Ready to get started?' : (userType === 'customer' ? 'New to BHARAT EVs?' : 'Want to join our network?')}</h4>
                <p>
                  {isSignUp 
                    ? 'Create your account to access all our services.'
                    : (userType === 'customer' 
                      ? 'Create an account to manage your EV service needs efficiently.'
                      : 'Join our network of skilled professionals and grow your business.')}
                </p>
                {!isSignUp && (
                  <button 
                    onClick={() => setIsSignUp(true)} 
                    className="btn btn-secondary"
                  >
                    Create Account
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
import React, { useState } from 'react';
import './FormPages.css';

const BatteryRepairPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    address: '',
    batteryType: '',
    otherBatteryType: '',
    brand: '',
    modelNumber: '',
    serialNumber: '',
    voltageCapacity: '',
    problemReported: [],
    otherProblem: '',
    inspectionNotes: '',
    repairActions: [],
    otherRepairAction: '',
    status: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'agreeToTerms') {
        setFormData({
          ...formData,
          [name]: checked
        });
      } else {
        const updatedArray = checked
          ? [...formData[name], value]
          : formData[name].filter(item => item !== value);
        
        setFormData({
          ...formData,
          [name]: updatedArray
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    // Battery information
    if (!formData.batteryType) newErrors.batteryType = 'Battery type is required';
    if (formData.batteryType === 'Other' && !formData.otherBatteryType.trim()) {
      newErrors.otherBatteryType = 'Please specify the battery type';
    }
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.modelNumber.trim()) newErrors.modelNumber = 'Model number is required';
    if (!formData.serialNumber.trim()) newErrors.serialNumber = 'Serial number is required';
    if (!formData.voltageCapacity.trim()) newErrors.voltageCapacity = 'Voltage/Capacity is required';
    
    // Problem reported
    if (formData.problemReported.length === 0) {
      newErrors.problemReported = 'Please select at least one problem';
    }
    if (formData.problemReported.includes('Other') && !formData.otherProblem.trim()) {
      newErrors.otherProblem = 'Please describe the other problem';
    }
    
    // Terms agreement
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Razorpay payment integration
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
        amount: 49900, // Amount in paise (₹499 = 49900 paise)
        currency: 'INR',
        name: 'Bharat EVs',
        description: 'Battery Repair Inspection Fee',
        image: 'https://your-logo-url.com/logo.png', // Optional: Replace with your logo URL
        handler: function (response) {
          // Handle successful payment
          console.log('Payment successful:', response);
          setFormSubmitted(true);
          // Optionally, send formData and payment details to your server
          console.log('Form data:', formData);
          console.log('Payment ID:', response.razorpay_payment_id);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.contactNumber
        },
        notes: {
          address: formData.address,
          batteryType: formData.batteryType,
          brand: formData.brand,
          modelNumber: formData.modelNumber,
          serialNumber: formData.serialNumber
        },
        theme: {
          color: '#28a745'
        },
        modal: {
          ondismiss: function () {
            console.log('Payment modal closed');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.log('Payment failed:', response.error);
        alert('Payment failed. Please try again.');
      });
      rzp.open();
    } else {
      console.log('Form has errors');
    }
  };

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  if (formSubmitted) {
    return (
      <div className="form-page">
        <div className="container">
          <div className="form-success-container">
            <div className="success-icon">✓</div>
            <h2>Battery Repair Request Submitted</h2>
            <p>Thank you for choosing BHARAT EVs for your battery repair needs. Our team will review your request and contact you shortly.</p>
            <p className="reference-number">Reference Number: BR-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
            <p>An inspection fee of ₹499 has been paid successfully.</p>
            <button onClick={() => window.location.href = '/'} className="btn">Return to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="page-header">
        <div className="container">
          <h1>Battery Repair Request</h1>
          <p>Complete this form to request a repair service for your EV battery</p>
        </div>
      </div>
      
      <div className="container">
        <div className="form-container">
          <div className="form-info-sidebar">
            <h3>Battery Repair Service</h3>
            <p>Our expert technicians specialize in repairing all types of EV batteries, including:</p>
            <ul>
              <li>Lead-Acid batteries</li>
              <li>Lithium-ion batteries</li>
              <li>Battery Management Systems (BMS)</li>
              <li>Cell balancing and replacement</li>
            </ul>
            <div className="info-note">
              <h4>Important Note</h4>
              <p>An initial inspection and diagnostic fee of ₹499 will be charged. This helps us accurately assess your battery's condition.</p>
            </div>
            <div className="contact-sidebar">
              <h4>Need Help?</h4>
              <p>Call us at: <strong>+91 94858 78695</strong></p>
              <p>Email: <strong>info@bharatevs.com</strong></p>
            </div>
          </div>

          <form className="service-form" onSubmit={handleSubmit}>
            <h3>Battery Repairing Form</h3>
            
            <div className="form-section">
              <h4 className="form-section-title">Customer Details</h4>
              
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name:</label>
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
              
              <div className="form-group">
                <label htmlFor="contactNumber" className="form-label">Contact Number:</label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  className={`form-control ${errors.contactNumber ? 'error' : ''}`}
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
                {errors.contactNumber && <div className="error-message">{errors.contactNumber}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address:</label>
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
                <label htmlFor="address" className="form-label">Address:</label>
                <textarea
                  id="address"
                  name="address"
                  className={`form-control ${errors.address ? 'error' : ''}`}
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
                {errors.address && <div className="error-message">{errors.address}</div>}
              </div>
            </div>
            
            <div className="form-section">
              <h4 className="form-section-title">Battery Information</h4>
              
              <div className="form-group">
                <label className="form-label">Battery Type:</label>
                <div className="form-check-group">
                  <div className="form-check">
                    <input
                      type="radio"
                      id="leadAcid"
                      name="batteryType"
                      value="Lead-Acid"
                      checked={formData.batteryType === 'Lead-Acid'}
                      onChange={handleChange}
                      className={errors.batteryType ? 'error' : ''}
                    />
                    <label htmlFor="leadAcid" className="form-check-label">Lead-Acid</label>
                  </div>
                  
                  <div className="form-check">
                    <input
                      type="radio"
                      id="lithiumIon"
                      name="batteryType"
                      value="Lithium-ion"
                      checked={formData.batteryType === 'Lithium-ion'}
                      onChange={handleChange}
                      className={errors.batteryType ? 'error' : ''}
                    />
                    <label htmlFor="lithiumIon" className="form-check-label">Lithium-ion</label>
                  </div>
                  
                  <div className="form-check">
                    <input
                      type="radio"
                      id="otherBatteryType"
                      name="batteryType"
                      value="Other"
                      checked={formData.batteryType === 'Other'}
                      onChange={handleChange}
                      className={errors.batteryType ? 'error' : ''}
                    />
                    <label htmlFor="otherBatteryType" className="form-check-label">Other</label>
                    
                    {formData.batteryType === 'Other' && (
                      <input
                        type="text"
                        id="otherBatteryTypeText"
                        name="otherBatteryType"
                        className={`form-control form-control-inline ${errors.otherBatteryType ? 'error' : ''}`}
                        value={formData.otherBatteryType}
                        onChange={handleChange}
                        placeholder="Please specify"
                      />
                    )}
                  </div>
                </div>
                {errors.batteryType && <div className="error-message">{errors.batteryType}</div>}
                {errors.otherBatteryType && <div className="error-message">{errors.otherBatteryType}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="brand" className="form-label">Brand:</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  className={`form-control ${errors.brand ? 'error' : ''}`}
                  value={formData.brand}
                  onChange={handleChange}
                />
                {errors.brand && <div className="error-message">{errors.brand}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="modelNumber" className="form-label">Model Number:</label>
                <input
                  type="text"
                  id="modelNumber"
                  name="modelNumber"
                  className={`form-control ${errors.modelNumber ? 'error' : ''}`}
                  value={formData.modelNumber}
                  onChange={handleChange}
                />
                {errors.modelNumber && <div className="error-message">{errors.modelNumber}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="serialNumber" className="form-label">Serial Number:</label>
                <input
                  type="text"
                  id="serialNumber"
                  name="serialNumber"
                  className={`form-control ${errors.serialNumber ? 'error' : ''}`}
                  value={formData.serialNumber}
                  onChange={handleChange}
                />
                {errors.serialNumber && <div className="error-message">{errors.serialNumber}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="voltageCapacity" className="form-label">Voltage / Capacity:</label>
                <input
                  type="text"
                  id="voltageCapacity"
                  name="voltageCapacity"
                  className={`form-control ${errors.voltageCapacity ? 'error' : ''}`}
                  value={formData.voltageCapacity}
                  onChange={handleChange}
                />
                {errors.voltageCapacity && <div className="error-message">{errors.voltageCapacity}</div>}
              </div>
            </div>
            
            <div className="form-section">
              <h4 className="form-section-title">Problem Reported</h4>
              
              <div className="form-check-grid">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="notCharging"
                    name="problemReported"
                    value="Not Charging"
                    checked={formData.problemReported.includes('Not Charging')}
                    onChange={handleChange}
                    className={errors.problemReported ? 'error' : ''}
                  />
                  <label htmlFor="notCharging" className="form-check-label">Not Charging</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="lowBackup"
                    name="problemReported"
                    value="Low Backup"
                    checked={formData.problemReported.includes('Low Backup')}
                    onChange={handleChange}
                    className={errors.problemReported ? 'error' : ''}
                  />
                  <label htmlFor="lowBackup" className="form-check-label">Low Backup</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="overheating"
                    name="problemReported"
                    value="Overheating"
                    checked={formData.problemReported.includes('Overheating')}
                    onChange={handleChange}
                    className={errors.problemReported ? 'error' : ''}
                  />
                  <label htmlFor="overheating" className="form-check-label">Overheating</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="swelling"
                    name="problemReported"
                    value="Swelling"
                    checked={formData.problemReported.includes('Swelling')}
                    onChange={handleChange}
                    className={errors.problemReported ? 'error' : ''}
                  />
                  <label htmlFor="swelling" className="form-check-label">Swelling</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="leakage"
                    name="problemReported"
                    value="Leakage"
                    checked={formData.problemReported.includes('Leakage')}
                    onChange={handleChange}
                    className={errors.problemReported ? 'error' : ''}
                  />
                  <label htmlFor="leakage" className="form-check-label">Leakage</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="otherProblem"
                    name="problemReported"
                    value="Other"
                    checked={formData.problemReported.includes('Other')}
                    onChange={handleChange}
                    className={errors.problemReported ? 'error' : ''}
                  />
                  <label htmlFor="otherProblem" className="form-check-label">Other</label>
                </div>
              </div>
              
              {formData.problemReported.includes('Other') && (
                <div className="form-group">
                  <input
                    type="text"
                    id="otherProblemText"
                    name="otherProblem"
                    className={`form-control ${errors.otherProblem ? 'error' : ''}`}
                    value={formData.otherProblem}
                    onChange={handleChange}
                    placeholder="Please describe the problem"
                  />
                  {errors.otherProblem && <div className="error-message">{errors.otherProblem}</div>}
                </div>
              )}
              
              {errors.problemReported && <div className="error-message">{errors.problemReported}</div>}
            </div>
            
            <div className="form-section technician-section">
              <h4 className="form-section-title">Inspection Notes (Technician Use Only)</h4>
              <div className="form-group">
                <textarea
                  id="inspectionNotes"
                  name="inspectionNotes"
                  className="form-control"
                  value={formData.inspectionNotes}
                  onChange={handleChange}
                  rows="3"
                  disabled
                ></textarea>
              </div>
              
              <h4 className="form-section-title">Repair Actions Taken</h4>
              <div className="form-check-grid">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="cellReplacement"
                    name="repairActions"
                    value="Cell Replacement"
                    checked={formData.repairActions.includes('Cell Replacement')}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="cellReplacement" className="form-check-label">Cell Replacement</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="terminalCleaning"
                    name="repairActions"
                    value="Terminal Cleaning"
                    checked={formData.repairActions.includes('Terminal Cleaning')}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="terminalCleaning" className="form-check-label">Terminal Cleaning</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="bmsRepair"
                    name="repairActions"
                    value="BMS Repair/Replacement"
                    checked={formData.repairActions.includes('BMS Repair/Replacement')}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="bmsRepair" className="form-check-label">BMS Repair/Replacement</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="recharging"
                    name="repairActions"
                    value="Recharging / Rebalancing"
                    checked={formData.repairActions.includes('Recharging / Rebalancing')}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="recharging" className="form-check-label">Recharging / Rebalancing</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="otherRepair"
                    name="repairActions"
                    value="Other"
                    checked={formData.repairActions.includes('Other')}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="otherRepair" className="form-check-label">Other</label>
                </div>
              </div>
              
              <h4 className="form-section-title">Status</h4>
              <div className="form-check-group">
                <div className="form-check">
                  <input
                    type="radio"
                    id="repaired"
                    name="status"
                    value="Repaired"
                    checked={formData.status === 'Repaired'}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="repaired" className="form-check-label">Repaired</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="radio"
                    id="needsReplacement"
                    name="status"
                    value="Needs Replacement"
                    checked={formData.status === 'Needs Replacement'}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="needsReplacement" className="form-check-label">Needs Replacement</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="radio"
                    id="returnedUnrepaired"
                    name="status"
                    value="Returned Unrepaired"
                    checked={formData.status === 'Returned Unrepaired'}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="returnedUnrepaired" className="form-check-label">Returned Unrepaired</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="radio"
                    id="underObservation"
                    name="status"
                    value="Under Observation"
                    checked={formData.status === 'Under Observation'}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="underObservation" className="form-check-label">Under Observation</label>
                </div>
              </div>
            </div>
            
            <div className="form-section terms-section">
              <div className="terms-toggle" onClick={toggleTerms}>
                <h4 className="form-section-title">Terms & Conditions for EV & Battery Repair Services</h4>
                <span className="toggle-icon">{showTerms ? '−' : '+'}</span>
              </div>
              
              {showTerms && (
                <div className="terms-content">
                  <h5>Inspection & Diagnosis</h5>
                  <p>• An initial inspection and diagnostic fee 499/- will be charged, which will be not adjusted in the final invoice if the repair proceeds.</p>
                  <p>• The service engineer will not be liable for any pre-existing issues or concealed defects that may become evident during the repair process.</p>
                  
                  <h5>Repair Authorization</h5>
                  <p>• Repairs will only be initiated after written/verbal approval from the customer.</p>
                  <p>• Customers are responsible for ensuring that the details provided regarding the vehicle/battery are accurate.</p>
                  
                  <h5>Parts Replacement</h5>
                  <p>• Only original or high-quality compatible parts will be used.</p>
                  <p>• Replaced parts may be retained by the service center unless otherwise requested by the customer at the time of approval.</p>
                  
                  <h5>Battery Services</h5>
                  <p>• Battery repairs may involve risks including reduced capacity or life span. The service engineer & service provider is not liable for future degradation post-repair unless a warranty is provided.</p>
                  <p>• Repaired batteries may not perform like new batteries and may require regular monitoring.</p>
                  
                  <h5>Turnaround Time</h5>
                  <p>• Estimated delivery time is subject to availability of spare parts and complexity of repair. Delays due to supplier or external dependencies are not the responsibility of the Bharat EVS.</p>
                  
                  <h5>Warranty</h5>
                  <p>• Repairs carry a limited warranty as mentioned on the invoice, typically 15–90 days depending on the part or service.</p>
                  <p>• Warranty becomes void if the vehicle/battery is tampered with, misused, or repaired by unauthorized personnel after service.</p>
                  
                  <h5>Payment Terms</h5>
                  <p>• Full payment must be made upon delivery unless credit terms are pre-approved.</p>
                  <p>• Any advance payments are non-refundable once the repair has begun.</p>
                  
                  <h5>Liability</h5>
                  <p>• While utmost care is taken during handling and repair, the Bharat EVS is not liable for incidental damage, loss of data (e.g., trip logs), or vehicle software configurations.</p>
                  
                  <h5>Customer Consent</h5>
                  <p>• By submitting the vehicle or battery for repair, the customer agrees to these terms and conditions.</p>
                </div>
              )}
              
              <div className="form-check">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className={errors.agreeToTerms ? 'error' : ''}
                />
                <label htmlFor="agreeToTerms" className="form-check-label">
                  I agree to the terms and conditions and consent to pay the initial inspection fee of ₹499 (including visit charges)
                </label>
              </div>
              {errors.agreeToTerms && <div className="error-message">{errors.agreeToTerms}</div>}
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-lg">Pay ₹499</button>
              <button type="button" className="btn btn-secondary btn-lg" onClick={() => window.history.back()}>Go Back</button>
            </div>
          </form>
        </div>
      </div>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  );
};

export default BatteryRepairPage;
import React, { useState } from 'react';
import './FormPages.css';

const BatteryServicePage = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    contactNumber: '',
    email: '',
    address: '',
    dateReported: '',
    firstObservedDate: '',
    firstObservedTime: '',
    problemReportedTimes: '',
    problemDescription: '',
    engineerStatement: '',
    problemId: '',
    batterySerialNumber: '',
    batteryBrandName: '',
    batterySpecifications: '',
    batteryChemistry: '',
    batteryApplication: '',
    otherApplication: '',
    chargeCyclesSinceProblem: '',
    isBatteryHeating: '',
    areConnectorsOk: '',
    hasPhysicalDamage: '',
    physicalDamageDescription: '',
    hasSoundOrLiquid: '',
    soundOrLiquidDescription: '',
    additionalObservations: '',
    engineerName: '',
    visitDate: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else if (type === 'radio') {
      setFormData({
        ...formData,
        [name]: value
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields - Customer Details
    if (!formData.customerName.trim()) newErrors.customerName = 'Name is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    
    // Problem Reporting
    if (!formData.dateReported) newErrors.dateReported = 'Date reported is required';
    if (!formData.problemDescription.trim()) newErrors.problemDescription = 'Problem description is required';
    
    // Battery Information
    if (!formData.batterySerialNumber.trim()) newErrors.batterySerialNumber = 'Battery serial number is required';
    if (!formData.batteryBrandName.trim()) newErrors.batteryBrandName = 'Battery brand name is required';
    if (!formData.batterySpecifications.trim()) newErrors.batterySpecifications = 'Battery specifications are required';
    if (!formData.batteryApplication) newErrors.batteryApplication = 'Battery application is required';
    if (formData.batteryApplication === 'Other' && !formData.otherApplication.trim()) {
      newErrors.otherApplication = 'Please specify the application';
    }
    
    // Visual & Physical Inspection
    if (!formData.isBatteryHeating) newErrors.isBatteryHeating = 'Please select if the battery is heating up';
    if (!formData.areConnectorsOk) newErrors.areConnectorsOk = 'Please select if the connectors are okay';
    if (!formData.hasPhysicalDamage) newErrors.hasPhysicalDamage = 'Please select if there is physical damage';
    if (formData.hasPhysicalDamage === 'Yes' && !formData.physicalDamageDescription.trim()) {
      newErrors.physicalDamageDescription = 'Please describe the physical damage';
    }
    if (!formData.hasSoundOrLiquid) newErrors.hasSoundOrLiquid = 'Please select if there is sound or liquid detected';
    if (formData.hasSoundOrLiquid === 'Yes' && !formData.soundOrLiquidDescription.trim()) {
      newErrors.soundOrLiquidDescription = 'Please describe the sound or liquid';
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
        description: 'Battery Service Inspection Fee',
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
          name: formData.customerName,
          email: formData.email,
          contact: formData.contactNumber
        },
        notes: {
          address: formData.address,
          batterySerialNumber: formData.batterySerialNumber,
          batteryBrandName: formData.batteryBrandName,
          batteryApplication: formData.batteryApplication,
          problemDescription: formData.problemDescription
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
            <h2>Battery Service Request Submitted</h2>
            <p>Thank you for choosing BHARAT EVs for your battery service needs. Our team will review your request and contact you shortly.</p>
            <p className="reference-number">Reference Number: BS-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
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
          <h1>Battery Service Request</h1>
          <p>Complete this form to request a maintenance service for your EV battery</p>
        </div>
      </div>
      
      <div className="container">
        <div className="form-container">
          <div className="form-info-sidebar">
            <h3>Battery Service & Maintenance</h3>
            <p>Our professional battery maintenance services include:</p>
            <ul>
              <li>Battery performance testing</li>
              <li>Cell balancing optimization</li>
              <li>Terminal cleaning and maintenance</li>
              <li>Cooling system inspection</li>
              <li>Connector and wiring inspection</li>
              <li>Software/firmware updates</li>
            </ul>
            <div className="info-note">
              <h4>Important Note</h4>
              <p>An initial inspection and diagnostic fee of ₹499 will be charged. Regular battery maintenance can extend your battery life by up to 30%.</p>
            </div>
            <div className="contact-sidebar">
              <h4>Need Help?</h4>
              <p>Call us at: <strong>+91 94858 78695</strong></p>
              <p>Email: <strong>info@bharatevs.com</strong></p>
            </div>
          </div>

          <form className="service-form" onSubmit={handleSubmit}>
            <h3>Service Request Form - Battery Issue Reporting</h3>
            
            <div className="form-section">
              <h4 className="form-section-title">Customer Details</h4>
              
              <div className="form-group">
                <label htmlFor="customerName" className="form-label">Customer Name:</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  className={`form-control ${errors.customerName ? 'error' : ''}`}
                  value={formData.customerName}
                  onChange={handleChange}
                />
                {errors.customerName && <div className="error-message">{errors.customerName}</div>}
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
                <label htmlFor="email" className="form-label">Email (if any):</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address" className="form-label">Address:</label>
                <textarea
                  id="address"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>
            </div>
            
            <div className="form-section">
              <h4 className="form-section-title">Problem Reporting</h4>
              
              <div className="form-group">
                <label htmlFor="dateReported" className="form-label">Date of Reported Problem:</label>
                <input
                  type="date"
                  id="dateReported"
                  name="dateReported"
                  className={`form-control ${errors.dateReported ? 'error' : ''}`}
                  value={formData.dateReported}
                  onChange={handleChange}
                />
                {errors.dateReported && <div className="error-message">{errors.dateReported}</div>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstObservedDate" className="form-label">First Observed Date:</label>
                  <input
                    type="date"
                    id="firstObservedDate"
                    name="firstObservedDate"
                    className="form-control"
                    value={formData.firstObservedDate}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="firstObservedTime" className="form-label">Time:</label>
                  <input
                    type="time"
                    id="firstObservedTime"
                    name="firstObservedTime"
                    className="form-control"
                    value={formData.firstObservedTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="problemReportedTimes" className="form-label">Number of Times Problem Reported:</label>
                <input
                  type="number"
                  id="problemReportedTimes"
                  name="problemReportedTimes"
                  className="form-control"
                  value={formData.problemReportedTimes}
                  onChange={handleChange}
                  min="1"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="problemDescription" className="form-label">Problem Description (by Customer):</label>
                <textarea
                  id="problemDescription"
                  name="problemDescription"
                  className={`form-control ${errors.problemDescription ? 'error' : ''}`}
                  value={formData.problemDescription}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
                {errors.problemDescription && <div className="error-message">{errors.problemDescription}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="engineerStatement" className="form-label">Statement of Problem (by Service Engineer):</label>
                <textarea
                  id="engineerStatement"
                  name="engineerStatement"
                  className="form-control"
                  value={formData.engineerStatement}
                  onChange={handleChange}
                  rows="3"
                  disabled
                ></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="problemId" className="form-label">Problem ID (to be generated by Service Dept.):</label>
                <input
                  type="text"
                  id="problemId"
                  name="problemId"
                  className="form-control"
                  value={formData.problemId}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
            
            <div className="form-section">
              <h4 className="form-section-title">3. Battery Information</h4>
              
              <div className="form-group">
                <label htmlFor="batterySerialNumber" className="form-label">Battery Serial Number:</label>
                <input
                  type="text"
                  id="batterySerialNumber"
                  name="batterySerialNumber"
                  className={`form-control ${errors.batterySerialNumber ? 'error' : ''}`}
                  value={formData.batterySerialNumber}
                  onChange={handleChange}
                />
                {errors.batterySerialNumber && <div className="error-message">{errors.batterySerialNumber}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="batteryBrandName" className="form-label">Battery Brand Name:</label>
                <input
                  type="text"
                  id="batteryBrandName"
                  name="batteryBrandName"
                  className={`form-control ${errors.batteryBrandName ? 'error' : ''}`}
                  value={formData.batteryBrandName}
                  onChange={handleChange}
                />
                {errors.batteryBrandName && <div className="error-message">{errors.batteryBrandName}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="batterySpecifications" className="form-label">Battery Specifications (Voltage / Capacity / Config):</label>
                <input
                  type="text"
                  id="batterySpecifications"
                  name="batterySpecifications"
                  className={`form-control ${errors.batterySpecifications ? 'error' : ''}`}
                  value={formData.batterySpecifications}
                  onChange={handleChange}
                />
                {errors.batterySpecifications && <div className="error-message">{errors.batterySpecifications}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="batteryChemistry" className="form-label">Battery Chemistry (e.g., LFP, NMC):</label>
                <input
                  type="text"
                  id="batteryChemistry"
                  name="batteryChemistry"
                  className={`form-control ${errors.batteryChemistry ? 'error' : ''}`}
                  value={formData.batteryChemistry}
                  onChange={handleChange}
                />
                {errors.batteryChemistry && <div className="error-message">{errors.batteryChemistry}</div>}
              </div>
              
              <div className="form-group">
                <label className="form-label">Battery Application:</label>
                <div className="form-check-group">
                  <div className="form-check">
                    <input
                      type="radio"
                      id="eRickshaw"
                      name="batteryApplication"
                      value="E-Rickshaw"
                      checked={formData.batteryApplication === 'E-Rickshaw'}
                      onChange={handleChange}
                      className={errors.batteryApplication ? 'error' : ''}
                    />
                    <label htmlFor="eRickshaw" className="form-check-label">E-Rickshaw</label>
                  </div>
                  
                  <div className="form-check">
                    <input
                      type="radio"
                      id="twoWheelerScooter"
                      name="batteryApplication"
                      value="2W Electric Scooter"
                      checked={formData.batteryApplication === '2W Electric Scooter'}
                      onChange={handleChange}
                      className={errors.batteryApplication ? 'error' : ''}
                    />
                    <label htmlFor="twoWheelerScooter" className="form-check-label">2W Electric Scooter</label>
                  </div>
                  
                  <div className="form-check">
                    <input
                      type="radio"
                      id="energyStorage"
                      name="batteryApplication"
                      value="Energy Storage System"
                      checked={formData.batteryApplication === 'Energy Storage System'}
                      onChange={handleChange}
                      className={errors.batteryApplication ? 'error' : ''}
                    />
                    <label htmlFor="energyStorage" className="form-check-label">Energy Storage System</label>
                  </div>
                  
                  <div className="form-check">
                    <input
                      type="radio"
                      id="otherApplication"
                      name="batteryApplication"
                      value="Other"
                      checked={formData.batteryApplication === 'Other'}
                      onChange={handleChange}
                      className={errors.batteryApplication ? 'error' : ''}
                    />
                    <label htmlFor="otherApplication" className="form-check-label">Other</label>
                    
                    {formData.batteryApplication === 'Other' && (
                      <input
                        type="text"
                        id="otherApplicationText"
                        name="otherApplication"
                        className={`form-control form-control-inline ${errors.otherApplication ? 'error' : ''}`}
                        value={formData.otherApplication}
                        onChange={handleChange}
                        placeholder="Please specify"
                      />
                    )}
                  </div>
                </div>
                {errors.batteryApplication && <div className="error-message">{errors.batteryApplication}</div>}
                {errors.otherApplication && <div className="error-message">{errors.otherApplication}</div>}
              </div>
            </div>
            
            <div className="form-section">
              <h4 className="form-section-title">4. Usage History After Problem Observed</h4>
              
              <div className="form-group">
                <label htmlFor="chargeCyclesSinceProblem" className="form-label">Number of Charge/Discharge Cycles Since Problem:</label>
                <input
                  type="number"
                  id="chargeCyclesSinceProblem"
                  name="chargeCyclesSinceProblem"
                  className="form-control"
                  value={formData.chargeCyclesSinceProblem}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>
            
            <div className="form-section">
              <h4 className="form-section-title">5. Visual & Physical Inspection Checklist</h4>
              
              <div className="form-group">
                <label className="form-label">Is Battery Heating Up?</label>
                <div className="form-check-group">
                  <div className="form-check">
                    <input
                      type="radio"
                      id="heatingYes"
                      name="isBatteryHeating"
                      value="Yes"
                      checked={formData.isBatteryHeating === 'Yes'}
                      onChange={handleChange}
                      className={errors.isBatteryHeating ? 'error' : ''}
                    />
                    <label htmlFor="heatingYes" className="form-check-label">Yes</label>
                  </div>
                  
                  <div className="form-check">
                    <input
                      type="radio"
                      id="heatingNo"
                      name="isBatteryHeating"
                      value="No"
                      checked={formData.isBatteryHeating === 'No'}
                      onChange={handleChange}
                      className={errors.isBatteryHeating ? 'error' : ''}
                    />
                    <label htmlFor="heatingNo" className="form-check-label">No</label>
                  </div>
                </div>
                {errors.isBatteryHeating && <div className="error-message">{errors.isBatteryHeating}</div>}
              </div>
              
              <div className="form-group">
                <label className="form-label">Are Battery Connectors OK?</label>
                <div className="form-check-group">
                  <div className="form-check">
                    <input
                      type="radio"
                      id="connectorsYes"
                      name="areConnectorsOk"
                      value="Yes"
                      checked={formData.areConnectorsOk === 'Yes'}
                      onChange={handleChange}
                      className={errors.areConnectorsOk ? 'error' : ''}
                    />
                    <label htmlFor="connectorsYes" className="form-check-label">Yes</label>
                  </div>
                  
                  <div className="form-check">
                    <input
                      type="radio"
                      id="connectorsNo"
                      name="areConnectorsOk"
                      value="No"
                      checked={formData.areConnectorsOk === 'No'}
                      onChange={handleChange}
                      className={errors.areConnectorsOk ? 'error' : ''}
                    />
                    <label htmlFor="connectorsNo" className="form-check-label">No</label>
                  </div>
                </div>
                {errors.areConnectorsOk && <div className="error-message">{errors.areConnectorsOk}</div>}
              </div>
              
              <div className="form-group">
                <label className="form-label">Any Physical Damage Observed?</label>
                <div className="form-check-group">
                  <div className="form-check">
                    <input
                      type="radio"
                      id="damageYes"
                      name="hasPhysicalDamage"
                      value="Yes"
                      checked={formData.hasPhysicalDamage === 'Yes'}
                      onChange={handleChange}
                      className={errors.hasPhysicalDamage ? 'error' : ''}
                    />
                    <label htmlFor="damageYes" className="form-check-label">Yes</label>
                  </div>
                  
                  <div className="form-check">
                    <input
                      type="radio"
                      id="damageNo"
                      name="hasPhysicalDamage"
                      value="No"
                      checked={formData.hasPhysicalDamage === 'No'}
                      onChange={handleChange}
                      className={errors.hasPhysicalDamage ? 'error' : ''}
                    />
                    <label htmlFor="damageNo" className="form-check-label">No</label>
                  </div>
                </div>
                {errors.hasPhysicalDamage && <div className="error-message">{errors.hasPhysicalDamage}</div>}
                
                {formData.hasPhysicalDamage === 'Yes' && (
                  <div className="form-group">
                    <label htmlFor="physicalDamageDescription" className="form-label">If Yes, describe:</label>
                    <input
                      type="text"
                      id="physicalDamageDescription"
                      name="physicalDamageDescription"
                      className={`form-control ${errors.physicalDamageDescription ? 'error' : ''}`}
                      value={formData.physicalDamageDescription}
                      onChange={handleChange}
                    />
                    {errors.physicalDamageDescription && <div className="error-message">{errors.physicalDamageDescription}</div>}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label">Any Sound or Liquid Detected?</label>
                <div className="form-check-group">
                  <div className="form-check">
                    <input
                      type="radio"
                      id="soundLiquidYes"
                      name="hasSoundOrLiquid"
                      value="Yes"
                      checked={formData.hasSoundOrLiquid === 'Yes'}
                      onChange={handleChange}
                      className={errors.hasSoundOrLiquid ? 'error' : ''}
                    />
                    <label htmlFor="soundLiquidYes" className="form-check-label">Yes</label>
                  </div>
                  
                  <div className="form-check">
                    <input
                      type="radio"
                      id="soundLiquidNo"
                      name="hasSoundOrLiquid"
                      value="No"
                      checked={formData.hasSoundOrLiquid === 'No'}
                      onChange={handleChange}
                      className={errors.hasSoundOrLiquid ? 'error' : ''}
                    />
                    <label htmlFor="soundLiquidNo" className="form-check-label">No</label>
                  </div>
                </div>
                {errors.hasSoundOrLiquid && <div className="error-message">{errors.hasSoundOrLiquid}</div>}
                
                {formData.hasSoundOrLiquid === 'Yes' && (
                  <div className="form-group">
                    <label htmlFor="soundOrLiquidDescription" className="form-label">If Yes, describe:</label>
                    <input
                      type="text"
                      id="soundOrLiquidDescription"
                      name="soundOrLiquidDescription"
                      className={`form-control ${errors.soundOrLiquidDescription ? 'error' : ''}`}
                      value={formData.soundOrLiquidDescription}
                      onChange={handleChange}
                    />
                    {errors.soundOrLiquidDescription && <div className="error-message">{errors.soundOrLiquidDescription}</div>}
                  </div>
                )}
              </div>
            </div>
            
            <div className="form-section">
              <h4 className="form-section-title">6. Notes / Additional Observations:</h4>
              <div className="form-group">
                <textarea
                  id="additionalObservations"
                  name="additionalObservations"
                  className="form-control"
                  value={formData.additionalObservations}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>
            </div>
            
            <div className="form-section">
              <h4 className="form-section-title">Service Engineer / Field Technician Details</h4>
              <div className="form-group">
                <label htmlFor="engineerName" className="form-label">Name:</label>
                <input
                  type="text"
                  id="engineerName"
                  name="engineerName"
                  className="form-control"
                  value={formData.engineerName}
                  onChange={handleChange}
                  disabled
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="visitDate" className="form-label">Date of Visit:</label>
                <input
                  type="date"
                  id="visitDate"
                  name="visitDate"
                  className="form-control"
                  value={formData.visitDate}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
            
            <div className="form-section terms-section">
              <div className="terms-toggle" onClick={toggleTerms}>
                <h4 className="form-section-title">Terms & Conditions for EV & Battery Service</h4>
                <span className="toggle-icon">{showTerms ? '−' : '+'}</span>
              </div>
              
              {showTerms && (
                <div className="terms-content">
                  <h5>Inspection & Diagnosis</h5>
                  <p>• An initial inspection and diagnostic fee 499/- will be charged, which will be not adjusted in the final invoice if the service proceeds.</p>
                  <p>• The service engineer will not be liable for any pre-existing issues or concealed defects that may become evident during the service process.</p>
                  
                  <h5>Service Authorization</h5>
                  <p>• Services will only be initiated after written/verbal approval from the customer.</p>
                  <p>• Customers are responsible for ensuring that the details provided regarding the battery are accurate.</p>
                  
                  <h5>Battery Services</h5>
                  <p>• Battery services may involve risks including reduced capacity or life span. The service engineer & service provider is not liable for future degradation post-service unless a warranty is provided.</p>
                  <p>• Serviced batteries may require regular monitoring and follow-up maintenance.</p>
                  
                  <h5>Payment Terms</h5>
                  <p>• Full payment must be made upon completion of service unless credit terms are pre-approved.</p>
                  <p>• Any advance payments are non-refundable once the service has begun.</p>
                  
                  <h5>Liability</h5>
                  <p>• While utmost care is taken during handling and service, the Bharat EVS is not liable for incidental damage or unforeseen issues.</p>
                  
                  <h5>Customer Consent</h5>
                  <p>• By submitting the battery for service, the customer agrees to these terms and conditions.</p>
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

export default BatteryServicePage;
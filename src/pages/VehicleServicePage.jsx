import React, { useState } from 'react';
import './FormPages.css';

const VehicleServicePage = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    emailAddress: '',
    address: '',
    vehicleType: '',
    makeModel: '',
    regNumber: '',
    vinNumber: '',
    odometerReading: '',
    purchaseDate: '',
    batteryType: '',
    otherBatteryType: '',
    batteryBrandModel: '',
    batterySerialNumber: '',
    batteryVoltageCapacity: '',
    batteryPurchaseDate: '',
    vehicleIssues: [],
    otherVehicleIssue: '',
    batteryIssues: [],
    otherBatteryIssue: '',
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
      } else if (name.startsWith('vehicleIssues') || name.startsWith('batteryIssues')) {
        const issuesField = name.startsWith('vehicleIssues') ? 'vehicleIssues' : 'batteryIssues';
        const updatedArray = checked
          ? [...formData[issuesField], value]
          : formData[issuesField].filter(item => item !== value);
        
        setFormData({
          ...formData,
          [issuesField]: updatedArray
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
    
    // Required fields - Customer Information
    if (!formData.customerName.trim()) newErrors.customerName = 'Customer name is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (formData.emailAddress && !/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Email is invalid';
    }
    
    // Vehicle Details
    if (!formData.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
    if (!formData.makeModel.trim()) newErrors.makeModel = 'Make & Model is required';
    if (!formData.regNumber.trim()) newErrors.regNumber = 'Vehicle registration number is required';
    
    // Battery Details
    if (!formData.batteryType) newErrors.batteryType = 'Battery type is required';
    if (formData.batteryType === 'Other' && !formData.otherBatteryType.trim()) {
      newErrors.otherBatteryType = 'Please specify the battery type';
    }
    
    // Service Request
    if (formData.vehicleIssues.length === 0 && formData.batteryIssues.length === 0) {
      newErrors.issues = 'Please select at least one issue';
    }
    if (formData.vehicleIssues.includes('Other') && !formData.otherVehicleIssue.trim()) {
      newErrors.otherVehicleIssue = 'Please describe the other issue';
    }
    if (formData.batteryIssues.includes('Other') && !formData.otherBatteryIssue.trim()) {
      newErrors.otherBatteryIssue = 'Please describe the other issue';
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
        description: 'Vehicle Service Inspection Fee',
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
          email: formData.emailAddress,
          contact: formData.phoneNumber
        },
        notes: {
          address: formData.address,
          vehicleType: formData.vehicleType,
          makeModel: formData.makeModel,
          regNumber: formData.regNumber,
          vinNumber: formData.vinNumber,
          batteryType: formData.batteryType,
          batterySerialNumber: formData.batterySerialNumber,
          vehicleIssues: formData.vehicleIssues.join(', '),
          batteryIssues: formData.batteryIssues.join(', ')
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
            <h2>Vehicle Service Request Submitted</h2>
            <p>Thank you for choosing BHARAT EVs for your electric vehicle service needs. Our team will review your request and contact you shortly.</p>
            <p className="reference-number">Reference Number: VS-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
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
          <h1>Vehicle Service Request</h1>
          <p>Complete this form to schedule a maintenance service for your electric vehicle</p>
        </div>
      </div>
      
      <div className="container">
        <div className="form-container">
          <div className="form-info-sidebar">
            <h3>EV Maintenance Services</h3>
            <p>Our comprehensive vehicle service includes:</p>
            <ul>
              <li>Motor system diagnostics</li>
              <li>Controller and electrical system checks</li>
              <li>Cooling system maintenance</li>
              <li>Brake system inspection</li>
              <li>Battery connection optimization</li>
              <li>Software and firmware updates</li>
              <li>Charging system verification</li>
            </ul>
            <div className="info-note">
              <h4>Important Note</h4>
              <p>Regular maintenance can prevent costly repairs and extend your vehicle's lifespan. We recommend servicing your EV every 5,000 km or 6 months.</p>
            </div>
            <div className="contact-sidebar">
              <h4>Need Help?</h4>
              <p>Call us at: <strong>+91 94858 78695</strong></p>
              <p>Email: <strong>info@bharatevs.com</strong></p>
            </div>
          </div>

          <form className="service-form" onSubmit={handleSubmit}>
            <h3>Vehicle Service Request Form</h3>
            
            <div className="form-section">
              <h4 className="form-section-title">Customer Information</h4>
              
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
                <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className={`form-control ${errors.phoneNumber ? 'error' : ''}`}
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="emailAddress" className="form-label">Email Address:</label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  className={`form-control ${errors.emailAddress ? 'error' : ''}`}
                  value={formData.emailAddress}
                  onChange={handleChange}
                />
                {errors.emailAddress && <div className="error-message">{errors.emailAddress}</div>}
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
              <h4 className="form-section-title">🚗 Vehicle Details</h4>
              
              <div className="form-group">
                <label className="form-label">Vehicle Type:</label>
                <div className="form-check-group">
                  <div className="form-check">
                    <input
                      type="radio"
                      id="twoWheeler"
                      name="vehicleType"
                      value="2-Wheeler"
                      checked={formData.vehicleType === '2-Wheeler'}
                      onChange={handleChange}
                      className={errors.vehicleType ? 'error' : ''}
                    />
                    <label htmlFor="twoWheeler" className="form-check-label">2-Wheeler</label>
                  </div>
                  
                  <div className="form-check">
                    <input
                      type="radio"
                      id="threeWheeler"
                      name="vehicleType"
                      value="3-Wheeler"
                      checked={formData.vehicleType === '3-Wheeler'}
                      onChange={handleChange}
                      className={errors.vehicleType ? 'error' : ''}
                    />
                    <label htmlFor="threeWheeler" className="form-check-label">3-Wheeler</label>
                  </div>
                </div>
                {errors.vehicleType && <div className="error-message">{errors.vehicleType}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="makeModel" className="form-label">Make & Model:</label>
                <input
                  type="text"
                  id="makeModel"
                  name="makeModel"
                  className={`form-control ${errors.makeModel ? 'error' : ''}`}
                  value={formData.makeModel}
                  onChange={handleChange}
                />
                {errors.makeModel && <div className="error-message">{errors.makeModel}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="regNumber" className="form-label">Vehicle Reg. Number:</label>
                <input
                  type="text"
                  id="regNumber"
                  name="regNumber"
                  className={`form-control ${errors.regNumber ? 'error' : ''}`}
                  value={formData.regNumber}
                  onChange={handleChange}
                />
                {errors.regNumber && <div className="error-message">{errors.regNumber}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="vinNumber" className="form-label">VIN / Chassis No.:</label>
                <input
                  type="text"
                  id="vinNumber"
                  name="vinNumber"
                  className="form-control"
                  value={formData.vinNumber}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="odometerReading" className="form-label">Odometer Reading (km):</label>
                <input
                  type="number"
                  id="odometerReading"
                  name="odometerReading"
                  className="form-control"
                  value={formData.odometerReading}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="purchaseDate" className="form-label">Date of Purchase:</label>
                <input
                  type="date"
                  id="purchaseDate"
                  name="purchaseDate"
                  className="form-control"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-section">
              <h4 className="form-section-title">🔋 Battery Details (if applicable)</h4>
              
              <div className="form-group">
                <label className="form-label">Battery Type:</label>
                <div className="form-check-group">
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
                <label htmlFor="batteryBrandModel" className="form-label">Brand & Model:</label>
                <input
                  type="text"
                  id="batteryBrandModel"
                  name="batteryBrandModel"
                  className="form-control"
                  value={formData.batteryBrandModel}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="batterySerialNumber" className="form-label">Battery Serial Number:</label>
                <input
                  type="text"
                  id="batterySerialNumber"
                  name="batterySerialNumber"
                  className="form-control"
                  value={formData.batterySerialNumber}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="batteryVoltageCapacity" className="form-label">Voltage / Capacity:</label>
                <input
                  type="text"
                  id="batteryVoltageCapacity"
                  name="batteryVoltageCapacity"
                  className="form-control"
                  value={formData.batteryVoltageCapacity}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="batteryPurchaseDate" className="form-label">Battery Purchase Date:</label>
                <input
                  type="date"
                  id="batteryPurchaseDate"
                  name="batteryPurchaseDate"
                  className="form-control"
                  value={formData.batteryPurchaseDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-section">
              <h4 className="form-section-title">⚠️ Service/Repair Request</h4>
              <p className="section-desc">Reported Issue(s): (Tick all that apply)</p>
              
              <h5 className="subsection-title">Vehicle Issues:</h5>
              <div className="form-check-grid">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="noPower"
                    name="vehicleIssues"
                    value="No Power / Won't Start"
                    checked={formData.vehicleIssues.includes('No Power / Won\'t Start')}
                    onChange={handleChange}
                  />
                  <label htmlFor="noPower" className="form-check-label">No Power / Won't Start</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="accelerationProblem"
                    name="vehicleIssues"
                    value="Acceleration Problem"
                    checked={formData.vehicleIssues.includes('Acceleration Problem')}
                    onChange={handleChange}
                  />
                  <label htmlFor="accelerationProblem" className="form-check-label">Acceleration Problem</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="brakeFailure"
                    name="vehicleIssues"
                    value="Brake Failure"
                    checked={formData.vehicleIssues.includes('Brake Failure')}
                    onChange={handleChange}
                  />
                  <label htmlFor="brakeFailure" className="form-check-label">Brake Failure</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="lightsFaulty"
                    name="vehicleIssues"
                    value="Lights / Indicators Faulty"
                    checked={formData.vehicleIssues.includes('Lights / Indicators Faulty')}
                    onChange={handleChange}
                  />
                  <label htmlFor="lightsFaulty" className="form-check-label">Lights / Indicators Faulty</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="controllerIssue"
                    name="vehicleIssues"
                    value="Controller/Motor Issue"
                    checked={formData.vehicleIssues.includes('Controller/Motor Issue')}
                    onChange={handleChange}
                  />
                  <label htmlFor="controllerIssue" className="form-check-label">Controller/Motor Issue</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="rangeIssue"
                    name="vehicleIssues"
                    value="Range Issue"
                    checked={formData.vehicleIssues.includes('Range Issue')}
                    onChange={handleChange}
                  />
                  <label htmlFor="rangeIssue" className="form-check-label">Range Issue</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="otherVehicleIssue"
                    name="vehicleIssues"
                    value="Other"
                    checked={formData.vehicleIssues.includes('Other')}
                    onChange={handleChange}
                  />
                  <label htmlFor="otherVehicleIssue" className="form-check-label">Other</label>
                </div>
              </div>
              
              {formData.vehicleIssues.includes('Other') && (
                <div className="form-group">
                  <input
                    type="text"
                    id="otherVehicleIssueText"
                    name="otherVehicleIssue"
                    className={`form-control ${errors.otherVehicleIssue ? 'error' : ''}`}
                    value={formData.otherVehicleIssue}
                    onChange={handleChange}
                    placeholder="Please describe the other issue"
                  />
                  {errors.otherVehicleIssue && <div className="error-message">{errors.otherVehicleIssue}</div>}
                </div>
              )}
              
              <h5 className="subsection-title">Battery Issues:</h5>
              <div className="form-check-grid">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="notCharging"
                    name="batteryIssues"
                    value="Not Charging"
                    checked={formData.batteryIssues.includes('Not Charging')}
                    onChange={handleChange}
                  />
                  <label htmlFor="notCharging" className="form-check-label">Not Charging</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="fastDraining"
                    name="batteryIssues"
                    value="Fast Draining"
                    checked={formData.batteryIssues.includes('Fast Draining')}
                    onChange={handleChange}
                  />
                  <label htmlFor="fastDraining" className="form-check-label">Fast Draining</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="overheating"
                    name="batteryIssues"
                    value="Overheating"
                    checked={formData.batteryIssues.includes('Overheating')}
                    onChange={handleChange}
                  />
                  <label htmlFor="overheating" className="form-check-label">Overheating</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="chargingPortDamaged"
                    name="batteryIssues"
                    value="Charging Port Damaged"
                    checked={formData.batteryIssues.includes('Charging Port Damaged')}
                    onChange={handleChange}
                  />
                  <label htmlFor="chargingPortDamaged" className="form-check-label">Charging Port Damaged</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="otherBatteryIssue"
                    name="batteryIssues"
                    value="Other"
                    checked={formData.batteryIssues.includes('Other')}
                    onChange={handleChange}
                  />
                  <label htmlFor="otherBatteryIssue" className="form-check-label">Other</label>
                </div>
              </div>
              
              {formData.batteryIssues.includes('Other') && (
                <div className="form-group">
                  <input
                    type="text"
                    id="otherBatteryIssueText"
                    name="otherBatteryIssue"
                    className={`form-control ${errors.otherBatteryIssue ? 'error' : ''}`}
                    value={formData.otherBatteryIssue}
                    onChange={handleChange}
                    placeholder="Please describe the other issue"
                  />
                  {errors.otherBatteryIssue && <div className="error-message">{errors.otherBatteryIssue}</div>}
                </div>
              )}
              
              {errors.issues && <div className="error-message">{errors.issues}</div>}
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
                  <p>• Customers are responsible for ensuring that the details provided regarding the vehicle/battery are accurate.</p>
                  
                  <h5>Battery & Vehicle Services</h5>
                  <p>• Services may involve risks including system recalibration and software updates. The service engineer & service provider is not liable for unforeseen compatibility issues.</p>
                  <p>• Regular maintenance is recommended every 5,000 km or 6 months to ensure optimal performance.</p>
                  
                  <h5>Payment Terms</h5>
                  <p>• Full payment must be made upon completion of service unless credit terms are pre-approved.</p>
                  <p>• Any advance payments are non-refundable once the service has begun.</p>
                  
                  <h5>Liability</h5>
                  <p>• While utmost care is taken during handling and service, the Bharat EVS is not liable for incidental damage or unforeseen issues.</p>
                  
                  <h5>Customer Consent</h5>
                  <p>• By submitting the vehicle for service, the customer agrees to these terms and conditions.</p>
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

export default VehicleServicePage;
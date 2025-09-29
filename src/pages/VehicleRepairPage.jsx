import React, { useState } from 'react';
import './FormPages.css';

const VehicleRepairPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    vehicleType: '',
    vehicleMake: '',
    model: '',
    yearOfManufacture: '',
    registrationNumber: '',
    vinNumber: '',
    batteryTypeCapacity: '',
    reportedIssues: [],
    otherIssue: '',
    inspectionNotes: '',
    repairActions: [],
    otherRepairAction: '',
    partsReplaced: ['', '', ''],
    serviceStatus: '',
    receivedDate: '',
    completedDate: '',
    technicianName: '',
    remarks: '',
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
    } else if (name.startsWith('partsReplaced')) {
      const index = parseInt(name.split('[')[1]);
      const newPartsReplaced = [...formData.partsReplaced];
      newPartsReplaced[index] = value;
      
      setFormData({
        ...formData,
        partsReplaced: newPartsReplaced
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
    
    // Required fields
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    // Vehicle information
    if (!formData.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
    if (!formData.vehicleMake.trim()) newErrors.vehicleMake = 'Vehicle make is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.yearOfManufacture.trim()) newErrors.yearOfManufacture = 'Year of manufacture is required';
    if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required';
    if (!formData.vinNumber.trim()) newErrors.vinNumber = 'VIN/Chassis number is required';
    if (!formData.batteryTypeCapacity.trim()) newErrors.batteryTypeCapacity = 'Battery type & capacity is required';
    
    // Reported issues
    if (formData.reportedIssues.length === 0) {
      newErrors.reportedIssues = 'Please select at least one issue';
    }
    if (formData.reportedIssues.includes('Other') && !formData.otherIssue.trim()) {
      newErrors.otherIssue = 'Please describe the other issue';
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
        description: 'Vehicle Repair Inspection Fee',
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
          contact: formData.phoneNumber
        },
        notes: {
          address: formData.address,
          vehicleType: formData.vehicleType,
          vehicleMake: formData.vehicleMake,
          model: formData.model,
          registrationNumber: formData.registrationNumber,
          vinNumber: formData.vinNumber,
          reportedIssues: formData.reportedIssues.join(', ')
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
            <h2>Vehicle Repair Request Submitted</h2>
            <p>Thank you for choosing BHARAT EVs for your electric vehicle repair needs. Our team will review your request and contact you shortly.</p>
            <p className="reference-number">Reference Number: VR-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
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
          <h1>Vehicle Repair Request</h1>
          <p>Complete this form to request a repair service for your electric vehicle</p>
        </div>
      </div>
      
      <div className="container">
        <div className="form-container">
          <div className="form-info-sidebar">
            <h3>Vehicle Repair Service</h3>
            <p>Our specialized EV repair services include:</p>
            <ul>
              <li>Motor troubleshooting and repair</li>
              <li>Controller diagnostics and replacement</li>
              <li>Charging system repair</li>
              <li>Brake system service</li>
              <li>Electrical system diagnosis</li>
              <li>Software updates and calibration</li>
            </ul>
            <div className="info-note">
              <h4>Important Note</h4>
              <p>An initial inspection and diagnostic fee of ₹499 will be charged. This helps us accurately assess your vehicle's condition.</p>
            </div>
            <div className="contact-sidebar">
              <h4>Need Help?</h4>
              <p>Call us at: <strong>+91 94858 78695</strong></p>
              <p>Email: <strong>info@bharatevs.com</strong></p>
            </div>
          </div>

          <form className="service-form" onSubmit={handleSubmit}>
            <h3>Electric Vehicle Repairing Form</h3>
            
            <div className="form-section">
              <h4 className="form-section-title">Vehicle Type</h4>
              <div className="form-check-group">
                <div className="form-check">
                  <input
                    type="radio"
                    id="twoWheeler"
                    name="vehicleType"
                    value="2 Wheeler"
                    checked={formData.vehicleType === '2 Wheeler'}
                    onChange={handleChange}
                    className={errors.vehicleType ? 'error' : ''}
                  />
                  <label htmlFor="twoWheeler" className="form-check-label">2 Wheeler</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="radio"
                    id="eRickshaw"
                    name="vehicleType"
                    value="3 Wheeler E-Rickshaw"
                    checked={formData.vehicleType === '3 Wheeler E-Rickshaw'}
                    onChange={handleChange}
                    className={errors.vehicleType ? 'error' : ''}
                  />
                  <label htmlFor="eRickshaw" className="form-check-label">3 Wheeler E-Rickshaw</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="radio"
                    id="loader"
                    name="vehicleType"
                    value="3 Wheeler Loader"
                    checked={formData.vehicleType === '3 Wheeler Loader'}
                    onChange={handleChange}
                    className={errors.vehicleType ? 'error' : ''}
                  />
                  <label htmlFor="loader" className="form-check-label">3 Wheeler Loader</label>
                </div>
              </div>
              {errors.vehicleType && <div className="error-message">{errors.vehicleType}</div>}
            </div>
            
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
                <label htmlFor="email" className="form-label">Email:</label>
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
              <h4 className="form-section-title">Vehicle Information</h4>
              
              <div className="form-group">
                <label htmlFor="vehicleMake" className="form-label">Vehicle Make:</label>
                <input
                  type="text"
                  id="vehicleMake"
                  name="vehicleMake"
                  className={`form-control ${errors.vehicleMake ? 'error' : ''}`}
                  value={formData.vehicleMake}
                  onChange={handleChange}
                />
                {errors.vehicleMake && <div className="error-message">{errors.vehicleMake}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="model" className="form-label">Model:</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  className={`form-control ${errors.model ? 'error' : ''}`}
                  value={formData.model}
                  onChange={handleChange}
                />
                {errors.model && <div className="error-message">{errors.model}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="yearOfManufacture" className="form-label">Year of Manufacture:</label>
                <input
                  type="text"
                  id="yearOfManufacture"
                  name="yearOfManufacture"
                  className={`form-control ${errors.yearOfManufacture ? 'error' : ''}`}
                  value={formData.yearOfManufacture}
                  onChange={handleChange}
                />
                {errors.yearOfManufacture && <div className="error-message">{errors.yearOfManufacture}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="registrationNumber" className="form-label">Vehicle Registration No.:</label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  className={`form-control ${errors.registrationNumber ? 'error' : ''}`}
                  value={formData.registrationNumber}
                  onChange={handleChange}
                />
                {errors.registrationNumber && <div className="error-message">{errors.registrationNumber}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="vinNumber" className="form-label">VIN/Chassis No.:</label>
                <input
                  type="text"
                  id="vinNumber"
                  name="vinNumber"
                  className={`form-control ${errors.vinNumber ? 'error' : ''}`}
                  value={formData.vinNumber}
                  onChange={handleChange}
                />
                {errors.vinNumber && <div className="error-message">{errors.vinNumber}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="batteryTypeCapacity" className="form-label">Battery Type & Capacity:</label>
                <input
                  type="text"
                  id="batteryTypeCapacity"
                  name="batteryTypeCapacity"
                  className={`form-control ${errors.batteryTypeCapacity ? 'error' : ''}`}
                  value={formData.batteryTypeCapacity}
                  onChange={handleChange}
                />
                {errors.batteryTypeCapacity && <div className="error-message">{errors.batteryTypeCapacity}</div>}
              </div>
            </div>
            
            <div className="form-section">
              <h4 className="form-section-title">Reported Issues (Check all that apply)</h4>
              
              <div className="form-check-grid">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="notCharging"
                    name="reportedIssues"
                    value="Battery Not Charging"
                    checked={formData.reportedIssues.includes('Battery Not Charging')}
                    onChange={handleChange}
                    className={errors.reportedIssues ? 'error' : ''}
                  />
                  <label htmlFor="notCharging" className="form-check-label">Battery Not Charging</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="reducedRange"
                    name="reportedIssues"
                    value="Reduced Range"
                    checked={formData.reportedIssues.includes('Reduced Range')}
                    onChange={handleChange}
                    className={errors.reportedIssues ? 'error' : ''}
                  />
                  <label htmlFor="reducedRange" className="form-check-label">Reduced Range</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="motorNotRunning"
                    name="reportedIssues"
                    value="Motor Not Running"
                    checked={formData.reportedIssues.includes('Motor Not Running')}
                    onChange={handleChange}
                    className={errors.reportedIssues ? 'error' : ''}
                  />
                  <label htmlFor="motorNotRunning" className="form-check-label">Motor Not Running</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="unusualNoise"
                    name="reportedIssues"
                    value="Unusual Noise"
                    checked={formData.reportedIssues.includes('Unusual Noise')}
                    onChange={handleChange}
                    className={errors.reportedIssues ? 'error' : ''}
                  />
                  <label htmlFor="unusualNoise" className="form-check-label">Unusual Noise</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="dashboardWarning"
                    name="reportedIssues"
                    value="Dashboard Warning Lights"
                    checked={formData.reportedIssues.includes('Dashboard Warning Lights')}
                    onChange={handleChange}
                    className={errors.reportedIssues ? 'error' : ''}
                  />
                  <label htmlFor="dashboardWarning" className="form-check-label">Dashboard Warning Lights</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="brakeIssues"
                    name="reportedIssues"
                    value="Brake Issues"
                    checked={formData.reportedIssues.includes('Brake Issues')}
                    onChange={handleChange}
                    className={errors.reportedIssues ? 'error' : ''}
                  />
                  <label htmlFor="brakeIssues" className="form-check-label">Brake Issues</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="softwareGlitches"
                    name="reportedIssues"
                    value="Software Glitches"
                    checked={formData.reportedIssues.includes('Software Glitches')}
                    onChange={handleChange}
                    className={errors.reportedIssues ? 'error' : ''}
                  />
                  <label htmlFor="softwareGlitches" className="form-check-label">Software Glitches</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="chargingPortProblems"
                    name="reportedIssues"
                    value="Charging Port Problems"
                    checked={formData.reportedIssues.includes('Charging Port Problems')}
                    onChange={handleChange}
                    className={errors.reportedIssues ? 'error' : ''}
                  />
                  <label htmlFor="chargingPortProblems" className="form-check-label">Charging Port Problems</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="otherIssue"
                    name="reportedIssues"
                    value="Other"
                    checked={formData.reportedIssues.includes('Other')}
                    onChange={handleChange}
                    className={errors.reportedIssues ? 'error' : ''}
                  />
                  <label htmlFor="otherIssue" className="form-check-label">Other</label>
                </div>
              </div>
              
              {formData.reportedIssues.includes('Other') && (
                <div className="form-group">
                  <input
                    type="text"
                    id="otherIssueText"
                    name="otherIssue"
                    className={`form-control ${errors.otherIssue ? 'error' : ''}`}
                    value={formData.otherIssue}
                    onChange={handleChange}
                    placeholder="Please describe the issue"
                  />
                  {errors.otherIssue && <div className="error-message">{errors.otherIssue}</div>}
                </div>
              )}
              
              {errors.reportedIssues && <div className="error-message">{errors.reportedIssues}</div>}
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
                    id="batteryDiagnostics"
                    name="repairActions"
                    value="Battery Diagnostics"
                    checked={formData.repairActions.includes('Battery Diagnostics')}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="batteryDiagnostics" className="form-check-label">Battery Diagnostics</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="batteryRepair"
                    name="repairActions"
                    value="Battery Repair/Replacement"
                    checked={formData.repairActions.includes('Battery Repair/Replacement')}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="batteryRepair" className="form-check-label">Battery Repair/Replacement</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="motorService"
                    name="repairActions"
                    value="Motor Service/Replacement"
                    checked={formData.repairActions.includes('Motor Service/Replacement')}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="motorService" className="form-check-label">Motor Service/Replacement</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="ecuUpdate"
                    name="repairActions"
                    value="ECU/Software Update"
                    checked={formData.repairActions.includes('ECU/Software Update')}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="ecuUpdate" className="form-check-label">ECU/Software Update</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="brakeSystemRepair"
                    name="repairActions"
                    value="Brake System Repair"
                    checked={formData.repairActions.includes('Brake System Repair')}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="brakeSystemRepair" className="form-check-label">Brake System Repair</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="chargingSystemRepair"
                    name="repairActions"
                    value="Charging System Repair"
                    checked={formData.repairActions.includes('Charging System Repair')}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="chargingSystemRepair" className="form-check-label">Charging System Repair</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="wiringRepair"
                    name="repairActions"
                    value="Wiring / Connector Repair"
                    checked={formData.repairActions.includes('Wiring / Connector Repair')}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="wiringRepair" className="form-check-label">Wiring / Connector Repair</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="otherRepairAction"
                    name="repairActions"
                    value="Other"
                    checked={formData.repairActions.includes('Other')}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="otherRepairAction" className="form-check-label">Other</label>
                </div>
              </div>
              
              <h4 className="form-section-title">Parts Replaced</h4>
              <div className="form-group">
                <input
                  type="text"
                  id="partsReplaced[0]"
                  name="partsReplaced[0]"
                  className="form-control"
                  value={formData.partsReplaced[0]}
                  onChange={handleChange}
                  disabled
                  placeholder="Part 1"
                />
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  id="partsReplaced[1]"
                  name="partsReplaced[1]"
                  className="form-control"
                  value={formData.partsReplaced[1]}
                  onChange={handleChange}
                  disabled
                  placeholder="Part 2"
                />
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  id="partsReplaced[2]"
                  name="partsReplaced[2]"
                  className="form-control"
                  value={formData.partsReplaced[2]}
                  onChange={handleChange}
                  disabled
                  placeholder="Part 3"
                />
              </div>
              
              <h4 className="form-section-title">Service Status</h4>
              <div className="form-check-group">
                <div className="form-check">
                  <input
                    type="radio"
                    id="repaired"
                    name="serviceStatus"
                    value="Repaired"
                    checked={formData.serviceStatus === 'Repaired'}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="repaired" className="form-check-label">Repaired</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="radio"
                    id="needsFurtherDiagnosis"
                    name="serviceStatus"
                    value="Needs Further Diagnosis"
                    checked={formData.serviceStatus === 'Needs Further Diagnosis'}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="needsFurtherDiagnosis" className="form-check-label">Needs Further Diagnosis</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="radio"
                    id="returnedUnrepaired"
                    name="serviceStatus"
                    value="Returned Unrepaired"
                    checked={formData.serviceStatus === 'Returned Unrepaired'}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="returnedUnrepaired" className="form-check-label">Returned Unrepaired</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="radio"
                    id="underWarranty"
                    name="serviceStatus"
                    value="Under Warranty"
                    checked={formData.serviceStatus === 'Under Warranty'}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="underWarranty" className="form-check-label">Under Warranty</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="radio"
                    id="outOfWarranty"
                    name="serviceStatus"
                    value="Out of Warranty"
                    checked={formData.serviceStatus === 'Out of Warranty'}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="outOfWarranty" className="form-check-label">Out of Warranty</label>
                </div>
              </div>
              
              <h4 className="form-section-title">Service Details</h4>
              <div className="form-group">
                <label htmlFor="receivedDate" className="form-label">Received Date:</label>
                <input
                  type="date"
                  id="receivedDate"
                  name="receivedDate"
                  className="form-control"
                  value={formData.receivedDate}
                  onChange={handleChange}
                  disabled
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="completedDate" className="form-label">Completed Date:</label>
                <input
                  type="date"
                  id="completedDate"
                  name="completedDate"
                  className="form-control"
                  value={formData.completedDate}
                  onChange={handleChange}
                  disabled
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="technicianName" className="form-label">Technician Name:</label>
                <input
                  type="text"
                  id="technicianName"
                  name="technicianName"
                  className="form-control"
                  value={formData.technicianName}
                  onChange={handleChange}
                  disabled
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="remarks" className="form-label">Remarks:</label>
                <textarea
                  id="remarks"
                  name="remarks"
                  className="form-control"
                  value={formData.remarks}
                  onChange={handleChange}
                  rows="3"
                  disabled
                ></textarea>
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

export default VehicleRepairPage;
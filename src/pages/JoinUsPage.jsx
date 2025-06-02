import React, { useState } from 'react';
import { Wrench, Briefcase, MapPin, UserCheck } from 'lucide-react';
import './JoinUsPage.css';

const JoinUsPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    email: '',
    address: '',
    qualification: '',
    otherQualification: '',
    specialization: [],
    otherSpecialization: '',
    experience: '',
    skills: [],
    preferredLocation: '',
    availableForTravel: '',
    additionalInfo: ''
  });
  
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const updatedArray = checked
        ? [...formData[name], value]
        : formData[name].filter(item => item !== value);
      
      setFormData({
        ...formData,
        [name]: updatedArray
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
    
    // Basic validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    // Professional information
    if (!formData.qualification) newErrors.qualification = 'Qualification is required';
    if (formData.qualification === 'Other' && !formData.otherQualification.trim()) {
      newErrors.otherQualification = 'Please specify your qualification';
    }
    
    if (formData.specialization.length === 0) {
      newErrors.specialization = 'Please select at least one specialization';
    }
    if (formData.specialization.includes('Other') && !formData.otherSpecialization.trim()) {
      newErrors.otherSpecialization = 'Please specify your specialization';
    }
    
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (formData.skills.length === 0) {
      newErrors.skills = 'Please select at least one skill';
    }
    
    // Availability
    if (!formData.preferredLocation) newErrors.preferredLocation = 'Preferred location is required';
    if (!formData.availableForTravel) newErrors.availableForTravel = 'Please indicate travel availability';
    
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
    <div className="join-us-page">
      <div className="page-header">
        <div className="container">
          <h1>Join Our Team of EV Experts</h1>
          <p>Be part of India's electric mobility revolution with BHARAT EVs</p>
        </div>
      </div>
      
      <div className="container">
        {formSubmitted ? (
          <div className="join-success-container">
            <div className="success-icon">✓</div>
            <h2>Application Submitted Successfully!</h2>
            <p>Thank you for your interest in joining the BHARAT EVs team. We've received your application and will review it shortly.</p>
            <p>Our HR team will contact you within 7 working days to discuss the next steps.</p>
            <p className="reference-number">Application ID: ENG-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
            <button onClick={() => window.location.href = '/'} className="btn">Return to Home</button>
          </div>
        ) : (
          <div className="join-us-content">
            <div className="join-us-info">
              <div className="why-join-section">
                <h2>Why Join BHARAT EVs?</h2>
                <div className="benefits-grid">
                  <div className="benefit-card">
                    <div className="benefit-icon">
                      <Briefcase size={28} />
                    </div>
                    <h3>Career Growth</h3>
                    <p>Advance your career in the rapidly growing electric vehicle industry</p>
                  </div>
                  
                  <div className="benefit-card">
                    <div className="benefit-icon">
                      <Wrench size={28} />
                    </div>
                    <h3>Technical Expertise</h3>
                    <p>Work with cutting-edge EV technology and enhance your skills</p>
                  </div>
                  
                  <div className="benefit-card">
                    <div className="benefit-icon">
                      <UserCheck size={28} />
                    </div>
                    <h3>Competitive Benefits</h3>
                    <p>Enjoy competitive salary, health benefits, and skill development allowances</p>
                  </div>
                  
                  <div className="benefit-card">
                    <div className="benefit-icon">
                      <MapPin size={28} />
                    </div>
                    <h3>Nationwide Opportunities</h3>
                    <p>Work from multiple locations across India with our expanding network</p>
                  </div>
                </div>
                
                <div className="requirements-section">
                  <h3>Requirements for Service Engineers:</h3>
                  <ul>
                    <li>Technical education in Electrical, Electronics, Mechanical, or Automotive Engineering</li>
                    <li>Experience with EV systems, batteries, or automotive repairs (preferred)</li>
                    <li>Strong problem-solving skills and attention to detail</li>
                    <li>Good communication skills to interact with customers</li>
                    <li>Willingness to learn and adapt to new technologies</li>
                  </ul>
                </div>
              </div>
              
              <div className="join-image-container">
                <img 
                  src="https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="EV Service Engineers at work" 
                  className="join-image" 
                />
              </div>
            </div>
            
            <div className="application-form-container">
              <h2>Service Engineer Registration Application Form</h2>
              
              <form className="application-form" onSubmit={handleSubmit}>
                <div className="form-section">
                  <h3 className="form-section-title">Personal Information</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName" className="form-label">First Name <span className="required">*</span></label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className={`form-control ${errors.firstName ? 'error' : ''}`}
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="middleName" className="form-label">Middle Name</label>
                      <input
                        type="text"
                        id="middleName"
                        name="middleName"
                        className="form-control"
                        value={formData.middleName}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="lastName" className="form-label">Last Name <span className="required">*</span></label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className={`form-control ${errors.lastName ? 'error' : ''}`}
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="dateOfBirth" className="form-label">Date of Birth <span className="required">*</span></label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        className={`form-control ${errors.dateOfBirth ? 'error' : ''}`}
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                      />
                      {errors.dateOfBirth && <div className="error-message">{errors.dateOfBirth}</div>}
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Gender <span className="required">*</span></label>
                      <div className="form-check-group">
                        <div className="form-check">
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="Male"
                            checked={formData.gender === 'Male'}
                            onChange={handleChange}
                            className={errors.gender ? 'error' : ''}
                          />
                          <label htmlFor="male" className="form-check-label">Male</label>
                        </div>
                        
                        <div className="form-check">
                          <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="Female"
                            checked={formData.gender === 'Female'}
                            onChange={handleChange}
                            className={errors.gender ? 'error' : ''}
                          />
                          <label htmlFor="female" className="form-check-label">Female</label>
                        </div>
                      </div>
                      {errors.gender && <div className="error-message">{errors.gender}</div>}
                    </div>
                  </div>
                </div>
                
                <div className="form-section">
                  <h3 className="form-section-title">Contact Information</h3>
                  
                  <div className="form-group">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number <span className="required">*</span></label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Your Phone Number"
                      className={`form-control ${errors.phoneNumber ? 'error' : ''}`}
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                    {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address <span className="required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your Email Address"
                      className={`form-control ${errors.email ? 'error' : ''}`}
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="address" className="form-label">Residential Address <span className="required">*</span></label>
                    <textarea
                      id="address"
                      name="address"
                      placeholder="Street Address, City, State, Postal Code"
                      className={`form-control ${errors.address ? 'error' : ''}`}
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                    ></textarea>
                    {errors.address && <div className="error-message">{errors.address}</div>}
                  </div>
                </div>
                
                <div className="form-section">
                  <h3 className="form-section-title">Professional Information</h3>
                  
                  <div className="form-group">
                    <label className="form-label">Highest Qualification <span className="required">*</span></label>
                    <div className="form-check-group qualification-group">
                      <div className="form-check">
                        <input
                          type="radio"
                          id="diploma"
                          name="qualification"
                          value="Diploma in Engineering"
                          checked={formData.qualification === 'Diploma in Engineering'}
                          onChange={handleChange}
                          className={errors.qualification ? 'error' : ''}
                        />
                        <label htmlFor="diploma" className="form-check-label">Diploma in Engineering</label>
                      </div>
                      
                      <div className="form-check">
                        <input
                          type="radio"
                          id="bachelor"
                          name="qualification"
                          value="Bachelor's Degree in Engineering"
                          checked={formData.qualification === 'Bachelor\'s Degree in Engineering'}
                          onChange={handleChange}
                          className={errors.qualification ? 'error' : ''}
                        />
                        <label htmlFor="bachelor" className="form-check-label">Bachelor's Degree in Engineering</label>
                      </div>
                      
                      <div className="form-check">
                        <input
                          type="radio"
                          id="master"
                          name="qualification"
                          value="Master's Degree"
                          checked={formData.qualification === 'Master\'s Degree'}
                          onChange={handleChange}
                          className={errors.qualification ? 'error' : ''}
                        />
                        <label htmlFor="master" className="form-check-label">Master's Degree</label>
                      </div>
                      
                      <div className="form-check">
                        <input
                          type="radio"
                          id="otherQualification"
                          name="qualification"
                          value="Other"
                          checked={formData.qualification === 'Other'}
                          onChange={handleChange}
                          className={errors.qualification ? 'error' : ''}
                        />
                        <label htmlFor="otherQualification" className="form-check-label">Others</label>
                        
                        {formData.qualification === 'Other' && (
                          <input
                            type="text"
                            id="otherQualificationText"
                            name="otherQualification"
                            className={`form-control form-control-inline ${errors.otherQualification ? 'error' : ''}`}
                            value={formData.otherQualification}
                            onChange={handleChange}
                            placeholder="Please specify"
                          />
                        )}
                      </div>
                    </div>
                    {errors.qualification && <div className="error-message">{errors.qualification}</div>}
                    {errors.otherQualification && <div className="error-message">{errors.otherQualification}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Field of Specialization <span className="required">*</span></label>
                    <div className="form-check-grid">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="lithiumBattery"
                          name="specialization"
                          value="Lithium battery (2W &3W)"
                          checked={formData.specialization.includes('Lithium battery (2W &3W)')}
                          onChange={handleChange}
                          className={errors.specialization ? 'error' : ''}
                        />
                        <label htmlFor="lithiumBattery" className="form-check-label">Lithium battery (2W &3W)</label>
                      </div>
                      
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="vehicleRepairing"
                          name="specialization"
                          value="2W/3W vehicle repairing"
                          checked={formData.specialization.includes('2W/3W vehicle repairing')}
                          onChange={handleChange}
                          className={errors.specialization ? 'error' : ''}
                        />
                        <label htmlFor="vehicleRepairing" className="form-check-label">2W/3W vehicle repairing</label>
                      </div>
                      
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="motorController"
                          name="specialization"
                          value="Motor/ Controller repairing"
                          checked={formData.specialization.includes('Motor/ Controller repairing')}
                          onChange={handleChange}
                          className={errors.specialization ? 'error' : ''}
                        />
                        <label htmlFor="motorController" className="form-check-label">Motor/ Controller repairing</label>
                      </div>
                      
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="softwareEngineering"
                          name="specialization"
                          value="Software Engineering"
                          checked={formData.specialization.includes('Software Engineering')}
                          onChange={handleChange}
                          className={errors.specialization ? 'error' : ''}
                        />
                        <label htmlFor="softwareEngineering" className="form-check-label">Software Engineering</label>
                      </div>
                      
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="otherSpecialization"
                          name="specialization"
                          value="Other"
                          checked={formData.specialization.includes('Other')}
                          onChange={handleChange}
                          className={errors.specialization ? 'error' : ''}
                        />
                        <label htmlFor="otherSpecialization" className="form-check-label">Other</label>
                      </div>
                    </div>
                    
                    {formData.specialization.includes('Other') && (
                      <div className="form-group">
                        <input
                          type="text"
                          id="otherSpecializationText"
                          name="otherSpecialization"
                          className={`form-control ${errors.otherSpecialization ? 'error' : ''}`}
                          value={formData.otherSpecialization}
                          onChange={handleChange}
                          placeholder="Please specify other specializations"
                        />
                        {errors.otherSpecialization && <div className="error-message">{errors.otherSpecialization}</div>}
                      </div>
                    )}
                    {errors.specialization && <div className="error-message">{errors.specialization}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Years of Experience <span className="required">*</span></label>
                    <div className="form-check-group">
                      <div className="form-check">
                        <input
                          type="radio"
                          id="exp0_2"
                          name="experience"
                          value="0-2 Years"
                          checked={formData.experience === '0-2 Years'}
                          onChange={handleChange}
                          className={errors.experience ? 'error' : ''}
                        />
                        <label htmlFor="exp0_2" className="form-check-label">0-2 Years</label>
                      </div>
                      
                      <div className="form-check">
                        <input
                          type="radio"
                          id="exp3_5"
                          name="experience"
                          value="3-5 Years"
                          checked={formData.experience === '3-5 Years'}
                          onChange={handleChange}
                          className={errors.experience ? 'error' : ''}
                        />
                        <label htmlFor="exp3_5" className="form-check-label">3-5 Years</label>
                      </div>
                      
                      <div className="form-check">
                        <input
                          type="radio"
                          id="exp6_10"
                          name="experience"
                          value="6-10 Years"
                          checked={formData.experience === '6-10 Years'}
                          onChange={handleChange}
                          className={errors.experience ? 'error' : ''}
                        />
                        <label htmlFor="exp6_10" className="form-check-label">6-10 Years</label>
                      </div>
                      
                      <div className="form-check">
                        <input
                          type="radio"
                          id="exp10Plus"
                          name="experience"
                          value="10+ Years"
                          checked={formData.experience === '10+ Years'}
                          onChange={handleChange}
                          className={errors.experience ? 'error' : ''}
                        />
                        <label htmlFor="exp10Plus" className="form-check-label">10+ Years</label>
                      </div>
                    </div>
                    {errors.experience && <div className="error-message">{errors.experience}</div>}
                  </div>
                </div>
                
                <div className="form-section">
                  <h3 className="form-section-title">Skills and Areas of Expertise</h3>
                  
                  <div className="form-group">
                    <label className="form-label">Key Skills <span className="required">*</span></label>
                    <div className="form-check-grid">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="maintenance"
                          name="skills"
                          value="Maintenance and Repair"
                          checked={formData.skills.includes('Maintenance and Repair')}
                          onChange={handleChange}
                          className={errors.skills ? 'error' : ''}
                        />
                        <label htmlFor="maintenance" className="form-check-label">Maintenance and Repair</label>
                      </div>
                      
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="installation"
                          name="skills"
                          value="Installation and Commissioning"
                          checked={formData.skills.includes('Installation and Commissioning')}
                          onChange={handleChange}
                          className={errors.skills ? 'error' : ''}
                        />
                        <label htmlFor="installation" className="form-check-label">Installation and Commissioning</label>
                      </div>
                      
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="troubleshooting"
                          name="skills"
                          value="Troubleshooting"
                          checked={formData.skills.includes('Troubleshooting')}
                          onChange={handleChange}
                          className={errors.skills ? 'error' : ''}
                        />
                        <label htmlFor="troubleshooting" className="form-check-label">Troubleshooting</label>
                      </div>
                      
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="systemTesting"
                          name="skills"
                          value="System Testing"
                          checked={formData.skills.includes('System Testing')}
                          onChange={handleChange}
                          className={errors.skills ? 'error' : ''}
                        />
                        <label htmlFor="systemTesting" className="form-check-label">System Testing</label>
                      </div>
                      
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="softwareIntegration"
                          name="skills"
                          value="Software Integration"
                          checked={formData.skills.includes('Software Integration')}
                          onChange={handleChange}
                          className={errors.skills ? 'error' : ''}
                        />
                        <label htmlFor="softwareIntegration" className="form-check-label">Software Integration</label>
                      </div>
                    </div>
                    {errors.skills && <div className="error-message">{errors.skills}</div>}
                  </div>
                </div>
                
                <div className="form-section">
                  <h3 className="form-section-title">Availability</h3>
                  
                  <div className="form-group">
                    <label className="form-label">Preferred Work Locations <span className="required">*</span></label>
                    <div className="form-check-group">
                      <div className="form-check">
                        <input
                          type="radio"
                          id="localArea"
                          name="preferredLocation"
                          value="Local Area"
                          checked={formData.preferredLocation === 'Local Area'}
                          onChange={handleChange}
                          className={errors.preferredLocation ? 'error' : ''}
                        />
                        <label htmlFor="localArea" className="form-check-label">Local Area</label>
                      </div>
                      
                      <div className="form-check">
                        <input
                          type="radio"
                          id="statewide"
                          name="preferredLocation"
                          value="Statewide"
                          checked={formData.preferredLocation === 'Statewide'}
                          onChange={handleChange}
                          className={errors.preferredLocation ? 'error' : ''}
                        />
                        <label htmlFor="statewide" className="form-check-label">Statewide</label>
                      </div>
                    </div>
                    {errors.preferredLocation && <div className="error-message">{errors.preferredLocation}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Available for Travel? <span className="required">*</span></label>
                    <div className="form-check-group">
                      <div className="form-check">
                        <input
                          type="radio"
                          id="travelYes"
                          name="availableForTravel"
                          value="Yes"
                          checked={formData.availableForTravel === 'Yes'}
                          onChange={handleChange}
                          className={errors.availableForTravel ? 'error' : ''}
                        />
                        <label htmlFor="travelYes" className="form-check-label">Yes</label>
                      </div>
                      
                      <div className="form-check">
                        <input
                          type="radio"
                          id="travelNo"
                          name="availableForTravel"
                          value="No"
                          checked={formData.availableForTravel === 'No'}
                          onChange={handleChange}
                          className={errors.availableForTravel ? 'error' : ''}
                        />
                        <label htmlFor="travelNo" className="form-check-label">No</label>
                      </div>
                      
                      <div className="form-check">
                        <input
                          type="radio"
                          id="travelOccasionally"
                          name="availableForTravel"
                          value="Occasionally"
                          checked={formData.availableForTravel === 'Occasionally'}
                          onChange={handleChange}
                          className={errors.availableForTravel ? 'error' : ''}
                        />
                        <label htmlFor="travelOccasionally" className="form-check-label">Occasionally</label>
                      </div>
                    </div>
                    {errors.availableForTravel && <div className="error-message">{errors.availableForTravel}</div>}
                  </div>
                </div>
                
                <div className="form-section">
                  <h3 className="form-section-title">Additional Information</h3>
                  
                  <div className="form-group">
                    <label htmlFor="additionalInfo" className="form-label">
                      Please provide any additional details you would like to share regarding your experience or expertise:
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      className="form-control"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows="4"
                    ></textarea>
                  </div>
                </div>
                
                <div className="form-section declaration-section">
                  <h3 className="form-section-title">Declaration</h3>
                  
                  <div className="declaration-content">
                    <p>
                      I hereby declare that the information provided in this application is true and correct to the best of my knowledge. 
                      I understand that any false information may lead to disqualification or revocation of my registration as a service engineer.
                    </p>
                    
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="declarationAgreement"
                        name="declarationAgreement"
                        checked={formData.declarationAgreement}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="declarationAgreement" className="form-check-label">
                        I agree with the above declaration and confirm that all information provided is accurate.
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn btn-lg">Submit Application</button>
                  <button type="reset" className="btn btn-secondary btn-lg" onClick={() => setFormData({
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    dateOfBirth: '',
                    gender: '',
                    phoneNumber: '',
                    email: '',
                    address: '',
                    qualification: '',
                    otherQualification: '',
                    specialization: [],
                    otherSpecialization: '',
                    experience: '',
                    skills: [],
                    preferredLocation: '',
                    availableForTravel: '',
                    additionalInfo: ''
                  })}>Reset Form</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinUsPage;
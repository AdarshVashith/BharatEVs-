import React from 'react';
import './StaticPages.css';

const PrivacyPolicy = () => {
  return (
    <div className="static-page">
      <div className="page-header">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Your privacy is important to us at BHARAT EVs.</p>
        </div>
      </div>

      <div className="container">
        <section className="section">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as name, phone number,
            email, address, and service details submitted through forms like battery/vehicle
            service or repair requests.
          </p>
        </section>

        <section className="section">
          <h2>2. How We Use Information</h2>
          <ul>
            <li>Provide, maintain and improve our services</li>
            <li>Process payments and send confirmations/receipts</li>
            <li>Communicate with you about updates, support and promotions</li>
            <li>Ensure safety, security, and legal compliance</li>
          </ul>
        </section>

        <section className="section">
          <h2>3. Sharing of Information</h2>
          <p>
            We do not sell your personal information. We may share data with trusted service
            providers (e.g., payment processors) who work on our behalf, bound by obligations of
            confidentiality, or when required by law.
          </p>
        </section>

        <section className="section">
          <h2>4. Data Security</h2>
          <p>
            We implement reasonable technical and organizational measures to protect your data.
            However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section className="section">
          <h2>5. Your Choices</h2>
          <ul>
            <li>Access, correct, or delete your information by contacting us</li>
            <li>Opt out of promotional messages at any time</li>
          </ul>
        </section>

        <section className="section">
          <h2>Contact Information</h2>
          <p>
            Phone: <strong>+91 94858 78695</strong><br />
            Email: <strong>info@bharatevs.com</strong><br />
            Office: <strong>C-2 Circle road Bhavnagar Gujrat, India</strong>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

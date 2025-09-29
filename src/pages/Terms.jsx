import React from 'react';
import './StaticPages.css';

const Terms = () => {
  return (
    <div className="static-page">
      <div className="page-header">
        <div className="container">
          <h1>Terms & Conditions</h1>
          <p>Please read these terms and conditions carefully before using BHARAT EVs services.</p>
        </div>
      </div>

      <div className="container">
        <section className="section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using our services, you agree to be bound by these Terms & Conditions.
            If you do not agree, please do not use our services.
          </p>
        </section>

        <section className="section">
          <h2>2. Services</h2>
          <p>
            We provide EV battery and vehicle service/repair. Service timelines and outcomes depend on
            diagnostics and parts availability. Any estimates provided are indicative.
          </p>
        </section>

        <section className="section">
          <h2>3. Payments</h2>
          <ul>
            <li>Inspection fee (e.g., ₹499) is due prior to service and is non-refundable</li>
            <li>Final charges depend on actual parts and labor used</li>
            <li>Invoices must be paid upon completion unless credit terms are pre-approved</li>
          </ul>
        </section>

        <section className="section">
          <h2>4. Warranty</h2>
          <p>
            Limited warranties may apply to certain parts/services as mentioned on the invoice. Warranty
            becomes void if the product is tampered with or serviced by unauthorized personnel after our service.
          </p>
        </section>

        <section className="section">
          <h2>5. Liability</h2>
          <p>
            We exercise due care but are not liable for incidental, indirect, or consequential damages.
            Customers are responsible for backup and removal of any personal data from vehicles/devices.
          </p>
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

export default Terms;

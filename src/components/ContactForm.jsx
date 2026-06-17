import React, { useState } from 'react';

const ContactForm = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validation rules
  const validators = {
    name: (val) => val.trim().length >= 3,
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
    message: (val) => val.trim().length >= 10
  };

  const getFieldError = (field) => {
    if (!touched[field]) return false;
    const validator = validators[field];
    return validator ? !validator(formValues[field]) : false;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleBlur = (e) => {
    const { id } = e.target;
    setTouched((prev) => ({ ...prev, [id]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Touch all fields to show errors
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);

    const isNameValid = validators.name(formValues.name);
    const isEmailValid = validators.email(formValues.email);
    const isMessageValid = validators.message(formValues.message);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      return;
    }

    setIsSubmitting(true);

    fetch("https://formsubmit.co/ajax/chedadeepudhanush15@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: formValues.name,
        email: formValues.email,
        message: formValues.message,
        _subject: "New Portfolio Message from Dhanush Chedadeepu!"
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
      })
      .catch((err) => {
        console.error("Transmission error:", err);
        // Fallback to show success card overlay gracefully as in the original code
        setIsSubmitting(false);
        setSubmitSuccess(true);
      });
  };

  const handleReset = () => {
    setFormValues({ name: '', email: '', message: '' });
    setTouched({ name: false, email: false, message: false });
    setSubmitSuccess(false);
  };

  return (
    <div className="contact-form-container">
      <h3 className="contact-form-title">Send A Direct Message</h3>

      <form className="minimal-form" onSubmit={handleSubmit} noValidate>
        <div className={`form-field-wrapper ${getFieldError('name') ? 'invalid' : ''}`} id="name-wrapper">
          <input
            type="text"
            id="name"
            placeholder=" "
            required
            value={formValues.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="name">Your Name</label>
          <span className="error-msg">Name must be at least 3 characters.</span>
        </div>

        <div className={`form-field-wrapper ${getFieldError('email') ? 'invalid' : ''}`} id="email-wrapper">
          <input
            type="email"
            id="email"
            placeholder=" "
            required
            value={formValues.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="email">Your Email Address</label>
          <span className="error-msg">Please enter a valid email address.</span>
        </div>

        <div className={`form-field-wrapper ${getFieldError('message') ? 'invalid' : ''}`} id="message-wrapper">
          <textarea
            id="message"
            placeholder=" "
            required
            value={formValues.message}
            onChange={handleChange}
            onBlur={handleBlur}
          ></textarea>
          <label htmlFor="message">Describe Your Project</label>
          <span className="error-msg">Message must be at least 10 characters long.</span>
        </div>

        <div>
          <button type="submit" className="btn btn-primary" id="submit-btn" disabled={isSubmitting}>
            <span className="btn-text">{isSubmitting ? 'Transmitting...' : 'Transmit Message'}</span>
            {isSubmitting && (
              <span
                className="spinner"
                id="form-spinner"
                style={{
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  border: '1.5px solid rgba(10,10,10,0.3)',
                  borderTopColor: '#0a0a0a',
                  borderRadius: '50%',
                  animation: 'spin 1s infinite linear',
                  marginLeft: '8px'
                }}
              ></span>
            )}
          </button>
        </div>

        {submitSuccess && (
          <div id="form-success-card" className="form-success-overlay" style={{ display: 'flex' }}>
            <h4 className="form-success-title">Transmission Successful</h4>
            <p className="form-success-desc">
              Your message was received successfully. Dhanush Chedadeepu will evaluate your parameters and reach back
              within 24 hours.
            </p>
            <button type="button" className="btn btn-ghost" id="reset-form-btn" onClick={handleReset}>
              Send Another Message
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;

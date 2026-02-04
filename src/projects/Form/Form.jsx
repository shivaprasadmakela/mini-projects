import React, { useState } from "react";
import styles from "./Form.module.scss";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmittedData(formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="page-wrapper">
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Contact Form</h1>
        
        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              className="input-field"
              onChange={handleChange}
              placeholder="Elon Musk"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
              placeholder="elon@mars.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="input-field"
              style={{ minHeight: "120px", resize: "vertical" }}
              placeholder="Tell us everything..."
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Send Message
          </button>
        </form>

        {submittedData && (
          <div className={styles.resultsContainer}>
            <h4>✅ Message Received!</h4>
            <div className={styles.resultRow}>
              <strong>Name:</strong> <span>{submittedData.name}</span>
            </div>
            <div className={styles.resultRow}>
              <strong>Email:</strong> <span>{submittedData.email}</span>
            </div>
            <div className={styles.resultRow}>
              <strong>Story:</strong> <span>{submittedData.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;

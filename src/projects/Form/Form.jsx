import React, { useState } from "react";

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
    setSubmittedData(formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="centerMainDiv">
        <h1>Contact Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          name="name"
          value={formData.name}
          className="input-field"
          onChange={handleChange}
          placeholder="Enter your name"
        />

        <br />

        <label>Email:</label>
        <input
          name="email"
          type="email"
                    className="input-field"

          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <br />

        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
                    className="input-field"

          placeholder="Type your message"
        />

        <br />
        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div style={{ marginTop: "10px" }}>
          <h4>Submitted Data:</h4>
          <p>Name: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
          <p>Message: {submittedData.message}</p>
        </div>
      )}
    </div>
  );
}

export default Form;

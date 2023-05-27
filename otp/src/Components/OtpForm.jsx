import React, { useState } from 'react';

const OtpForm = ({ onSubmit }) => {
  const [otp, setOTP] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(otp);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter OTP:</label>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
        required
      />
      <button type="submit">Submit OTP</button>
    </form>
  );
};

export default OtpForm;

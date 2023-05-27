
import React, { useState } from 'react';

import OTPForm from './Components/OtpForm';
import EmailForm from './Components/EmailForm';


const App = () => {
  const [step, setStep] = useState(1); // 1: Email form, 2: OTP form, 3: Welcome page
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (email) => {
    setEmail(email);
    setStep(2);
    // Send the email to the server to send OTP
    fetch('/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response as needed
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleOTPSubmit = (otp) => {
    // Verify the OTP on the server
    fetch('/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response as needed
        if (data.message === 'OTP verified successfully') {
          setStep(3); // Redirect to the welcome page if OTP is verified
        } else {
          alert('Invalid OTP'); // Show an alert for an invalid OTP
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      {step === 1 && <EmailForm onSubmit={handleEmailSubmit} />}
      {step === 2 &&  <OTPForm onSubmit={handleOTPSubmit} />}
      {step === 3 && <h2>Welcome!</h2>}
    </div>
  );
};

export default App;

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://karunkjohn:qwerty123@cluster0.2ucz2a9.mongodb.net/test',{
// mongoose.connect('mongodb://localhost:27017/otp-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the OTP model and schema
const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
});
const OTP = mongoose.model('OTP', otpSchema);

// Generate a random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
// for testing  because gmail is not working..........................

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

//   let testAccount = await nodemailer.createTestAccount();
//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
    
//     auth: {
//         user: 'hope.walker@ethereal.email',
//         pass: 'dv1t9VrNgcJEQJXaHk'
//     },
//   });


//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });



//testing ending 

// Send OTP email
const sendOTPEmail = async (email, otp) => {
  // Configure nodemailer with your email service credentials
  const transporter = nodemailer.createTransport({
    service: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'hope.walker@ethereal.email',
      pass: 'dv1t9VrNgcJEQJXaHk',
    },
  });

  const mailOptions = {
    from: 'karunjohn007@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

// Handle email form submission and OTP generation
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();

  try {
    // Save OTP to the database
    await OTP.create({ email, otp });

    // Send OTP email
    await sendOTPEmail(email, otp);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
  console.log("this is the otp",otp)
});

// Handle OTP form submission and verification
app.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      // Find the OTP in the database
      const otpData = await OTP.findOne({ email, otp });
  
      if (otpData) {
        // OTP matched, redirect to welcome page
        res.status(200).json({ message: 'OTP verified successfully' });
      } else {
        // Invalid OTP
        res.status(400).json({ error: 'Invalid OTP' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to verify OTP' });
    }
  });

  //testing for view all otp in server

  
app.listen(4000, () => {
  console.log('Server is running on port 5000');
});

import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateToken from '../lib/utils.js';
import mongoose from 'mongoose';
import {transporter, generateRandomPassword} from '../lib/nodeMailer.js';

// SIGNUP
async function signup(req, res) {
  console.log('signup route', req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).send({ message: 'Password must be at least 6 characters long' });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ email, password: hashedPassword });

    generateToken(newUser._id, res);
    await newUser.save();
    return res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send({ message: 'Server Error ' + error.message });
  }
}

// LOGIN
async function login(req, res) {
  try {
    console.log('login route');
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ message: 'Invalid Credentials' });
    }

    generateToken(user._id, res);
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: 'Server Error ' + err.message });
  }
}

// LOGOUT
function logout(req, res) {
  try {
    res.clearCookie('jwt');
    res.status(200).send({ message: 'Logged Out' });
  } catch (error) {
    res.status(500).send({ message: 'Server Error ' + error.message });
  }
}

// UPDATE PROFILE
async function updateProfile(req, res) {
  console.log('updateProfile', req.body);
  try {
    let updateData = {};
    if (req.body.change === 'both' || req.body.change === 'password') {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      updateData.password = hashedPassword;
    }
    if (req.body.change === 'both' || req.body.change === 'email') {
      updateData.email = req.body.email;
    }
    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.email },
      updateData,
      { new: true }
    );
    req.user = updatedUser;
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log('Error in update profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// FORGOT PASSWORD
async function sendPasswordResetEmail(req,res){
  console.log("sendPasswordResetEmail route");
  console.log(req.body);
  try {
    // Find user by email
    const {email} = req.body;
    // console.log(req.body);
    const user = await User.findOne({ email: email });
    console.log("user",user);
    if (!user) {
      throw new Error('User not found');
    }

    // Generate a new random password
    const newPassword = generateRandomPassword();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    const mailOptions = {
      from: 'rohanmaiti69@gmail.com',
      to: email,
      subject: 'ParkLink : Password Recovery',
      html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #007bff;">Password Reset Successful</h2>
      <p>Your new password has been generated:</p>
      <p style="font-size: 18px; font-weight: bold; color: #d9534f;">${newPassword}</p>
      <p>Please make sure to change it after logging in for your security.</p>
      <p>Thank you, <br> The Support Team</p>
      </div>
      `,
    };
    await transporter.sendMail(mailOptions);
    console.log('New password sent successfully');
    res.status(200).json({ message: 'New password sent successfully' });
  } catch (error) {
    console.error('Error sending password:', error);
    res.status(500).json({ message: error.message });
  }
}


// CHECK AUTH
function checkAuth(req, res) {
  console.log('checkauth route');
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error ' + error.message });
  }
}

export { signup, login, logout, updateProfile, checkAuth, sendPasswordResetEmail };

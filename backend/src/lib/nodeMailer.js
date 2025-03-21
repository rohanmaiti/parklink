import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'rohanmaiti69@gmail.com',
      pass: 'lrgvussgdtptrhjf',
    },
  });


const generateRandomPassword = (length = 10) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};
  export  {transporter, generateRandomPassword};
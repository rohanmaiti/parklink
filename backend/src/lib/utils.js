import jwt from 'jsonwebtoken';

function generateToken(userId, res) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.cookie('jwt', token, {
    expiresIn: '1d',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  });

  return token;
}

export default generateToken;

const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.Authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const [, Token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(Token, process.env.APP_SECRET);

    req.userID = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }


}
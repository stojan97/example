const AuthService = require('../services/auth.service');

// usually: "Authorization: Bearer [token]" or "token: [token]"
module.exports = (req, res, next) => {
  let tokenToVerify;

  if (req.header('Authorization')) {
    const parts = req.header('Authorization').split(' ');

    if (parts.length === 2) {
      const bearer = parts[0];
      const credentials = parts[1];
      
      if (/^Bearer$/.test(bearer)) {
        tokenToVerify = credentials;
      } else {
        return res.status(401).json({ msg: 'Format for Authorization: Bearer [token]' });
      }

    } else {
      return res.status(401).json({ msg: 'Format for Authorization: Bearer [token]' });
    }

  } else {
    return res.status(401).json({ msg: 'No Authorization header was found' });
  }

  return AuthService().verify(tokenToVerify, (err, thisToken) => {
    if (err) return res.status(401).json({ err });
    req.token = thisToken;
    return next();
  });
};
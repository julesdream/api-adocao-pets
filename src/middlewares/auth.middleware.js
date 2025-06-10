const jwt = require('jsonwebtoken');

// Middleware de autenticação e autorização com JWT

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }

    req.user = user;
    return next();
  });
  return null;
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    return next();
  };
}

module.exports = { authenticateToken, authorizeRole };

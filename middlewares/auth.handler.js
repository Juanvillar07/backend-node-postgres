const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const { config } = require('./../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkAdminRole(req, res, next) {
  const user = req.user;
  if (user.rolId === 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
}


function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  }
}

const verifyToken = (req, res, next) => {

  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);
  if (!token) {
    return next(boom.unauthorized('Token no proporcionado'));
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    if (error.name === 'TokenExpiredError') {
      return next(boom.unauthorized('El token ha expirado. Por favor, inicia sesión nuevamente.'));
    }
    return next(boom.unauthorized('Token inválido'));
  }
};



module.exports = { checkApiKey, checkAdminRole, checkRoles, verifyToken }

const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const { User, Teacher, Student,Application } = require('../models')

class AuthError extends Error {
  constructor (message) {
    super(message)
    this.name = 'AuthError'
  }
}

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SEC);
    const email = decodedToken.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.user = {
      _id: user._id,
      role: user.role
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  }

  
  function isLoggedIn (req, res, next) {
    if (!req.user) {
      return next(new AuthError('Not logged in'))
    }
    next()
  }
  
  function isAdmin (req, res, next) {
    if (req.user.role !== 'admin') {
      return next(new AuthError('Unauthorized: Admin access required'))
    }
    next()
  }
  
  function isStaff (req, res, next) {
    if (req.user.role !== 'staff') {
      return next(new AuthError('Unauthorized: Staff access required'))
    }
    next()
  }
  
  function isSuperAdmin (req, res, next) {
    if (req.user.role !== 'super') {
      return next(new AuthError('Unauthorized: Super Admin access required'))
    }
    next()
  }
  
  function isStudent (req, res, next) {
    if (req.user.role !== 'student') {
      return next(new AuthError('Unauthorized: Only students can view'))
    }
    next()
  }
  function isTeacher (req, res, next) {
    if (req.user.role !== 'teacher') {
      return next(new AuthError('Unauthorized: Only students can view'))
    }
    next()
  }
  
  
  module.exports = {
    isLoggedIn,
    isAdmin,
    isStaff,
    isSuperAdmin,
    isStudent,
    isTeacher,
    authMiddleware,
  }
  
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/db');

const JWT_SECRET =
  process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// ================= REGISTER =================
router.post('/register', (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Validation
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        error: 'Username, email and password required'
      });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert user
    db.run(
      `INSERT INTO users (username, password, email)
       VALUES (?, ?, ?)`,
      [username, hashedPassword, email],

      function (err) {
        if (err) {
          console.error(err);

          return res.status(400).json({
            success: false,
            error: 'Username already exists'
          });
        }

        res.json({
          success: true,
          message: 'User registered successfully',
          userId: this.lastID
        });
      }
    );

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// ================= LOGIN =================
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Username and password required'
      });
    }

    // Find user
    db.get(
      `SELECT * FROM users WHERE username = ?`,
      [username],

      (err, user) => {
        if (err || !user) {
          return res.status(401).json({
            success: false,
            error: 'Invalid credentials'
          });
        }

        // Compare password
        const validPassword = bcrypt.compareSync(
          password,
          user.password
        );

        if (!validPassword) {
          return res.status(401).json({
            success: false,
            error: 'Invalid credentials'
          });
        }

        // Generate token
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username
          },
          JWT_SECRET,
          {
            expiresIn: '7d'
          }
        );

        res.json({
          success: true,
          token,
          userId: user.id,
          username: user.username
        });
      }
    );

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// ================= VERIFY TOKEN =================
function verifyToken(req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error: 'No token provided'
    });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {

    if (err) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token'
      });
    }

    req.user = decoded;
    next();
  });
}

// Export middleware
router.verifyToken = verifyToken;

module.exports = router;
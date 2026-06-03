const express = require('express');
const router = express.Router();

// POST /api/shorten
router.post('/', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "URL is required"
    });
  }

  // dummy response (replace later with DB logic)
  res.json({
    success: true,
    originalUrl: url,
    shortUrl: "https://short.ly/abc123"
  });
});

module.exports = router;
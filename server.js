const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Database
const db = require('./database/db');

const app = express();

// PORT (Render requirement)
const PORT = process.env.PORT || 5001;

// ==========================
// Middleware
// ==========================

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ==========================
// Static Files
// ==========================

app.use(express.static(__dirname));

// ==========================
// Routes
// ==========================

// Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running!'
  });
});

// ==========================
// IMPORT ROUTES
// ==========================

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const supplierRoutes = require('./routes/suppliers');
const purchaseRoutes = require('./routes/purchases');
const salesRoutes = require('./routes/sales');
const reportsRoutes = require('./routes/reports');
const shortenRoutes = require('./routes/shorten');

// ==========================
// USE ROUTES
// ==========================

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/shorten', shortenRoutes);

// ==========================
// 404 Handler
// ==========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ==========================
// Global Error Handler
// ==========================

app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);

  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// ==========================
// START SERVER (FIXED FOR RENDER)
// ==========================

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
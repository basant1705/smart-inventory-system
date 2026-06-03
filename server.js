const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// IMPORTANT: initialize DB first
require('./database/db');

const app = express();

// PORT (Render requirement)
const PORT = process.env.PORT || 5000;

// ==========================
// MIDDLEWARE
// ==========================

app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================
// STATIC FRONTEND
// ==========================

app.use(express.static(path.join(__dirname)));

// ==========================
// ROUTES
// ==========================

// Home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check (IMPORTANT)
app.get('/api/health', (req, res) => {
  res.json({
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
// 404 HANDLER
// ==========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ==========================
// GLOBAL ERROR HANDLER
// ==========================

app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);

  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// ==========================
// START SERVER (RENDER SAFE)
// ==========================

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
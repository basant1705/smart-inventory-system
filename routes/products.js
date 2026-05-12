const express = require('express');
const router = express.Router();
const db = require('../database/db');
const authRoutes = require('./auth');

// Get all products
router.get('/', (req, res) => {
  db.all(`SELECT * FROM products ORDER BY name`, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get single product
router.get('/:id', (req, res) => {
  db.get(`SELECT * FROM products WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(row);
  });
});

// Add product
router.post('/', (req, res) => {
  const { name, sku, quantity, price, category, description } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  db.run(
    `INSERT INTO products (name, sku, quantity, price, category, description) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, sku || null, quantity || 0, price, category || null, description || null],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, message: 'Product added successfully' });
    }
  );
});

// Update product
router.put('/:id', (req, res) => {
  const { name, sku, quantity, price, category, description } = req.body;

  db.run(
    `UPDATE products SET name=?, sku=?, quantity=?, price=?, category=?, description=?, updated_at=CURRENT_TIMESTAMP 
     WHERE id=?`,
    [name, sku, quantity, price, category, description, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Product updated successfully' });
    }
  );
});

// Delete product
router.delete('/:id', (req, res) => {
  db.run(`DELETE FROM products WHERE id = ?`, [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Product deleted successfully' });
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Get all suppliers
router.get('/', (req, res) => {
  db.all(`SELECT * FROM suppliers ORDER BY name`, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get single supplier
router.get('/:id', (req, res) => {
  db.get(`SELECT * FROM suppliers WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json(row);
  });
});

// Add supplier
router.post('/', (req, res) => {
  const { name, contact_person, phone, email, address, city, state, pin_code } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Supplier name is required' });
  }

  db.run(
    `INSERT INTO suppliers (name, contact_person, phone, email, address, city, state, pin_code) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, contact_person || null, phone || null, email || null, address || null, city || null, state || null, pin_code || null],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, message: 'Supplier added successfully' });
    }
  );
});

// Update supplier
router.put('/:id', (req, res) => {
  const { name, contact_person, phone, email, address, city, state, pin_code } = req.body;

  db.run(
    `UPDATE suppliers SET name=?, contact_person=?, phone=?, email=?, address=?, city=?, state=?, pin_code=? WHERE id=?`,
    [name, contact_person, phone, email, address, city, state, pin_code, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Supplier updated successfully' });
    }
  );
});

// Delete supplier
router.delete('/:id', (req, res) => {
  db.run(`DELETE FROM suppliers WHERE id = ?`, [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Supplier deleted successfully' });
  });
});

module.exports = router;

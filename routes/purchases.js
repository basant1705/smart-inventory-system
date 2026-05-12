const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Get all purchases
router.get('/', (req, res) => {
  db.all(
    `SELECT p.*, s.name as supplier_name FROM purchases p 
     LEFT JOIN suppliers s ON p.supplier_id = s.id 
     ORDER BY p.purchase_date DESC`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

// Get single purchase with items
router.get('/:id', (req, res) => {
  db.get(
    `SELECT p.*, s.name as supplier_name FROM purchases p 
     LEFT JOIN suppliers s ON p.supplier_id = s.id 
     WHERE p.id = ?`,
    [req.params.id],
    (err, purchase) => {
      if (err || !purchase) {
        return res.status(404).json({ error: 'Purchase not found' });
      }

      db.all(`SELECT * FROM purchase_items WHERE purchase_id = ?`, [req.params.id], (err, items) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ ...purchase, items });
      });
    }
  );
});

// Create purchase
router.post('/', (req, res) => {
  const { supplier_id, items, notes } = req.body;

  if (!supplier_id || !items || items.length === 0) {
    return res.status(400).json({ error: 'Supplier and items are required' });
  }

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

  db.run(
    `INSERT INTO purchases (supplier_id, total_amount, notes) VALUES (?, ?, ?)`,
    [supplier_id, totalAmount, notes || null],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const purchaseId = this.lastID;
      let itemsAdded = 0;

      // Add purchase items
      items.forEach((item) => {
        db.run(
          `INSERT INTO purchase_items (purchase_id, product_id, quantity, unit_price, total) 
           VALUES (?, ?, ?, ?, ?)`,
          [purchaseId, item.product_id, item.quantity, item.unit_price, item.total],
          (err) => {
            if (!err) {
              // Update product quantity
              db.run(
                `UPDATE products SET quantity = quantity + ? WHERE id = ?`,
                [item.quantity, item.product_id]
              );
            }
            itemsAdded++;
            if (itemsAdded === items.length) {
              res.json({ id: purchaseId, message: 'Purchase created successfully' });
            }
          }
        );
      });
    }
  );
});

// Update purchase status
router.put('/:id', (req, res) => {
  const { status } = req.body;

  db.run(`UPDATE purchases SET status = ? WHERE id = ?`, [status, req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Purchase updated successfully' });
  });
});

// Delete purchase
router.delete('/:id', (req, res) => {
  db.run(
    `SELECT * FROM purchase_items WHERE purchase_id = ?`,
    [req.params.id],
    (err, items) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Reverse inventory changes
      items.forEach((item) => {
        db.run(
          `UPDATE products SET quantity = quantity - ? WHERE id = ?`,
          [item.quantity, item.product_id]
        );
      });

      db.run(`DELETE FROM purchase_items WHERE purchase_id = ?`, [req.params.id]);
      db.run(`DELETE FROM purchases WHERE id = ?`, [req.params.id], function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Purchase deleted successfully' });
      });
    }
  );
});

module.exports = router;

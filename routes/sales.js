const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Get all sales
router.get('/', (req, res) => {
  db.all(
    `SELECT * FROM sales ORDER BY sale_date DESC`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

// Get single sale with items
router.get('/:id', (req, res) => {
  db.get(`SELECT * FROM sales WHERE id = ?`, [req.params.id], (err, sale) => {
    if (err || !sale) {
      return res.status(404).json({ error: 'Sale not found' });
    }

    db.all(`SELECT * FROM sale_items WHERE sale_id = ?`, [req.params.id], (err, items) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ ...sale, items });
    });
  });
});

// Create sale/invoice
router.post('/', (req, res) => {
  const { invoice_number, customer_name, customer_phone, items, subtotal, gst, grand_total, notes } = req.body;

  if (!invoice_number || !customer_name || !items || items.length === 0) {
    return res.status(400).json({ error: 'Invoice number, customer name, and items are required' });
  }

  db.run(
    `INSERT INTO sales (invoice_number, customer_name, customer_phone, subtotal, gst, grand_total, notes) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [invoice_number, customer_name, customer_phone || null, subtotal, gst || 0, grand_total, notes || null],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const saleId = this.lastID;
      let itemsAdded = 0;

      // Add sale items
      items.forEach((item) => {
        db.run(
          `INSERT INTO sale_items (sale_id, product_id, product_name, quantity, unit_price, total) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [saleId, item.product_id || null, item.product_name, item.quantity, item.unit_price, item.total],
          (err) => {
            if (!err && item.product_id) {
              // Update product quantity
              db.run(
                `UPDATE products SET quantity = quantity - ? WHERE id = ?`,
                [item.quantity, item.product_id]
              );
            }
            itemsAdded++;
            if (itemsAdded === items.length) {
              res.json({ id: saleId, invoice_number, message: 'Sale created successfully' });
            }
          }
        );
      });
    }
  );
});

// Update sale status
router.put('/:id', (req, res) => {
  const { status } = req.body;

  db.run(`UPDATE sales SET status = ? WHERE id = ?`, [status, req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Sale updated successfully' });
  });
});

// Delete sale
router.delete('/:id', (req, res) => {
  db.run(
    `SELECT * FROM sale_items WHERE sale_id = ?`,
    [req.params.id],
    (err, items) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Reverse inventory changes
      items.forEach((item) => {
        if (item.product_id) {
          db.run(
            `UPDATE products SET quantity = quantity + ? WHERE id = ?`,
            [item.quantity, item.product_id]
          );
        }
      });

      db.run(`DELETE FROM sale_items WHERE sale_id = ?`, [req.params.id]);
      db.run(`DELETE FROM sales WHERE id = ?`, [req.params.id], function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Sale deleted successfully' });
      });
    }
  );
});

module.exports = router;

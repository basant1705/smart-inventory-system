const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Dashboard statistics
router.get('/stats/dashboard', (req, res) => {
  db.get(
    `SELECT 
      COUNT(DISTINCT p.id) as total_products,
      SUM(p.quantity) as total_quantity,
      COUNT(DISTINCT s.id) as total_suppliers,
      COUNT(DISTINCT sa.id) as total_sales,
      SUM(sa.grand_total) as total_revenue
     FROM products p, suppliers s, sales sa`,
    (err, stats) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(stats);
    }
  );
});

// Low stock products
router.get('/alerts/low-stock', (req, res) => {
  db.all(
    `SELECT * FROM products WHERE quantity < 10 ORDER BY quantity DESC`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

// Sales by date range
router.get('/sales/date-range', (req, res) => {
  const { start_date, end_date } = req.query;

  let query = `SELECT * FROM sales WHERE 1=1`;
  let params = [];

  if (start_date) {
    query += ` AND sale_date >= ?`;
    params.push(start_date);
  }
  if (end_date) {
    query += ` AND sale_date <= ?`;
    params.push(end_date);
  }

  query += ` ORDER BY sale_date DESC`;

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Top selling products
router.get('/products/top-selling', (req, res) => {
  db.all(
    `SELECT 
      p.id, p.name, p.price,
      SUM(si.quantity) as total_sold,
      SUM(si.total) as revenue
     FROM sale_items si
     LEFT JOIN products p ON si.product_id = p.id
     GROUP BY si.product_id
     ORDER BY total_sold DESC
     LIMIT 10`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

// Monthly sales report
router.get('/sales/monthly', (req, res) => {
  db.all(
    `SELECT 
      strftime('%Y-%m', sale_date) as month,
      COUNT(*) as total_orders,
      SUM(grand_total) as total_revenue
     FROM sales
     GROUP BY month
     ORDER BY month DESC`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

module.exports = router;

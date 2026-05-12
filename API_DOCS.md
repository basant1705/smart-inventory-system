# Smart Inventory Backend API Documentation

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start server:
   ```bash
   npm start
   ```
   For development with auto-reload:
   ```bash
   npm run dev
   ```

3. Server runs on `http://localhost:3001`

## Database

SQLite database automatically initialized at `database/inventory.db`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Add new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Suppliers
- `GET /api/suppliers` - Get all suppliers
- `GET /api/suppliers/:id` - Get single supplier
- `POST /api/suppliers` - Add new supplier
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier

### Purchases
- `GET /api/purchases` - Get all purchases
- `GET /api/purchases/:id` - Get single purchase with items
- `POST /api/purchases` - Create new purchase
- `PUT /api/purchases/:id` - Update purchase status
- `DELETE /api/purchases/:id` - Delete purchase

### Sales
- `GET /api/sales` - Get all sales
- `GET /api/sales/:id` - Get single sale with items
- `POST /api/sales` - Create new sale/invoice
- `PUT /api/sales/:id` - Update sale status
- `DELETE /api/sales/:id` - Delete sale

### Reports
- `GET /api/reports/stats/dashboard` - Dashboard statistics
- `GET /api/reports/alerts/low-stock` - Low stock alerts
- `GET /api/reports/sales/date-range` - Sales by date range
- `GET /api/reports/products/top-selling` - Top selling products
- `GET /api/reports/sales/monthly` - Monthly sales report

## Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Features

✅ User authentication with JWT
✅ Product inventory management
✅ Supplier management
✅ Purchase tracking with auto inventory update
✅ Sales/Invoice generation
✅ Real-time inventory adjustments
✅ Comprehensive reporting
✅ SQLite database persistence

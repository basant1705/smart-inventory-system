# Smart Inventory Management System

A comprehensive inventory management, sales, and reporting system built with modern web technologies.

## 🎯 Features

- **User Authentication** - Secure login/register with JWT tokens
- **Product Management** - Add, edit, delete products with inventory tracking
- **Supplier Management** - Manage supplier information and contacts
- **Purchase Orders** - Track purchases with automatic inventory updates
- **Sales/Billing** - Generate invoices with GST calculation
- **Reports & Analytics** - Dashboard statistics, top-selling products, monthly reports
- **Real-time Inventory** - Automatic stock updates on purchases and sales
- **Responsive Design** - Works on desktop, tablet, mobile

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- Python 3.6+ (for serving frontend during development)
- Git

### Installation

1. **Install Backend Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   - Edit `.env` file and set your JWT_SECRET
   ```env
   PORT=3001
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   ```

3. **Start Backend Server**
   ```bash
   npm start
   ```
   Backend runs on: `http://localhost:3001`

4. **Start Frontend Server** (in another terminal)
   ```bash
   cd "c:\Users\basan\OneDrive\Desktop\project innoventry"
   python -m http.server 3000
   ```
   Frontend runs on: `http://localhost:3000`

5. **Open Application**
   Navigate to: `http://localhost:3000/login.html`

## 📚 API Documentation

See [API_DOCS.md](API_DOCS.md) for complete API reference.

### Key Endpoints

**Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

**Products**
- `GET /api/products` - Get all products
- `POST /api/products` - Add product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

**Sales**
- `GET /api/sales` - Get all sales
- `POST /api/sales` - Create invoice
- `GET /api/sales/:id` - Get sale details

**Reports**
- `GET /api/reports/stats/dashboard` - Dashboard stats
- `GET /api/reports/products/top-selling` - Top products
- `GET /api/reports/sales/monthly` - Monthly report

## 📁 Project Structure

```
project/
├── server.js                 # Main Express server
├── package.json             # Node dependencies
├── .env                     # Environment variables
├── database/
│   └── db.js               # SQLite setup
├── routes/
│   ├── auth.js             # Authentication
│   ├── products.js         # Product management
│   ├── suppliers.js        # Supplier management
│   ├── purchases.js        # Purchase orders
│   ├── sales.js            # Sales/invoices
│   └── reports.js          # Reports & analytics
├── utils/
│   └── api.js              # Frontend API client
├── .vscode/
│   ├── launch.json         # VS Code debugger config
│   └── tasks.json          # Build tasks
├── login.html              # Login page
├── index.html              # Dashboard
├── products.html           # Products page
├── suppliers.html          # Suppliers page
├── purchases.html          # Purchases page
├── sales.html              # Sales/Billing page
├── reports.html            # Reports page
├── settings.html           # Settings page
└── style.css               # Styles
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes
- CORS enabled
- Input validation

## 💾 Database

SQLite database with tables for:
- users
- products
- suppliers
- purchases & purchase_items
- sales & sale_items
- inventory_log

## 🛠 Development

Start server in watch mode (auto-reload on changes):
```bash
npm run dev
```

## 📦 Dependencies

### Backend
- express - Web framework
- sqlite3 - Database
- cors - Cross-origin requests
- bcryptjs - Password hashing
- jsonwebtoken - JWT auth
- dotenv - Environment variables

### Frontend
- Tailwind CSS - Styling
- Charts.js - Data visualization
- QRCode.js - QR code generation

## ⚠️ Default Credentials

For development:
- Username: `admin`
- Password: `admin123`

Register new users via the login page.

## 🐛 Troubleshooting

**Backend won't start**
- Check if port 3001 is available
- Verify Node.js is installed: `node --version`
- Check .env file configuration

**Frontend can't connect to backend**
- Ensure backend is running on port 3001
- Check browser console for CORS errors
- Verify API URLs in utils/api.js

**Database issues**
- Delete `database/inventory.db` and restart server to reinitialize
- Check file permissions on database folder

## 📝 License

This project is created for educational purposes.

## 📧 Support

For issues or questions, check the documentation or review the code structure in the routes folder.

---

**Last Updated:** April 2026

# 🚀 Complete Setup Guide - Smart Inventory Backend

## Step-by-Step Installation

### Phase 1: Backend Setup (5 minutes)

1. **Open Terminal in Project Directory**
   ```bash
   cd "c:\Users\basan\OneDrive\Desktop\project innoventry"
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   This installs:
   - express
   - sqlite3
   - cors
   - bcryptjs
   - jsonwebtoken
   - dotenv

3. **Configure .env File**
   - File already created with default settings
   - Change JWT_SECRET for production:
   ```env
   PORT=3001
   JWT_SECRET=your-super-secret-key-123
   NODE_ENV=development
   ```

### Phase 2: Start Backend Server

**Option A: Normal Mode**
```bash
npm start
```

**Option B: Development Mode (Auto-reload)**
```bash
npm run dev
```

**Expected Output:**
```
✅ Connected to SQLite database
✅ Database tables initialized
✅ Smart Inventory Backend running on http://localhost:3001
```

### Phase 3: Start Frontend Server (New Terminal)

```bash
cd "c:\Users\basan\OneDrive\Desktop\project innoventry"
python -m http.server 3000
```

**Expected Output:**
```
Serving HTTP on :: port 3000
```

### Phase 4: Access Application

1. Open Browser and go to:
   ```
   http://localhost:3000/login.html
   ```

2. **First Time?** Click "Register" and create an account
   - Username: anything unique
   - Email: any valid email
   - Password: min 6 characters

3. **Login** with your credentials

4. **Dashboard** loads automatically on successful login

## 📱 Application Pages

| Page | URL | Purpose |
|------|-----|---------|
| Dashboard | `/index.html` | Main overview |
| Products | `/products.html` | Manage inventory |
| Suppliers | `/suppliers.html` | Supplier info |
| Purchases | `/purchases.html` | Purchase orders |
| Sales | `/sales.html` | Billing & invoices |
| Reports | `/reports.html` | Analytics |
| Settings | `/settings.html` | Configuration |
| Login | `/login.html` | Authentication |
| Register | `/register.html` | New user signup |

## 🔧 Backend API Testing

### Using Postman or curl

**1. Register User**
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"pass123","email":"john@example.com"}'
```

**2. Login**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"pass123"}'
```

Response: Get your JWT token

**3. Add Product** (with token)
```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name":"Milk",
    "sku":"MILK001",
    "quantity":100,
    "price":30,
    "category":"Dairy"
  }'
```

**4. Create Sale/Invoice**
```bash
curl -X POST http://localhost:3001/api/sales \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "invoice_number":"INV-001",
    "customer_name":"John Doe",
    "customer_phone":"9876543210",
    "items":[
      {"product_name":"Milk","quantity":5,"unit_price":30,"total":150}
    ],
    "subtotal":150,
    "gst":27,
    "grand_total":177
  }'
```

## 📊 Database Query Examples

### Using SQLite CLI

```bash
# Open database
sqlite3 database/inventory.db

# View all users
SELECT * FROM users;

# View all products
SELECT * FROM products;

# View all sales
SELECT * FROM sales;

# Check inventory log
SELECT * FROM inventory_log;
```

## ⚠️ Common Issues & Solutions

### Issue: "Port 3001 already in use"
**Solution:**
```bash
# Find process using port 3001
netstat -ano | findstr :3001

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### Issue: "Database locked"
**Solution:**
- Delete `database/inventory.db`
- Restart server to re-initialize

### Issue: "CORS error in browser"
**Solution:**
- Ensure backend is running on port 3001
- Check API URL in `utils/api.js`
- Clear browser cache (Ctrl+Shift+Delete)

### Issue: "Authentication failed"
**Solution:**
- Check JWT token in localStorage
- Use Register to create new account
- Verify username/password spelling

### Issue: "npm: command not found"
**Solution:**
- Install Node.js from nodejs.org
- Restart terminal/VS Code

## 📁 Database Backup

To backup your data:
```bash
# Copy database file
copy database\inventory.db database\inventory_backup.db

# Or export to CSV
sqlite3 database/inventory.db
.mode csv
.output sales_backup.csv
SELECT * FROM sales;
.quit
```

## 🔐 Security Checklist

- ✅ JWT tokens expire after 7 days
- ✅ Passwords hashed with bcryptjs
- ✅ Protected routes require authentication
- ✅ CORS enabled for localhost only
- ⚠️ **TODO**: Change JWT_SECRET before production
- ⚠️ **TODO**: Add rate limiting for production

## 📈 Performance Tips

1. **Add product indexing**
   ```sql
   CREATE INDEX idx_products_sku ON products(sku);
   ```

2. **Archive old sales**
   - Move sales older than 1 year to archive table

3. **Enable pagination**
   - Add `?limit=50&offset=0` to GET endpoints

## 🎯 Next Steps

1. ✅ Backend API built and running
2. ✅ Frontend integrated with API
3. ⏭️ **TODO**: Set up automated backups
4. ⏭️ **TODO**: Configure email notifications
5. ⏭️ **TODO**: Deploy to production server

## 📞 Quick Reference

| Action | Command |
|--------|---------|
| Start backend | `npm start` |
| Dev mode (auto-reload) | `npm run dev` |
| Start frontend | `python -m http.server 3000` |
| View database | `sqlite3 database/inventory.db` |
| Test API | See examples above |
| Open app | `http://localhost:3000/login.html` |

---

**Backend Status**: ✅ COMPLETE
**Frontend Integration**: ✅ COMPLETE
**API Endpoints**: ✅ 40+ endpoints ready
**Database**: ✅ SQLite initialized

Happy coding! 🎉

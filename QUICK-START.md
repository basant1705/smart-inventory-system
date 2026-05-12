# ⚡ Quick Start (30 seconds)

## One-Time Setup

```bash
npm install
```

## Run Everything (Two Terminals)

### Terminal 1 - Backend
```bash
npm start
```
Output: `✅ Backend running on http://localhost:3001`

### Terminal 2 - Frontend
```bash
python -m http.server 3000
```
Output: `Serving HTTP on :: port 3000`

## Open Application
```
http://localhost:3000/login.html
```

## First Time?
1. Click **"Register"**
2. Create new account
3. Login with credentials
4. Start using!

---

## Useful Commands

| Action | Command |
|--------|---------|
| Install deps | `npm install` |
| Start backend | `npm start` |
| Dev mode | `npm run dev` |
| View database | `sqlite3 database/inventory.db` |
| Stop backend | `Ctrl+C` |
| Stop frontend | `Ctrl+C` |

## Ports Used
- Backend: `:3001`
- Frontend: `:3000`

## Files to Know
- `server.js` - Backend entry
- `package.json` - Dependencies
- `database/db.js` - Database setup
- `routes/` - API endpoints
- `utils/api.js` - API client
- `login.html` - Login page

## API Health Check
```bash
curl http://localhost:3001/api/health
```

Response:
```json
{"status":"Backend is running!"}
```

---

**That's it! You're ready.** 🎉

# TaskFlow - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- PHP 8.2+ with Composer installed
- Node.js 18+ with npm installed
- Git

### Step 1: Setup Backend (2 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
composer install

# Setup environment
cp .env.example .env
php artisan key:generate

# Create database and run migrations
touch database/database.sqlite  # Windows: type nul > database\database.sqlite
php artisan migrate --seed

# Start server
php artisan serve
```

✅ Backend running at http://localhost:8000

### Step 2: Setup Frontend (2 minutes)

```bash
# Open new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start development server
npm run dev
```

✅ Frontend running at http://localhost:5173

### Step 3: Login and Use! (1 minute)

1. Open browser to http://localhost:5173
2. Login with demo account:
   - **Email:** demo@taskflow.com
   - **Password:** password
3. Start managing tasks!

---

## 🎯 Key Features

- ✨ **Drag & Drop** - Move tasks between columns easily
- 📝 **Task Management** - Create, edit, delete tasks
- 🎨 **Priority Levels** - Low, Medium, High
- 📅 **Due Dates** - Track task deadlines
- 🔐 **Authentication** - Secure login/register
- 📱 **Responsive** - Works on mobile and desktop

---

## 📚 Documentation

- [README.md](../README.md) - Full documentation
- [walkthrough.md](./.gemini/antigravity/brain/CONVERSATION_ID/walkthrough.md) - Development walkthrough

---

## ❗ Troubleshooting

**Backend issues:**
- Make sure PHP 8.2+ is installed: `php -v`
- Check if port 8000 is available
- Verify SQLite extension is enabled in php.ini

**Frontend issues:**
- Make sure Node.js 18+ is installed: `node -v`
- Try deleting node_modules and running `npm install` again
- Check if port 5173 is available

**CORS issues:**
- Make sure backend .env has `FRONTEND_URL=http://localhost:5173`
- Restart both servers after changing .env

---

## 🎓 Tech Stack

- **Backend:** Laravel 11 + Sanctum
- **Frontend:** React 18 + Vite + Tailwind CSS
- **Drag & Drop:** @hello-pangea/dnd
- **Database:** SQLite (dev) / MySQL (prod)

---

Happy coding! 🚀

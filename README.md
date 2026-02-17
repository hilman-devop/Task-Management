# TaskFlow - Task Management App

![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Sanctum](https://img.shields.io/badge/Sanctum-Auth-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)

A full-stack Task Management application built with Laravel 11 (RESTful API) and React (Vite), featuring drag-and-drop functionality, token-based authentication, and a modern UI.

## 🎯 Features

- **User Authentication** - Register, Login, Logout with Laravel Sanctum token-based auth
- **Task Board** - Trello-like board with customizable columns
- **Drag & Drop** - Smooth drag-and-drop task management between columns
- **CRUD Operations** - Full create, read, update, delete for tasks and columns
- **Priority Levels** - Low, Medium, High priority task management
- **Due Dates** - Track task deadlines
- **Responsive Design** - Modern, mobile-friendly UI with Tailwind CSS
- **Real-time Updates** - Instant UI updates with optimistic rendering

## 📸 Screenshots

> Coming soon... (Add your screenshots here after deployment)

## 🛠️ Tech Stack

### Backend
- **Laravel 11** - PHP framework for RESTful API
- **Laravel Sanctum** - Token-based API authentication
- **SQLite** - Lightweight database for development (MySQL compatible)
- **PHP 8.2+** - Modern PHP features

### Frontend
- **React 18** - UI library with hooks
- **Vite 5** - Lightning-fast build tool
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Tailwind CSS 3** - Utility-first CSS framework
- **@hello-pangea/dnd** - Drag-and-drop functionality
- **react-hot-toast** - Beautiful toast notifications

## 📦 Installation

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- Git

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Create SQLite database
touch database/database.sqlite

# Run migrations and seeders
php artisan migrate --seed

# Start development server
php artisan serve
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🔑 Default Credentials

After running the seeder, you can use:
- **Email:** demo@taskflow.com
- **Password:** password

Or register a new account through the UI.

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/register` | Register new user | ❌ |
| POST | `/api/login` | Login and get token | ❌ |
| POST | `/api/logout` | Logout and revoke token | ✅ |
| GET | `/api/user` | Get authenticated user | ✅ |
| GET | `/api/columns` | List all user's columns with tasks | ✅ |
| POST | `/api/columns` | Create new column | ✅ |
| PUT | `/api/columns/{id}` | Update column name/position | ✅ |
| DELETE | `/api/columns/{id}` | Delete column | ✅ |
| GET | `/api/tasks` | List all user's tasks | ✅ |
| POST | `/api/tasks` | Create new task | ✅ |
| PUT | `/api/tasks/{id}` | Update task (including drag-drop) | ✅ |
| DELETE | `/api/tasks/{id}` | Delete task | ✅ |

## 🚀 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL=your-backend-url`

### Backend (Render / Railway)

1. Push your code to GitHub
2. Connect your repository to Render
3. Add environment variables from `.env.example`
4. Set build command: `composer install && php artisan migrate --seed`
5. Set start command: `php artisan serve --host=0.0.0.0 --port=$PORT`

## 📂 Project Structure

```
taskflow-app/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/    # API Controllers
│   │   │   └── Requests/       # Form Requests
│   │   └── Models/             # Eloquent Models
│   ├── database/
│   │   ├── migrations/         # Database migrations
│   │   └── seeders/            # Database seeders
│   └── routes/
│       └── api.php             # API routes
├── frontend/                # React SPA
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── context/           # React context
│   │   ├── services/          # API services
│   │   └── App.jsx            # Main app component
│   └── public/
└── README.md
```

## 🧪 Testing

### Backend
```bash
cd backend
php artisan test
```

### Frontend
```bash
cd frontend
npm run test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

## 🙏 Credits

- [Laravel](https://laravel.com) - Backend framework
- [React](https://react.dev) - Frontend library
- [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) - Drag and drop functionality
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Heroicons](https://heroicons.com) - Beautiful icons

## 📧 Contact

Created by **Your Name** - [@yourusername](https://github.com/yourusername)

Project Link: [https://github.com/yourusername/taskflow-app](https://github.com/yourusername/taskflow-app)

---

⭐ If you found this project helpful, please give it a star!

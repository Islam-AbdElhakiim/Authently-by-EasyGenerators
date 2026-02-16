# Authently

A full-stack authentication system with React frontend and NestJS backend.

## 🚀 Quick Start

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup  
```bash
cd backend
npm install
npm run start:dev
```

## 🛠️ Tech Stack

**Frontend:**
- React + TypeScript
- Vite + Tailwind CSS
- React Router + React Hook Form

**Backend:**
- NestJS + TypeScript  
- MongoDB + Mongoose
- JWT + bcrypt

## ⚙️ Environment Variables (WILL KEEP THEM FOR EASE_USE)

**Frontend (.env):**
```env
PORT=3000
VITE_AUTH_API_URL=http://localhost:3001/auth
```

**Backend (.env):**
```env
PORT=3001
MONGO_URI=mongodb://islamabdelhakiim21:Soly1234@ac-hyz9fpd-shard-00-00.1p9p3f3.mongodb.net:27017,ac-hyz9fpd-shard-00-01.1p9p3f3.mongodb.net:27017,ac-hyz9fpd-shard-00-02.1p9p3f3.mongodb.net:27017/?replicaSet=atlas-14eu12-shard-0&ssl=true&authSource=admin
JWT_SECRET=islamsoly015
LOG_LEVEL=debug
NODE_ENV=development
```

## 🔐 Features

- User registration and login
- JWT authentication with httpOnly cookies
- Protected routes
- Form validation
- Responsive design
- MongoDB data persistence

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register new user |
| `POST` | `/auth/login` | User login |
| `POST` | `/auth/logout` | User logout |
| `GET` | `/auth/profile` | Get user profile |

## 🏃‍♂️ Development

1. Start MongoDB (local or Atlas)
2. Run backend: `npm run start:dev`
3. Run frontend: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

---

Built with ❤️ by EasyGenerator Team
├── auth/                 # Authentication module
│   ├── dto/             # Data transfer objects
│   ├── guards/          # Auth guards
│   ├── strategies/      # Passport strategies
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/               # User management
│   ├── dto/
│   ├── schemas/         # Mongoose schemas
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── exception.interceptor.ts  # Global error handling
├── logging.interceptor.ts    # Request/Response logging
├── app.module.ts
└── main.ts
```

## 🔧 Configuration

### Validation Rules

- **Email**: Must be valid email format
- **Password**: Minimum 6 characters
- **Phone**: Minimum 10 characters
- **Username**: Required string

### Cookie Settings

- **HttpOnly**: `true` (XSS protection)
- **SameSite**: `lax`
- **Secure**: `false` (development)
- **MaxAge**: 24 hours (7 days with rememberMe)

## 🗃️ Database Schema

### User Schema
```typescript
{
  username: string,
  email: string (unique),
  password: string (hashed),
  phone: string,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "code": 400,
  "message": "Error description",
  "timestamp": "2026-02-16T15:30:00.000Z"
}
```

## 📜 Available Scripts

- `npm run start` - Start production server
- `npm run start:dev` - Start development server
- `npm run start:debug` - Start with debugging
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## 🌐 Frontend Integration

This backend is configured to work with a frontend on `http://localhost:3000`. Update CORS settings in `main.ts` for different origins.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**🔥 Ready to authenticate with confidence!** 

For questions or support, please create an issue in the repository.

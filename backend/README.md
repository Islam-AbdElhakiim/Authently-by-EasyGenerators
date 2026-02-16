# Authently Backend API

A robust NestJS authentication backend with JWT tokens, MongoDB, and comprehensive user management.

## 🚀 Features

- **User Authentication** - Login/Register with JWT tokens
- **Security** - Password hashing with bcrypt, HTTP-only cookies
- **Database** - MongoDB with Mongoose ODM
- **Validation** - Class-validator with global pipes
- **Error Handling** - Global exception filters
- **CORS** - Configured for frontend integration
- **TypeScript** - Full type safety

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd authently-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=3001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   LOG_LEVEL=debug
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   # Development
   npm run start:dev
   
   # Production
   npm run build
   npm run start:prod
   ```

## 🔗 API Endpoints

### Authentication

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/auth/register` | Register new user | `{ email, password, username, phone }` |
| `POST` | `/auth/login` | User login | `{ email, password, rememberMe? }` |
| `POST` | `/auth/logout` | User logout | - |
| `GET` | `/auth/profile` | Get user profile | - (requires auth) |

### Request Examples

**Register:**
```json
POST /auth/register
{
  "email": "user@example.com",
  "password": "securePassword123",
  "username": "johndoe",
  "phone": "1234567890"
}
```

**Login:**
```json
POST /auth/login  
{
  "email": "user@example.com",
  "password": "securePassword123",
  "rememberMe": true
}
```

## 🛡️ Security Features

- **Password Hashing** - Bcrypt with salt rounds
- **JWT Tokens** - Secure token-based authentication
- **HTTP-Only Cookies** - XSS protection
- **Input Validation** - Class-validator decorators
- **CORS Protection** - Configured origins
- **Error Sanitization** - No sensitive data exposure

## 📁 Project Structure

```
src/
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

### Common Error Codes

- `400` - Validation errors, bad request
- `401` - Unauthorized, invalid credentials
- `409` - Conflict, user already exists
- `404` - User not found
- `500` - Internal server error

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
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

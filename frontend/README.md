# Authently Frontend

A modern React-based authentication application built with TypeScript, Vite, and Tailwind CSS.

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env` file:
   ```env
   PORT=3000
   VITE_AUTH_API_URL=http://localhost:3001/auth
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- React Router (Routing)

## 📁 Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Page components
│   ├── auth/           # Login/Register pages
│   └── home.tsx        # Protected home page
├── services/           # API services
├── hooks/              # Custom hooks
└── styles/             # CSS files
```

## 🔐 Features

- ✅ User login/registration
- ✅ JWT authentication with httpOnly cookies
- ✅ Protected routes
- ✅ Form validation
- ✅ Responsive design
- ✅ TypeScript support

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview build
- `npm run lint` - Run linter

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Dev server port | No (defaults to 5173) |
| `VITE_AUTH_API_URL` | Backend API URL | Yes |

## 🔒 Authentication Flow

1. User logs in → Backend sets httpOnly cookie
2. Protected routes check authentication
3. Auto-redirect to login if not authenticated
4. Logout clears cookie and redirects

---

Built with ❤️ by EasyGenerator Team
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

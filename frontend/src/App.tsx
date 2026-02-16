
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/home'
import LoginPage from './pages/auth/login'
import RegisterPage from './pages/auth/register'
import './styles/App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
          errorElement={<>Not found</>}
        />
        <Route
          path="/login"
          element={
            <LoginPage />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterPage />
          }
        />
      </Routes>
    </Router>
  )
}
export default App

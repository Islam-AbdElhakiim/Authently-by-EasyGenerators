import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import LoadingSpinner from '../utils/components/LoadingSpinner';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const authService = AuthService.getInstance();

    useEffect(() => {
        const checkAuth = async () => {
            if (authService.getUser()) {
                setIsAuthenticated(true);
            }
        };
        checkAuth();
        setIsLoading(false);
    }, [authService]);

    // Show loading spinner while checking authentication
    if (isLoading) return <LoadingSpinner />

    // If not authenticated, redirect to login
    if (!isAuthenticated) return <Navigate to="/login" replace />

    // If authenticated, render the protected component
    return <>{children}</>;
};

export default ProtectedRoute;
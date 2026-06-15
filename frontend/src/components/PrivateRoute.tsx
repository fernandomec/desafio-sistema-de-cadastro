import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    requiredRole?: string;
}

export function PrivateRoute({ children, requiredRole }: Props) {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}
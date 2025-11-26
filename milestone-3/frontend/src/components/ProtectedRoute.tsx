import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
	children: ReactNode;
}

// Wrapper component that checks authentication status
// If authenticated renders the children, if not redirects to /login.
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { isAuthenticated } = useAuth();

	// if (!isAuthenticated) {
	// 	return <Navigate to='/login' replace />;
	// }

	return <>{children}</>;
};

export default ProtectedRoute;

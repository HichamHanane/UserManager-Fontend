import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { isAuth, role, isLoading } = useSelector((state) => state.auth);

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    if (!isAuth) {
        return <Navigate to="/" replace />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/user-profile" replace />;
    }
    return children;
};

export default ProtectedRoute;
import React from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    return (
        <div>
            {localStorage.getItem("lid") ? (
                children
            ) : (
                <Navigate to="/login" replace />
            )}
        </div>
    );
}

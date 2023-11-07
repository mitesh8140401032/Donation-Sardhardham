import React from 'react';
import {  Navigate } from 'react-router-dom';

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

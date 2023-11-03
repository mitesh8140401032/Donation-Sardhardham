import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Dashboard';
import SingIn from './SignIn';
import ProtectedRoute from './ProtectedRoute';
// import Income from './User/Income';
export default function RouteContainer() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/:id' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                <Route path='/Login' element={<SingIn />} />


            </Routes>
        </BrowserRouter>
    )
}

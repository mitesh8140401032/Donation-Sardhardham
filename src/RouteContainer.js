import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './User/Dashboard';
export default function RouteContainer() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Dashboard />} />

            </Routes>
        </BrowserRouter>
    )
}

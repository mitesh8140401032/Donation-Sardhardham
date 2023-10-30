import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './User/Dashboard';

import Income from './User/Income';
export default function RouteContainer() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/income' element={<Income />} />

            </Routes>
        </BrowserRouter>
    )
}

import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './User/Dashboard';
import Billfiles from './User/Billfiles';
export default function RouteContainer() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/bill' element={<Billfiles />} />

            </Routes>
        </BrowserRouter>
    )
}

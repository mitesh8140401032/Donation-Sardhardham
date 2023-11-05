import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Dashboard';
import SingIn from './SignIn';
import ProtectedRoute from './ProtectedRoute';
import Income from './Income';
import DonerParty from './DonerParty';
import Expenss from './Expenss';
export default function RouteContainer() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path='/home/:id' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path='/dashboard/:id' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path='/income/:id' element={<ProtectedRoute><Income /></ProtectedRoute>} />
                <Route path='/expenss/:id' element={<ProtectedRoute><Expenss /></ProtectedRoute>} />
                <Route path='/doner-party/:id' element={<ProtectedRoute><DonerParty /></ProtectedRoute>} />


                <Route path='/' element={<SingIn />} />




            </Routes>
        </BrowserRouter>
    )
}

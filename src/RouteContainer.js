import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Dashboard';
import SingIn from './SignIn';
import ProtectedRoute from './ProtectedRoute';
import Income from './Income';
import DonerParty from './DonerParty';

import Expenses from './Expenses';
import ContextProvider from './ContextProvider';
export default function RouteContainer() {
    return (
        <ContextProvider>
            <BrowserRouter>
                <Routes>


                    <Route path='/dashboard/:id' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path='/income/:id' element={<ProtectedRoute><Income /></ProtectedRoute>} />
                    <Route path='/expenses/:id' element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
                    <Route path='/doner-party/:id' element={<ProtectedRoute><DonerParty /></ProtectedRoute>} />


                    <Route path='/' element={<SingIn />} />
                    <Route path='*' element={<SingIn />} />




                </Routes>
            </BrowserRouter>
        </ContextProvider>
    )
}

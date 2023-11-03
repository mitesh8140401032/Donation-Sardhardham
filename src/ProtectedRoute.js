import React from 'react'
import { Link, Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    let data = localStorage.getItem("lid")
    return (
        <>
            {
                data ? <div>{children}</div> : <div><Navigate to={'/login'} replace /></div>
            }
        </>

    )
}

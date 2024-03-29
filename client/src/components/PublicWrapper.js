import React from 'react'
import { useUpdate } from '../utils/Context'
import { Navigate, Outlet } from 'react-router-dom'

const PublicWrapper = ({children}) => {
    const {isAuthenticated} = useUpdate()
    // console.log("public wrapper", typeof isAuthenticated, isAuthenticated)
    if (!isAuthenticated) {
        return children
    }
    else {
        return <Navigate to="/home" replace/>
    }
}

export default PublicWrapper
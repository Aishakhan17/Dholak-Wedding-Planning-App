import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUpdate } from '../utils/Context';


const PrivateWrapper = ({children}) => {
    const {isAuthenticated} = useUpdate()
    // console.log("private wrapper", typeof isAuthenticated, isAuthenticated)
    if (!isAuthenticated) {
        return <Navigate to="/" replace/>
    }
    else {
        return children
    }
}

export default PrivateWrapper;
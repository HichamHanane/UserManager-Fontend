import React, { useEffect } from 'react'
import { checkAuth } from '../../features/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
    let {isAuth} = useSelector((state)=> state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [])

    if(isAuth){
        return <Outlet />
    }

    return (
        <Navigate to='/' replace/>
    )
}

export default ProtectedRoute

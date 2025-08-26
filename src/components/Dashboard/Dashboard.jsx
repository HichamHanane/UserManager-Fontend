import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from '../../features/AuthSlice';
import { Navigate, useNavigate } from 'react-router-dom';

function Dashboard() {
    let { isAuth , role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(checkAuth());
    }, [])

    useEffect(() => {
        if (!isAuth) {
            navigate('/')
            return;
        }
        console.log('Auuth :' , isAuth);
    
    }, [])

    if(role == "user"){
        return <Navigate to='/user-profile' />
    }
    return (
        <div>
            dashbord page {role}
        </div>
    )
}

export default Dashboard

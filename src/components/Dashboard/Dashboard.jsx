import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth, userLogout } from '../../features/AuthSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import './Dashboard.css'
import UsersTable from '../UsersTable/UsersTable';
import { CiCirclePlus, CiLogout } from 'react-icons/ci';
function Dashboard() {
    let { isAuth, role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()

      const logout = () => {
        try {
          dispatch(userLogout())
            .unwrap()
            .then(() => {
              dispatch(checkAuth())
              navigate('/')
            })
        }
        catch (error) {
          console.log('Error :', error);
    
        }
      }

    useEffect(() => {
        dispatch(checkAuth());
    }, [])

    useEffect(() => {
        if (!isAuth) {
            navigate('/')
            return;
        }
        console.log('Auuth :', isAuth);

    }, [])

    if (role == "user") {
        return <Navigate to='/user-profile' />
    }
    return (
        <div class="container">
            <div class="header">
                <div class="header-left">
                    <h1>Welcome to your dashboard</h1>
                </div>
                <button class="logout-btn" onClick={()=>logout()}>
                    <CiLogout color='white' />
                    Logout
                </button>
            </div>

            <div class="controls">
                <div class="filter">
                    <span class="filter-value">Users</span>
                </div>
                <div class="controls-right">
                    <button class="icon-btn">
                        <CiCirclePlus />
                        new user
                    </button>
                </div>
            </div>

            <UsersTable />
        </div>
    )
}

export default Dashboard

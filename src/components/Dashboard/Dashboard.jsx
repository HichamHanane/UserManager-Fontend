import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth, userLogout } from '../../features/AuthSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import './Dashboard.css'
import UsersTable from '../UsersTable/UsersTable';
import { CiCirclePlus, CiLogout } from 'react-icons/ci';
import AddForm from '../AddForm/AddForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
};

function Dashboard() {
    let { isAuth, role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    let [openPopup,setOpen]=useState(false)


    const handleOpenPopup = () =>{
        setOpen(!openPopup)
    }
    const handleClosePopup = () =>{
        setOpen(!openPopup)
    }
    const logout = () => {
        try {
            dispatch(userLogout())
                .unwrap()
                .then(() => {
                    navigate('/')
                })
        }
        catch (error) {
            console.log('Error :', error);

        }
    }
    return (
        <div class="container">
            <div class="header">
                <div class="header-left">
                    <h1>Welcome to your dashboard</h1>
                </div>
                <button class="logout-btn" onClick={() => logout()}>
                    <CiLogout color='white' />
                    Logout
                </button>
            </div>

            <div class="controls">
                <div class="filter">
                    <span class="filter-value">Users</span>
                </div>
                <div class="controls-right">
                    <button class="icon-btn" onClick={handleOpenPopup}>
                        <CiCirclePlus />
                        new user
                    </button>
                </div>
            </div>

            <UsersTable />

            <Modal
                open={openPopup}
                onClose={false}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <AddForm handleClosePopup={handleClosePopup} openPopup={openPopup}/>
                </Box>
            </Modal>
        </div>
    )
}

export default Dashboard

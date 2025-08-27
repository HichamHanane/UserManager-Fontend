import React, { useEffect } from 'react'
import './UsersTable.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers } from '../../features/UserSlice'
import { toast } from 'sonner'

function UsersTable() {
    let { users, isLoading, error, userDeleted } = useSelector((state) => state.users)
    const dispatch = useDispatch()

    const allUsers = users?.map((user, index) => {
        return (
            <tr class="user-row" key={index}>
                <td></td>
                <td>
                    <div class="user-info">
                        <div class="avatar am">{((user?.name)?.split('')[0])?.toUpperCase()}</div>
                        <span class="user-name">{user?.name}</span>
                    </div>
                </td>
                <td class="email-column">
                    <div class="user-email">{user?.email}</div>
                </td>
                <td class="role-column">
                    <div class="role">{user?.role}</div>
                </td>

                <td>
                    <button class="action-btn" onClick={() => deleteuser(user?._id)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                        </svg>
                    </button>
                </td>
            </tr>
        )
    })

    const deleteuser = (id) => {
        try {
            console.log('id before async thunk :',id);
            
            dispatch(deleteUser(id))
            .unwrap()
            .then(()=>{
                toast.success('Deleted Successfully')
            })
        } catch (error) {
            console.log('Error :', error);

        }
    }

    useEffect(() => {
        dispatch(getUsers())
    }, [])
    return (
        <div className="users-table-container">
            <table class="users-table">
                <thead class="table-header">
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th class="email-column">Email address</th>
                        <th class="role-column">Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className='table_body'>
                    {
                        users.lenght == 0 ? <p>no users found</p> : allUsers
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UsersTable

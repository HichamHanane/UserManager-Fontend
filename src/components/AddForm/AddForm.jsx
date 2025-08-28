import React from 'react'
import './AddForm.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { addNewUser } from '../../features/UserSlice';

function AddForm({handleClosePopup}) {
    const {isLoading,error}= useSelector((state)=>state.users.addUser);
    const dispatch = useDispatch()
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('name is required'),
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters long.').required('password is required'),
        role: Yup.string().required('role is required'),

    });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
        defaultValues:{
            role:'user'
        }
    });

    const create = (data)=>{
        try {
            console.log("Daaata :",data);
            dispatch(addNewUser(data))
            .unwrap()
            .then(()=>handleClosePopup())
        } catch (error) {
            console.log('error while dispatching addNewUser function:',error);
            
        }
    }

    return (
        <div className="form-container">
            <div className='create_form_header'>
                <h2>Create a New User</h2>
                <IoCloseOutline style={{cursor:"pointer",fontSize:"1.2rem"}} onClick={handleClosePopup}/>
            </div>
            <form id="user-form" onSubmit={handleSubmit(create)}>
                <div className="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" placeholder="Enter name" {...register('name')}/>
                    {errors.name && <div className="errors">{errors.name.message}</div>}
                </div>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter email" {...register('email')}/>
                    {errors.email && <div className="errors">{errors.email.message}</div>}
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter password" {...register('password')}/>
                    {errors.password && <div className="errors">{errors.password.message}</div>}
                </div>
                <div className="form-group">
                    <label for="role">Role</label>
                    <select id="role" name="role" {...register('role')}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">
                    {
                        isLoading ? 'Creating...' : 'Create user'
                    }
                </button>
                {
                    error ? <p className='errors'>{error }</p> : null
                }
            </form>
        </div>
    )
}

export default AddForm

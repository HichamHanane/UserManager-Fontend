import React, { useEffect, useState } from 'react'
import './Login.css'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth, userLogin } from '../../features/AuthSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function Login() {
    let { error, isLoading, isAuth } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().required('password is required')
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid  },
    } = useForm({
        resolver: yupResolver(validationSchema),

    });

    const login = (data) => {
        try {
           dispatch(userLogin(data)).unwrap().then(()=>dispatch(checkAuth()));
        } catch (error) {
           console.log('Error while dispatching login function :',error);
            
        }
        // let body = { email, password };
        
    }

    useEffect(() => {
        dispatch(checkAuth())
    }, [])
    useEffect(() => {
        if (isAuth) {
            navigate('/dashboard');
            return;
        }
    }, [isAuth])
    return (
        <div>
            <form class="form" onSubmit={handleSubmit(login)}>
                <p class="form-title">Sign in to your account </p>
                <div class="input-container">
                    <input type="email" placeholder="Enter email" name='email'  {...register('email')} />
                    <span>
                    </span>
                    {errors.email && <div className="login_error">{errors.email.message}</div>}
                </div>
                <div class="input-container">
                    <input type="password" placeholder="Enter password" name='password' {...register('password')} />
                    {errors.password && <div className="login_error">{errors.password.message}</div>}

                </div>
                <button class="submit" disabled={!isValid} style={{cursor:isValid ?'pointer' :'not-allowed'}}>
                    {
                        isLoading
                            ? "Signing..."
                            :
                            "Sign in"
                    }

                </button>
                {
                    error != null ? <p className='login_error'>{error}</p> : null
                }


                <p class="signup-link">
                    No account?
                    <Link to="/register">Sign up</Link>
                </p>
            </form>

        </div>
    )
}

export default Login

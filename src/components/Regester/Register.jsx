import React from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../../features/AuthSlice';

function Register() {
    const { error, isLoading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate =  useNavigate()
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('name is required'),
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters long.').required('password is required')
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode:"onBlur",
        resolver: yupResolver(validationSchema),

    });


    const Signup = (data) => {
        try {
            console.log("Register data :", data);
            dispatch(userRegister(data))
                .unwrap() 
                .then(() => {
                    navigate('/'); 
                });

        }
        catch (error) {
            console.log("Error :", error);

        }
    }

    return (
        <div>
            <form class="register_form" onSubmit={handleSubmit(Signup)}>
                <p class="form-title">Create an  account </p>
                <div class="input-container">
                    <input type="text" placeholder="Enter name..." name='name' {...register('name')} />
                    <span>
                    </span>
                    {errors.name && <div className="errors">{errors.name.message}</div>}
                </div>

                <div class="input-container">
                    <input type="email" placeholder="Enter email..." name='email' {...register('email')} />
                    <span>
                    </span>
                    {errors.email && <div className="errors">{errors.email.message}</div>}
                </div>

                <div class="input-container">
                    <input type="password" placeholder="Enter password..." name='password' {...register('password')} />
                    {errors.password && <div className="errors">{errors.password.message}</div>}
                </div>
                <button class="submit" type='submit'  disabled={!isValid} style={{cursor:isValid ?'pointer' :'not-allowed'}}>
                    {
                        isLoading
                            ? "Loading..."
                            :
                            "Sign up"
                    }

                </button>
                {
                    error != null ? <p className='login_error'>{error}</p> : null
                }


                <p class="signup-link">
                    You have an account?
                    <Link to="/">Sign in</Link>
                </p>
            </form>
        </div>
    )
}

export default Register

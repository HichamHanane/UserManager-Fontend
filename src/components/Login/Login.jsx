import React, { useEffect,  useState } from 'react'
import './Login.css'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth, userLogin } from '../../features/AuthSlice'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    let { error, isLoading, isAuth } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    let [email, setEmail] = useState()
    let [password, setPassword] = useState()

    
    const login = (e) => {
        e.preventDefault()
        let body = { email, password };
        dispatch(userLogin(body))
    }

    useEffect(()=>{
        dispatch(checkAuth())
    },[])
    useEffect(()=>{
        if (isAuth) {
            navigate('/dashboard');
            return;
        }
    },[isAuth])
    return (
        <div>
            <form class="form">
                <p class="form-title">Sign in to your account </p>
                <div class="input-container">
                    <input type="email" placeholder="Enter email" name='email' onChange={(e) => setEmail(e.target.value)} />
                    <span>
                    </span>
                </div>
                <div class="input-container">
                    <input type="password" placeholder="Enter password" name='password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button class="submit" onClick={login}>
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

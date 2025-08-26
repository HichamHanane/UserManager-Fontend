import React from 'react'
import './Login.css'

function Login() {
    return (
        <div>
            <form class="form">
                <p class="form-title">Sign in to your account</p>
                <div class="input-container">
                    <input type="email" placeholder="Enter email" />
                        <span>
                        </span>
                </div>
                <div class="input-container">
                    <input type="password" placeholder="Enter password" />
                </div>
                <button type="submit" class="submit">
                    Sign in
                </button>

                <p class="signup-link">
                    No account?
                    <a href="">Sign up</a>
                </p>
            </form>

        </div>
    )
}

export default Login

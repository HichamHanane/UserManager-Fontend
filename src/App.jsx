import { useState } from 'react'
import './App.css'
import LoginPage from './pages/loginPage/LoginPage'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import RegisterPage from './pages/registerPage/RegisterPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/dashboard' element={ <Dashboard />} />
        <Route path='/user-profile' element={<ProfilePage />} />
      </Routes>
    </>
  )
}

export default App

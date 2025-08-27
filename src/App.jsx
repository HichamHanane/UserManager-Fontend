import { useState } from 'react'
import './App.css'
import LoginPage from './pages/loginPage/LoginPage'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/registerPage/RegisterPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import DashnoardPage from './pages/DashnoardPage/DashnoardPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/dashboard' element={ <DashnoardPage/>} />
        <Route path='/user-profile' element={<ProfilePage />} />
      </Routes>
    </>
  )
}

export default App

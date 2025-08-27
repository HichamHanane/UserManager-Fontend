import { useState } from 'react'
import './App.css'
import LoginPage from './pages/loginPage/LoginPage'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/registerPage/RegisterPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import DashnoardPage from './pages/DashnoardPage/DashnoardPage'
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute'

function App() {

  return (
    <>
      <Routes>

        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route path='/dashboard' element={
          <ProtectedRoute requiredRole="admin">
            <DashnoardPage />
          </ProtectedRoute>
        } />

        <Route path='/user-profile' element={
          <ProtectedRoute requiredRole="user">
            <ProfilePage />
          </ProtectedRoute>
        } />

      </Routes>
    </>
  )
}

export default App

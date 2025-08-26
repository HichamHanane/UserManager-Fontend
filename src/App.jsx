import { useState } from 'react'
import './App.css'
import LoginPage from './pages/loginPage/LoginPage'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App

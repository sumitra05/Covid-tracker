import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomeRoute } from './HomeRoute'
import Login from "../components/Login"
import SignUp from '../components/SignUp'
import Covid from '../components/Covid'


export const AllRoutes = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Covid />} />
        <Route path='/login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
      </Routes>
    </>
  )
}
import React from 'react'
import { Route, Routes } from 'react-router'
import { LogInRoute } from './LoginRoute'
import { SignUpRoute } from './SignUpRoute'

export const AuthenticationRoute = () => {
  return (
    <div>
        <Routes>
          <Route path='/login' element={<LogInRoute />} />
          <Route path="/signup" element={<SignUpRoute />} />
        </Routes>
    </div>
  )
}
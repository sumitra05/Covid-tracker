import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export const HomeRoute = () => {
  const navigate = useNavigate();
  
   useEffect(()=>{
      navigate('/login')
    },[])

  return (
    <div></div>
  )
}
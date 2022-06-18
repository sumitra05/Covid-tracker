import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from "./Login.module.css"

const SignUp = () => {

    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        username : "",
        useremail : "",
        password : ""
    });

    const handleChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.className] : e.target.value
        })
    }

    const handleSignIn = async() => {
        let result = await fetch('https://covid-tracker-dashborad.herokuapp.com/signup', {
            method : "POST",
            headers : {
                "Content-Type":"application/json"
            },
            body : JSON.stringify(userDetails)
        })
        result = await result.json()
        alert(result.message);
        navigate('/login')
    }
  return (
    <div className={styles.LoginDiv}>
        <span>SignUp to Covid Tracker Dashboard</span>
        <input type="text" placeholder='User Name' onChange={handleChange} className="username"/>
        <input type="text" placeholder='Email Address' onChange={handleChange} className="useremail"/>
        <input type="text" placeholder="Password" onChange={handleChange} className="password"/>
        <input type="button" placeholder='Log in' className={styles.LoginBtn} value="Sign up" onClick={handleSignIn}/>
        <p>Already have an account<span onClick={()=>navigate("/login")}> : Log in</span></p>
      </div>
  )
}

export default SignUp;
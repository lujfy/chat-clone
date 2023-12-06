import React, { useState } from 'react'
import Add from '../assets/file-image-plus.svg'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';


function Login() {
  const [ err , setErr ] = useState(false)
  const navigate = useNavigate() ;

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
      
    } catch (error) {
      setErr(true)
    }



  }

  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Chat Clone</span>
            <span className="title">Login</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                {err && <span>Something went wrong</span>}
                <button>Sign In</button>
            </form>
            <p>Do you have an account ? <Link to={"/register"}>Register</Link></p>
        </div>
    </div>
  )
}

export default Login

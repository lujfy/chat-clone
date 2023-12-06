import React, { useState } from 'react'
import Add from '../assets/file-image-plus.svg'
import {  createUserWithEmailAndPassword , updateProfile } from "firebase/auth";
import { auth , storage ,db } from '../firebase';
import { ref , getDownloadURL, uploadBytesResumable , getStorage } from 'firebase/storage';
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';


function Register() {

  const [ err , setErr ] = useState(false)
  const navigate = useNavigate()
  

  async function handleSubmit(e) {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth , email , password) ;

      const storageRef = ref(storage , displayName) ;
      const uploadTask = uploadBytesResumable(storageRef ,file)

      uploadTask.on(
        (error) => { setErr(true)} ,
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL)=> {
            await updateProfile( res.user , {
              displayName : displayName ,
              photoURL : downloadURL ,
            }
            ) ;
            await setDoc(doc(db , "users" , res.user.uid) , {
              uid : res.user.uid ,
              displayName : displayName ,
              email : email ,
              photoURL : downloadURL ,

            })

            await setDoc(doc(db , "userChats" , res.user.uid), {}) ;
            navigate("/")
          })
        }
      
      )

    
    } catch (error) {
      setErr(true)
    }

  }




  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Chat Clone</span>
            <span className="title">Register</span>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" placeholder='display name' />
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <input style={{display:'none'}} type="file" name="" id="file" />
                <label htmlFor="file">
                  <img src={Add} alt="choose file" />
                  <span>Add an avatar</span>
                </label>
                <button>Sign Up</button>
                {err && <span>Something went wrong</span>}
            </form>
            <p>Do you have an account ? <Link to={"/login"}>Login</Link></p>
        </div>
    </div>
  )
}

export default Register

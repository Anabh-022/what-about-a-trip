import React,{useState,useRef} from 'react'
import './Form.css'
import {signup_schema} from "schema-zod/Signup-schema"
import { FaUser } from "react-icons/fa";
import { FaLock,FaEnvelope} from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import axios from 'axios';
import { login_schema } from 'schema-zod/login-schema';
import {toast } from 'sonner'

const Form = () => {
  const [action,setAction]=useState('');
  const registerLink=()=>{
    setAction('active');
  }
  const loginLink=()=>{
    setAction('');
  }
  const signupUserData=useRef({
    username:"",
    firstname:"",
    lastname:"",
    password:"",
    email:"",
    contact:""
  })
  const loginUserData=useRef({
    username:"",
    password:""
    
  })

  const handleLogin=async()=>{
    const parsedData=login_schema.safeParse(loginUserData.current);
    
    if(!parsedData.success){
      toast.error(parsedData.error.errors[0].message);
      return;
    }
    //console.log(JSON.stringify(signupUserData.current));
    try{
      toast.loading('Loading...');
      const response = await axios.post("http://localhost:3000/api/v1/user/login",loginUserData.current);
      localStorage.setItem("token",response.data.token);
      toast.success('Login succesful');
    }
    catch(e){
      toast.error(e.response.data.message);
    }

  }
  const handleSignup=async()=>{
    const parsedData=signup_schema.safeParse(signupUserData.current);
    
    if(!parsedData.success){
      toast.error(e.parsedData.error.errors[0].message);
      return;
    }
    //console.log(JSON.stringify(signupUserData.current));
    try{
      toast.loading('Signup...');
      const response = await axios.post("http://localhost:3000/api/v1/user/signup",signupUserData.current);
      localStorage.setItem("token",response.data.token);
      toast.success('Signup successful');
    }
    catch(e){
      toast.error(e.response.data.message);
    }
  }
  
  return (
    <div className={`wrapper ${ action }`}>
      <div className="form-box signup">
        <form action="" onSubmit={(e)=>{e.preventDefault()}}>
          <h1>SignUp</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required onChange={(event)=>{
                signupUserData.current={
                  ...signupUserData.current,username:event.target.value
                }
            }}/>
            <FaUser className="icon"/>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required onChange={(event)=>{
                signupUserData.current={
                  ...signupUserData.current,password:event.target.value
                }}}/>
            <FaLock className="icon"/>
          </div>
          <div className="input-box">
            <input type="text" placeholder="Firstname" required onChange={(event)=>{
                signupUserData.current={
                  ...signupUserData.current,firstname:event.target.value
                }}}/>
          </div>
          <div className="input-box">
            <input type="text" placeholder="Lastname" required onChange={(event)=>{
                signupUserData.current={
                  ...signupUserData.current,lastname:event.target.value
                }}} />
          </div>
          <div className="input-box">
            <input type="tel" placeholder="Contact" required onChange={(event)=>{
                signupUserData.current={
                  ...signupUserData.current,contact:event.target.value
                }}}/>
            <IoIosContact className="icon"/>
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" required onChange={(event)=>{
                signupUserData.current={
                  ...signupUserData.current,email:event.target.value
                }}} />
            <FaEnvelope className="icon" />
          </div>
          <div className="remember-forgot">
            <label><input type="checkbox" />Remember Me</label>
            <a href="#" >Forget Password?</a>
          </div>
          <button onClick={handleSignup}>Signup</button>
          <div className="register-link">
            <p>Already have an account?<a href="#" onClick={loginLink}>Login</a></p>

          </div>
        </form>
        </div> 



        <div className="form-box login">
            <form onSubmit={(e)=>{
              e.preventDefault();
            }} action="">
            <h1>Login</h1>
          <div className="input-box">
            <input type="text" onChange={(e)=>{
              loginUserData.current={...loginUserData.current,username:e.target.value}
            }} placeholder="Username" required />
            <FaUser className="icon"/>
          </div>
          <div className="input-box">
            <input type="password" onChange={(e)=>{
              loginUserData.current={...loginUserData.current,password:e.target.value}
            }} placeholder="Password" required />
            <FaLock className="icon"/>
          </div>
          <button onClick={handleLogin}>Login</button>
          <div className="register-link">
            <p>Dont have an account?<a href="#" onClick={registerLink}>Signup</a></p>

          </div>
            </form>
        </div>

    </div>
  )
}

export default Form
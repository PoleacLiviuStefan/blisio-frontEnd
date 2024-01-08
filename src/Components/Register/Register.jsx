import { React,useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import Notification from '../Notification/Notification'

const Register = () => {

    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassowrd]=useState("");
    const [error,setError]=useState("");

    const navigate = useNavigate();

    const handleRegister=async (e)=>{
        e.preventDefault();
      
        if(password===confirmPassword)
        {try{
            await axios.post("/register",
            {
                name:userName,
                email:email,
                password:password
            })
            .then(()=> {navigate("/login"); window.location.reload();})
        }
        catch(e) {
          setPassword("");
          setConfirmPassowrd("");
          setError(e.response.data.error);
            alert('Registration failed, please try again later');
        }
    }
        else
        {setError("Passwords don't match")
        setPassword("");
        setConfirmPassowrd("")
        errorIndex+=1;
  }
        
    }


  return (
    <div className="relative flex flex-col justify-center lg:justify-start items-center w-screen h-screen font-montSerrat bg-[#1b1e20]">
      <div className="flex flex-col items-center w-full lg:w-[65rem] py-[2rem] lg:py-[8rem]">
        {error && <Notification messageError={error}   messageStatusFrom="Register"/>}
        <div className="relative flex flex-col items-start gap-4 bg-[#0f1112] rounded-[15px]  p-[2rem] h-full w-[90%] lg:w-[80%]">
        <h1 className="text-[24px]">Register</h1>
        <form onSubmit={(e)=>handleRegister(e)} className="flex flex-col gap-10 w-full text-gray-300">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-2 w-full ">
                <label className="whitespace-nowrap"> Your Username</label>
                <input onChange={(e)=>setUserName(e.target.value)} value={userName} className="px-[1rem] py-1 w-full lg:w-[80%] rounded-[8px]" type="text"  required />
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-2 w-full">
                <label className="whitespace-nowrap"> Your Email</label>
          <input onChange={(e)=>setEmail(e.target.value)} value={email}  className="px-[1rem] py-1  w-full lg:w-[80%] rounded-[8px]" type="email"  required />
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-2 w-full">
                <label className="whitespace-nowrap"> Password </label>
          <input onChange={(e)=>setPassword(e.target.value)} value={password}  className="px-[1rem] py-1  w-full lg:w-[80%] rounded-[8px]" type="password"  required />
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-2 w-full">
                <label  className="whitespace-nowrap"> Comfirm Password</label>
          <input onChange={(e)=>setConfirmPassowrd(e.target.value)} value={confirmPassword}  className="px-[1rem] py-1  w-full lg:w-[80%] rounded-[8px]" type="password"  required />
          </div>
          <button type="submit" className="border-[1px] font-bold text-[18px] border-[1px] border-white ease-in-out duration-[.3s] hover:bg-[#0d0d0d]  hover:border-[#faa0a0]">Create Account</button>
          <a onClick={()=>navigate("/login")} className="cursor-pointer text-gray-300 hover:text-gray-300">You already have an account? Login</a>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

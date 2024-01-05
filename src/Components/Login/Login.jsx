import { React,useState,useContext } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../UserContext';

const Login = () => {
    const {setUser} = useContext(UserContext);

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const {data}= await axios.post("/login", {
                email,
                password
            });

            setUser(data);
   

        } catch (e) {
            alert("Error: " + e);
        }
    };
    


  return (
    <div className="relative flex flex-col justify-center lg:justify-start items-center w-screen h-screen font-montSerrat bg-[#1b1e20]">
      <div className="flex flex-col items-center justify-center  w-full lg:w-[65rem] py-[2rem] lg:py-[8rem]">
      <div className="relative flex flex-col items-start gap-4 bg-[#0f1112] rounded-[15px]  p-[2rem] h-full w-[90%] lg:w-[80%]">
      <h1 className="text-[24px]">Login</h1>
        <form onSubmit={(e)=>handleLogin(e)} className="flex flex-col gap-4 w-full text-gray-300">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-2 w-full">
                <label className="whitespace-nowrap"> Your Email</label>
          <input onChange={(e)=>setEmail(e.target.value)} value={email}  className="px-[1rem] py-1 w-full lg:w-[80%] rounded-[8px]" type="email"  required />
          </div>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-2 w-full">
                <label className="whitespace-nowrap"> Password </label>
          <input onChange={(e)=>setPassword(e.target.value)} value={password}  className="px-[1rem] py-1 w-full lg:w-[80%] rounded-[8px]" type="password"  required />
          </div>
        <button type="submit" className="border-[1px] font-bold lg:text-[18px] ease-in-out duration-[.3s] hover:bg-[#0d0d0d] border-[1px] border-white hover:border-[#faa0a0]">Login</button>

        </form>
        <a onClick={()=>navigate("/register")} className="cursor-pointer text-gray-300 hover:text-gray-300">Don't have an account? Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;

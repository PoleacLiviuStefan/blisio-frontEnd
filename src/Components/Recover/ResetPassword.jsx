import {React, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'

const ResetPassword = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {id,token} = useParams();
    
    const navigate = useNavigate();


    const handleReset= (e)=> {
      e.preventDefault();
      axios.post(`/reset-password/${id}/${token}`, {password})
      .then(res => {
         
              navigate("/login")
            
      }).catch(err => console.log(err))
  }

  return (
    <div className="relative flex flex-col justify-center lg:justify-start items-center w-screen h-screen font-montSerrat bg-[#1b1e20]">
      <div className="flex flex-col items-center w-full lg:w-[65rem] py-[2rem] lg:py-[8rem]">
        <div className="relative flex flex-col items-start gap-4 bg-[#0f1112] rounded-[15px]  p-[2rem] h-full w-[90%] lg:w-[80%]">
        <h1 className="text-[24px]">Reset Password</h1>
        <form onSubmit={(e)=>handleReset(e)} className="flex flex-col gap-4 w-full text-gray-300">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-2 w-full">
            <label className="whitespace-nowrap"> Password </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="px-[1rem] py-1  w-full lg:w-[80%] rounded-[8px]"
              type="password"
              required
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-2 w-full">
            <label className="whitespace-nowrap"> Confirm Password </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className="px-[1rem] py-1  w-full lg:w-[80%] rounded-[8px]"
              type="password"
              required
            />
          </div>
          <button type="submit" className="border-[1px] font-bold text-[18px] border-[1px] border-white ease-in-out duration-[.3s] hover:bg-[#0d0d0d]  hover:border-[#faa0a0]">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

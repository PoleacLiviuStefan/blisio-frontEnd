import React, { useState, useEffect,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { UserContext } from '../../UserContext';
import { BsFillPencilFill } from "react-icons/bs";

const EditPage = () => {
  const { user, setUser } = useContext(UserContext);
    const [userName,setUserName]=useState("");
    const [bio,setBio]=useState("");
    const [password,setPassword] =useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [userEmail,setUserEmail]=useState("");
    const [profileImage,setProfileImage]=useState("");
    const [sent,setSent]= useState(false);
    const [hoverEdit,setHoverEdit]=useState(false);
    const [showImageEdits,setShowImageEdits]=useState(false);

    const handleUpdateDetails=async (e)=>{

      e.preventDefault();
        console.log(userName);
      try {
          const response = await axios.put('/updateDetails', { newUsername:userName, newBio:bio });
          console.log(response.data.message);
          fetchUserInfo();
          // Update user context or state as needed
          setUser(prevUser => ({
            ...prevUser,
            name: userName,
            bio: bio,
            image: profileImage
        }));

          // Handle additional success operations like notifications
      } catch (error) {
          console.error(error);
          // Handle errors (e.g., showing error message to the user)
      }
      
    }

    const fetchUserInfo = async () => {
      try {
          const response = await axios.get('/mainInfo'); // Endpoint to get user info
          console.log(response.data)
          setUserName(response.data.name);
          setBio(response.data.bio);
          setUserEmail(response.data.email)
          setProfileImage(response.data.image)
      } catch (error) {
          console.error('Error fetching user info:', error);
          // Handle error (e.g., redirect to login, show error message)
      }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.put('/updatePassword', {
            newPassword:password,
            confirmPassword:confirmPassword
        }, {
            withCredentials: true // Include this if your server requires cookies
        });
        
        // Handle success
        console.log(response.data);
    } catch (error) {
        // Handle errors
        console.error(error);
    }
};



    useEffect(() => {
   

      fetchUserInfo();
  }, []);


  const handleChangeEmail= ()=> {
    console.log("da")
  
      axios.post('/change-email', {email: userEmail})
      .then(res => {
          setSent(true);
      }).catch(err => console.log(err))
  }

  const handleUpdateProfilePicture = ()=>{
    
  }

  return (
    <div className="relative flex flex-col items-center w-full h-full font-montSerrat bg-[#1b1e20]">
           { showImageEdits && 
        <div className="fixed flex justify-center z-50 bg-black bg-opacity-[70%] w-full h-screen">
            <div className="absolute top-[10rem] gap-6 lg:gap-10 flex flex-col justify-center items-center bg-[#1B1E20] h-[15rem] w-[90%] lg:w-[35rem] rounded-[15px]">
                <span onClick={()=>setShowImageEdits(false)} className="cursor-pointer absolute top-1 right-1 bg-[#171717] hover:bg-[#0a0a0a] px-4 py-2 font-bold rounded-[5px]">Cancel</span>
                <button onClick={handleUpdateProfilePicture} className="w-[80%] bg-[#eb9898] hover:bg-[#faa0a0] font-bold text-[14px] lg:text-[15px] ">
                      Upload
                </button>
                <button onClick={handleUpdateProfilePicture} className="w-[80%] bg-[#eb9898] hover:bg-[#faa0a0] font-bold text-[14px] lg:text-[15px] ">
                      Remove Image
                </button>
            </div>
        </div>
}
      <div className="flex gap-8 flex-col items-center w-full lg:w-[65rem] py-[4rem] lg:py-[8rem]">
   
      <div className="relative"><span onClick={()=>setShowImageEdits(true)} onMouseEnter={()=>setHoverEdit(true)} onMouseLeave={()=>setHoverEdit(false)} className="cursor-pointer absolute flex items-center justify-center  bottom-0 right-2 bg-[#EB9898] rounded-[50%] w-[35px] lg:w-[50px] h-[35px] lg:h-[50px]"><BsFillPencilFill  className={`text-[16px] lg:text-[24px] ease-in-out duration-[.3s] ${hoverEdit ? "text-white" : "text-black " }`} /></span>
      {
                    profileImage ?
                <img src={profileImage} className="rounded-[50%] w-[10rem] h-[10rem]" alt="Profile" />
                :
                <span className='flex items-center justify-center w-[120px] lg:w-[200px] h-[120px] lg:h-[200px] text-[110px] lg:text-[180px] rounded-[50%] bg-[#3B3B3B]'>{user?.name[0].toUpperCase()}</span>
}
</div>
      <h1 className=" text-[28px]">{userName}</h1>
        <div className="flex flex-col w-full h-full bg-[#111314] p-12 gap-4 rounded-[15px] ">
            <form onSubmit={(e)=>handleUpdateDetails(e)} className="flex flex-col gap-4">
                
                    <h4 className="text-gray-300 lg:text-[22px] font-bold">Username</h4>
                    <input type="text" placeholder="Username" value={userName} onChange={(e)=>setUserName(e.target.value)} className="py-2 px-4"/>
                    <h4 className="text-gray-300 lg:text-[22px] font-bold">Bio</h4>
                    <textarea maxLength={60} type="text" placeholder="Bio" value={bio} onChange={(e)=>setBio(e.target.value)} className="py-2 px-4" />
            
                    <button  className="flex justify-center w-full mt-2 cursor-pointer text-white text-[14px] lg:text-[15px]  font-bold bg-[#eb9898] w-[8rem] py-2 rounded-[8px] hover:text-white hover:bg-[#faa0a0]">Update</button>
            </form>
            <form onSubmit={(e)=>handlePasswordUpdate(e)} className="mt-8 flex flex-col gap-4">
                
                <h4 className="text-gray-300 lg:text-[22px] font-bold">Password</h4>
                <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} className="py-2 px-4"/>
                <h4 className="text-gray-300 lg:text-[22px] font-bold">Confirm Password</h4>
                <input type="password"  value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="py-2 px-4" />
        
                <button type="submit" className="flex justify-center w-full mt-2 cursor-pointer text-white text-[14px] lg:text-[15px] font-bold bg-[#eb9898] w-[8rem] py-2 rounded-[8px] hover:text-white hover:bg-[#faa0a0]">Update Password</button>
        </form> 
            <div className="flex flex-col gap-4">
            <h4 className="text-gray-300 lg:text-[22px] font-bold">Email</h4>
            <div className="flex items-center gap-4" >
                <p>{userEmail}</p>
                <a onClick={handleChangeEmail} className="cursor-pointer font-bold text-[#EB9898] text-[14px] lg:text-[15px] hover:text-[#faa0a0]">Change Email</a>
            </div>
            </div>
            <div className="flex flex-col items-start gap-4">
                <h4 className="text-gray-300 lg:text-[22px] font-bold">Options</h4>
                <label><input type="checkbox"  /> Disable comments on my albums </label>
                <label><input type="checkbox"  /> Disable download on my albums </label>
                <label><input type="checkbox"  /> Make my account Private </label>
            </div>

            <h4 className="text-gray-300 lg:text-[22px] font-bold">Delete my account</h4>
            <div className="flex items-center gap-4"> 
                <p>Permanently delete account</p> <button className="flex justify-center  mt-2 cursor-pointer text-white font-bold bg-[#eb9898] w-[8rem] py-2 rounded-[8px] whitespace-nowrap hover:text-white hover:bg-[#faa0a0]">click here</button>
            </div>
        </div>
 
      </div>
    </div>
  );
};

export default EditPage;

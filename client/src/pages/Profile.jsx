import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import {Link} from "react-router-dom"
import { useRef } from 'react'
import { uploadToAppwrite,getFile} from '../appwrite'
import { useDispatch } from 'react-redux'
import {updateUserStart,updateUserSuccess,updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserSuccess, signOutUserFailure} from '../redux/user/userSlice'
function Profile() {
  const [updateSucess,setUpdateSuccess] = useState(false)
  const dispatch = useDispatch()
  const {currentUser,loading,error} = useSelector(state=>state.user)
  const fileRef = useRef(null)

   const [formData, setFormData] = useState({
    username: currentUser.username || '',
    email: currentUser.email || '',
    avatar: currentUser.avatar || '',
    password: ''
  })

  //  console.log(formData.avatar);
  // console.log(currentUser.avatar);

  // console.log(currentUser);
  // console.log(formData);
  
  
  const handleUploadImage = async (e) => {
    try {
      const file = e.target.files[0]
      if (file) {
        const response = await uploadToAppwrite(file)
        const fileId = response.$id
        // console.log(response);
        const gettingFile = await getFile(fileId)
        // console.log(fileId);

        // console.log(gettingFile);
        setFormData(prev => ({ ...prev, avatar: gettingFile }))
      }
    } catch (error) {
      console.log("upload failed", error)
    }
  }

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  
//  console.log(formData); 
 
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
    const res = await fetch(`/api/user/update/${currentUser._id}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    });
    const data = await res.json()

    if(data.sucess === false) {
      dispatch(updateUserFailure(data.message))
      return 
    }

   dispatch(updateUserSuccess(data))
   setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async () => {
    try {
     dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE', 
      });
       const data = await res.json()
       if(data.sucess==false) {
        dispatch(deleteUserFailure(data.message))
        return;
       }
       dispatch(deleteUserSuccess(data))
    } catch (error) {
      deleteUserFailure(error.message)
    }
  }
  const handleSignOut =async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/user/signout'); //we dont need to mention get method bcz default is get method
      const data = res.json()

      if(data.sucess === false) {
        dispatch(deleteUserFailure(data.message))
        return;
      }
      dispatch(signOutUserSuccess(data))

    } catch (error) {
      dispatch(signOutUserFailure())
    }
  }
  
  return (
    <div className=' max-w-lg mx-auto p-3'>
      <h1 className='text-3xl text-center my-7'>Profile</h1>
      <form onSubmit={submitHandler} className='flex flex-col gap-4'>

        <input onChange={handleUploadImage}
        type="file" ref={fileRef} 
        hidden 
        accept='image/*'
        />
        
        <img onClick={()=>fileRef.current.click()} 
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' 
        src={formData.avatar || currentUser.avatar} alt="" />

        <input onChange={handleChange} type="text" defaultValue={currentUser.username} placeholder='username' id='username' className='border p-3 rounded-lg'/>
        <input onChange={handleChange} type="email" defaultValue={currentUser.email} placeholder='email' id='email' className='border p-3 rounded-lg'/>
        <input onChange={handleChange} type="password" placeholder='password' id='password' className='border p-3 rounded-lg'/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
        {loading?'Loading...':'Update'}
        </button>
        <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create-listing"}>Create Listing</Link>
      </form>
      <div className='flex justify-between mt-4'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error? error:''}</p>
      <p className='text-green-700 mt-5'>{updateSucess? 'User is Updated Successfully':''}</p>
    </div>
  )
}

export default Profile
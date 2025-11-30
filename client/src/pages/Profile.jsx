import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { uploadToAppwrite,getFile} from '../appwrite'
function Profile() {
  const {currentUser} = useSelector(state=>state.user)
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
  return (
    <div className=' max-w-lg mx-auto p-3'>
      <h1 className='text-3xl text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>

        <input onChange={handleUploadImage}
        type="file" ref={fileRef} 
        hidden 
        accept='image/*'
        />
        
        <img onClick={()=>fileRef.current.click()} 
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' 
        src={formData.avatar || currentUser.avatar} alt="" />

        <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg'/>
        <input type="email" placeholder='email' id='email' className='border p-3 rounded-lg'/>
        <input type="password" placeholder='password' id='password' className='border p-3 rounded-lg'/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Update</button>
      </form>
      <div className='flex justify-between mt-4'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile
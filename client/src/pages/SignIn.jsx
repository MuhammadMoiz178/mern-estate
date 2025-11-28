 import React,{useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
function SignIn () {
   const [formData, setformData] = useState({})
   const [error, setError] = useState(null)
   const [loading,setloading] = useState(false)
   const navigate = useNavigate()
   const handleChange = (e) => {
     setformData({
      ...formData,
      [e.target.id] : e.target.value,
     })
   }
  //  console.log(formData);

   const submitHandler =async (e) =>{
    e.preventDefault()
    try {
      setloading(true)
      const res = await fetch('/api/auth/signin',{
          method: 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData), 
        })
      const data = await res.json()
      console.log(data);
      if(data.success === false) {
        setloading(false)
        setError(data.message)
        return
      }
      setloading(false)
      setError(null)
      navigate('/')
    } catch (error) {
      setloading(false)
      setError(error.message)
    }
   }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign-in</h1>
      <form onSubmit={submitHandler} className='flex flex-col gap-4'>
        <input type="email" placeholder='email' id='email' className='border p-3 rounded-lg'  
         onChange={handleChange}
        />
        <input type="password" placeholder='password' id='password' className='border p-3 rounded-lg'  
        onChange={handleChange}
        />
        <button disabled={loading} className='bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'} 
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to="/sign-up">
        <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
} 

export default SignIn
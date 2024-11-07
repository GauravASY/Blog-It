import {Input} from '../components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../config'
import axios from 'axios'

function SignIn() {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const navigate = useNavigate();

  
 async function handleSubmit(){
  if(!email && !password){
    return;
  }
  try {
    const {data} = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      email, password
    }, {
      headers: {
        'Content-Type' : 'application/json'
      }
    }) 
    const jwt = data.token;
    localStorage.setItem("token", jwt);
    navigate("/blogs");
  } catch (error) {
      alert("catch block of signin Post req")
  }   
}

  return (
    <div className='flex h-screen w-screen'>
      <div className='flex flex-col gap-8 h-full md:w-1/2 w-screen justify-center items-center px-12 md:px-32'>
          <span className='text-4xl font-mono font-bold'>Just Blog-It</span>
          <span className='text-md'>Don't have an account ? <Link className='text-emerald-500 font-semibold hover:underline' to="/signup">Sign Up</Link></span>
          <Input onChange={(e)=>Setemail(e.target.value)} className='shadow-sm shadow-gray-300' type='email' placeholder='email'/>
          <Input onChange={(e)=>Setpassword(e.target.value)} className='shadow-sm shadow-gray-300' type='password' placeholder='password'/>
          <Button onClick={handleSubmit} className='text-md w-1/4'>Submit</Button>
      </div>
      <div className='flex flex-col justify-center items-center w-0 md:w-1/2 bg-gray-200 gap-4 invisible md:visible'>
        <p className='text-4xl font-serif font-bold text-wrap text-center px-6'>"I’ve been following this blog for a while, and the quality of the content is consistently excellent. The posts are informative, engaging, and always up-to-date with the latest trends. I love how the blog covers such a wide variety of topics!"</p>
        <div className='w-full flex justify-end px-20 text-xl font-mono font-semibold'>~ Jason Rodriguez</div>
      </div>
    </div>
  )
}

export default SignIn
import {Input} from '../components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {BACKEND_URL} from '../../config'

function SignUp() {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [name , Setname] = useState("");
  const navigate = useNavigate();

 async function handleSubmit(){
    if(!email && !password && !name){
      return;
    }
    try {
      const {data} = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        email, password, name
      }, {
        headers: {
          'Content-Type' : 'application/json'
        }
      }) 
      const jwt = data.token;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
        alert("catch block of signup Post req")
    }
  }

  return (
    <div className='flex h-screen w-screen '>
      <div className='flex flex-col gap-8 h-full md:w-1/2 w-screen justify-center items-center px-12 md:px-32'>
          <span className='text-4xl font-mono font-bold'>Just Blog-It</span>
          <span className='text-md'>Already have an account ? <Link className='text-emerald-500 font-semibold hover:underline' to="/signin">Sign in</Link></span>
          <Input onChange={(e)=>Setemail(e.target.value)} className='shadow-sm shadow-gray-300' type='email' placeholder='email'/>
          <Input onChange={(e)=>Setpassword(e.target.value)} className='shadow-sm shadow-gray-300' type='password' placeholder='password'/>
          <Input onChange={(e)=>Setname(e.target.value)} className='shadow-sm shadow-gray-300' type='text' placeholder='username'/>
          <Button onClick={handleSubmit} className='text-md w-1/4'>Submit</Button>
      </div>
      <div className='flex flex-col justify-center items-center w-0 md:w-1/2 bg-gray-200 gap-4 invisible md:visible'>
        <p className='text-4xl font-serif font-bold text-wrap text-center px-6'>"The customer support I received was exceptional. The support team went above and beyond to address my issue"</p>
        <div className='w-full flex justify-end px-20 text-xl font-mono font-semibold'>~ Arjuna Bharat</div>
      </div>
    </div>
  )
}

export default SignUp
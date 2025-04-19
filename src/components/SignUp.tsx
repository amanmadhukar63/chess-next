'use client'
import { ResponseStatus } from "@/helper/response";
import Link from "next/link";
import { useRef } from "react";
import toast from "react-hot-toast";

interface SignUpFormType {
  username: string;
  email: string;
  password: string;
}

export default function SignUp(){

  const userData = useRef<SignUpFormType>({username:"",email:"",password:""});

  const handleSignUp = async ({username,email,password}:SignUpFormType) => {

    try {
      const res = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username,email,password}),
      });
  
      const result = await res.json();
      switch (result.status) {
        case ResponseStatus.SUCCESS:
          toast.success(result.message);
          break;
  
        case ResponseStatus.ERROR:
          toast.error(result.message);
          break;
  
        case ResponseStatus.WARN:
          toast.error(result.message);
          break;
  
        default:
          toast.error('Something went wrong');
      }
    } catch (error) {

      console.error('Error:', error);
      toast.error('Something went wrong');
      
    }
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div>
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Sign Up</legend>

          <label className="fieldset-label">Username</label>
          <input type="text" className="input" placeholder="Username" onChange={e => userData.current.username = e.target.value} />

          <label className="fieldset-label">Email</label>
          <input type="email" className="input" placeholder="Email" onChange={e => userData.current.email = e.target.value} />

          <label className="fieldset-label">Password</label>
          <input type="password" className="input" placeholder="Password" onChange={e => userData.current.password = e.target.value} />

          <button 
            className="btn btn-neutral mt-4"
            onClick={()=>{
              handleSignUp(userData.current);
            }}
            >Sign Up</button>
          <p className="fieldset-label">Already have an account, <Link className="link" href={'/login'}>Login</Link></p>
        </fieldset>
      </div>
    </div>
  );
}
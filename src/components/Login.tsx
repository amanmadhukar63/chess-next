'use client'
import { ResponseStatus } from "@/helper/response";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import toast from "react-hot-toast";

interface LoginFormType {
  email: string;
  password: string;
}

export default function Login() {

  const router = useRouter();
  const userData = useRef<LoginFormType>({email:"",password:""});

  const handleLogin = async ({email, password}: LoginFormType) => {
    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();
      switch (result.status) {
        case ResponseStatus.SUCCESS:
          toast.success(result.message);
          router.push('/');
          break;

        case ResponseStatus.ERROR:
          toast.error(result.message);
          break;

        case ResponseStatus.WARN:
          toast.error(result.message);
          break;

        default:
          toast.error('Something went wronger');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrongest');
    }
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div>
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Login</legend>

          <label className="fieldset-label">Email</label>
          <input type="email" className="input" placeholder="Email" onChange={e => userData.current.email = e.target.value} />

          <label className="fieldset-label">Password</label>
          <input type="password" className="input" placeholder="Password" onChange={e => userData.current.password = e.target.value} />

          <button 
            className="btn btn-neutral mt-4"
            onClick={() => {
              handleLogin(userData.current);
            }}
            >Login</button>
          <p className="fieldset-label">Don't have an account, <Link className="link" href={'/signup'}>Sign Up</Link></p>
        </fieldset>
      </div>
    </div>
  );
}
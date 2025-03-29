import Link from "next/link";

export default function SignUp(){
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div>
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Sign Up</legend>

          <label className="fieldset-label">Username</label>
          <input type="text" className="input" placeholder="Username" />

          <label className="fieldset-label">Email</label>
          <input type="email" className="input" placeholder="Email" />

          <label className="fieldset-label">Password</label>
          <input type="password" className="input" placeholder="Password" />

          <button className="btn btn-neutral mt-4">Sign Up</button>
          <p className="fieldset-label">Already have an account, <Link className="link" href={'/login'}>Login</Link></p>
        </fieldset>
      </div>
    </div>
  );
}
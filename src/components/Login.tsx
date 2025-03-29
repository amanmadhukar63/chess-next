import Link from "next/link";

export default function Login() {
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div>
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Login</legend>

          <label className="fieldset-label">Email</label>
          <input type="email" className="input" placeholder="Email" />

          <label className="fieldset-label">Password</label>
          <input type="password" className="input" placeholder="Password" />

          <button className="btn btn-neutral mt-4">Login</button>
          <p className="fieldset-label">Don't have an account, <Link className="link" href={'/signup'}>Sign Up</Link></p>
        </fieldset>
      </div>
    </div>
  );
}
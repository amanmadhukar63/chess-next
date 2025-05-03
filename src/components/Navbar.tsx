'use client'
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { getLocalStorage, removeLocalStorage } from "@/helper/helper";
import { useEffect, useState } from "react";
import { UserType } from "@/helper/types";

export default function Navbar() {

  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const userData = getLocalStorage('user');
    setUser(userData);
  }, [pathname]);

  async function handleLogout(){
    try {
      await fetch('/api/user/logout');
      removeLocalStorage('user');
      router.push('/login');
      toast.success("User Logged Out");

    } catch (error) {

      console.error("Error: ",error);
      toast.error("Something went wrong");

    }
  }

  return (
    <>
      <div className="navbar shadow-sm fixed top-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><a>Item 1</a></li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li><Link href={'/2player'}>2 Player</Link></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <Link href={'/'} className="btn btn-ghost text-xl">chessUI</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Hire Me</a></li>
            <li>
              <details className="dropdown">
                <summary>Mode</summary>
                <ul className="menu dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li><Link href={'/2player'}>2 Player</Link></li>
                  <li><a>vs Friend</a></li>
                  <li><a>Dice Chess</a></li>
                </ul>
              </details>
            </li>
            <li><a>Developer</a></li>
          </ul>
        </div>
        <div className="navbar-end">
          <ThemeSwitch />
          
          {user && (
            <div className="dropdown dropdown-end mx-2">
              <div tabIndex={0} role="button" className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-10 rounded-full">
                  <span className="text-lg">{user?.username?.[0]}</span>
                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-300 rounded-box z-1 w-62 p-2 shadow-sm">
                <div className="py-1 px-2">
                  <div className="flex flex-col items-start">
                    <div className="text-xl">Hi, {user?.username}</div>
                    <div className="text-sm">{user?.email}</div>
                  </div>
                </div>
                <li className="py-1 my-1">
                  <a>Profile</a>
                </li>
                <li className="my-2">
                  <button className="btn btn-soft btn-error" onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}
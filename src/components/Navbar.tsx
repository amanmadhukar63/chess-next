import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import { Toaster } from "react-hot-toast";

export default function Navbar() {
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
                  <li><a>Submenu 1</a></li>
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
                  <li><a>2 Player</a></li>
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
          {true ? 
          <Link href={'/signup'} className="btn">Sign Up</Link>
          : (
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content w-12 rounded-full">
                <span className="text-xl">D</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}
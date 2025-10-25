import React, { useState, useEffect, useRef, useContext } from "react";
import { IoSearch } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { MdLightMode } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";
import ProfileDropdown from "./ProfileDropdown"
const Navbar = () => {
  // context
  const { auth, setAuth } = useContext(BlogContext)
const navigate = useNavigate()
  // logout
  const logout = () => {
    localStorage.removeItem("auth");
    setAuth("")
    navigate("/")
  }

  // dropdown state
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const profileIcon = useRef();
  // closed dropdown
  useEffect(() => {
    const closedDropdown = (e) => {
      if (profileIcon && !profileIcon.current?.contains(e.target)) {
        setIsOpenDropdown(false)
      }
    }
    document.addEventListener("click", closedDropdown)

  }, [])



  // Mobile Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const buttonRef = useRef();

  // closed side bar
  useEffect(() => {
    const closedSidebar = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener("click", closedSidebar)

  }, [])



  return (
    <header className="shadow-md sticky top-0 z-50 font-sans font-semibold w-full bg-white ">
      <div className="flex justify-between items-center px-6 py-3    max-w-[1200px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div>
            {" "}
            <img src="/logo.png" className="w-[200px]" alt="" />
          </div>
        </div>




        {/* Account and darkmode (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link to={"/"} className="rounded-full py-2 px-4 text-[#FFF] bg-[#FF385C] hover:bg-[#FF385C]/90 ">
            Home
          </Link>
          {/* dashboard */}
          {
            auth && <Link
              to={"/dashboard"}
              className="rounded-full py-2 px-4 text-[#FFF] bg-[#FF385C] hover:bg-[#FF385C]/90 ">Dasboard</Link>
          }
          {/* display prodile  or login*/}
          {auth ? <div ref={profileIcon} onClick={() => setIsOpenDropdown(!isOpenDropdown)} className="rounded-full w-[45px] h-[45px] cursor-pointer bg-[#FF385C] hover:bg-[#FF385C]/90 text-[#FFF] text-2xl flex items-center justify-center font-semibold  "> {auth.name[0].toUpperCase()}</div> : <Link to={"/login"} className="flex items-center gap-2 bg-[#FF385C] text-white px-4 py-2 rounded-full hover:opacity-90 transition cursor-pointer">
            <LuLogIn size={18} /> Login
          </Link>}

        </div>


        {/* open dropdown */}
        {isOpenDropdown && <ProfileDropdown />}

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button ref={buttonRef} onClick={() => setIsMenuOpen(true)}>
            <GiHamburgerMenu
              size={30}
              className="text-[#545454] 
        shadow-[0_0_7px_rgba(0,0,0,0.1)] cursor-pointer bg-[#FFF] rounded-full w-[40px] h-[40px] p-2 
         border border-gray-300 hover:bg-[#FF385C] hover:text-[#FFF]   hover: border-none transition "
            />
          </button>
        </div>

        {/* Sidebar (Mobile) */}
        {isMenuOpen && (
          <div className="fixed top-0 left-0 h-full w-full  bg-black/10 backdrop-blur-md">
            <div
              ref={menuRef}
              className=" h-full w-3/4 bg-white shadow-lg z-50 p-6 flex flex-col gap-6 transition-transform duration-300  "
            >
              <div className="flex justify-between items-center ">
                <div>
                  <img src="/logo.png" alt="" className="w-[150px]" />
                </div>
                <button onClick={() => setIsMenuOpen(false)}>
                  <MdClose size={28} className="text-[#FF385C] cursor-pointer" />
                </button>
              </div>

              {/* Sidebar Links */}
              <nav className="flex flex-col  text-lg text-[#545454]">
                <Link
                  to={"/"}
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-[#FFF] hover:border-none  h-[45px] flex items-center justify-center transition border-b border-[#FF385C] text-[#FF385] hover:bg-[#FF385C]"
                >
                  Home
                </Link>

                {/* dashboard */}
                {
                  auth && <Link
                    to={"/dashboard"}
                    className="hover:text-[#FFF] hover:border-none  h-[45px] flex items-center justify-center transition border-b border-[#FF385C] text-[#FF385] hover:bg-[#FF385C]">Dasboard</Link>
                }
              </nav>

              {/* Login Button */}
              {auth ? <div
              onClick={logout}
              className="flex items-center justify-center gap-2 bg-[#FF385C] text-white px-4 py-2 rounded-md hover:opacity-90 transition mt-3  cursor-pointer">
                <LuLogIn size={18} /> Logout
              </div> : <Link to={"/login"} className="flex items-center justify-center gap-2 bg-[#FF385C] text-white px-4 py-2 rounded-md hover:opacity-90 transition mt-3  cursor-pointer">
                <LuLogIn size={18} /> Login
              </Link>}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

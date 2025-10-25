import React, { useContext } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { BlogContext } from "../context/BlogContext";
import { useNavigate } from "react-router";

const ProfileDropdown = () => {
    // context
    const { auth , setAuth} = useContext(BlogContext);
  // navigate
  const navigate = useNavigate();
    // logout
    const logout = ()=>{
      localStorage.removeItem("auth");
      setAuth("")
       navigate("/")
    }
  return (
    <div className="absolute z-50 right-[8%] top-19 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fadeIn">
      {/* User Image */}
      <div className="flex flex-col items-center bg-gradient-to-r from-[#FF385C] via-[#5C5454] to-[#000] py-6">
        <div
          className="w-20 h-20 rounded-full shadow-md flex items-center justify-center font-semibold text-3xl bg-[#FFF] text-[#FF385C]"
        >F</div>
        <h2 className="text-white text-lg font-semibold mt-3">{auth.name}</h2>
        <p className="text-gray-200 text-sm">{auth.email}</p>
      </div>

      {/* Buttons / Actions */}
      <div className="flex flex-col items-center py-4 space-y-3 bg-[#FFF]">
        <button
        onClick={logout}
         className="w-[85%] py-2 bg-[#FF385C] cursor-pointer text-white font-medium rounded-lg hover:bg-[#e7334f] transition-all duration-300 flex items-center justify-center gap-2">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;

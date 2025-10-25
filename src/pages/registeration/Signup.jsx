import React, { useContext, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";
import { BlogContext } from "../../context/BlogContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const Signup = () => {
  // Context
  const { isLoading, setIsLoading } = useContext(BlogContext);

  // navigate
  const navigate = useNavigate()
  // signup state
  const [signup, setSignup] = useState({
    username: "",
    email: "",
    password: "",
  });

  const signupFunc = async (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const name = signup.username.trim();
    const email = signup.email.trim();
    const password = signup.password.trim();

    if (!name || !email || !password) {
      return toast.error("Fill All The Fields!");
    }

    if (!emailPattern.test(email)) {
      return toast.error("Put Valid Email!");
    }

    if (password.length < 8) {
      return toast.error("password contains atleast 8 characters");
    }

    try {
      setIsLoading(true);
      // account create func
      const userAuth = await createUserWithEmailAndPassword(auth, email, password);

      // create object for storig name after sign up
      const date = new Date();
    //  generate date like sep 12 2025
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short", 
        day: "numeric",
        year: "numeric"
      });

      const user = {
        userId: userAuth.user.uid,
        name,
        email,
        time: Timestamp.now(),
        date:formattedDate

      }
      // set user in store
      const userdoc = doc(fireDB, "users", user.userId)
      await setDoc(userdoc, user)

      // alert for success
      toast.success("Signup Successfuly!");

      // empty signup state
      setSignup({
        username: "",
        email: "",
        password: "",
      })

      //  wait for toast
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      toast.error("Something Went Wrong!");
      console.log(err.message);
    } finally {
      setIsLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF] font-sans px-3">
      <form
        onSubmit={signupFunc}
        className="w-full max-w-[400px] bg-white shadow-lg rounded-2xl px-6 py-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#FF385C] p-4 rounded-full text-white text-4xl">
            <FaRegCircleUser />
          </div>
        </div>

        <h2 className="text-3xl font-semibold text-center text-[#5C5454] mb-6">
          Create Your Account
        </h2>

        {/* Input Fields */}
        <div className="space-y-4">
          <input
            value={signup.username}
            onChange={(e) => setSignup({ ...signup, username: e.target.value })}
            type="text"
            placeholder="Enter Your Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] text-[#5C5454] transition-all duration-300"
          />

          <input
            value={signup.email}
            onChange={(e) => setSignup({ ...signup, email: e.target.value })}
            type="email"
            placeholder="Enter Your Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] text-[#5C5454] transition-all duration-300"
            required
          />

          <input
            value={signup.password}
            onChange={(e) => setSignup({ ...signup, password: e.target.value })}
            type="password"
            placeholder="Enter Your Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] text-[#5C5454] transition-all duration-300"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-6 cursor-pointer bg-[#FF385C] text-white font-semibold py-2.5 rounded-lg hover:bg-[#e7334f] transition-all duration-300"
        >
          Sign Up
        </button>

        {/* Footer Text */}
        <p className="text-center text-sm text-[#5C5454] mt-5">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-[#FF385C] font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
      {/* Loader */}
      {isLoading && <Loader />}
    </div>
  );
};

export default Signup;

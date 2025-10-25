import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { auth, fireDB } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import Loader from '../../component/Loader';
import { BlogContext } from '../../context/BlogContext';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {

  // Context
  const { isLoading, setIsLoading, setAuth } = useContext(BlogContext);
 
  // navigate
  const navigate = useNavigate()
  // signup state
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const LoginFun = async (e) => {
    e.preventDefault();
    const email = login.email.trim();
    const password = login.password.trim();

    if (!email || !password) {
      return toast.error("Fill All The Fields!");
    }



    try {
      setIsLoading(true);
      const userAuth = await signInWithEmailAndPassword(auth, email, password);
      // get user form store
      const userdoc = doc(fireDB, "users", userAuth.user.uid)
      const user = await getDoc(userdoc);
      toast.success("Login Successfuly!");

   if(user.exists()){
    const data = user.data()
       // update state
      setAuth(data)

      // set in local storage
      localStorage.setItem("auth", JSON.stringify(data))
   }

      
      // empty state
      setLogin({
        email: "",
        password: "",
      })
      
      
      //  wait for toast
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (err) {
      toast.error("Something Went Wrong!");
      console.log(err);
    } finally {
      setIsLoading(false);

    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF] font-sans px-3">
      <form
        onSubmit={LoginFun}
        className="w-full max-w-[400px] bg-white shadow-lg rounded-2xl px-6 py-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
        {/* Icon */}
        <div className="flex justify-center mb-3">
          <div className="bg-[#FF385C] p-4 rounded-full text-white text-2xl">
            <FaRegCircleUser />
          </div>
        </div>

        <h2 className="text-4xl font-semibold text-center text-[#5C5454] mb-6">
          Login
        </h2>

        {/* Input Fields */}
        <div className="space-y-4">
          <input
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            type="email"
            placeholder="Enter Your Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] text-[#5C5454] transition-all duration-300"
          />

          <input
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            type="password"
            placeholder="Enter Your Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] text-[#5C5454] transition-all duration-300"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-6 cursor-pointer bg-[#FF385C] text-white font-semibold py-2.5 rounded-lg hover:bg-[#e7334f] transition-all duration-300"
        >
          Login
        </button>

        {/* Footer Text */}
        <p className="text-center text-sm text-[#5C5454] mt-5">
          Create your Account?{" "}
          <Link to={"/signup"} className="text-[#FF385C] font-medium hover:underline">
            Signup
          </Link>
        </p>
      </form>
      {/* Loader */}
      {isLoading && <Loader />}
    </div>
  )
}

export default Login

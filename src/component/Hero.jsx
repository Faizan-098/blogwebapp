import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BlogContext } from '../context/BlogContext'
import { IoChevronDown } from 'react-icons/io5'

const Hero = () => {
  // context
  const { auth, filter , filtereDataFun} = useContext(BlogContext)
  // Navigate
  const navigate = useNavigate();
  // go to dashboard if login
  const goToDashboard = () => {
    if (auth) {
      navigate("/createblog")
    } else {
      navigate("/login")
    }
  }



  
  
  return (
    <section className="px-3">
      <div className="max-w-[1200px] md:h-[400px] mx-auto mt-4 relative rounded-xl overflow-hidden ">
        <div className="wrapper absolute w-full h-full bg-[rgba(0,0,0,0.5)] left-0  flex flex-col gap-7 items-center justify-center ">
          <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold text-[#FFF] text-center">
            Discover Inspiring Stories & Tech Insights
          </h1>
          <p className="text-[#FFF] hidden md:flex sm:text-lg md:text-xl  max-w-2xl text-center ">
            Explore the latest articles on technology, creativity, and
            lifestyle. Learn from experts, get inspired, and stay ahead of the
            trends — all in one place.
          </p>
          <div className="flex justify-center  gap-2 md:gap-4">
            <button className="bg-[#FF385C] text-white text-[13px] md:text-[16px]  px-3 py-2 md:px-6 md:py-2 rounded-full font-medium hover:bg-[#FF385C]/90 transition">
              Read Latest Blogs
            </button>
            <button
              onClick={goToDashboard}
              className="border-2 border-[#FF385C] text-[13px] md:text-[16px]  text-[#FFF] px-3 py-2 md:px-6 md:py-2 rounded-full font-medium hover:bg-[#FF385C] hover:text-white transition cursor-pointer">
              Start Writing
            </button>
          </div>
        </div>
        <img
          src="/blog-hero.png"
          className="w-full object-contain md:object-cover h-full  "
          alt="hero-blog"
        />
      </div>
      <div className="max-w-[1200px] mx-auto px-3 font-bold text-3xl md:text-5xl mt-7 flex  justify-between items-center  gap-2 md:gap-0">
        <h2 className='relative text-[#5C5454] inline-block after:content-[""] after:block after:h-[4px] after:w-[60%] after:bg-[#FF385C]  md:after:mt-2'>
          Latest Blogs
        </h2>

        <div className="relative inline-block text-base md:text-xl font-semibold">
          <select
          defaultValue={filter}
          onChange={filtereDataFun}
            className="appearance-none bg-white border border-[#FF385C] text-[#5C5454]
                 rounded-sm px-2 md:px-6 py-1 md:py-2 pr-3  md:pr-10 shadow-[0_5px_15px_rgba(255,56,92,0.15)]
                 focus:outline-none focus:border-[#FF385C]
                 hover:shadow-[0_8px_20px_rgba(255,56,92,0.25)]
                 transition-all duration-300 cursor-pointer"
          >
            <option value="">All </option>
            <option value="tech">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="news">News</option>
          </select>

          <IoChevronDown
            size={20}
            className="text-[#FF385C] absolute right-2 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>
      </div>

    </section>
  )
}

export default Hero
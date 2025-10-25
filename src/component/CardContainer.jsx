import React, { useContext } from "react";
import { BiLike } from "react-icons/bi";
import { MdOpenInNew } from "react-icons/md";
import Loader from "./Loader";
import { BlogContext } from "../context/BlogContext";
import { Link } from "react-router-dom";

const CardContainer = () => {
  // context=
  const { blogStateData,filteredData, isLoading , likeData} = useContext(BlogContext)
  const filteredLikeFun =(blogId)=>{
    return likeData.filter(like => like.blogId === blogId).length > 0 ?  likeData.filter(like => like.blogId === blogId).length : "" 
  }
  
  
  return (
    <>
      <div className="max-w-[1200px] mx-auto font-sans grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 px-3 mt-5 bg-[#fff]">
        {/*  Blog Cards */}
        
        {filteredData.length> 0 && filteredData.map((blog)=>{
          const {blogId, blogImg, blogAuthor, blogTitle, date} = blog;
          return <Link
          to={`/detaild/${blogId}`} 
          key={blogId}
          className="bg-white rounded-2xl shadow-sm hover:-translate-y-1.5 cursor-pointer  border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 relative">
          <div className="wrapper opacity-0 hover:opacity-100 absolute bg-[rgba(0,0,0,0.5)] w-full h-full flex items-center
        transition-all duration-300 justify-center text-2xl text-white"><div className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#FF385C] ">
              <MdOpenInNew />
            </div>
          </div>
          
          {/* Image */}
          <div >
            <img
              src={blogImg}
              alt="blogimage"
              className="w-full h-48 object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-4 text-[#545454]">
            {/* Category */}
            <div className="text-[#545454] font-bold text-xl mb-1 ">
              {blogTitle}
            </div>

            {/* Author */}
            <p className="text-sm mb-2">
              Publish By: <span className="font-medium">{blogAuthor}</span>
            </p>

            {/* Likes and Time */}
            <div className="flex justify-between items-center mt-3 text-sm">
              <p className=" bg-[#FF385C] rounded-full px-2 py-1 flex items-center gap-1 text-[#FFF] font-medium">
                <BiLike className="text-[#FFF]  text-lg" /> {filteredLikeFun(blogId)} Likes
              </p>
              <p className="text-gray-500">{date}</p>
            </div>
          </div>
        </Link>
        })}
       
      </div>

       {/* Loader */}
        {isLoading && <Loader />}
    </>
  );
};

export default CardContainer;

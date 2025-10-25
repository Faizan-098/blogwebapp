import React, { useContext, useState } from "react";
import { AiOutlineLike, AiOutlineComment, AiFillLike } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import Layout from "../component/Layout";
import Loader from "../component/Loader"
import { BlogContext } from "../context/BlogContext";
import { useParams } from "react-router-dom";

const Detailpage = () => {
  // Context
  const { blogStateData, isLoading, comment, setComment, dropComment, commentData, likeFun ,likeData } = useContext(BlogContext)

  // Fetch Id from URL
  const { id } = useParams();

  // Find Blog
  let findBlog = ''
  if (blogStateData.length > 0) {
    findBlog = blogStateData.find(blog => blog.blogId === id)
  }

  const { blogImg, blogAuthor, blogTitle, date, blogDesc, blogId, userId } = findBlog;


  // Filter Comments with the help of URL ID 
  let filteredCommnet = []
  if (commentData.length > 0) {
    filteredCommnet = commentData.filter(com => com.blogId === id)
  }
  
  // Liked state
  const [liked, setliked] = useState(false) 
  // Filter Likes with the help of URL ID 
  let filteredLike=[];
  if(likeData.length>0){
    filteredLike= likeData.filter(like => like.blogId === id)
  }







  return (
    <Layout>
      {/* Blog Detailed */}
      {findBlog && <div className="max-w-[1200px] mx-auto p-4">
        {/* Author Section */}
        <div className="text-center mb-3 md:mb-6">
          <h2 className=" text-3xl md:text-6xl  leading-normal font-semibold text-center
             text-transparent bg-clip-text bg-gradient-to-r from-[#FF385C] via-[#5C5454] to-[#FF385C] ">Published By {blogAuthor}</h2>
        </div>

        {/* Blog Image */}
        <div className="aspect-[16/8] mb-4">
          <img src={blogImg} className="object-cover w-full h-full rounded-lg" />
        </div>


        {/* Blog Title */}
        <div className="flex justify-between items-center gap-2">

          <h2 className="text-xl md:text-4xl font-semibold text-[#5C5454] mb-2  md:mb-3">
            {blogTitle}
          </h2>

          <p className="text-gray-600 text-[13px] hidden md:flex md:text-lg">{date}</p>
        </div>

        {/* Likes & Comments */}
        <div className="flex items-center gap-6 text-gray-600 mb-6">
          <div className="flex items-center gap-1">
            {!liked ? <div onClick={()=>{
              likeFun(blogId,userId)
              setliked(true)

            }}><AiOutlineLike className="text-xl cursor-pointer hover:text-[#FF385C]-500 transition" /></div>:<div><AiFillLike className="text-xl"/></div>}
            <div >{filteredLike.length} Likes</div>
          </div>
          <div className="flex items-center gap-2">
            <AiOutlineComment className="text-xl cursor-pointer hover:text-blue-500 transition" />
            <span>{filteredCommnet.length} Comments</span>
          </div>
        </div>

        {/* Blog Content */}
        <div className="text-gray-700 text-justify leading-relaxed space-y-4 mb-5 md:mb-10">
          {blogDesc}
        </div>

        {/* Comment Form */}
        <div className="border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Drop a Comment 💬
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dropComment(blogId, userId)
            }}
            className="space-y-4">
            <input
              value={comment.username}
              onChange={(e) => setComment({ ...comment, username: e.target.value })}
              type="text"
              placeholder="Enter Full Name"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-1 focus:border-[#FF385C] transition-all duration-150 ease-in"
            />
            <textarea
              value={comment.userComment}
              onChange={(e) => setComment({ ...comment, userComment: e.target.value })}
              placeholder="Write your comment..."
              className="w-full border border-gray-300 rounded-xl p-3 h-32 resize-none focus:outline-none focus:border-1 focus:border-[#FF385C]  transition-all duration-150 ease-in"
            ></textarea>
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-[#FF385C] via-[#FF007F] to-[#FF385C] text-white font-semibold py-3 px-5 rounded-xl hover:opacity-90 transition-all cursor-pointer"
            >
              <FiSend /> Drop Comment
            </button>
          </form>
        </div>

        {/* View Comments */}
        {filteredCommnet.length > 0 && <div className="mt-10 space-y-6 max-h-[300px] overflow-y-auto">
          {filteredCommnet.map((comment) => {
            const { id, username, userComment, date } = comment
            return <div key={id} className=" p-4 rounded-2xl shadow-sm border border-gray-300">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-[#FFF] rounded-full bg-[#FF385C]/90 py-1 px-4">{username}</p>
                <p className="text-sm text-gray-500">{date}</p>
              </div>
              <p className="text-gray-600 bg-[#FF385C]/7 p-3 rounded-md ">
                {userComment}
              </p>
            </div>
          })}

        </div>}
      </div>}
      {isLoading && <Loader />}
    </Layout>
  );
};

export default Detailpage;

import React, { useContext } from "react";
import Layout from "../../component/Layout";
import { FaRegCommentDots, FaRegThumbsUp, FaBlog, FaEdit, FaTrash } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { MdArticle } from "react-icons/md";
import { LuCircleFadingPlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { BlogContext } from "../../context/BlogContext";
import Loader from "../../component/Loader";


const Dashboard = () => {
  // context
  const { auth, setBlogData ,blogStateData, isLoading,deleteBlogFun, commentData , likeData} = useContext(BlogContext)
 // Filter Comments with the help of URL ID 
  let filteredCommnet = []
  if (commentData.length > 0) {
    filteredCommnet = commentData.filter(com => com.userId === auth.userId)
  }
 
  // Filter Likes with the help of URL ID 
  let filteredLike = []
  if (likeData.length > 0) {
    filteredLike = likeData.filter(com => com.userId === auth.userId)
  }
 
  
  
  
  // navigate
  const navigate =useNavigate()
  let name = "";
  if (auth) {
    name = auth.name[0].toUpperCase() + auth.name.slice(1)
  }
  
 // Filter Blogs with the help of URL ID 
  let blogFilteredData = []
  if (blogStateData.length > 0) {
    blogFilteredData = blogStateData.filter(blog => blog.userId == auth.userId)
  }
  


  //Redirect Update blog and 
  const openEditBlogForm =(prevblog)=>{
    setBlogData(prevblog)
    navigate("/updateblog");
  }


  return (
    <Layout>
      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto p-3 md:p-5 ">

        {/* Welcome */}
        <div className="relative px-6 min-h-[300px] md:min-h-[350px] rounded-2xl overflow-hidden shadow-lg text-center mb-10 flex flex-col gap-5 items-center justify-center bg-gradient-to-tl from-[#000] via-[#5C5454] to-[#FF385C]">
          <h1 className="text-2xl leading-normal md:text-5xl font-semibold text-[#FFF] drop-shadow-md transition-all duration-500">
            👏 Welcome back,{name}! Manage your blogs, track engagement, and keep inspiring your readers.
          </h1>

          <Link to={"/createblog"} className="mb-2 cursor-pointer flex items-center gap-2 px-6 py-3 bg-[#FF385C] text-white font-semibold rounded-full shadow-md hover:bg-[#e7334f] hover:scale-105 active:scale-95 transition-all duration-300">
            <LuCircleFadingPlus size={25} />
            Write Your Blog
          </Link>
        </div>



       {blogFilteredData.length>0 ?  
      <>
       {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white border border-[#ff385c]/70  rounded-xl p-6 text-center hover:shadow-lg transition">
            <FaRegCommentDots className="text-[#FF385C] text-3xl mx-auto mb-3" />
            <h3 className="font-semibold text-lg">Total Comments</h3>
            <p className="text-2xl font-bold text-[#FF385C] mt-2">{filteredCommnet.length}</p>
          </div>

          <div className="bg-white border border-[#ff385c]/70  rounded-xl p-6 text-center hover:shadow-lg transition">
            <AiFillLike className="text-[#FF385C] text-3xl mx-auto mb-3" />
            <h3 className="font-semibold text-lg">Total Likes</h3>
            <p className="text-2xl font-bold text-[#FF385C] mt-2">{filteredLike.length}</p>
          </div>

          <div className="bg-white border border-[#ff385c]/70  rounded-xl p-6 text-center hover:shadow-lg transition">
            <MdArticle className="text-[#FF385C] text-3xl mx-auto mb-3" />
            <h3 className="font-semibold text-lg">Total Blogs</h3>
            <p className="text-2xl font-bold text-[#FF385C] mt-2">{blogFilteredData.length}</p>
          </div>
        </div>


         {/* Blogs Table */}
       <div className="bg-white md:border border-gray-300 rounded-2xl shadow-[0_0_7px_rgba(0,0,0,0.1)] md:p-6">
          <h2 className="text-3xl md:text-4xl text-center font-semibold mb-4 text-[#FF385C] border-b px-2 py-2">
            View Your Blogs
          </h2>

          <div className=" overflow-auto max-h-[500px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FF385C] text-white">
                  <th className="p-3 min-w-[150px]">ID</th>
                  <th className="p-3 min-w-[150px]">Image</th>
                  <th className="p-3 min-w-[120px]">Author</th>
                  <th className="p-3 min-w-[150px]">Title</th>
                  <th className="p-3 min-w-[120px]">Category</th>
                  <th className="p-3 min-w-[120px]">Created At</th>
                  <th className="p-3 min-w-[120px] text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {blogFilteredData.length > 0 && blogFilteredData.map((blog) => {
                  const { blogId, blogImg, blogTitle,blogAuthor, blogCategory, date } = blog
                  return <tr 
                  key={blogId}
                  className="border-b border-gray-300 hover:bg-[#ff385c]/5 transition">
                    <td className="p-3">{blogId}</td>
                    <td className="p-3"><img src={blogImg} className="rounded-md  w-full object-cover h-[80px] " alt="blogImg" /></td>
                    <td className="p-3">{blogAuthor}</td>
                    <td className="p-3">{blogTitle}</td>
                    <td className="p-3">{blogCategory}</td>
                    <td className="p-3">{date}</td>
                    <td className="p-3 ">
                      <div className="flex justify-center gap-4 items-center">
                        <button onClick={()=>openEditBlogForm(blog)} className="text-[#5C5454] hover:text-[#FF385C] hover:scale-110 transition cursor-pointer">
                          <FaEdit />
                        </button>
                        <button 
                        onClick={()=> deleteBlogFun(blog.blogId)}
                        className="text-[#5C5454] hover:text-[#FF385C] hover:scale-110 transition cursor-pointer">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </> : <h2 className="text-4xl md:text-5xl font-semibold text-[#5C5454] text-center">Your Blog is Empty!</h2>}
      </div>
      {/* Loader */}
      {isLoading && <Loader />}
    </Layout>
  );
};

export default Dashboard;

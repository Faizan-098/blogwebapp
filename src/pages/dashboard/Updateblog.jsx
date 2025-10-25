import { useContext } from "react";
import Layout from "../../component/Layout";
import { BlogContext } from "../../context/BlogContext";
import Loader from "../../component/Loader"

const Updateblog = () => {
const {UpdateBlogFun,blogData ,setBlogData , isLoading}=useContext(BlogContext)
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-[#FFF] font-sans py-10 px-4">
        <div className="w-full max-w-[1000px] bg-white shadow-xl rounded-2xl px-8 py-10 border border-gray-100 ">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl leading-normal font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#FF385C] via-[#5C5454] to-[#FF385C] mb-8">
            Update Your  Blog
          </h2>
          <div className="flex gap-10 items-start  flex-wrap">
            {/* update blog  */}
            <form
              onSubmit={(e)=>{
                e.preventDefault();
                UpdateBlogFun(blogData.blogId)
              }}
              className="flex-1">
              {/* Thumbnail */}
              <div className="flex justify-center mb-6">
                <input
                  value={blogData.blogImg}
                  onChange={(e) => setBlogData({ ...blogData, blogImg: e.target.value })}
                  type="url"
                  className=" w-full px-4 py-3 border border-gray-300 rounded-lg text-[#5C5454] focus:outline-none focus:border-[#FF385C] transition-all duration-300"
                  placeholder="Enter image URL"
                />

              </div>

              {/* Author */}
              <div className="mb-4">
                <input
                  value={blogData.blogAuthor}
                  onChange={(e) => setBlogData({ ...blogData, blogAuthor: e.target.value })}
                  type="text"
                  placeholder="Author Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#5C5454] focus:outline-none focus:border-[#FF385C] transition-all duration-300"
                />
              </div>

              {/* Title */}
              <div className="mb-4">
                <input
                  value={blogData.blogTitle}
                  onChange={(e) => setBlogData({ ...blogData, blogTitle: e.target.value })}
                  type="text"
                  placeholder="Title Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#5C5454] focus:outline-none focus:border-[#FF385C] transition-all duration-300"
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <select
                  value={blogData.blogCategory}
                  onChange={(e) => setBlogData({ ...blogData, blogCategory: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#5C5454] focus:outline-none focus:border-[#FF385C] transition-all duration-300"
                >
              
                  <option value="">Select Category</option>
                  <option value="Tech">Tech</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="News">News</option>
                </select>

              </div>

              {/* Description */}
              <div className="mb-6">

                <textarea
                  value={blogData.blogDesc}
                  onChange={(e) => setBlogData({ ...blogData, blogDesc: e.target.value })}
                  rows="5"
                  placeholder="Write Detail About Blog..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#5C5454] focus:outline-none focus:border-[#FF385C] transition-all duration-300 resize-none"
                ></textarea>
              </div>

              {/* Button */}
              <button
          
                type="submit"
                className="w-full bg-[#FF385C] text-white font-semibold py-3 rounded-lg hover:bg-[#e7334f] hover:scale-101 cursor-pointer active:scale-95 transition-all duration-300"
              >
                Update Blog
              </button>
            </form>
            {/* image */}
            <div>
              <img
                src="/createblog.jpg"
                className="max-w-[500px] w-full"
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loader/>}
    </Layout>
  );
};

export default Updateblog;

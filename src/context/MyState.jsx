import React, { useEffect, useState } from "react";
import { BlogContext } from "./BlogContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const MyState = ({ children }) => {
  /*----------------------*
   |  Global States Setup |
   *----------------------*/

  // Loading state for API calls
  const [isLoading, setIsLoading] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  // Core app data states
  const [blogStateData, setBlogStateData] = useState([]); // All blogs
  const [auth, setAuth] = useState("");                   // Logged-in user data
  const [commentData, setCommentData] = useState([]);     // All comments
  const [likeData, setLikeData] = useState([]);           // All likes


  /*--------------------*
   |  Blog Data Section |
   *--------------------*/

  // Fetch all blogs from Firestore
  const getBlogsFromStore = async () => {
    try {
      setIsLoading(true);
      const blogsSnap = await getDocs(collection(fireDB, "blogs"));
      const blogs = blogsSnap.docs.map(doc => ({
        ...doc.data(),
        blogId: doc.id,
      }));
      setBlogStateData(blogs);
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Current formatted date
  const formattedDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Blog form data
  const [blogData, setBlogData] = useState({
    blogImg: "",
    blogAuthor: "",
    blogTitle: "",
    blogCategory: "",
    blogDesc: "",
    time: Timestamp.now(),
    date: formattedDate,
  });

  // Create new blog
  const createBlogFun = async (e) => {
    e.preventDefault();

    const { blogImg, blogAuthor, blogTitle, blogCategory, blogDesc } = blogData;

    if (!blogImg.trim() || !blogAuthor.trim() || !blogTitle.trim() || !blogCategory.trim() || !blogDesc.trim()) {
      return toast.error("All fields are required!");
    }

    blogData.userId = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth")).userId
      : null;

    try {
      setIsLoading(true);
      await addDoc(collection(fireDB, "blogs"), blogData);
      await getBlogsFromStore();
      toast.success("Blog Created Successfully!");

      // Reset blog form
      setBlogData({
        blogImg: "",
        blogAuthor: "",
        blogTitle: "",
        blogCategory: "",
        blogDesc: "",
        time: Timestamp.now(),
        date: formattedDate,
      });

      // Navigate after success
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Update existing blog
  const UpdateBlogFun = async (id) => {
    const { blogImg, blogAuthor, blogTitle, blogCategory, blogDesc } = blogData;

    if (!blogImg.trim() || !blogAuthor.trim() || !blogTitle.trim() || !blogCategory.trim() || !blogDesc.trim()) {
      return toast.error("All fields are required!");
    }

    try {
      setIsLoading(true);
      await updateDoc(doc(fireDB, "blogs", id), blogData);
      await getBlogsFromStore();
      toast.success("Blog Updated Successfully!");

      // Reset form after update
      setBlogData({
        blogImg: "",
        blogAuthor: "",
        blogTitle: "",
        blogCategory: "",
        blogDesc: "",
        time: Timestamp.now(),
        date: formattedDate,
        userId: auth.userId,
      });

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete blog by ID
  const deleteBlogFun = async (id) => {
    await deleteDoc(doc(fireDB, "blogs", id));
    await getBlogsFromStore();
    toast.error("Blog deleted Successfully!");
  };


  /*----------------------*
   |  Comment Data Logic  |
   *----------------------*/

  // Single comment form data
  const [comment, setComment] = useState({
    username: "",
    userComment: "",
    date: formattedDate,
  });

  // Fetch comments from Firestore
  const getCommentsFromStore = async () => {
    try {
      setIsLoading(true);
      const commentSnap = await getDocs(collection(fireDB, "comments"));
      const comments = commentSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommentData(comments);
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Post new comment
  const dropComment = async (blogId, userId) => {
    const { username, userComment } = comment;

    if (!username.trim() || !userComment.trim()) {
      return toast.error("All fields are required!");
    }

    const postComment = { ...comment, blogId, userId };

    try {
      setIsLoading(true);
      await addDoc(collection(fireDB, "comments"), postComment);
      await getCommentsFromStore();

      setComment({ username: "", userComment: "", date: formattedDate });
      toast.success("Comment Added Successfully!");
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  /*------------------*
   |  Likes Data Logic |
   *------------------*/

  // Fetch all likes from Firestore
  const getLikesFromStore = async () => {
    try {
      setIsLoading(true);
      const likeSnap = await getDocs(collection(fireDB, "likes"));
      const likes = likeSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLikeData(likes);
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add like to a blog
  const likeFun = async (blogId, userId) => {
    const postLike = { userId, blogId, userLike: "like" };

    try {
      setIsLoading(true);
      await addDoc(collection(fireDB, "likes"), postLike);
      await getLikesFromStore();
      toast.success("Like Added Successfully!");
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  /*----------------*
   |  Filter System |
   *----------------*/

  const [filter, setFilter] = useState("");        // Selected filter category
  const [filteredData, setFilteredData] = useState([]); // Filtered blogs

  // Handle filter change
  const filtereDataFun = (e) => setFilter(e.target.value);

  // Update filtered data when category changes
  useEffect(() => {
    if (filter) {
      const data = blogStateData.filter(
        blog => blog.blogCategory.toLowerCase() === filter.toLowerCase()
      );
      setFilteredData(data);
    } else {
      setFilteredData(blogStateData);
    }
  }, [filter, blogStateData]);


  /*-----------------------------*
   |  Initial Data Load on Mount |
   *-----------------------------*/
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : null;

    if (storedAuth) setAuth(storedAuth);

    getBlogsFromStore();
    getCommentsFromStore();
    getLikesFromStore();
  }, []);


  /*---------------------------*
   |  Context Provider Section |
   *---------------------------*/
  return (
    <BlogContext.Provider
      value={{
        isLoading, setIsLoading,
        auth, setAuth,
        blogData, setBlogData,
        createBlogFun, UpdateBlogFun, deleteBlogFun,
        blogStateData,
        comment, setComment, dropComment, commentData,
        likeFun, likeData,
        filter, filtereDataFun, filteredData,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default MyState;

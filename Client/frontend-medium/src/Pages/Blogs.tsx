import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import BlogBox from "@/components/BlogBox";
import BlogSkeleton from "../components/BlogSkeleton";

interface Blogtypes {
  id: string;
  title: string;
  content: string;
  published: boolean;
  date: string;
  author: authortype;
}

interface authortype {
  name: string;
}

function Blogs() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [blogs, setBlogs] = useState<Blogtypes[]>([]);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      setToken(jwt);
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchAllBlogs();
    }
  }, [token]);

  async function fetchAllBlogs() {
    try {
      const header = ` Bearer ${token}`;
      const { data } = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: header,
        },
      });
      if (data.success) {
        setBlogs([...data.blogs]);
      }
    } catch (error) {
      alert("frontned fetching bulk catch block");
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-x-hidden">
      <Navbar token={token} />

      <div className="flex-grow flex justify-center w-screen mt-20">
        <div className=" flex flex-col gap-2 lg:w-2/3 md:3/4 px-24">
          {blogs.length != 0 ? (
            blogs.map((blog) => (
              <BlogBox
                key={blog.id}
                title={blog.title}
                content={blog.content}
                author={blog.author.name}
                id={blog.id}
                date={blog.date}
              />
            ))
          ) : (
            <div className="flex flex-col justify-center gap-2 w-3/4 p-4">
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Blogs;

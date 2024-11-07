import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BlogBox from "../components/BlogBox";
import BlogSkeleton from "../components/BlogSkeleton";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import Footer from "../components/Footer";

interface Blogtypes {
  id: string;
  title: string;
  content: string;
  date: string;
  author: authortype;
}

interface authortype {
  name: string;
  email: string;
  password: string;
}

function Profile() {
  const [author, setAuthor] = useState<authortype>();
  const [myBlogs, setMyblogs] = useState<Blogtypes[]>();
  const [verified, setVerified] = useState<Boolean>(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/my-blogs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setVerified(response.data.success);
        setMyblogs(response.data.blogs);
        setAuthor(response.data.blogs[0].author);
      });
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col overflow-x-hidden">
      <Navbar token={localStorage.getItem("token") || " "} />

      <div className="flex-grow flex flex-col-reverse md:flex md:flex-row w-screen mt-20">
        <div className=" flex flex-col gap-2 md:w-2/3 lg:w-2/3 px-12 lg:px-24 md:px-8">
          {myBlogs != undefined ? (
            myBlogs.map((blog) => (
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
        {myBlogs != undefined && verified ? (
          <div className="flex-grow md:mr-4 lg:px-12 md:px-6 px-12">
            <div className="flex flex-col gap-2 p-4 bg-gray-900 rounded-2xl pb-8 mb-6 md:mb-0">
              <h2 className="text-2xl text-white font-sans text-center font-semibold py-2">
                Account Details
              </h2>
              <div className="flex gap-2">
                <span className="text-md text-white font-sans text-center font-semibold py-2 w-24 flex justify-start pl-2">
                  Username
                </span>
                <div className="flex-grow bg-gray-700 rounded-2xl flex items-center pl-4 text-white">
                  {author?.name}
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-md text-white font-sans text-center font-semibold py-2 w-24 flex justify-start pl-2">
                  Email
                </span>
                <div className="flex-grow bg-gray-700 rounded-2xl flex items-center pl-4 text-white">
                  {author?.email}
                </div>
              </div>
              <div className="flex gap-2 relative">
                <span className="text-md text-white font-sans text-center font-semibold py-2 w-24 flex justify-start pl-2">
                  Password
                </span>
                <div className={`flex-grow bg-gray-700 rounded-2xl flex items-center pl-4 text-white ${visible ? "" : "blur-sm"}`}>
                  {author?.password}
                </div>
                <div onClick={()=> setVisible(!visible)} className="absolute right-7 z-10 flex flex-col justify-center h-full">
                {visible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;

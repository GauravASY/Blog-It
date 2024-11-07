import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import Navbar from "../components/Navbar";

interface blogtype {
  title: string;
  content: string;
  date:string;
  author: {
    name: string;
  };
}

function ReadBlog() {
  const param = useParams();
  const [blogdata, setBlogdata] = useState<blogtype>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${param.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlogdata(response.data.blog);
      });
  }, [param.id]);

  return (
    <div className="flex flex-col items-center">
      <Navbar token={localStorage.getItem("token") || ""} />
      <div className="flex flex-col mt-20 md:w-[70%] lg:w-[50%] px-8 md:p-0">
        <div className="text-5xl font-bold font-serif p-2">{blogdata?.title}</div>
        <div className="flex gap-3 mt-2 ">
          <div>
            <Avatar className="h-12 w-12 text-lg">
              <AvatarFallback>
                {blogdata?.author.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <span className="flex flex-col justify-center text-xl font-semibold">{blogdata?.author.name || "Anonymous"}</span>
          <span className="flex flex-col justify-center text-md font-normal text-gray-500">{blogdata?.date}</span>
          <span className="flex flex-col justify-center text-md font-normal text-gray-500">{`${Math.ceil(
            (blogdata?.content.split(" ").length || 0) / 200
          )} min read`}</span>
        </div>
      </div>
      <div className=" mt-6 text-lg py-4 font-mono  text-justify font-medium md:w-[70%] lg:w-[60%] shadow-sm shadow-gray-400 px-8 md:p-4">{blogdata?.content}</div>
    </div>
  );
}

export default ReadBlog;

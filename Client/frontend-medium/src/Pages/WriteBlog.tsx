import Navbar from "../components/Navbar";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";


function WriteBlog() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  async function handlePublish() {
    const date = new Date();
    const options:Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      date
    );
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
            title, content, date: formattedDate
        }, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
        navigate(`/blog/${response.data.id}`);
    } catch (error) {
        alert("Publishing failed");
    }
   
  }
  return (
    <div className="flex flex-col">
      <Navbar token={localStorage.getItem("token") || ""} />
      <div className="flex justify-center mt-20">
        <div className="w-2/3 mt-8 flex flex-col">
          <Input
            className="py-4 h-12 text-xl font-bold mb-4"
            placeholder="Enter the Title...."
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Type your content here...."
            className="p-4 text-xl h-2/3 mb-4"
            onChange={(e) => setContent(e.target.value)}
          />
          <Button className="text-md" onClick={handlePublish}>
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WriteBlog;

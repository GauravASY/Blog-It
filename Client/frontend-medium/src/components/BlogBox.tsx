import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "./ui/avatar";


interface proptypes{
  author : string,
  title : string, 
  content : string,
  id : string,
  date : string
}

function BlogBox({author, title, content, id, date} : proptypes ) {
  return (
    <Link to={`/blog/${id}`} className="w-full">
    <div className="flex flex-col justify-center gap-1 w-full py-2 px-4 shadow-md mb-4 cursor-pointer">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>{author[0].toUpperCase()}</AvatarFallback>
        </Avatar>

        <span className="h-4 flex items-center ">{author}</span>
        <span className="h-4 flex items-center text-gray-400">{date}</span>
      </div>
      <div>
        <div className="h-fit flex items-center text-2xl font-bold font-serif">
          {title}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-wrap ">
          {content.slice(0, 100) + '...'}
        </span>
      </div>
      <div>
        <span className="text-sm text-gray-400">{Math.ceil(content.split(' ').length / 200)} min read</span>
      </div>
    </div>
    </Link>
  );
}

export default BlogBox;

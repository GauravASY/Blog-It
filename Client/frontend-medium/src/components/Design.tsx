import imgDsgn from '../assets/penStroke.jfif'
import { Button } from "./ui/button";
import {useNavigate} from 'react-router-dom'


function Design() {
    const navigate = useNavigate();

    function handleStartReading(){
        navigate("/signin");
    }

  return (
    <div className="flex-grow flex items-center pl-32 relative">
        <div className="flex flex-col gap-6">
          <div className="text-gray-900 font-extrabold text-8xl w-2/3 font-serif z-10">Human stories & ideas</div>
          <div className="text-gray-900 font-bold text-3xl font-serif">A place to read, write, and deepen your understanding</div>
          <Button className="w-fit text-2xl py-6 px-4 rounded-full text-center hover:scale-105 transition-all ease-in-out"
            onClick={handleStartReading}
          >Start Reading</Button>
        </div>
        <div className="w-1/3 h-full object-contain absolute right-32 top-28 hidden md:block">
          <img src={imgDsgn} alt="design picture" className=""/>
        </div>
      </div>
  )
}

export default Design
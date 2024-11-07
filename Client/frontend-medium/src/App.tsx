import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Design from "./components/Design";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [token, SetToken] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const tok = localStorage.getItem('token');
    if(tok){
      SetToken(tok);
      navigate("/blogs");
    }
  }, [])

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar token={token}/>
      <Design/>
      <Footer />
    </div>
  );
}

export default App;

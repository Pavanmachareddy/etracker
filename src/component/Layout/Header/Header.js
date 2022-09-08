import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {

  const navigate=useNavigate();

  const logoutHandler=()=>{
    localStorage.removeItem("idToken")
    navigate('/login')
  }
  return (
    <div style={{display:'flex',justifyContent: "space-between"}}>
      <Link to="/" className="home">Home</Link>
      <Link to="login">Login</Link>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default Header;

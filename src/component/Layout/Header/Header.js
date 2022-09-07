import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div style={{display:'flex',justifyContent: "space-between"}}>
      <Link to="/" className="home">Home</Link>
      <Link to="login">Login</Link>
    </div>
  );
};

export default Header;

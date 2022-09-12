import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = (props) => {
  let loggedIn = props.login;
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("idToken");
    navigate("/login");
    props.setLogin(false);
  };
  return (
    <div className="header">
      <nav className="nav">
        {loggedIn && <span>Wellcome to Expense Tracker</span>}

        {!loggedIn ? (
          <>
            <Link to="/" className="home">
              SignUp
            </Link>
            <Link to="login">Login</Link>
          </>
        ) : (
          <button className="btn" onClick={logoutHandler}>
            Logout
          </button>
        )}
        {loggedIn ? (
          <p>
            Your profile is Incomplete.
            <Link to="/completeprofile">Complete Now</Link>
          </p>
        ) : (
          ""
        )}
      </nav>
    </div>
  );
};

export default Header;

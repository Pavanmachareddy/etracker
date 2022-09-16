import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/authReducer";
import "./Header.css";

const Header = () => {
  const islogin = useSelector((state) => state.auth.isAuthenticated);
  console.log(islogin, "loginnnnnnnnnnn");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("idToken");

    dispatch(authActions.logout());
    navigate("/login");
  };
  return (
    <div className="header">
      <nav className="nav">
        {islogin && <span>Wellcome to Expense Tracker</span>}
        {!islogin && (
          <Link to="/" className="home">
            SignUp
          </Link>
        )}
        {!islogin && <Link to="login">Login</Link>}
        {islogin && (
          <button className="btn" onClick={logoutHandler}>
            Logout
          </button>
        )}
        {islogin && (
          <p>
            Your profile is Incomplete.
            <Link to="/completeprofile">Complete Now</Link>
          </p>
        )}
      </nav>
    </div>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/authReducer";
import "./Header.css";

const Header = () => {
  const [id, setId] = useState(false);
  const islogin = useSelector((state) => state.auth.isAuthenticated);
  console.log(islogin, "loginnnnnnnnnnn");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("idToken");

    dispatch(authActions.logout());
    navigate("/login");
  };
  
  useEffect(() => {
    setId(localStorage.getItem("idToken"));
  }, [id]);

  return (
    <div className="header">
      <nav className="nav">
        { id && islogin && <span>Wellcome to Expense Tracker</span>}

        { id && islogin && (
          <button className="btn" onClick={logoutHandler}>
            Logout
          </button>
        )}
        { id && islogin && (
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

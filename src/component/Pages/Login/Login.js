import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { authActions } from "../../store/authReducer";
import "./Login.css";

const Login = (props) => {
  const loginEmailRef = useRef();
  const loginpasswordRef = useRef();
  console.log(authActions, "authactions========");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSubmitHandler = (e) => {
    e.preventDefault();

    const enteredloginEmail = loginEmailRef.current.value;
    const enteredloginPassword = loginpasswordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA99thkT2KGxjW0fXTrkbxeP83YIjyXr10",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredloginEmail,
          password: enteredloginPassword,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Login Success");
          alert("Login Success");
          return res.json();
        } else {
          return res.json().then((data) => {
            alert(data.error.message);
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        localStorage.setItem("idToken", data.idToken);
        // props.setLogin(true);
        dispatch(authActions.login());
        navigate("/welcome");
      })
      .catch((err) => {
        console.log("Something Went Wrong");
      });
  };
  return (
    <div className="loginBody">
      <form className="loginForm" onSubmit={loginSubmitHandler}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" required ref={loginEmailRef} />
        <input
          type="password"
          placeholder="Password"
          required
          ref={loginpasswordRef}
        />
        <Link to="/resetpassword">ForgotPassword</Link>
        <button type="submit" className="loginBtn">
          Login
        </button>
        <p>
          New user?<Link to="/">SignUp</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

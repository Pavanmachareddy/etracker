import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
  const loginEmailRef = useRef();
  const loginpasswordRef = useRef();
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
            alert("Something went wrong");
          });
        }
      })
      .then((data) => {
        localStorage.setItem("TokenID Expense", data.idToken);
        navigate("/welcome");
      });
  };
  return (
    <div className="loginBody">
      <form onSubmit={loginSubmitHandler}>
        <label htmlFor="loginEmail">Email:</label>
        <input type="email" id="loginEmail" required ref={loginEmailRef} />
        <label htmlFor="loginPassword">Password:</label>
        <input
          type="password"
          id="loginPassword"
          required
          ref={loginpasswordRef}
        />
        <button type="submit" className="loginBtn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;

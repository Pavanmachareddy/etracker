import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const navigate = useNavigate();

  const emailHandler = (e) => {
    setInputEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setInputPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setInputConfirmPassword(e.target.value);
  };
  console.log(inputEmail, inputPassword);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(inputEmail, inputPassword);

    if (inputPassword === inputConfirmPassword) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1K7kCTyg-eNlJqQogshjP2ujOrW6wLio",
        {
          method: "POST",
          body: JSON.stringify({
            email: inputEmail,
            password: inputPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            console.log(res);
            console.log("Successfully Registered");
            alert("Successfully Registered");
            // setIsVerify(true);
            navigate("/login");
            return res.json();
          } else {
            return res.json().then((data) => {
              console.log(data.error.message);
              alert(data.error.message);
            });
          }
        })
        .then((data) => {
          console.log(data);
        });
    } else {
      alert("password is not same");
    }
  };
  return (
    <div className="signUpBody">
      <form className="signUpform" onSubmit={submitHandler}>
        <h2>SignUp</h2>
        <input
          type="email"
          placeholder="Email"
          value={inputEmail}
          required
          onChange={(e) => emailHandler(e)}
        />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={inputPassword}
          required
          onChange={(e) => passwordHandler(e)}
        />
        <br />

        <input
          type="password"
          placeholder="ConfirmPassword"
          value={inputConfirmPassword}
          required
          onChange={(e) => confirmPasswordHandler(e)}
        />
        <br />

        <div>
          <button className="signUpBtn" type="submit">
            SignUp
          </button>
        </div>
        <div>
          <p>
            Already user?<Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

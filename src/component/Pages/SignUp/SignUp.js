import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
// import VerifyEmailId from "../VerifyEmail/VerifyEmailId";
import "./SignUp.css";

const SignUp = () => {
  const [isVerify, setIsVerify] = useState(false);

  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputConfirmPasswordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    if (enteredPassword !== inputConfirmPasswordRef.current.value) {
      alert("Confirm Password is not same as Password");
      return;
    }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA99thkT2KGxjW0fXTrkbxeP83YIjyXr10",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log(res);
        console.log("Successfully Registered");
        alert("Successfully Registered");
        setIsVerify(true);
        return res.json();
      } else {
        return res.json().then((data) => {
          console.log(data.error.message);
          alert(data.error.message);
        });
      }
    });
    // .then((data) => {
    //   let id = data.idToken;

    //   fetch(
    //     "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA99thkT2KGxjW0fXTrkbxeP83YIjyXr10",
    //     {
    //       method: "POST",
    //       body: JSON.stringify({
    //         requestType: "VERIFY_EMAIL",
    //         idToken: id,
    //       }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   ).then((res) => {
    //     if (res.ok) {
    //       console.log("Otp sent");
    //       console.log(res, ".......");
    //     } else {
    //       return res.json().then((data) => {
    //         alert("Something went wrong");
    //         console.log(data, "---------daaaa");
    // });
    // }
    // });
    // });
  };
  return (
    <div className="signUpBody">
      <form className="signUpform" onSubmit={submitHandler}>
        <h2>SignUp</h2>
        <input type="email" placeholder="Email" required ref={inputEmailRef} />
        <br />

        <input
          type="password"
          placeholder="Password"
          required
          ref={inputPasswordRef}
        />
        <br />

        <input
          type="password"
          placeholder="ConfirmPassword"
          required
          ref={inputConfirmPasswordRef}
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
      {/* <div className="verifyOtp">
        {isVerify && <VerifyEmailId verify={setIsVerify} />}
      </div> */}
    </div>
  );
};

export default SignUp;

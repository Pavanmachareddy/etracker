import React, { useRef } from "react";
import './SignUp.css';

const SignUp = () => {
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
        console.log("Successfully Registered");
        alert("Successfully Registered");
      } else {
        return res.json().then((data) => {
          console.log(data.error.message);
          alert(data.error.message);
        });
      }
    });
  };
  return (
    <div className='signUpBody'>
      <h2>SignUp</h2>
      <form onSubmit={submitHandler}>
        
          <input type="email" placeholder="Email" required ref={inputEmailRef} />
        
        
          <input
            type="password"
            placeholder="Password"
            required
            ref={inputPasswordRef}
          />
        
      
          <input
            type="password"
            placeholder="ConfirmPassword"
            required
            ref={inputConfirmPasswordRef}
          />
      
        <div>
          <button className="signUpBtn">SignUp</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

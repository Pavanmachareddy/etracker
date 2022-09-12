import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/Pages/Login/Login";
import Header from "./component/Layout/Header/Header";
import SignUp from "./component/Pages/SignUp/SignUp";
import WellComePage from "./component/Pages/WellComePage";
import Profile from "./component/Pages/Profile/Profile";
import { useState } from "react";
import PasswordReset from "./component/Pages/CreatingPassword/PasswordReset";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Header login={isLogin} setLogin={setIsLogin} />
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route exact path="/welcome" element={<WellComePage setIsLogin={setIsLogin} />} />
        <Route exact path="/login" element={<Login setLogin={setIsLogin} />} />
        <Route exact path="/completeprofile" element={<Profile />} />
        <Route exact path="/resetpassword" element={<PasswordReset />} />
      </Routes>
    </>
  );
}

export default App;

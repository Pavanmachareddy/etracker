import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/Pages/Login/Login";
import Header from "./component/Layout/Header/Header";
import SignUp from "./component/Pages/SignUp/SignUp";
import WellComePage from "./component/Pages/WellComePage";
import Profile from "./component/Pages/Profile/Profile";
import PasswordReset from "./component/Pages/CreatingPassword/PasswordReset";

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route exact path="/welcome" element={<WellComePage  />} />
        <Route exact path="/login" element={<Login  />} />
        <Route exact path="/completeprofile" element={<Profile />} />
        <Route exact path="/resetpassword" element={<PasswordReset />} />
      </Routes>
    </>
  );
}

export default App;

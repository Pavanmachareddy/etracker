import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/Pages/Login/Login";
import Header from "./component/Layout/Header/Header";
import SignUp from "./component/Pages/SignUp/SignUp";
import WellComePage from "./component/Pages/WellComePage";
import Profile from "./component/Pages/Profile/Profile";
import PasswordReset from "./component/Pages/CreatingPassword/PasswordReset";
import DarkThemeProvider from "./component/Layout/DarkTheme/DarkThemeProvider";
import styled from "styled-components";
import theme from "styled-theming";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { authActions } from "./component/store/authReducer";

export const backgroundColor = theme("theme", {
  light: "#fff",
  dark: "#2d2d2d",
});

export const textColor = theme("theme", {
  light: "#000",
  dark: "#fff",
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  font-family: san-serif;
  background-color: ${backgroundColor};
  color: ${textColor};
`;

function App() {
  const [id, setId] = useState(false);
  const islogin = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  console.log(islogin, "-------lllllllllll");

  useEffect(() => {
    dispatch(authActions.login());
    setId(localStorage.getItem("idToken"));
  }, [id]);
  return (
    <DarkThemeProvider>
      <Container>
        <Header />
        <Routes>
          {!islogin && <Route exact path="/" element={<SignUp />} />}
          {id && islogin && (
            <Route exact path="/welcome" element={<WellComePage />} />
          )}
          {/* <Route exact path="/login" element={<Login />} /> */}
          {islogin && (
            <Route exact path="/completeprofile" element={<Profile />} />
          )}
          <Route exact path="/resetpassword" element={<PasswordReset />} />
          <Route exact path="*" element={<Login />} />
        </Routes>
      </Container>
    </DarkThemeProvider>
  );
}

export default App;

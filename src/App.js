import { Route, Routes } from "react-router-dom";
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
// import image from "./component/image.jpg"

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
  ${
    "" /* align-items: center;
  justify-content: center; */
  }
  font-family: san-serif;
  background-color: ${backgroundColor};
  color: ${textColor};
`;

function App() {
  return (
    <DarkThemeProvider>
      <Container>
        <Header />
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/welcome" element={<WellComePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/completeprofile" element={<Profile />} />
          <Route exact path="/resetpassword" element={<PasswordReset />} />
        </Routes>
      </Container>
    </DarkThemeProvider>
  );
}

export default App;

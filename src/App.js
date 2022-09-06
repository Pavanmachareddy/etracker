import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/Login/Login";
import Header from "./component/Loyout/Header/Header";
import SignUp from "./component/SignUp/SignUp";
import WellComePage from "./component/WellComePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route exact path="/welcome" element={<WellComePage />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

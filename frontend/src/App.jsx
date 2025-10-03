import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import { UserDataContext } from "./context/userContext";

const App = () => {
  // const data = useContext(UserDataContext);
  // console.log(data);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/login" element={<UserLogin></UserLogin>} />
        <Route path="/signup" element={<UserSignup></UserSignup>} />
        <Route path="/captain-login" element={<CaptainLogin></CaptainLogin>} />
        <Route
          path="/captain-signup"
          element={<CaptainSignup></CaptainSignup>}
        />
      </Routes>
    </div>
  );
};

export default App;

import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import { UserDataContext } from "./context/UserContext";
import Start from "./pages/Start";
import Home from "./pages/Home";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";

const App = () => {
  // const data = useContext(UserDataContext);
  // console.log(data);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start></Start>} />
        <Route path="/login" element={<UserLogin></UserLogin>} />
        <Route path="/signup" element={<UserSignup></UserSignup>} />
        <Route path="/captain-login" element={<CaptainLogin></CaptainLogin>} />
        <Route
          path="/captain-signup"
          element={<CaptainSignup></CaptainSignup>}
        />
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home></Home>
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectedWrapper>
              <UserLogout></UserLogout>
            </UserProtectedWrapper>
          }
        />
        <Route path="/captain-home" element={<CaptainHome></CaptainHome>} />
      </Routes>
    </div>
  );
};

export default App;

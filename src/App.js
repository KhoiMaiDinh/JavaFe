import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Layout from "./components/Layout";
import Logins from "./features/auth/Login";
import Public from "./components/Public";
import Welcome from "./features/auth/Welcome";
import RequireAuth from "./features/auth/RequireAuth";

import Home from "./container/Home";
import Login from "./components/Login";
import Pins from "./container/Pin";
import Test from "./test";
import OAuth2RedirectHandler from "./components/OAuth2Handler";

const App = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  //   if (!User) navigate('/login');
  // }, []);

  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        {/* public routes */}
       
        <Route path="login" element={<Login />} />
        <Route path="test" element={<Test />} />
        <Route path="oauth2/redirect" element={<OAuth2RedirectHandler />} />  

        {/* <Route path="pin" element={<Pins />} /> */}

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="*" element={<Pins />} />
          <Route path="*" index element={<Home />} />

        </Route>
      </Route>
    </Routes>
  );
};

export default App;

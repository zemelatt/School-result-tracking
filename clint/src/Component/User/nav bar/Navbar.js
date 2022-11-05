import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  const history = useNavigate();
  const [all, setAll] = useState({});
  useEffect(() => {
    const get = async (e) => {
      const reqData = await fetch("http://localhost:5000/api-get/allUser");
      const resData = await reqData.json();
      setAll(resData);
    };
    get();
  });
  const logout = () => {
    localStorage.removeItem("accesToken");
    sessionStorage.removeItem("accesToken");

    history("/login-form");
  };
  return (
    <>
      <div className="container">
        <nav>
          <ul>
            <NavLink to="/">
              <li> Home</li>
            </NavLink>

            <NavLink to="/about">
              <li>About Students</li>
            </NavLink>
            <li onClick={logout}> Log out</li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

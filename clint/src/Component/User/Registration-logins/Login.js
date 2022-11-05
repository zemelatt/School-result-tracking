import Axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const Login = () => {
  const history = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handeleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const login = (e) => {
    const { username, password } = user;
    e.preventDefault();
    Axios.post("http://localhost:5000/login", user).then((res) => {
      if (res.data.message) {
        alert(res.data.message);
        history("/login-form");
      }
      if (!res.data.message) {
        sessionStorage.setItem("accesToken", res.data);
        history("/");
      }
    });
  };

  return (
    <>
      <div className="all-in-one">
        <form className="reegistration-form">
          <h3>Login form</h3>
          <label>Ref Name</label>

          <input
            type="text"
            name="username"
            placeholder="Your name"
            autoComplete="off"
            value={user.username}
            onChange={handeleOnChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handeleOnChange}
            placeholder="Insert Your Pasword"
            required
          />

          <span>
            <button className="submit-btn" onClick={login}>
              Login
            </button>
          </span>
          <div>
            <Link to="/Registration-form">
              <button className="submit-btn">Register</button>
            </Link>
            <div className="toadmin">
              <p>
                if you are admin
                <a href="/admin-login">
                  <h3>Clik Here</h3>
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

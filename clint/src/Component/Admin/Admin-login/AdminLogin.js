import Axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const AdminLogin = () => {
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
  const loginAdmin = (e) => {
    const { username, password } = user;
    e.preventDefault();
    Axios.post("http://localhost:5000/api-admin/login", user).then((res) => {
      if (res.data.message) {
        alert(res.data.message);
        history("/admin-login");
      }
      if (!res.data.message) {
        localStorage.setItem("accesToken", res.data);
        history("/admin-login/admin-mng");
      }
    });
  };
  return (
    <>
      <div className="all-in-one">
        <form className="reegistration-form">
          <h3>Login form for Admin</h3>
          <label>Admin Name</label>
          {/* {console.log("user", user)} */}
          <input
            type="text"
            name="username"
            placeholder="Admin name"
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
            placeholder="admin Pasword"
            required
          />

          <span>
            <button className="submit-btn" onClick={loginAdmin}>
              Login
            </button>
          </span>
          <div>
            <Link to="/Registration-form">
              <button className="submit-btn">Register</button>
            </Link>
            <div className="toadmin">
              <p>
                if you are user
                <a href="/login-form">
                  <h3>Click Here</h3>
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;

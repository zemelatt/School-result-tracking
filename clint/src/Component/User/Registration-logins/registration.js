import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const history = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    repassword: "",
  });
  const handeleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const register = (e) => {
    e.preventDefault();
    const { username, password, repassword } = user;
    if (username && password && password === repassword) {
      Axios.post("http://localhost:5000/api/post-userRegisteration", user).then(
        (response) => {
          alert(response.data.message);
          history("/LOGIN-form");
        }
      );
    } else {
      alert("invalid input");
    }
  };
  return (
    <>
      <div className="all-in-one">
        <form>
          <label>User Name</label>
          {/* {console.log("user", user)} */}
          <input
            type="text"
            name="username"
            autoComplete="off"
            placeholder="User name"
            value={user.username}
            onChange={handeleOnChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handeleOnChange}
          />
          <label>Re-Inteer-Password</label>
          <input
            type="password"
            name="repassword"
            placeholder="Re-Inter-Password"
            value={user.repassword}
            onChange={handeleOnChange}
          />
          <button className="btn" onClick={register}>
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Registration;

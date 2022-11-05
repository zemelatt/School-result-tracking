import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const PrivateRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem("accesToken");
    if (!login) {
      navigate("/login-form");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
};
export default PrivateRoute;

//  let auth = { token: false };
//   return auth.token ? <Outlet /> : <Navigate to="/login-form" />;

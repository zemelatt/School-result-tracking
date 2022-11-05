import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Component/User/nav bar/Navbar";
import AdminOptions from "./Component/Admin/Admin-options/user-logs";
import AboutStudents from "./Component/User/User-cheking-result/About-students";
import Home from "./Component/User/home/Home";
import Register from "./Component/Admin/Admin-registering-students/register";
import RefImageFil from "./Component/Admin/Adding-ref-img/Adding-Ref-img";
import AddingProg from "./Component/Admin/Admin-adding- score/Adding-score";
import AdminGetall from "./Component/Admin/Admin-Editing-score by-ID/AdminScoreGet-byID";
import AdminSearchByID from "./Component/Admin/Admin-get-All-registered/admin-search-ALL-STUDENT";
import Viewone from "./Component/Admin/Admin-view-one/View-one";
import Update from "./Component/Admin/Admin-Updating-score/update-score";
import EditRegisteredStudents from "./Component/Admin/Admin-Edit-Registered-List/edit-registered-students";
import RegistedView from "./Component/Admin/Admin-view-1-registered/view-registred";
//user log
import LoginForm from "./Component/User/Registration-logins/Login";
import Registration from "./Component/User/Registration-logins/registration";
//admin logs
import AdminMng from "./Component/Admin/Admin-login/admin-mng";
import AdminLogin from "./Component/Admin/Admin-login/AdminLogin";
//protecting route
import PrivateRoute from "./Component/Protetcting-Routes/PrivateRoute";
import PrivateRouteAdmin from "./Component/Protetcting-Routes/PrivateRoute2";
//comment
import Comments from "./Component/Admin/Admin-comment/Comment";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<PrivateRoute Component={Home} />} />
        <Route
          path="/about"
          element={<PrivateRoute Component={AboutStudents} />}
        />
        <Route
          path="/register"
          element={<PrivateRouteAdmin Component={Register} />}
        />
        <Route
          path="/ref-img"
          element={<PrivateRouteAdmin Component={RefImageFil} />}
        />
        <Route
          path="/adding-progress"
          element={<PrivateRouteAdmin Component={AddingProg} />}
        />
        <Route
          path="/see-all-students"
          element={<PrivateRouteAdmin Component={AdminGetall} />}
        />
        <Route
          path="/search-by-id"
          element={<PrivateRouteAdmin Component={AdminSearchByID} />}
        />
        <Route
          path="/see-all-students/view/:s_id"
          element={<PrivateRouteAdmin Component={Viewone} />}
        />
        <Route
          path="edit/:s_id"
          element={<PrivateRouteAdmin Component={Update} />}
        />
        <Route
          path="/search-by-id/edit-registerd/:id"
          element={<PrivateRouteAdmin Component={EditRegisteredStudents} />}
        />
        <Route
          path="/search-by-id/view-one/:id"
          element={<PrivateRouteAdmin Component={RegistedView} />}
        />

        <Route path="/login-form" element={<LoginForm />} />
        <Route path="/Registration-form" element={<Registration />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/student"
          element={<PrivateRouteAdmin Component={AdminOptions} />}
        />
        <Route
          path="/admin-login/admin-mng"
          element={<PrivateRouteAdmin Component={AdminMng} />}
        />
        <Route
          path="comments"
          element={<PrivateRouteAdmin Component={Comments} />}
        />
      </Routes>
    </>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";
const AdminMng = () => {
  return (
    <div className="all-in-one">
      <Link to="/student">
        <button className="submit-btn adminbtn">For Admin, Only !!</button>
      </Link>
    </div>
  );
};

export default AdminMng;

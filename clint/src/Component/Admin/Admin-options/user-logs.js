import React from "react";

import { Link } from "react-router-dom";
const logins = () => {
  return (
    <div className="all-in-one">
      <div className="user-option2">
        <Link to="/register">
          <button className="submit-btn">To Register</button>
        </Link>
        <Link to="/adding-progress">
          <button className="submit-btn">To Update</button>
        </Link>
        <Link to="/see-all-students">
          <button className="submit-btn">Score List</button>
        </Link>
        <Link to="/search-by-id">
          <button className="submit-btn">Students List</button>
        </Link>
        <Link to="/comments">
          <button className="submit-btn">Comments List</button>
        </Link>
      </div>
    </div>
  );
};

export default logins;

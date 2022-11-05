import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const AdminGet = () => {
  const [getuserData, setUserData] = useState([]);
  // const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    userData();
  }, []);
  const userData = async () => {
    const reqData = await fetch("http://localhost:5000/api-get/student-score");
    const resData = await reqData.json();
    setUserData(resData);
  };
  const handlesumit = async (e) => {
    e.preventDefault();
    return await Axios.get(
      `http://localhost:5000/api-get/student-score/${query}`
    )
      .then((result) => {
        setUserData(result.data);
        setQuery("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = async (s_id) => {
    const res2 = await fetch(
      `http://localhost:5000/api-get/student-score/${s_id}`,
      {
        method: "delete",
        headers: { "Content-Type": "application/json" },
      }
    );
  };
  return (
    <div className="all-in-one">
      <form className="reegistration-form" onSubmit={handlesumit}>
        <input
          type="text"
          name="subject_name"
          placeholder="Search...."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span>
          <button className="submit-btn">Search</button>
        </span>
      </form>
      <div>
        {getuserData.length > 0 ? (
          getuserData.map((val, index) => (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Subject</th>

                  <th>Test</th>
                  <th>Test 2</th>
                  <th>Final</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr key={index}>
                  <td>{val.registered_id}</td>
                  <td>{val.subject_name}</td>

                  <td>{val.mid_test1}</td>

                  <td>{val.mid_test2}</td>
                  <td>{val.final_exam}</td>
                  <td>
                    <div>
                      <Link to={`/see-all-students/view/${val.s_id}`}>
                        <button
                          className="action-btn"
                          style={{ color: "black" }}
                        >
                          View
                        </button>
                      </Link>
                      <button
                        className="action-btn"
                        style={{ color: "black" }}
                        onClick={() => handleDelete(val.s_id)}
                      >
                        Delete
                      </button>
                      <Link to={`/edit/${val.s_id}`}>
                        <button
                          className="action-btn"
                          style={{ color: "black" }}
                        >
                          Edit
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          ))
        ) : (
          <h3>no result</h3>
        )}
      </div>
    </div>
  );
};

export default AdminGet;

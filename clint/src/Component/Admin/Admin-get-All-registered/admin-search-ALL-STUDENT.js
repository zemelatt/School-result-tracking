import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const AdminSearch = () => {
  const [userData, setUserData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const getUserdata = async (e) => {
      const reqData = await fetch("http://localhost:5000/api-get/all-student");
      const resData = await reqData.json();

      setUserData(resData);
      setFilterData(resData);
    };
    getUserdata();
  }, []);

  const handeleSearch = (e) => {
    const getSearch = e.target.value;

    if (getSearch.length > 0) {
      const searchdata = userData.filter((item) =>
        item.name.toLowerCase().includes(getSearch)
      );

      setUserData(searchdata);
    } else {
      setUserData(filterData);
    }
    setQuery(getSearch);
  };
  const handleDelete = async (id) => {
    const res2 = await fetch(`http://localhost:5000/api-delete/byId/${id}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    });
  };
  return (
    <>
      <div className="all-in-one">
        <div className="reegistration-form">
          <label>Search by ID</label>
          <input type="text" name="ID" value={query} onChange={handeleSearch} />
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>sex</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((getUser, index) => (
                <tr key={index}>
                  <td>{getUser.id}</td>
                  <td>{getUser.name}</td>
                  <td>{getUser.age}</td>
                  <td>
                    <button
                      className="action-btn"
                      style={{ color: "black" }}
                      onClick={() => handleDelete(getUser.id)}
                    >
                      Delete
                    </button>
                    <Link to={`/search-by-id/edit-registerd/${getUser.id}`}>
                      <button className="action-btn" style={{ color: "red" }}>
                        Edit
                      </button>
                    </Link>
                    <Link to={`/search-by-id/view-one/${getUser.id}`}>
                      <button className="action-btn" style={{ color: "red" }}>
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminSearch;

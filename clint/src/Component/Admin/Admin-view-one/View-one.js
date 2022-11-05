import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const ViewOne = () => {
  const [singleData, setData] = useState([]);
  const { s_id } = useParams();
  useEffect(() => {
    const getData = async (e) => {
      const reqData = await fetch(
        `http://localhost:5000/api-get/student-score/byID/${s_id}`
      );
      const resData = await reqData.json();

      setData(resData);
    };
    getData();
  });
  return (
    <>
      <div className="all-in-one">
        <div>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>quiz 1</th>
                <th>Test 1</th>
                <th>quiz 2</th>
                <th>Test 2</th>
                <th>Final Exam</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {singleData.map((getUser, index) => (
                <tr key={index}>
                  <td>{getUser.subject_name}</td>
                  <td>{getUser.quiz1}</td>
                  <td>{getUser.mid_test1}</td>
                  <td>{getUser.quiz2}</td>
                  <td>{getUser.mid_test2}</td>
                  <td>{getUser.final_exam}</td>
                  <td>{getUser.registered_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewOne;

import Axios from "axios";
import React, { useState } from "react";

const ForUser = () => {
  const [getScore, setgetScore] = useState([]);
  const [regID, setregID] = useState("");
  const [registredID, setregistredID] = useState("");
  const [details, setdetails] = useState([]);

  const [comment, setComment] = useState("");
  //post comment
  const StudentName = (e) => [setComment(e.target.value)];
  const addComment = async (e) => {
    let formData = new FormData();
    formData.append("comment", comment);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await Axios.post(
      "http://localhost:5000/adding-comment",
      formData,
      config
    );
  };

  //to get score
  const SeeScore = async (e) => {
    e.preventDefault();
    return await Axios.get(
      `http://localhost:5000/api-get/student-score/${regID}`
    )
      .then((result) => {
        setgetScore(result.data);
        setregID("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const SeeDetails = async (e) => {
    e.preventDefault();
    return await Axios.get(
      `http://localhost:5000/api-get/all-student/${registredID}`
    )
      .then((result) => {
        setdetails(result.data);
        setregID("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="all-in-one">
        <div className="reegistration-form">
          <h5>Check your child Scores</h5>
          <form onSubmit={SeeScore}>
            <input
              type="text"
              name="registered_id"
              placeholder="insert ID...."
              value={regID}
              onChange={(e) => setregID(e.target.value)}
            />

            <span>
              <button className="submit-btn">Search</button>
            </span>
          </form>
          <hr></hr>
          <h5>Registered informations</h5>
          <form onSubmit={SeeDetails}>
            <input
              type="text"
              name="registered_id"
              placeholder="insert ID...."
              value={registredID}
              onChange={(e) => setregistredID(e.target.value)}
            />

            <span>
              <button className="submit-btn">Search</button>
            </span>
          </form>
          {getScore.length > 0 ? (
            getScore.map((val, index) => (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Subject</th>
                    <th>Quiz</th>
                    <th>Quiz 2</th>
                    <th>Test</th>
                    <th>Test 2</th>
                    <th>Final</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={index}>
                    <td>{val.registered_id}</td>
                    <td>{val.subject_name}</td>
                    <td>{val.quiz1}</td>
                    <td>{val.mid_test1}</td>
                    <td>{val.quiz2}</td>
                    <td>{val.mid_test2}</td>
                    <td> {val.final_exam}</td>
                  </tr>
                </tbody>
              </table>
            ))
          ) : (
            <h3>No information Yet</h3>
          )}
          <form
            className="reegistration-form comment"
            style={{ backgroundColor: " cornflowerblue" }}
          >
            <label>Comment</label>
            <input
              type="text"
              name="comment"
              placeholder="send to us ur comment..."
              onChange={StudentName}
            />

            <button className="submit-btn" type="submit" onClick={addComment}>
              Submit
            </button>
          </form>
          <div>
            {details.map((getUser, index) => (
              <div className="registerd-student-view">
                <div className="image details">
                  <img
                    src={require(`../../../../../server/uploads/${getUser.img}`)}
                    height={100}
                    width={100}
                    alt="students-pp"
                  />
                </div>
                <div className="details" key={index}>
                  <p>Reg.Date: {getUser.date}</p>
                  <h4>Name: {getUser.name}</h4>
                  <h5>Id: {getUser.id}</h5>
                  <h6>Sex:{getUser.sex}</h6>
                  <address>{getUser.r_phone}</address>
                  <address>Ref-Name{getUser.referee_name}</address>
                  <address>Ref-Phone number:{getUser.r_phone}</address>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default ForUser;

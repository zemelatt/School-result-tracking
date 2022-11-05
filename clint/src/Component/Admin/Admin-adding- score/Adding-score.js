import React, { useState } from "react";
import Axios from "axios";
const AddingProg = () => {
  const [quiz1, setQuiz1] = useState("");
  const [test1, setTest1] = useState("");
  const [quiz2, setQuiz2] = useState("");
  const [test2, setTest2] = useState("");
  const [final, setFinal] = useState("");
  const [id, setID] = useState("");
  const [subject, setSubject] = useState("");
  const [isloading, setLoad] = useState(false);

  const courseName = (e) => {
    setSubject(e.target.value);
  };
  const FirstSemesterQuiz1 = (e) => {
    setQuiz1(e.target.value);
  };
  const FirstSemesterQuiz2 = (e) => {
    setQuiz2(e.target.value);
  };
  const FirstSemesterTest1 = (e) => {
    setTest1(e.target.value);
  };
  const FirstSemesterTest2 = (e) => {
    setTest2(e.target.value);
  };
  const FirstSemesterFinal = (e) => {
    setFinal(e.target.value);
  };
  const studentID = (e) => {
    setID(e.target.value);
  };
  const submitProgress = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("subject_name", subject);
    formData.append("quiz1", quiz1);
    formData.append("mid1", test1);
    formData.append("quiz2", quiz2);
    formData.append("mid2", test2);
    formData.append("final", final);
    formData.append("ID", id);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await Axios.post(
      "http://localhost:5000/api/post-progress",
      formData,
      config
    );
    setLoad(false);
  };

  return (
    <div className="all-in-one">
      <form className="reegistration-form">
        <h3 className="adding-new-status">Adding progress</h3>
        <h4 className="first semester">first semester</h4>
        <label>Subject:</label>
        <input
          type="text"
          name="subject_name"
          id=""
          onChange={courseName}
        ></input>
        <label>quiz 1:</label>
        <input
          type="number"
          min="0"
          max="5"
          name="quiz1"
          onChange={FirstSemesterQuiz1}
        />

        <label>m-test 1 :</label>
        <input
          type="number"
          min="0"
          max="20"
          name="mid1"
          onChange={FirstSemesterTest1}
        />

        <label>quiz 2:</label>
        <input
          type="number"
          min="0"
          max="5"
          name="quiz2"
          onChange={FirstSemesterQuiz2}
        />

        <label>m-test 2:</label>
        <input
          type="number"
          min="0"
          max="20"
          name="mid2"
          onChange={FirstSemesterTest2}
        />

        <label>final:</label>
        <input
          type="number"
          min="0"
          max="50"
          name="final"
          onChange={FirstSemesterFinal}
        />

        <label>ID:</label>
        <input type="number" name="ID" onChange={studentID} />

        {!isloading && (
          <button type="submit" className="submit-btn" onClick={submitProgress}>
            Submit
          </button>
        )}
        {isloading && (
          <button
            type="submit"
            className="submit-btn"
            onClick={submitProgress}
            disabled
          >
            wait...
          </button>
        )}
      </form>
    </div>
  );
};

export default AddingProg;

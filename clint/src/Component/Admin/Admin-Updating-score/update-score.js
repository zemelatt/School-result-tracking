import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
const Updatescore = () => {
  const [singleData, setData] = useState([]);
  const { s_id } = useParams();

  const [quiz1, setQuiz1] = useState("");
  const [test1, setTest1] = useState("");
  const [quiz2, setQuiz2] = useState("");
  const [test2, setTest2] = useState("");
  const [final, setFinal] = useState("");
  const [subject, setSubject] = useState("");

  const courseName = (e) => {
    setSubject(e.target.value);
    console.log(e.target.value);
  };
  const FirstSemesterQuiz1 = (e) => {
    setQuiz1(e.target.value);
    console.log(e.target.value);
  };
  const FirstSemesterQuiz2 = (e) => {
    setQuiz2(e.target.value);
    console.log(e.target.value);
  };
  const FirstSemesterTest1 = (e) => {
    setTest1(e.target.value);
    console.log(e.target.value);
  };
  const FirstSemesterTest2 = (e) => {
    setTest2(e.target.value);
    console.log(e.target.value);
  };
  const FirstSemesterFinal = (e) => {
    setFinal(e.target.value);
    console.log(e.target.value);
  };
  useEffect(() => {
    const getData = async (e) => {
      const reqData = await fetch(
        `http://localhost:5000/api-get/student-score/byID/${s_id}`
      );
      const resData = await reqData.json();
      console.log(resData);
      setData(resData);
    };
    getData();
  }, []);
  const submitupdateFile = async (e) => {
    // e.preventDefault();
    let formData = new FormData();
    formData.append("subject_name", subject);
    formData.append("quiz1", quiz1);
    formData.append("mid1", test1);
    formData.append("quiz2", quiz2);
    formData.append("mid2", test2);
    formData.append("final", final);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await Axios.put(
      `http://localhost:5000/api-get/student-score/update/${s_id}`,
      formData,
      config
    );
  };

  return (
    <div className="all-in-one">
      <form className="reegistration-form">
        <h3 className="adding-new-status">Adding progress</h3>
        <h4 className="first semester">first semester</h4>
        {singleData.map((val, index) => (
          <div key={index}>
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
          </div>
        ))}

        <button type="submit" className="submit-btn" onClick={submitupdateFile}>
          Update
        </button>
      </form>
    </div>
  );
};

export default Updatescore;

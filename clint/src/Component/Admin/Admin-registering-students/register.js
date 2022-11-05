import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
const Register = () => {
  const [Date, setDate] = useState("");
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [Gender, setGender] = useState("");
  const [Gread, setGread] = useState("");
  const [preAchivs, setpreAchivs] = useState("");
  const [PhoneNum, setPhoneNum] = useState("");
  const [Address, setAddress] = useState("");
  const [RefName, setRefNames] = useState("");
  const [RefRelation, setRefRelation] = useState("");
  const [RefPhoneNum, setRefPhoneNum] = useState("");
  const [RefAddress, setRefAddress] = useState("");
  const [file, setFile] = useState("");

  const [pending, setPendeing] = useState(false);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };
  const IsertionDate = (e) => {
    setDate(e.target.value);
  };
  const StudentName = (e) => {
    setName(e.target.value);
  };
  const studentAge = (e) => {
    setAge(e.target.value);
  };
  const gender = (e) => {
    setGender(e.target.value);
  };
  const gread = (e) => {
    setGread(e.target.value);
  };
  const achivement = (e) => {
    setpreAchivs(e.target.value);
  };
  const phoneNumber = (e) => {
    setPhoneNum(e.target.value);
  };
  const refName = (e) => {
    setRefNames(e.target.value);
  };
  const studentAdress = (e) => {
    setAddress(e.target.value);
  };
  const refRelation = (e) => {
    setRefRelation(e.target.value);
  };
  const refPoneNumber = (e) => {
    setRefPhoneNum(e.target.value);
  };
  const refAddr = (e) => {
    setRefAddress(e.target.value);
  };
  const addData = async (e) => {
    // e.preventDefault();
    let formData = new FormData();
    formData.append("photo", file);
    formData.append("reg_date", Date);
    formData.append("student_name", Name);
    formData.append("student_age", Age);
    formData.append("student_gender", Gender);
    formData.append("student_gread", Gread);
    formData.append("achievement", preAchivs);
    formData.append("Stud_p_num", PhoneNum);
    formData.append("S_address", Address);
    formData.append("referee_name", RefName);
    formData.append("referee_relation", RefRelation);
    formData.append("refphone_num", RefPhoneNum);
    formData.append("ref_adress", RefAddress);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await Axios.post(
      "http://localhost:5000/api/post",
      formData,
      config
    );

    setPendeing(false);
  };
  return (
    <>
      <div className="all-in-one">
        <form className="reegistration-form">
          <h3>Student registeration form</h3>
          <hr></hr>
          <label>Date:</label>
          <input
            className="form"
            type="date"
            name="reg_date"
            placeholder="joe doe"
            onChange={IsertionDate}
          />
          <label>Name:</label>
          <input
            className="form"
            type="text"
            name="student_name"
            placeholder="joe doe"
            onChange={StudentName}
          />
          <label>Age:</label>
          <input
            className="formr"
            min="4"
            max="25"
            type="number"
            name="student_age"
            placeholder="7"
            onChange={studentAge}
          />
          <label>Gender:</label>
          <select
            className="form"
            name="student_gender"
            id=""
            placeholder="female"
            onChange={gender}
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
          <label>Gread:</label>
          <select
            className="form"
            name="student_gread"
            id=""
            placeholder="kg-3"
            onChange={gread}
          >
            <option value="kg-1">kg-1</option>
            <option value="kg-2">kg-2</option>
            <option value="kg-3">kg-3</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <label>Previous achievement:</label>
          gread,achievement
          <input
            className="form"
            type="text"
            name="achievement"
            placeholder="certificates"
            onChange={achivement}
          />
          <label>Phone number:</label>
          <input
            className="form"
            type="tel"
            name="Stud_p_num"
            placeholder="905525837"
            onChange={phoneNumber}
          />
          <label>address</label>
          <input
            className="form"
            type="text"
            name="S_address"
            placeholder="Near kebele 02"
            onChange={studentAdress}
          />
          <label>Photo:</label>
          <input
            multiple
            type="file"
            name="photo"
            accept="image/*"
            onChange={saveFile}
          />
          <h2>Referee's information </h2>
          <hr></hr>
          <label>Referee name:</label>
          <input
            className="form"
            type="text"
            name="referee_name"
            placeholder="mark jhon"
            onChange={refName}
          />
          <label>Referee relation:</label>
          <input
            className="form"
            type="text"
            name="referee_relation"
            placeholder="Uncle"
            onChange={refRelation}
          />
          <label>Referee phone number:</label>
          <input
            className="form"
            type="tel"
            name="refphone_num"
            placeholder="918093146"
            onChange={refPoneNumber}
          />
          <label>Referee address:</label>
          <input
            className="form"
            type="text"
            name="ref_adress"
            placeholder="Kebele 02"
            onChange={refAddr}
          />
          {!pending && (
            <button className="submit-btn" type="submit" onClick={addData}>
              Submit
            </button>
          )}
          {pending && (
            <button
              className="submit-btn"
              type="submit"
              onClick={addData}
              disabled
            >
              Waitting...
            </button>
          )}
          <Link to="/ref-img">
            <button className="submit-btn">Next</button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Register;

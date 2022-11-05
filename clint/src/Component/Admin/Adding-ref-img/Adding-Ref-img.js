import React, { useState } from "react";
// import { Link } from "react-router-dom";
import Axios from "axios";
const ImageFile = () => {
  const [file, setFile] = useState();
  const [ID, setid] = useState();

  const saveFile = (e) => {
    setid(e.target.value);
  };
  const picData = (e) => {
    setFile(e.target.files[0]);
  };
  const addUserData = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("photo", file);
    formData.append("ID", ID);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await Axios.post(
      "http://localhost:5000/api/post-img",
      formData,
      config
    );
  };
  return (
    <>
      <div className="all-in-one">
        <form className="reegistration-form">
          <label>ID:</label>
          <input type="number" name="ID" onChange={saveFile} />
          <label>Referee's photo:</label>
          <input
            className="form"
            type="file"
            name="photo"
            accept="image/*"
            onChange={picData}
          />
          <button className="submit-btn" type="submit" onClick={addUserData}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default ImageFile;

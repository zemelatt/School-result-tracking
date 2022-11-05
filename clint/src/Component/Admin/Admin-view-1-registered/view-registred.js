import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const ViewOne = () => {
  const [singleData, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getData = async (e) => {
      const reqData = await fetch(
        `http://localhost:5000/api-get/all-student/${id}`
      );
      const resData = await reqData.json();

      setData(resData);
    };
    getData();
  });
  return (
    <div className="all-in-one">
      {singleData.map((getUser, index) => (
        <div key={id} className="registerd-student-view">
          <div className="image details">
            <img
              src={require(`../../../../../server/uploads/${getUser.img}`)}
              height={100}
              width={100}
              alt="students-pp"
            />
          </div>
          <div className="details">
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
  );
};

export default ViewOne;

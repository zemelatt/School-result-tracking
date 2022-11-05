import React, { useEffect, useState } from "react";

const Comment = () => {
  const [comment, setComment] = useState([]);
  useEffect(() => {
    async function getdata() {
      const req = await fetch("http://localhost:5000/all-comment");
      const res = await req.json();
      setComment(res);
    }
    getdata();
  });
  return (
    <>
      <div className="all-in-one">
        <div className="reegistration-form">
          {comment.map((com, index) => (
            <div key={index}>
              <p>
                {com.c_id}---{com.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comment;

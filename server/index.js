const express = require("express");
const app = express();
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const mySql = require("mysql");
const { json } = require("body-parser");
const { response, query } = require("express");
const { sign } = require("jsonwebtoken");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("./uploads"));

//img store
let imgconfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}.${file.originalname}`);
  },
});
// const isImage = (req, file, cb) => {
//   if (file.mimetype.startswith("image")) {
//     cb(null, true);
//   } else {
//     cb(null, Error("only img is allowed"));
//   }
// };
var upload = multer({
  storage: imgconfig,
  // fileFilter: isImage,
});
//db
const db = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "student_mng",
});
db.connect((err) => {
  if (err) console.log(err);
  console.log("db connected");
});

app.post("/api/post", upload.single("photo"), (req, res) => {
  const {
    reg_date,
    student_name,
    student_age,
    student_gender,
    student_gread,
    achievement,
    Stud_p_num,
    S_address,

    referee_name,
    referee_relation,
    refphone_num,
    ref_adress,
  } = req.body;
  const { filename } = req.file;
  const newPOST =
    "INSERT INTO student_list values('" +
    reg_date +
    "',null,'" +
    student_name +
    "','" +
    student_age +
    "','" +
    student_gender +
    "','" +
    student_gread +
    "','" +
    achievement +
    "','" +
    Stud_p_num +
    "','" +
    S_address +
    "','" +
    filename +
    "','" +
    referee_name +
    "','" +
    referee_relation +
    "','" +
    refphone_num +
    "','" +
    ref_adress +
    "')";
  db.query(newPOST, (err, result) => {
    if (err) console.log(err);

    res.send(result);
  });
});
app.post("/api/post-img", upload.single("photo"), (req, res) => {
  console.log(req.file);
  const { filename } = req.file;
  const id = req.body.ID;
  if (!filename) {
    res.status(400).json({ msg: "no file uploaded" });
  }
  try {
    const newImage =
      'insert into refs_photo values(null,"' + filename + '","' + id + '") ';
    db.query(newImage, (req, res) => {
      res.send(result);
    });
  } catch (error) {}

  ///////////////////////////////
});
app.get("/api-get/student-score/:registered_id", (req, res) => {
  const gett = req.params.registered_id;
  const getByName = `select * from students_score where registered_id = ${gett}`;
  db.query(getByName, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});
app.delete("/api-get/student-score/:s_id", (req, res) => {
  const gett = req.params.s_id;
  const getByName = `DELETE FROM students_score where s_id = ${gett}`;
  db.query(getByName, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});
app.get("/api-get/student-score/byID/:s_id", (req, res) => {
  const gett = req.params.s_id;
  const getOne = `select * from students_score where s_id = ${gett}`;
  db.query(getOne, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});
app.put(
  "/api-get/student-score/update/:s_id",
  upload.single("photo"),
  (req, res) => {
    const { quiz1, mid1, quiz2, mid2, final } = req.body;
    const subjectName = req.body.subject_name;
    const gett = req.params.s_id;
    const UpdateByID = `UPDATE students_score SET subject_name='${subjectName}',quiz1=${quiz1},mid_test1=${mid1},quiz2=${quiz2},mid_test2=${mid2},final_exam=${final} where s_id=${gett}`;
    db.query(UpdateByID, (err, result) => {
      if (err) console.log(err);
      res.send(result);
    });
  }
);
app.post("/api/post-progress", upload.single("photo"), (req, res) => {
  const { subject_name, quiz1, mid1, quiz2, mid2, final, ID } = req.body;
  console.log(req.body);

  const addingProgress =
    "INSERT INTO students_score values(null,'" +
    subject_name +
    "','" +
    quiz1 +
    "','" +
    mid1 +
    "','" +
    quiz2 +
    "','" +
    mid2 +
    "','" +
    final +
    "','" +
    ID +
    "')";
  db.query(addingProgress, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log("Updated");
    }
  });
});

// refistered list
app.get("/search-by-id/edit-registerd/:id", (req, res) => {
  const gett = req.params.id;
  const getOne = `select * from student_list where id = ${gett}`;
  db.query(getOne, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.put(
  "/search-by-id/edit-registerd-update/:id",
  upload.single("photo"),
  (req, res) => {
    const {
      student_name,
      student_age,
      student_gender,
      student_gread,
      achievement,
      Stud_p_num,
      S_address,
      referee_name,
      referee_relation,
      refphone_num,
      ref_adress,
    } = req.body;
    console.log(S_address);
    //const { filename } = req.file; ///   img=${filename}, //age=${student_age},sex=${student_gender},gread=${student_gread},achivement=${achievement},phone=${Stud_p_num},adress=${S_address},age=${student_age},sex=${student_gender},gread=${student_gread},achivement=${achievement},phone=${Stud_p_num},adress=${S_address},img=${filename},referee_name=${referee_name},r_relation=${referee_relation},r_phone=${refphone_num},r_address=${ref_adress},referee_name=${referee_name},r_relation=${referee_relation},r_phone=${refphone_num},r_address=${ref_adress}
    const id = req.params.id;
    const newUpdate = `UPDATE student_list SET name='${student_name}',age=${student_age},sex='${student_gender}',gread=${student_gread},achivement='${achievement}',phone=${Stud_p_num},adress=${S_address},referee_name='${referee_name}',r_relation='${referee_relation}',r_phone=${refphone_num},r_address=${ref_adress} where id=${id}`;
    db.query(newUpdate, (err, result) => {
      if (err) console.log(err);

      res.send(result);
    });
  }
);
app.post("/api/search-byID", (req, res) => {
  const studentID = req.body.ID;
  const finding = "select * from student_list";
  db.query(studentID, (err, result) => {
    console.log(result);
  });
});
app.get("/api-get/all-student", (req, res) => {
  const sqlGetPages = "select * from student_list";
  db.query(sqlGetPages, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});
app.get("/api-get/all-student/:id", (req, res) => {
  const id = req.params.id;
  const sqlGetPages = `select * from student_list where id=${id}`;
  db.query(sqlGetPages, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});
app.delete("/api-delete/byId/:id", (req, res) => {
  const id = req.params.id;
  const deleting = `DELETE FROM student_list where id=${id}`;
  db.query(deleting, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

/// REGISTERATION OF USER
app.post("/api/post-userRegisteration", upload.single("photo"), (req, res) => {
  const name = req.body.username;
  const pwd = req.body.password;
  const AllReadyRegistered = `select * from userRegistration where username ='${name}' AND password='${pwd}'`;
  console.log(AllReadyRegistered);
  db.query(AllReadyRegistered, (err, response) => {
    if (response.length > 0) {
      res.send({ message: "Already registered" });
    } else {
      const addingusers = `INSERT INTO userRegistration (reg_id,username, password) values(null,'${name}','${pwd}')`;
      // "INSERT INTO userRegistration values(null,'" + name + "'," + pwd + ")";
      db.query(addingusers, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send({ message: "Registered" });
        }
      });
    }
  });
});
app.post("/login", upload.single("photo"), (req, res) => {
  const name = req.body.username;
  const pwd = req.body.password;

  const checking = `select * from userregistration where username='${name}' AND password=${pwd}`;
  const byName = `select * from userregistration where username='${name}'`;
  db.query(byName, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      if (pwd == result[0].password) {
        const id = result[0].reg_id;
        const accesToken = sign(
          { name: result[0].username, id: result[0].reg_id },
          "importantSecret"
        );
        // res.send(accesToken);
        res.json(accesToken);
      } else {
        res.send({ message: "password err" });
      }
    }
    if (result == 0) {
      res.send({ message: "not registered by this user name" });
    }
  });
});
//jwt login
app.get("/api-get/allUser", (req, res) => {
  const getALL = "SELECT * FROM userregistration";
  db.query(getALL, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

//for admin
app.get("/api-admin", (req, res) => {
  const getALL = "SELECT * FROM admin";
  db.query(getALL, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
app.post("/api-admin/login", upload.single("photo"), (req, res) => {
  const name = req.body.username;
  const pwd = req.body.password;
  const byName = `select * from admin where adminName='${name}'`;

  db.query(byName, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      if (pwd == result[0].password) {
        const id = result[0].reg_id;
        const accesToken = sign(
          { name: result[0].adminName, id: result[0].admin_id },
          "importantSecret"
        );
        // res.send(accesToken);
        res.json(accesToken);
      } else {
        res.send({ message: "password err" });
      }
    }
    if (result == 0) {
      res.send({ message: "not registered by this user name" });
    }
  });
});
//adding comment

app.post("/adding-comment", upload.single("photo"), (req, res) => {
  const comment = req.body.comment;

  const addingC = `INSERT INTO comments (c_id, comment ) values(null,'${comment}')`;
  db.query(addingC, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.get("/all-comment", (req, res) => {
  const comments = "select * from comments";
  db.query(comments, (err, result) => {
    res.send(result);
  });
});
app.listen(5000, () => {
  console.log("server running on " + 5000);
});

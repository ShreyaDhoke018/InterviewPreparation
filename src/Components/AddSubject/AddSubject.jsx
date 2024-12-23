import React, { useState, useEffect, useRef } from "react";
import "./AddSubject.css";
import { useMatch, useResolvedPath, useLocation } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const AddSubject = () => {
  const [admin, setAdmin] = useState(false);
  const [subject, setSubject] = useState("");
  const [subjDes, setSubjDes] = useState("");
  // a reference to a DOM element or an instance of a component.
  const fileInputRef = useRef();

  // to access the state we use UseLocation
  const location = useLocation();
  const subjName = location?.state ? location?.state : "";
  // console.log("subjName: " + subjName);
  // console.log(subjName.name);

  function CustomLink({ to, children }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname });
    return (
      <li className={isActive ? "options_li active" : "options_li"}>
        <Link to={to} className="quiz_link" state={subjName}>
          {children}
        </Link>
      </li>
    );
  }

  useEffect(() => {
    const Currentrole = localStorage.getItem("role");
    if (Currentrole == "admin") {
      setAdmin(true);
    }
  });

  const fileImg = document.getElementById("subjImg");

  const handleSubmit = (e) => {
    e.preventDefault();
    const fileInput = fileInputRef.current.files[0];
    const fileEle = fileImg.files[0].name.split(".");
    // console.log(fileEle[1]);

    const url3 = "http://localhost/WebTechProj/api/addSubject.php";
    const fData = new FormData();
    fData.append("subject", subject);
    fData.append("subjImg", fileInput);
    fData.append("subjDes", subjDes);
    fData.append("ext", fileEle[1]);
    axios
      .post(url3, fData)
      .then(function (response) {
        if (response?.data && response.status == 200) {
          alert(response?.data?.msg);
        } else if (response?.status != 200) {
          console.error("Connection failed");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="addSubject">
      <div className="addSubject_sidenav">
        <div className="options">
          <ul className="options_ul">
            {admin ? (
              <>
                <CustomLink to="/quiz">Test</CustomLink>
                <CustomLink to="/progress">Progress</CustomLink>
                <CustomLink to="/profile">Change Profile</CustomLink>
              </>
            ) : (
              <>
                <CustomLink to="/quiz">Test</CustomLink>
                <CustomLink to="/progress">Progress</CustomLink>
                <CustomLink to="/profile">Change Profile</CustomLink>
                <CustomLink to="/add">Add Questions</CustomLink>
                <CustomLink to="/download">Download File</CustomLink>
                <CustomLink to="/deleteQuestion">Delete Questions</CustomLink>
                <CustomLink to="/registerAdmin">Register Others</CustomLink>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="addSubject_mainWindow">
        <div className="addSubject_box">
          <div className="addSubject_head">
            <p>Add Subject Name:</p>
          </div>
          <div className="addSubject_box">
            <form
              className="addSubject_form"
              method="post"
              onSubmit={handleSubmit}
            >
              <label>Enter Subject Name: </label>
              <br></br>
              <input
                type="text"
                name="subjName"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <br></br>
              <label>Enter Subject Description: </label>
              <br></br>
              <input
                type="text"
                name="subjDes"
                value={subjDes}
                onChange={(e) => setSubjDes(e.target.value)}
              />
              <br></br>
              <label>Insert image for subject: </label>
              <br></br>
              <input
                type="file"
                name="subjImg"
                id="subjImg"
                accept=".png, .jpg, .jpeg"
                ref={fileInputRef}
              />
              <br></br>
              <input type="submit" value="Submit" className="addSubject_btn" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubject;

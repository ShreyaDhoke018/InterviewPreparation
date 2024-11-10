import React, { useState, useEffect } from "react";
import "./AddQuestion.css";
import { useMatch, useResolvedPath } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const AddQuestion = () => {
  const [admin, setAdmin] = useState(false);

  function CustomLink({ to, children }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname });
    return (
      <li className={isActive ? "options_li active" : "options_li"}>
        <Link to={to} className="quiz_link">
          {children}
        </Link>
      </li>
    );
  }

  const url = "http://localhost/WebTechProj/api/login.php";

  axios
    .get(url)
    .then(function (response) {
      if (response?.data && response?.status == 200) {
        localStorage.setItem("role", response?.data?.role);
      } else if (response?.status != 200) {
        console.error("Connection failed");
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  useEffect(() => {
    const Currentrole = localStorage.getItem("role");
    if (Currentrole == "admin") {
      setAdmin(true);
    }
  });
  return (
    <div className="addQuestion">
      <div className="addQuestion_sidenav">
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
                <CustomLink to="/registerAdmin">Register Others</CustomLink>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="Add_mainWindow">
        <div className="Add_box">
          <div className="Add_head">
            <p>Upload .csv or .xlsx File with Question:</p>
          </div>
          <div className="Add_drag">
            <img src="src/assets/file.png" className="Add_img"></img>
            <br></br>
            <p style={{ fontSize: "15px" }}>Drag & Drop your files here</p>
          </div>
          <form className="Add_form">
            <input
              type="file"
              name="file"
              id="file"
              multiple
              className="Add_file"
            />
            <br></br>
            <input type="submit" value="Upload" className="Add_btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;

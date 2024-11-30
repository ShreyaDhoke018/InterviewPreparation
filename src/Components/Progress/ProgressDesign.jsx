import React, { useState, useEffect } from "react";
import "./Progress.css";
import { useMatch, useResolvedPath } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";

const Progress = () => {
  const [admin, setAdmin] = useState(false);
  const [score, setScore] = useState(0);

  // to access the state we use UseLocation
  const location = useLocation();
  console.log(location);
  //to extract name from the state

  const subjName = location?.state ? location?.state : "";
  const username = localStorage.getItem("username");

  function CustomLink({ to, children }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname });

    return (
      <li className={isActive ? "options_li active" : "options_li"}>
        <Link to={to} className="progess_link" state={subjName}>
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

  const url3 = "http://localhost/WebTechProj/api/previousProgress.php";
  const fData3 = new FormData();
  fData3.append("subject", subjName);
  console.log("Subject:", subjName);
  fData3.append("username", username);
  axios
    .post(url3, fData3)
    .then(function (response) {
      if (response?.data && response.status == 200) {
        console.log(response.data);
        setScore(response?.data?.score);
      } else if (response?.status != 200) {
        console.error("Connection failed");
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <div className="progress_window">
      <div className="progress_sidenav">
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
      <div className="progress_mainWindow">
        <div className="progress_box">
          <p className="progress_head">Your Progress is: </p>
          <ProgressBar now={score} className="custom-bar" />
          <div>
            <p className="progress_report">
              Your previous Score:
              <br></br>
              {score}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;

import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useMatch, useResolvedPath } from "react-router-dom";
import { Link, Navigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Profile = () => {
  const [admin, setAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // to access the state we use UseLocation
  const location = useLocation();
  //to extract name from the state
  const subjName = location?.state ? location?.state : "";
  console.log("subjName: " + subjName);

  function CustomLink({ to, children }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname });

    return (
      <li className={isActive ? "options_li active" : "options_li"}>
        <Link to={to} className="registerAdmin_link" state={subjName}>
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("hello");
    const url = "http://localhost/WebTechProj/api/updateDetails.php";
    const fData = new FormData();
    fData.append("id", localStorage.getItem("id"));
    if (username != "") {
      fData.append("username", username);
      axios
        .post(url, fData)
        .then(function (response) {
          if (response?.data && response.status == 200) {
            alert(response?.data?.msg);
            window.location.reload(false);
          } else if (response?.status != 200) {
            console.error("Connection failed");
          } else {
            alert(response?.data?.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        fData.append("password", password);
        fData.append("confirm_password", confirmPassword);
        axios
          .post(url, fData)
          .then(function (response) {
            if (response?.data && response.status == 200) {
              console.log(response?.data);
              alert(response?.data?.msg);
              // window.location.reload(false);
            } else if (response?.status != 200) {
              console.error("Connection failed");
            } else {
              alert(response?.data?.msg);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        alert("Password doesnt match!");
      }
    } else {
      alert("Please enter details to update!");
    }
  };

  return (
    <div className="profile">
      <div className="profile_sidenav">
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
                <CustomLink to="/addSubject">Add Subject</CustomLink>
                <CustomLink to="/registerAdmin">Register Others</CustomLink>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="profile_mainWindow">
        <div className="profile_box">
          <div className="profile_head">
            <p>Profile Details: </p>
          </div>
          <div className="profile_body">
            <form
              className="profile_form"
              onSubmit={handleSubmit}
              method="post"
            >
              {/* <input
                type="email"
                name="email"
                placeholder="Enter new email"
                className="profile_formElement"
              /> */}
              {/* <br></br> */}
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                className="profile_formElement"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br></br>
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                className="profile_formElement"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br></br>
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm new password"
                className="profile_formElement"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <br></br>
              <input
                type="submit"
                value="Change details"
                className="profile_btn"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

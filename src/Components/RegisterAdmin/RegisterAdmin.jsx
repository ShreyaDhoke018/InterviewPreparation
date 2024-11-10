import React, { useState, useEffect } from "react";
import "./RegisterAdmin.css";
import { useMatch, useResolvedPath } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const RegisterAdmin = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [admin, setAdmin] = useState(false);

  function CustomLink({ to, children }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname });

    return (
      <li className={isActive ? "options_li active" : "options_li"}>
        <Link to={to} className="registerAdmin_link">
          {children}
        </Link>
      </li>
    );
  }

  const handleSubmitAdmin = (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      alert("Passwords doesn't match!");
      return;
    }
    if (email.length == 0 || password.length == 0) {
      alert("Please enter all the credentials");
    } else {
      const url = "http://localhost/WebTechProj/api/registerAdmin.php";

      let fData = new FormData();
      fData.append("email", email);
      fData.append("username", username);
      fData.append("password", password);
      fData.append("confirm_password", confirm_password);

      axios
        .post(url, fData)
        .then(function (response) {
          if (response?.data && response.status == 200) {
            alert(response?.data?.message);
            setEmail("");
            setUsername("");
            setPassword("");
            setConfirm_password("");
          } else if (response?.status != 200) {
            alert(response?.data?.message);
            console.error("Connection failed");
          } else {
            alert(response?.data?.message);
            console.log(response?.data?.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const url2 = "http://localhost/WebTechProj/api/login.php";

  axios
    .get(url2)
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
    <>
      <section>
        <div className="registerAdmin">
          <div className="registerAdmin_sidenav">
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
          <div className="registerAdmin_mainWindow">
            <div className="registerAdmin_box">
              <div className="registerAdmin_innerBox">
                <div className="registerAdmin_left">
                  <img
                    src="src/assets/login.jpg"
                    className="registerAdmin_img"
                  ></img>
                </div>
                <div className="registerAdmin_right">
                  <div className="registerAdmin_head">
                    Register For Admins Only
                  </div>
                  <br></br>
                  <form
                    className="registerAdmin_form"
                    method="post"
                    onSubmit={handleSubmitAdmin}
                  >
                    <div className="Adminform_container">
                      <FontAwesomeIcon icon={faEnvelope} />
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="Admin_loginField"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        placeholder="Enter your email id"
                        required
                        autoComplete="off"
                      />
                    </div>
                    {/* {emailErr && <p className="error_msg">Invalid email address</p>} */}
                    <br></br>
                    <div className="Adminform_container">
                      <FontAwesomeIcon icon={faUser} />
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="Admin_loginField"
                        value={username}
                        placeholder="Enter username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <br></br>
                    <div className="Adminform_container">
                      <FontAwesomeIcon icon={faLock} />
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="Admin_loginField"
                        placeholder="Enter password"
                        required
                      />
                    </div>
                    <br></br>
                    <div className="Adminform_container">
                      <FontAwesomeIcon icon={faLock} />
                      <input
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        className="Admin_loginField"
                        value={confirm_password}
                        onChange={(e) => setConfirm_password(e.target.value)}
                        placeholder="Confirm password"
                        required
                      />
                    </div>
                    <input
                      type="submit"
                      value="Register"
                      className="registerAdmin_btn"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterAdmin;

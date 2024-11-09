import React from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Register from "./Register";
import { useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "./../AuthContext/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // var username = "";
  const [username, setUsername] = useState("");
  // const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { success, setSuccess } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    let fData = new FormData();
    fData.append("email", email);
    fData.append("password", password);

    const url = "http://localhost/WebTechProj/api/login.php";

    axios
      .post(url, fData)
      .then(function (response) {
        if (response?.data && response.status == 200) {
          setSuccess(true);
          localStorage.setItem("isLoggedIn", "true");
          setUsername(response?.data?.username);
          console.log(response.data);
        } else if (response?.status != 200) {
          console.error("Connection failed");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // setUsername(
  //   axios
  //     .get("http://localhost/WebTechProj/api/login.php")
  //     .then((response) => response?.data?.username)
  // );

  // const username = () => {
  //   const url = "http://localhost/WebTechProj/api/login.php";
  // };

  const logOut = (e) => {
    e.preventDefault();
    const url = "http://localhost/WebTechProj/api/logout.php";

    axios
      .get(url)
      .then(function (response) {
        if (response?.data && response.status == 200) {
          console.log(response.data);
          setSuccess(false);
          localStorage.removeItem("isLoggedIn");
          navigate("/login");
        } else if (response?.status != 200) {
          console.error("Connection failed");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {success ? (
        <section>
          <div className="login_box">
            <div className="login_innerBox">
              <div className="login_left">
                <img src="src/assets/login.jpg" className="login_img"></img>
              </div>
              <div className="login_right">
                <div className="login_head">Log Out</div>
                <br></br>
                <form
                  method="post"
                  className="
                  login_form"
                ></form>
                <p>
                  You are logged in<br></br>Welcome {username}
                </p>

                {/* <p>Welcome {username}</p> */}
                <br></br>
                <p>
                  <Link to="/" className="register_link">
                    Go to Home
                  </Link>
                  <br></br>
                  <input
                    type="submit"
                    value="Logout"
                    onClick={logOut}
                    className="login_btn"
                  />
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="login_box">
          <div className="login_innerBox">
            <div className="login_left">
              <img src="src/assets/login.jpg" className="login_img"></img>
            </div>
            <div className="login_right">
              <div className="login_head">Log In</div>
              <br></br>
              <form
                className="
          login_form"
                method="post"
                onSubmit={handleSubmit}
              >
                <div className="form_container">
                  <FontAwesomeIcon icon={faUser} />
                  <input
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="login_field"
                    placeholder="Enter your email id"
                    required
                  />
                </div>
                <br></br>
                <div className="form_container">
                  <FontAwesomeIcon icon={faLock} />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="login_field"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <br></br>
                <Link to="/register" className="register_link">
                  Register now?
                </Link>

                <br></br>
                <input type="submit" value="Login" className="login_btn" />
              </form>

              <p></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;

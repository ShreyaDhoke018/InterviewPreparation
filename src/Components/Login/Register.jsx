import React from "react";
import "./Register.css";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Await, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { validEmail, validPassword } from "./Regex.js";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [emailErr, setEmailErr] = useState(true);
  const [pwdError, setPwdError] = useState(false);

  // const handleChange = (e) => {
  //   setEmail(e.target.value);
  //   setPassword(e.target.value);
  //   setConfirm_password(e.target.value);
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const form = $(e.target);
  //   $.ajax({
  //     type: "POST",
  //     url: form.attr("action"),
  //     data: form.serialize(),
  //     success(data) {
  //       setResult(data);
  //     },
  //   });
  // };
  // const validate = () => {
  //   if (!validEmail.test(email)) {
  //     setEmailErr(true);
  //   }
  //   if (!validPassword.test(password)) {
  //     setPwdError(true);
  //   }
  // };

  const validateEmail = (value) => {
    setEmailErr(!validEmail.test(value));
    setEmail(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (password !== confirm_password) {
      alert("Passwords doesn't match!");
      return; // Exit early if passwords do not match
    }
    if (email.length == 0 || password.length == 0) {
      alert("Please enter all the credentials");
    } else {
      const url = "http://localhost/WebTechProj/api/register.php";

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

  return (
    <div className="register_box">
      <div className="register_innerBox">
        <div className="register_left">
          <img src="src/assets/login.jpg" className="register_img"></img>
        </div>
        <div className="register_right">
          <div className="register_head">Register</div>
          <br></br>
          <form className="register_form" method="post" onSubmit={handleSubmit}>
            <div className="form_container">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="text"
                name="email"
                id="email"
                className="login_field"
                value={email}
                onChange={(e) => {
                  validateEmail(e.target.value);
                }}
                placeholder="Enter your email id"
                // required
              />
            </div>
            {/* {emailErr && <p className="error_msg">Invalid email address</p>} */}
            <br></br>
            <div className="form_container">
              <FontAwesomeIcon icon={faUser} />
              <input
                type="text"
                name="username"
                id="username"
                className="login_field"
                value={username}
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
                // required
              />
            </div>
            <br></br>
            <div className="form_container">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login_field"
                placeholder="Enter password"
                // required
              />
            </div>
            <br></br>
            <div className="form_container">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                className="login_field"
                value={confirm_password}
                onChange={(e) => setConfirm_password(e.target.value)}
                placeholder="Confirm password"

                // required
              />
            </div>
            {/* {pwdError && (
              <p className="error_msg">
                Your password is invalid(Must contain 1letter,1digit and should
                be atleast 6 characters!)
              </p>
            )} */}

            <br></br>
            <Link to="/login" className="login_link">
              Already registered?
            </Link>

            <br></br>
            {/* <button className="register_btn">Register</button> */}
            <input
              type="submit"
              value="Register"
              className="register_btn"
              // onClick={validate}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

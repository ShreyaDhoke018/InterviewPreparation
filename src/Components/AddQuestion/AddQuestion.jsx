import React, { useState, useEffect } from "react";
import "./AddQuestion.css";
import { useMatch, useResolvedPath, useLocation } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const AddQuestion = () => {
  const [admin, setAdmin] = useState(false);
  const [columnArray, setColumnArray] = useState([]);
  const [values, setValues] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost/WebTechProj/api/uploadFile.php";
    // const fileInput = file;
    const fileInput = document.getElementById("file");
    const fData = new FormData();
    // fData.append("file", fileInput);
    // console.log(fileInput.files);
    fData.append("file", fileInput.files[0]);
    fData.append("subject", subjName.name);
    console.log(subjName.name);
    axios
      .post(url, fData)
      .then(function (response) {
        if (response?.data && response?.status == 200) {
          if (response?.data?.msg != "") {
            alert(response?.data?.msg);
          }
          console.log(response?.data);
          window.location.reload();
        } else {
          console.error("Connection failed");
        }
        // window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
                <CustomLink to="/deleteQuestion">Delete Questions</CustomLink>
                <CustomLink to="/addSubject">Add Subject</CustomLink>
                <CustomLink to="/registerAdmin">Register Others</CustomLink>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="Add_mainWindow">
        <div className="Add_box">
          <div className="Add_head">
            <p>Upload .csv File with Question:</p>
          </div>
          <div className="Add_drag">
            <p>The FILE FORMAT should be as follows:</p>
            <table className="table table-bordered w-50">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Option1</th>
                  <th>Option2</th>
                  <th>Option3</th>
                  <th>Option4</th>
                  <th>Answer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>abc</td>
                  <td>a</td>
                  <td>b</td>
                  <td>c</td>
                  <td>d</td>
                  <td>b</td>
                </tr>
              </tbody>
            </table>
          </div>
          <form
            className="Add_form"
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <input
              type="file"
              name="file"
              id="file"
              accept=".csv"
              className="Add_file"
              // value={file}
              // onChange={(e) => {
              // setFile(e.target.value);
              // }}
              // multiple
            />
            <br></br>
            <input type="submit" value="Upload" className="Add_btn" />
          </form>
          {/* <table>
            <thead>
              <tr>
                {columnArray.map((col, i) => (
                  <th key={i}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {values.map((v, i) => (
                <tr key={i}>
                  {v.map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;

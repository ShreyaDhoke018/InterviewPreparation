import React, { useState, useEffect } from "react";
import "./AddQuestion.css";
import { useMatch, useResolvedPath } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Papa from "papaparse";

const AddQuestion = () => {
  const [admin, setAdmin] = useState(false);
  const [file, setFile] = useState("");
  const [data, setData] = useState([]);
  const [columnArray, setColumnArray] = useState([]);
  const [values, setValues] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost/WebTechProj/api/uploadFile.php";

    const fileInput = document.getElementById("file");
    const fData = new FormData();
    fData.append("file", fileInput.files[0]);

    axios;
    axios
      .post(url, fData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        if (response?.data && response?.status == 200) {
          console.log(response?.data);
          // alert(response?.data?.extn_type);
        } else {
          console.error("Connection failed");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleFile = (e) => {
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const columnArray = [];
        const valuesArray = [];

        result.data.map((d) => {
          columnArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        setData(result.data);
        setColumnArray(columnArray[0]);
        setValues(valuesArray);
      },
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
            <img src="src/assets/file.png" className="Add_img"></img>
            <br></br>
            <p style={{ fontSize: "15px" }}>Drag & Drop your files here</p>
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
              // onChange={handleFile}
              onChange={(e) => {
                setFile(e.target.value);
              }}
            />
            <br></br>
            <input type="submit" value="Upload" className="Add_btn" />
          </form>
          <table>
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;

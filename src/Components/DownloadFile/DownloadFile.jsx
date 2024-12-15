import React, { useState, useEffect } from "react";
import "./DownloadFile.css";
import { useMatch, useResolvedPath } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const DownloadFile = () => {
  const [admin, setAdmin] = useState(false);
  const [file, setFile] = useState("");
  const [data, setData] = useState("");

  // to access the state we use UseLocation
  const location = useLocation();
  const subjName = location?.state ? location?.state : "";
  console.log(subjName.name);

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

  const url2 = "http://localhost/WebTechProj/api/downloadFile.php";
  const fData = new FormData();
  fData.append("subject", subjName.name);

  axios
    .post(url2, fData)
    .then(function (response) {
      if (response?.data && response?.status == 200) {
        console.log(response?.data);
        setFile(response?.data?.fname);
        setData(response?.data?.fileContent);
      } else if (response?.status != 200) {
        console.error("Connection failed");
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  const onButtonClick = () => {
    // Creates a Blob object that represents a chunk of raw data.
    const blob = new Blob([data], { type: "text/csv" });
    //Creates a new HTML <a> (anchor) element dynamically using JavaScript.
    const link = document.createElement("a");
    console.log(link);
    //Uses the URL.createObjectURL() method to create a temporary URL pointing to the Blob object.
    link.href = URL.createObjectURL(blob);
    //Sets the download attribute of the anchor tag to "document.csv".
    link.download = "document.csv"; // specify the filename
    //Temporarily adds the anchor (<a>) element to the DOM (the HTML document body).
    document.body.appendChild(link);
    //This simulates a user clicking on the link, which causes the browser to start the file download.
    link.click();
    //Removes the anchor (<a>) element from the DOM after it has been clicked.
    document.body.removeChild(link);
  };

  // const handleSubmit = () => {
  //   e.preventDefault();
  //   const url = "http://localhost/WebTechProj/api/uploadFile.php";
  //   // const fileInput = file;
  //   const fileInput = document.getElementById("file");
  //   const fData = new FormData();
  //   // fData.append("file", fileInput);
  //   // console.log(fileInput.files);
  //   fData.append("file", fileInput.files[0]);
  //   fData.append("subject", subjName.name);
  //   // console.log(subjName.name);
  //   axios
  //     .post(url, fData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then(function (response) {
  //       if (response?.data && response?.status == 200) {
  //         alert(response?.data?.success);
  //         console.log(response?.data);
  //         // alert(response?.data?.extn_type);
  //         // setFile("");
  //       } else {
  //         console.error("Connection failed");
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="downloadFile">
      <div className="downloadFile_sidenav">
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
      <div className="download_mainWindow">
        <div className="download_box">
          <div className="download_head">
            <p>Click on below button to download question file(csv)</p>
          </div>
          {/* <div className="Add_drag"> */}
          <img src="./src/assets/download.gif" className="download_img"></img>
          <button onClick={onButtonClick} className="download_btn">
            Download CSV
          </button>
          {/* </div> */}
        </div>
      </div>

      <br></br>
      {/* <div>
        <form method="post" onSubmit={handleSubmit}>
          <h1>Upload the updated file</h1>
          <input type="file" name="file" id="file" />
          <input type="submit" value="Update File" />
        </form>
      </div> */}
    </div>
  );
};

export default DownloadFile;

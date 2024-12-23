import React, { useState, useEffect, useRef } from "react";
import { useMatch, useResolvedPath } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./DeleteQuestion.css";

const DeleteQuestion = () => {
  const [admin, setAdmin] = useState(false);
  const [question, setQuestion] = useState([]);
  const [checkedQuestions, setCheckedQuestions] = useState({});

  const location = useLocation();
  const subjName = location?.state ? location?.state : "";
  // console.log("subjName: " + subjName);

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

  const url2 = "http://localhost/WebTechProj/api/retrieveQuestion.php"; //to fetch the questions
  const fData = new FormData();
  fData.append("subject", subjName.name);
  // runs once
  useEffect(() => {
    axios
      .post(url2, fData)
      .then(function (response) {
        if (response?.data && response.status == 200) {
          // console.log(response?.data);
          setQuestion(response?.data);
        } else if (response?.status != 200) {
          console.error("Connection failed");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleCheckboxChange = (questionId) => {
    setCheckedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId], // toggles the current boolean state
    }));
  };

  // console.log(checkedQuestions);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("hello");
    // console.log(event?.nativeEvent?.submitter?.value);

    if (event?.nativeEvent?.submitter?.value == "Delete") {
      // Object.keys(): This method returns an array of keys from the checkedQuestions object.
      const selectedQuestions = Object.keys(checkedQuestions).filter(
        // The .filter() method iterates over each key from the Object.keys(checkedQuestions) array.
        // For each key, it checks if checkedQuestions[key] is true.
        (key) => checkedQuestions[key]
      );
      // const keys = Object.keys(checkedQuestions);
      // console.log(keys);   //stores each question
      console.log("Selected questions for deletion:", selectedQuestions);

      const url3 = "http://localhost/WebTechProj/api/deleteQuestion.php";
      const fData = new FormData();
      fData.append("subject", subjName.name);
      fData.append("questions", selectedQuestions);
      axios
        .post(url3, fData)
        .then(function (response) {
          if (response?.data && response?.status == 200) {
            console.log("Response:  ", response?.data);
            window.location.reload(false);
          } else {
            console.error("Connection failed");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (event?.nativeEvent?.submitter?.value == "DeleteAll") {
      const url4 = "http://localhost/WebTechProj/api/deleteAll.php";
      const fData = new FormData();
      fData.append("subject", subjName.name);
      axios
        .post(url4, fData)
        .then(function (response) {
          if (response?.data && response?.status == 200) {
            alert(response?.data?.msg);
            window.location.reload(false);
            //   console.log("Response is ", response?.data?.question);
            //   console.log("Response of q is ", response?.data?.q);
            // window.location.href = "/add";
            //   console.log("Response of i ", response?.data?.i);
          } else {
            console.error("Connection failed");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="deleteQuestion">
      <div className="deleteQuestion_sidenav">
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
      <div className="delete_mainWindow">
        <div className="delete_box">
          <div className="delete_head">
            <p>Check the questions to be deleted</p>
          </div>
          <div className="delete_table">
            <form
              className="delete_form"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              method="post"
            >
              <div className="delete_btns">
                <input
                  type="submit"
                  value="Delete"
                  name="DeleteBtn"
                  id="Delete"
                  className="delete_individualBtn"
                />
                <input
                  type="submit"
                  value="DeleteAll"
                  name="DeleteBtn"
                  id="DeleteAll"
                  className="delete_individualBtn"
                />
              </div>
              <div className="table_container">
                <table className="table table-bordered vertical-scrollable">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Question</th>
                      <th>Option1</th>
                      <th>Option2</th>
                      <th>Option3</th>
                      <th>Option4</th>
                      <th>Answer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {question.map((q, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            value={q.question}
                            checked={checkedQuestions[q.question]}
                            onChange={() => handleCheckboxChange(q.question)}
                          />
                        </td>
                        <td>{q.question}</td>
                        <td>{q.option1}</td>
                        <td>{q.option2}</td>
                        <td>{q.option3}</td>
                        <td>{q.option4}</td>
                        <td>{q.answer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteQuestion;

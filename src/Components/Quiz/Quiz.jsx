import React, { useState, useEffect } from "react";
import "./Quiz.css";
import { useMatch, useResolvedPath } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const [admin, setAdmin] = useState(false);
  const [questions, setQuestions] = useState([]); // Store all questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [check, setCheck] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const loggedIn = localStorage.getItem("isLoggedIn");
  if (!loggedIn) {
    alert("Please login to attempt the test!");
  }

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

  // const getQuestion = (e) => {
  //   e.preventDefault();
  const url2 = "http://localhost/WebTechProj/api/retrieveQuestion.php";

  useEffect(() => {
    axios
      .get(url2)
      .then(function (response) {
        if (response?.data && response.status == 200) {
          console.log(response.data);
          setQuestions(response?.data);
        } else if (response?.status != 200) {
          console.error("Connection failed");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const nextQuestion = () => {
    // console.log("question.length: ", questions.length);
    setCurrentQuestionIndex((previousIndex) =>
      previousIndex + 1 < questions.length ? previousIndex + 1 : previousIndex
    );
  };

  if (questions.length === 0) {
    return <p>No questions available.</p>;
  }
  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (isChecked) {
    // setAnswer(e.target.value);
    if (answer === currentQuestion.answer) {
      setCheck("correct");
    } else {
      setCheck("wrong");
      setCorrectAnswer("Correct answer is: " + currentQuestion.answer);
    }
    // }
    console.log("correct: ", correctAnswer);
    console.log(answer);
  };

  return (
    <>
      {loggedIn ? (
        <section>
          <div className="quiz">
            <div className="quiz_sidenav">
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
                      <CustomLink to="/registerAdmin">
                        Register Others
                      </CustomLink>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div className="main_window">
              <div className="quiz_box">
                <form
                  method="post"
                  onSubmit={handleSubmit}
                  // onChange={getQuestion}
                >
                  <div className="quiz_question">
                    <h2>Question {currentQuestionIndex + 1}:</h2>
                    <p>{currentQuestion.question}</p>
                  </div>
                  <div className="quiz_options">
                    <div className="quiz_individualOption">
                      <input
                        type="radio"
                        name="options"
                        id="option1"
                        value={currentQuestion.option1}
                        onChange={(event) => {
                          setAnswer(event.target.value);
                        }}
                      />
                      <label htmlFor="option1" className="quiz_radio">
                        {currentQuestion.option1}
                      </label>
                    </div>
                    <br></br>
                    <div className="quiz_individualOption">
                      <input
                        type="radio"
                        name="options"
                        id="option2"
                        value={currentQuestion.option2}
                        onChange={(event) => {
                          setAnswer(event.target.value);
                        }}
                      />
                      <label htmlFor="option2" className="quiz_radio">
                        {currentQuestion.option2}
                      </label>
                    </div>
                    <br></br>
                    <div className="quiz_individualOption">
                      <input
                        type="radio"
                        name="options"
                        id="option3"
                        value={currentQuestion.option3}
                        onChange={(event) => {
                          setAnswer(event.target.value);
                        }}
                      />
                      <label htmlFor="option3" className="quiz_radio">
                        {currentQuestion.option3}
                      </label>
                    </div>
                    <br></br>
                    <div className="quiz_individualOption">
                      <input
                        type="radio"
                        name="options"
                        id="option4"
                        value={currentQuestion.option4}
                        onChange={(event) => {
                          setAnswer(event.target.value);
                        }}
                      />
                      <label htmlFor="option4" className="quiz_radio">
                        {currentQuestion.option4}
                      </label>
                    </div>

                    <br></br>
                    <p>Your answer is: {check}</p>
                    <p>{correctAnswer}</p>
                    <br></br>
                  </div>
                  <div className="quiz_submit">
                    <input
                      type="submit"
                      value="Submit"
                      className="quiz_submitBtn"
                    />
                  </div>
                  <br></br>
                  <div className="quiz_next">
                    <input
                      type="button"
                      value="Next"
                      className="quiz_nextBtn"
                      onClick={nextQuestion}
                      disabled={currentQuestionIndex + 1 >= questions.length}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Quiz;

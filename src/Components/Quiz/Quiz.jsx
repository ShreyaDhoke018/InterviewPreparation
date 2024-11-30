import React, { useState, useEffect } from "react";
import "./Quiz.css";
import { useMatch, useResolvedPath } from "react-router-dom";
import { Link, Navigate, useLocation } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const [admin, setAdmin] = useState(false);
  const [questions, setQuestions] = useState([]); // Store all questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // current question index
  const [answer, setAnswer] = useState(""); // stores the answer selected by user
  const [correctAnswer, setCorrectAnswer] = useState(""); // stores the correct answer from database
  const [check, setCheck] = useState(""); // checks if the answer is correct
  const [score, setScore] = useState(0); // stores the marks
  const [count, setCount] = useState(1); // stores if the question was attempted or no

  // to access the state we use UseLocation
  const location = useLocation();

  const subjName = location?.state ? location?.state : "";

  const username = localStorage.getItem("username");
  const loggedIn = localStorage.getItem("isLoggedIn");
  if (!loggedIn) {
    alert("Please login to attempt the test!");
  }

  function CustomLink({ to, children }) {
    //side nav bar
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

  const url = "http://localhost/WebTechProj/api/login.php"; //to fetch login details

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

  const url2 = "http://localhost/WebTechProj/api/retrieveQuestion.php"; //to fetch the questions
  const fData = new FormData();
  fData.append("subject", subjName);
  axios.post(url2, fData);
  useEffect(() => {
    axios
      .get(url2)
      .then(function (response) {
        if (response?.data && response.status == 200) {
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
    //to fetch next question
    setCheck("");
    setCorrectAnswer("");
    setAnswer("");
    setCount(1);
    // console.log("question.length: ", questions.length);
    setCurrentQuestionIndex((previousIndex) =>
      previousIndex + 1 < questions.length ? previousIndex + 1 : previousIndex
    );
  };

  const prevQuestion = () => {
    //to fetch previous question
    setCheck("");
    setCorrectAnswer("");
    setAnswer("");
    // console.log(currentQuestionIndex);
    setCurrentQuestionIndex((previousIndex) =>
      previousIndex - 1 >= 0 ? previousIndex - 1 : previousIndex
    );
  };

  if (questions.length === 0) {
    return <p>No questions available.</p>;
  }
  const currentQuestion = questions[currentQuestionIndex];

  console.log("currentQuestion.answer", currentQuestion.answer);
  console.log("answer", answer);

  const handleSubmit = (e) => {
    //to check answer and set score

    e.preventDefault();
    let newScore = score;
    if (currentQuestion.answer === answer) {
      setCheck("correct");
      setCount(count + 1);
      console.log(count);
      if (count == 1) {
        newScore += 1;
        setScore(newScore);
      }
    } else {
      setCount(count + 1);
      console.log("wrong:", count);
      setCheck("wrong");
      setCorrectAnswer("Correct answer is: " + currentQuestion.answer);
    }
    updateScore(newScore);
    setAnswer("");
  };

  const updateScore = (newScore) => {
    //to update score in database

    const url3 = "http://localhost/WebTechProj/api/progress.php";
    const fData = new FormData();
    fData.append("subject", subjName?.name);
    fData.append("score", newScore);
    fData.append("username", username);
    axios
      .post(url3, fData)
      .then(function (response) {
        if (response?.data && response.status == 200) {
          console.log(response.data);
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
                <form method="post" onSubmit={handleSubmit}>
                  <div className="quiz_question">
                    <p>
                      Question {currentQuestionIndex + 1}:
                      {currentQuestion.question}
                    </p>
                  </div>
                  <div className="quiz_options">
                    <div className="quiz_individualOption">
                      <input
                        type="radio"
                        name="options"
                        id="option1"
                        value={currentQuestion.option1}
                        onClick={(event) => {
                          console.log(event.target.value);
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
                        onClick={(event) => {
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
                        onClick={(event) => {
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
                        onClick={(event) => {
                          setAnswer(event.target.value);
                        }}
                      />
                      <label htmlFor="option4" className="quiz_radio">
                        {currentQuestion.option4}
                      </label>
                    </div>

                    <br></br>
                    <p>
                      Your answer is: {check}
                      <br></br>
                      {correctAnswer}
                      <br></br>
                      Score: {score}
                    </p>

                    <br></br>
                  </div>

                  <div className="quiz_btn">
                    <div className="quiz_prev">
                      <input
                        type="button"
                        value="Previous"
                        className="quiz_prevBtn"
                        onClick={prevQuestion}
                        disabled={currentQuestionIndex + 1 > questions.length}
                      />
                    </div>
                    <div className="quiz_submit">
                      <input
                        type="submit"
                        value="Submit"
                        className="quiz_submitBtn"
                      />
                    </div>
                    <div className="quiz_next">
                      <input
                        type="button"
                        value="Next"
                        className="quiz_nextBtn"
                        onClick={nextQuestion}
                        disabled={currentQuestionIndex + 1 >= questions.length}
                      />
                    </div>
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

import React from "react";
import "./Quiz.css";
import { useMatch, useResolvedPath } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";

const Quiz = () => {
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

  return (
    <>
      {loggedIn ? (
        <section>
          <div className="quiz">
            <div className="quiz_sidenav">
              <div className="options">
                <ul className="options_ul">
                  <CustomLink to="/quiz">Test</CustomLink>
                  <CustomLink to="/progress">Progress</CustomLink>
                  <CustomLink to="/add">Add Questions</CustomLink>
                  <CustomLink to="/download">Download File</CustomLink>
                </ul>
              </div>
            </div>
            <div className="main_window">
              <div className="quiz_box">
                <div className="quiz_question">
                  <p>Question?</p>
                </div>
                <div className="quiz_options">
                  <div className="quiz_individualOption">
                    <input
                      type="radio"
                      name="options"
                      id="option1"
                      value={"A"}
                    />
                    <label htmlFor="option1" className="quiz_radio">
                      Option1
                    </label>
                  </div>
                  <br></br>
                  <div className="quiz_individualOption">
                    <input
                      type="radio"
                      name="options"
                      id="option2"
                      value={"B"}
                    />
                    <label htmlFor="option2" className="quiz_radio">
                      Option2
                    </label>
                  </div>
                  <br></br>
                  <div className="quiz_individualOption">
                    <input
                      type="radio"
                      name="options"
                      id="option3"
                      value={"C"}
                    />
                    <label htmlFor="option3" className="quiz_radio">
                      Option3
                    </label>
                  </div>
                  <br></br>
                  <div className="quiz_individualOption">
                    <input
                      type="radio"
                      name="options"
                      id="option4"
                      value={"D"}
                    />
                    <label htmlFor="option4" className="quiz_radio">
                      Option4
                    </label>
                  </div>

                  <br></br>
                </div>
                <div className="quiz_submit">
                  <input
                    type="submit"
                    value="Submit"
                    className="quiz_submitBtn"
                  />
                </div>
                <div className="quiz_next">
                  <input type="button" value="Next" className="quiz_nextBtn" />
                </div>
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

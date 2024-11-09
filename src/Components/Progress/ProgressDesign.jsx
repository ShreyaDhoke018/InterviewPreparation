import React from "react";
import "./Progress.css";
import { useMatch, useResolvedPath } from "react-router-dom";
import { Link } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

const Progress = () => {
  function ProgressCustomLink({ to, children }) {
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
    <div className="progress_window">
      <div className="progress_sidenav">
        <div className="options">
          <ul className="options_ul">
            <ProgressCustomLink to="/quiz">Test</ProgressCustomLink>
            <ProgressCustomLink to="/progress">Progress</ProgressCustomLink>
            <ProgressCustomLink to="/add">Add Questions</ProgressCustomLink>
            <ProgressCustomLink to="/download">
              Download File
            </ProgressCustomLink>
          </ul>
        </div>
      </div>
      <div className="progress_mainWindow">
        <p className="progress_head">Your Progress is: </p>
        <ProgressBar now={80} className="custom-bar" />
      </div>
    </div>
  );
};

export default Progress;

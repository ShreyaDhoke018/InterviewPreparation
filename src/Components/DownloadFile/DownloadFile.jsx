import React from "react";
import "./DownloadFile.css";
import { useMatch, useResolvedPath } from "react-router-dom";
import { Link } from "react-router-dom";

const DownloadFile = () => {
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
    <div className="downloadFile">
      <div className="downloadFile_sidenav">
        <div className="options">
          <ul className="options_ul">
            <CustomLink to="/quiz">Test</CustomLink>
            <CustomLink to="/progress">Progress</CustomLink>
            <CustomLink to="/add">Add Questions</CustomLink>
            <CustomLink to="/download">Download File</CustomLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DownloadFile;

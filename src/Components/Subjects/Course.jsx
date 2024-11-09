import React from "react";
import "./Course.css";
import { Link } from "react-router-dom";

const Course = ({ name, info, image }) => {
  return (
    <div className="course">
      <div className="left_course">
        <img src={image} className="course_img"></img>
      </div>
      <div className="right_course">
        <div className="course_name">{name}</div>
        <div className="course_info">{info}</div>
        <div className="course_btn">
          <Link to="/quiz" className="course_link">
            Start now!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Course;

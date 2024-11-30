import React from "react";
import "./Course.css";
import { Link } from "react-router-dom";

const Course = ({ name, info, image }) => {
  //method which stores the subject name in a variable name
  const courseDetails = {
    name,
  };
  console.log("course details:", courseDetails);
  return (
    <div className="course">
      <div className="left_course">
        <img src={image} className="course_img"></img>
      </div>
      <div className="right_course">
        <div className="course_name">{name}</div>
        <div className="course_info">{info}</div>
        <div className="course_btn">
          {/* state is an object that allows you to pass additional data when navigating between routes using the <Link> or useNavigate components. */}
          <Link to="/quiz" className="course_link" state={courseDetails}>
            Start now!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Course;

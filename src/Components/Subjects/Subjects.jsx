import React from "react";
import "./Subjects.css";
import Course from "./Course";

const Subjects = () => {
  return (
    <div>
      <div className="subj_course">Our Courses</div>
      <br></br>
      <div className="subj_courselist">
        <Course
          name="Dsa"
          info="Data Structures and Algorithms (DSA) is a computer science subject that teaches how to solve complex problems systematically."
          image="src/assets/dsa.png"
        ></Course>
        <Course
          name="Logical Reasoning"
          info="Logical reasoning is a mental activity that aims to arrive at a conclusion in a rigorous way."
          image="src/assets/LR.png"
        ></Course>
        <Course
          name="Python"
          info="Python is a high-level, general-purpose programming language."
          image="src/assets/python.png"
        ></Course>
      </div>
      <br></br>
      <div className="subj_courselist">
        <Course
          name="Java"
          info="Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible."
          image="src/assets/java.png"
        ></Course>
        <Course
          name="English"
          info="English is used in interview tests because it's the most widely spoken language in the world, and many companies want to hire employees who can communicate effectively."
          image="src/assets/english.png"
        ></Course>
        <Course
          name="Maths"
          info="Math is included in aptitude tests because it's an important indicator of a candidate's ability to perform job-related tasks and succeed in a role. Math skills are also a sign of a candidate's logic, reasoning, and general aptitude."
          image="src/assets/maths.jpg"
        ></Course>
      </div>
    </div>
  );
};

export default Subjects;

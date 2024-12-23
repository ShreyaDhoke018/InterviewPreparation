import React, { useState, useEffect } from "react";
import "./Subjects.css";
import Course from "./Course";
import axios from "axios";

const Subjects = () => {
  const [subject, setSubject] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  var img_name = "";

  const url2 = "http://localhost/WebTechProj/api/retrieveSubject.php";

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(url2);
        if (response?.data && response?.status === 200) {
          console.log(response?.data?.subj_data);
          setSubject(response?.data?.subj_data || []); // Safely handle potential null/undefined
        } else {
          console.error("Connection failed");
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);
  

  const subjBreak = (index) =>{
    if(index%3 == 0){
      return (
        <br/>
      )
    }
    return null;
  }

  const modifyImagePath = (path) => {
    const newPath = path.split("D:/WebTechProj/FrontEnd_React/")[1];
    return newPath;
  };

  return (
    <div>
      <div className="subj_course">Our Courses</div>
      <br></br>
      <div className="subj_courselist">
        {subject.length > 0 ? (
          subject.map((sub, currentIndex) => {
            // Modify the image path before passing it to Course
            const imgPath = modifyImagePath(sub.subj_img);

            return (
              <>
                <Course
                  key={currentIndex}
                  name={sub.subj_name} // Assuming subj_name is a string
                  info={sub.subj_des} // Assuming subj_des is a string
                  image={imgPath} // Updated image path
                />
                {currentIndex % 3 === 2 && <br />}{" "}
                {/* Add a <br> af ter every 3rd item */}
              </>
            );
          })
        ) : (
          <p>Loading subjects...</p> // Fallback message while data is being fetched
        )}

        {/* <Course
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
        ></Course> */}
      </div>
      <br></br>
      {/* <div className="subj_courselist">
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
      </div> */}
    </div>
  );
};

export default Subjects;

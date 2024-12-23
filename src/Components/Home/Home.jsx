import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="home_layer">
          <div className="info">
            <p className="site_name">Career Climb</p>
            <Link to="/subjects" className="btn_link">
              <button className="btn">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import About from "./Components/About/About";
import Subjects from "./Components/Subjects/Subjects";
import Progress from "./Components/Progress/ProgressDesign";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Register from "./Components/Login/Register";
import Quiz from "./Components/Quiz/Quiz";
import { Route, Routes } from "react-router-dom";
import DownloadFile from "./Components/DownloadFile/DownloadFile";
import AddQuestion from "./Components/AddQuestion/AddQuestion";
import RegisterAdmin from "./Components/RegisterAdmin/RegisterAdmin";
import Profile from "./Components/Profile/Profile";
import DeleteQuestion from "./Components/DeleteQuestion/DeleteQuestion";

const App = () => {
  return (
    <div>
      <header className="app_header">
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Subjects" element={<Subjects />}></Route>
        <Route path="/Progress" element={<Progress />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/quiz" element={<Quiz />}></Route>
        <Route path="/add" element={<AddQuestion />}></Route>
        <Route path="/download" element={<DownloadFile />}></Route>
        <Route path="/deleteQuestion" element={<DeleteQuestion />}></Route>
        <Route path="/registerAdmin" element={<RegisterAdmin />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </div>
  );
};

export default App;

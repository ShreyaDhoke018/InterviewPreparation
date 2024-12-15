import React, { Children, useContext } from "react";
import { Link, useLocation, useMatch, useResolvedPath } from "react-router-dom";
import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "./../AuthContext/AuthContext";

const Navbar2 = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    // Log out and update context and localStorage
    setIsAuthenticated(false);
    localStorage.removeItem("isLoggedIn");
    // Call logout API or redirect
  };

  function CustomLink({ to, children }) {
    // useResolvedPath: resolves a given path relative to the current location
    const resolvedPath = useResolvedPath(to);
    // console.log("resolved path", resolvedPath);
    // useMatch : helps determine if route is active (when clicked on the link it becomes active)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    // console.log("isActive: ", isActive);
    // returns current location
    const location = useLocation();
    const isRegisterPage = location.pathname === "/register";
    const isQuizPage = location.pathname === "/quiz";
    const isProgressPage = location.pathname === "/progress";
    const isProfilePage = location.pathname === "/profile";
    const isAddPage = location.pathname === "/add";
    const isDowloadPage = location.pathname === "/download";
    const isDeletePage = location.pathname === "/deleteQuestion";
    const isRegisterAdminPage = location.pathname === "/registerAdmin";

    // Check if the link is for Login, and activate it if on register page
    let shouldBeActive;
    if (to === "/login" && isRegisterPage) {
      shouldBeActive = true;
    } else {
      shouldBeActive = isActive;
    }

    if (
      (to === "/Subjects" && isQuizPage) ||
      (to === "/Subjects" && isProfilePage) ||
      (to === "/Subjects" && isAddPage) ||
      (to === "/Subjects" && isDeletePage) ||
      (to === "/Subjects" && isProgressPage) ||
      (to === "/Subjects" && isProfilePage) ||
      (to === "/Subjects" && isDowloadPage) ||
      (to === "/Subjects" && isRegisterAdminPage)
    ) {
      shouldBeActive = true;
    } else {
      shouldBeActive = isActive;
    }

    // console.log(children);
    return (
      <li className={shouldBeActive ? "active" : ""}>
        <Link to={to}>{children}</Link>
      </li>
    );
  }

  return (
    <div className="navbar">
      <Navbar>
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/cropped_image.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            CareerClimb
          </Navbar.Brand>
        </Container>
      </Navbar>
      {/* <img className="website_logo" src="/cropped_image.png"></img> */}
      {/* <Link to="/ " className="website_name">
        CareerClimb
      </Link> */}

      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/About">About Us</CustomLink>
        <CustomLink to="/Subjects">Subjects</CustomLink>
        {/* <CustomLink to="/Progress">Progress</CustomLink> */}
        {isLoggedIn ? (
          <button onClick={logOut}>Logout</button> // Assuming `logOut` is your logout handler function
        ) : (
          <CustomLink to="/login">Login</CustomLink> // Call `CustomLink` for login
        )}
      </ul>
    </div>
  );
};

export default Navbar2;

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check localStorage on initial load
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setSuccess(loggedIn);
  }, []);

  return (
    <AuthContext.Provider value={{ success, setSuccess }}>
      {children}
    </AuthContext.Provider>
  );
};

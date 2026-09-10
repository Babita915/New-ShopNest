import React from "react";
import { Navigate } from "react-router-dom";
import Router from "./Router";

function App() {
  const token = localStorage.getItem("token");

  // Agar token nahi hai → Login
  if (!token) {
    return <Router />;
  }

  return <Router />;
}

export default App;
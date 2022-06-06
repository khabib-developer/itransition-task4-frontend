import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Loader from "./componenets/Loader";
import { SnackbarError, SnackbarSuccess } from "./componenets/snackBar";
import { Pages } from "./routes";

function App() {
  return (
    <Router>
      <Loader />
      <SnackbarError />
      <SnackbarSuccess />
      <Pages />
    </Router>
  );
}

export default App;

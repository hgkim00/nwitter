import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import firebase from "./firebase";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// <React.Strictmode>를 사용하면 두 번 렌더된다!!

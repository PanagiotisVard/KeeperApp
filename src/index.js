//We are importing React library in every file because this library is very important
import React from "react";
//What is ReactDOM and what is render??!!??!?!
import  ReactDOM from "react-dom"
//In order to "see" App.js we must import the file by hand.
import App from "./components/App"

ReactDOM.render(<App></App>, document.getElementById("root"))


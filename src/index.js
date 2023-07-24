//We are importing React library in every file because this library is very important
import React from "react";
//Importin ReactDOM to have access to its function.
import  ReactDOM from "react-dom"
//In order to "see" App.js we must import the file by hand.
import App from "./components/App"


//Using the render function from ReactDOM lib to render the elements(components) into the DOM 
ReactDOM.render(<App></App>, document.getElementById("root"))


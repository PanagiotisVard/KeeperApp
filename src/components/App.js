//We are importing React library in every file because this library is very important
import React from "react";
//Here we import Header.js file as "Header" to have access into the component Header.js file has
import Header from "./Header";
//Here we import Footer.js file as "Footer" to have access into the component Footer.js file has
import Footer from "./Footer"
//Here we import Note.js file as "Note" to have access into the component Note.js file has
import Note from "./Note"

const App = () => {
  //In order to use the <Header /> function we must import first.
  return (
    <div>
      <Header></Header>
      <Footer></Footer>
      <Note></Note>
    </div>
  );
};

//MUST HAVE AN EXPORT TO GIVE ACCESS IN OTHER FILES

export default App;
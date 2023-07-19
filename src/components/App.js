//We are importing React library in every file because this library is very important
import React from "react";
//Here we import Header.js file as "Header" to have access into the component Header.js file has
import Header from "./Header";
//Here we import Footer.js file as "Footer" to have access into the component Footer.js file has
import Footer from "./Footer";
//Here we import Note.js file as "Note" to have access into the component Note.js file has
import Note from "./Note";
import notes from "../notes";

//We created this function to create a Note for each object the notes.js file has.
//This function will be called by map() as many times as the number of our objects inside the  list
// function createNotes(noteItem) {
//   //we call the <Note/> function with 2 arguments. The title and the content of the Note.
//   return (
//     <Note
//       key={noteItem.key}
//       title={noteItem.title}
//       content={noteItem.content}
//     />
//   );
// }

const App = () => {
  //In order to use the <Header /> function we must import first.
  return (
    <div>
      <Header/>
      {/* We are scanning the list objects from the file notes.js by using map() function.
      and we give as an argument the function that we made above createNote() */}
      {notes.map((noteItem) => (
        <Note
          key={noteItem.key}
          title={noteItem.title}
          content={noteItem.content}
        />
      ))}
      <Footer/>
    </div>
  );
};

//MUST HAVE AN EXPORT TO GIVE ACCESS IN OTHER FILES
export default App;

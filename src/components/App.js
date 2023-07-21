//We are importing React library in every file because this library is very important
import React, { useState } from "react";
//Here we import Header.js file as "Header" to have access into the component Header.js
import Header from "./Header";
//Here we import Footer.js file as "Footer" to have access into the component Footer.js
import Footer from "./Footer";
//Here we import Note.js file as "Note" to have access into the component Note.js
import Note from "./Note";
//Here we import CreateArea.js file as "CreateArea" to have access into the component CreateArea.js
import CreateArea from "./CreateArea";

function App() {
  //In order to use the <Header />, <CreateArea/> <Note/> <Footer/> functions we must import them first.

  //creating the variable "notes" that is "connected" with the function setNotes
  //the initialized value of the variable is set on useState and it is set to : []
  //setNotes can be used to change the value of notes
  const [notes, setNotes] = useState([]);

  //addNote is used to add a new Note
  function addNote(newNote) {
    //changing the value of the "notes" variable by calling the function
    //setNotes. But in order to save the previous vars and add the new ones in the same list
    // we use the function prevNotes and return:
    //...prevNotes: All the previous notes that have been written
    //newNote: All the new notes
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  //deleteNote is used to delete a Note.
  //this function is similar to the addNote() function.
  function deleteNote(id) {
    setNotes((prevNotes) => {
      //filter the list of the previous notes and find a note with a specific index/id
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }
  // Component rendering.
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}
//MUST HAVE AN EXPORT TO GIVE ACCESS IN OTHER FILES
export default App;

//We are importing React library in every file because this library is very important
import React, { useEffect, useState } from "react";
//Here we import Header.js file as "Header" to have access into the component Header.js
import Header from "./Header";
//Here we import Footer.js file as "Footer" to have access into the component Footer.js
import Footer from "./Footer";
//Here we import Note.js file as "Note" to have access into the component Note.js
import Note from "./Note";
//Here we import CreateArea.js file as "CreateArea" to have access into the component CreateArea.js

import CreateArea from "./CreateArea";
import Axios from "axios";

function App() {
  //In order to use the <Header />, <CreateArea/> <Note/> <Footer/> functions we must import them first.

  //creating the variable "notes" that is "connected" with the function setNotes
  //the initialized value of the variable is set on useState and it is set to : []
  //setNotes can be used to change the value of notes
  const [notes, setNotes] = useState([]);
  const [noteForDeletion, setNoteForDeletion] = useState(null);
  const [loading, setLoading] = useState(false);

  // console.log("note for deletion has the value: "+noteForDeletion)
  async function fetchNotes() {
    const dbnotes = await Axios.get("http://localhost:1337/api/notes");
    const newNotes = [];

    dbnotes.data.data.forEach((note) => {
      newNotes.push({
        title: note.attributes.title,
        content: note.attributes.content,
        id: note.id,
      });
    });

    setNotes(newNotes);
  }
  // console.log(notes)
  useEffect(() => {
    if (noteForDeletion !== null) return;
    fetchNotes();
  }, [noteForDeletion]);

  console.log(notes);

  //addNote is used to add a new Note
  async function addNotesFromAPI(newNote) {
    setLoading(true);

    const data = {
      data: {
        title: newNote.title,
        content: newNote.content,
      },
    };

    try {
      const response = await Axios.post(
        "http://localhost:1337/api/notes",
        data
      );
      const newNoteData = {
        title: response.data.data.attributes.title,
        content: response.data.data.attributes.content,
        id: response.data.data.id,
      };

      setNotes((prevNotes) => {
        return [...prevNotes, newNoteData];
      });
    } catch (error) {
      console.log("Error adding note: ", error);
    }
    setLoading(false);
  }

  //deleteNote is used to delete a Note.
  //this function is similar to the addNote() function.
  async function deleteNote(id) {
    setLoading(true);

    setNoteForDeletion(id);
    try {
      await Axios.delete(`http://localhost:1337/api/notes/${id}`);

      setNotes((prevNotes) => {
        //filter the list of the previous notes and find a note with a specific index/id
        return prevNotes.filter((noteItem) => noteItem.id !== id);
      });
    } catch (error) {
      console.log("Error found: ", error);
    }
    setLoading(false);
  }

  // Component rendering.
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNotesFromAPI} />
      {notes.map((noteItem, index) => {
        {
          /* {
          console.log(noteItem);
        } */
        }
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={() => deleteNote(noteItem.id)}
          />
        );
      })}
      <Footer />
    </div>
  );
}
//MUST HAVE AN EXPORT TO GIVE ACCESS IN OTHER FILES
export default App;

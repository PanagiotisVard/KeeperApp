import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Axios from "axios";
import io from "socket.io-client";

const socket = io.connect("http://192.168.1.158:3001");

function App() {
  const [notes, setNotes] = useState([]);
  const [noteForDeletion, setNoteForDeletion] = useState(null);
  const [loading, setLoading] = useState(false);
  

  async function fetchNotes() {
    const dbnotes = await Axios.get("http://192.168.1.158:1337/api/notes");
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

  useEffect(() => {
    if (noteForDeletion !== null) return;
  
    socket.on("receive_note", (data) => {
      // console.log("Received data:", data);
      setNotes((prevNotes) => {
        return [...prevNotes, data];
      });
    });
  
    fetchNotes();
  }, [socket]);
  

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
        "http://192.168.1.158:1337/api/notes",
        data
      );
      const newNoteData = {
        title: response.data.data.attributes.title,
        content: response.data.data.attributes.content,
        id: response.data.data.id,
      };
      //new line
      socket.emit("add_note", data);
      // console.log(newNoteData);
      
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
      await Axios.delete(`http://192.168.1.158:1337/api/notes/${id}`);

      setNotes((prevNotes) => {
        //filter the list of the previous notes and find a note with a specific index/id
        return prevNotes.filter((noteItem) => noteItem.id !== id);
      });

      // socket.emit("receivedel_note", notes);


      setNoteForDeletion(null);
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
      {loading ? (
        <div className="loading-container">
          <div className="loading-text">Loading...</div>
        </div>
      ) : (
        notes.map((noteItem) => (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={() => deleteNote(noteItem.id)}
            // onEdit={() => handleEdit(noteItem.id)} // Pass the handleEdit function
          />
        ))
      )}
      <Footer />
    </div>
  );
}

export default App;
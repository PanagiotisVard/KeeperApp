//We are importing React library in every file because this library is very important
import React from "react";

//This function is being called to create a Note.The "props" argument
//helps us to have access in data from other files.
function Note(props) {


  function handleClick() {
    props.onDelete(props.id)
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Note;

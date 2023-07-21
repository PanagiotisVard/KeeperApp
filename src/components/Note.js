//We are importing React library in every file because this library is very important
import React from "react";

//This function is being called to create a Note.The "props" argument
//helps us to have access in data from other files.
function Note(props) {

  //handleClick() function is used to delete the notes by their id
  function handleClick() {
    //Via the "props" argument we have access to the id of our note.
    props.onDelete(props.id);
  }

  return (
    <div className="note">
    {/* props.title & props.content is used to get the title and 
    the content of a specific note dynamically */}
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      {/* Inside the button tag we set the argument onClick
      to give functionability to our button if it is pressed */}
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

//EXPORT IS IMPORTANT!!
export default Note;

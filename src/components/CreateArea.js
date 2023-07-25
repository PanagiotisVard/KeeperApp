// Importing React and the 'useState' hook from the 'react' library.
import React, { useState } from "react";

// CreateArea component definition.
function CreateArea(props) {
  // Using the 'useState' hook to initialize the 'note' state variable with an object containing 'title' and 'content'.
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  // Event handler function that updates the 'note' state when the user types in the input fields.
  function handleChange(event) {
    const { name, value } = event.target;

    // Using the functional form of 'setState' provided by the 'useState' hook.
    // Updating 'note' state by creating a new object and merging the previous state with the updated property (title or content).
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }
  // Event handler function to submit the form and add the note to the parent component via the 'onAdd' prop.
  function submitNote(event) {
    // Calling the 'onAdd' prop function and passing the current 'note' state as an argument.
    props.onAdd(note);
    // Resetting the 'note' state to an empty object after adding the note.
    setNote({
      title: "",
      content: "",
    });
    // Preventing the default form submission behavior that could cause a page reload.
    event.preventDefault();
  }

  // Component rendering.
  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}
// Exporting the CreateArea component to be used in other parts of the application.
export default CreateArea;
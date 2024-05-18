import React from "react";
import "../styles/Note.css"

function Note({ note, onDelete }) {
    //gives only the dat that the note was created
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        //rendering the container
        <div className="note-container">
            <p className="note-title">{note.title}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
        </div>
    );
}

export default Note
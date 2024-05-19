import React from "react";
import "../styles/Note.css"


function Note({ note, onDelete, onEdit }) {
    //gives only the dat that the note was created
    
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        //rendering the container
        <div /*classNameName="note-container"*/>
          {/*  <p classNameName="note-title">{note.title}</p>
            <p classNameName="note-content">{note.content}</p>
            <p classNameName="note-date">{formattedDate}</p>
            <button classNameName="delete-button" onClick={() => onDelete(note.id)}>
                Delete
    </button> */}


            
            <div className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                    <span className="font-light text-gray-600">{formattedDate}</span>
                    
                </div>
                <div className="mt-2">
                    <a className="text-2xl text-gray-700 font-bold hover:text-gray-600" href="#">{note.title}</a>
                    <p className="mt-2 text-gray-600">{note.content}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                <button className="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    data-ripple-light="true" onClick={() => onDelete(note.id)}>Delete</button>
                <button className="middle none center rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    data-ripple-light="true" onClick={() => onEdit(note.id)}>Edit</button>

                    <div>
                        <a className="flex items-center" href="#">
                            <img className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80" alt="avatar"/>
                            <h1 className="text-gray-700 font-bold">a</h1>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Note
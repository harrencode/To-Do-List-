import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
    
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [editNote, setEditNote] = useState(null);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api.get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api.post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) { 
                    alert("Note created!");
                    setTitle("");
                    setContent("");
                    

                }

                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    const editNoteHandler = (note) => {
       
        setEditNote(note);
        setTitle(note.title);
        setContent(note.content);
    };

    const handleCancel = () => {
        setEditNote(null);
        setTitle("");
        setContent("");
    };

    const updateNote = (e) => {
        e.preventDefault();
        alert(editNote)
        if (!editNote || !editNote.id) {
            console.error("Invalid note data for update.");
            alert("Invalid note data for update.")
            return;
        }
        api.patch(`/api/notes/edit/${editNote.id}/`, { title, content })
            .then((res) => {
                if (res.status === 200) {
                    alert("Note updated!");
                    setEditNote(null);
                    setTitle("");
                    setContent("");


            }
                else alert("Failed to update note.");
                
                
                getNotes();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                <img
                    src="https://ojen.ca/wp-content/uploads/2018/11/Annual-report-notebook-header.png"
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
                />
                <div
                    className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>
                <div
                    className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">
                            To Do List App by Harendra
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-black-300">
                            You can Add notes about upcoming work below here. Adding time and date feature manually will be added soon.
                        </p>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {editNote ? "Edit Note" : "Create a Note"}
            </h2>
            <form onSubmit={editNote ? updateNote : createNote}>
                <label htmlFor="title">Work:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Description:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value={editNote ? "Update" : "Submit"} />
                    {editNote && (
                        <button onClick={() => handleCancel()} type="button">
                            Cancel
                        </button>
                    )}
            </form>

            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} onEdit={editNoteHandler} key={note.id} />
                ))}
            </div>
        </div>
    );
}

export default Home;

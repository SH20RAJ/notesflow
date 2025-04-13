"use client";

import { useState, useEffect } from "react";

export default function Home() {
  // State for notes
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [activeNoteContent, setActiveNoteContent] = useState("");
  const [activeNoteTitle, setActiveNoteTitle] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Load notes from localStorage on initial render
  useEffect(() => {
    // Check for dark mode preference
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
    }

    // Load notes
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setNotes(parsedNotes);

      // Set active note to the most recently edited note if available
      if (parsedNotes.length > 0) {
        const sortedNotes = [...parsedNotes].sort((a, b) => new Date(b.lastEdited) - new Date(a.lastEdited));
        setActiveNote(sortedNotes[0].id);
        setActiveNoteTitle(sortedNotes[0].title);
        setActiveNoteContent(sortedNotes[0].content);
      }
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Create a new note
  const createNewNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content: "",
      created: new Date().toISOString(),
      lastEdited: new Date().toISOString(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
    setActiveNoteTitle(newNote.title);
    setActiveNoteContent(newNote.content);
  };

  // Update the active note
  const updateNote = () => {
    if (!activeNote) return;

    const updatedNotes = notes.map(note => {
      if (note.id === activeNote) {
        return {
          ...note,
          title: activeNoteTitle,
          content: activeNoteContent,
          lastEdited: new Date().toISOString(),
        };
      }
      return note;
    });

    setNotes(updatedNotes);
  };

  // Handle note selection
  const selectNote = (noteId) => {
    // Save current note before switching
    if (activeNote) {
      updateNote();
    }

    const selectedNote = notes.find(note => note.id === noteId);
    if (selectedNote) {
      setActiveNote(selectedNote.id);
      setActiveNoteTitle(selectedNote.title);
      setActiveNoteContent(selectedNote.content);
    }
  };

  // Delete a note
  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);

    // If the active note is deleted, set the first note as active or clear if no notes left
    if (activeNote === noteId) {
      if (updatedNotes.length > 0) {
        setActiveNote(updatedNotes[0].id);
        setActiveNoteTitle(updatedNotes[0].title);
        setActiveNoteContent(updatedNotes[0].content);
      } else {
        setActiveNote(null);
        setActiveNoteTitle("");
        setActiveNoteContent("");
      }
    }
  };

  // Export notes as JSON
  const exportNotes = () => {
    const dataStr = JSON.stringify(notes, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;

    const exportFileDefaultName = `NotesFlow-backup-${new Date().toISOString().slice(0, 10)}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  // Import notes from JSON
  const importNotes = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedNotes = JSON.parse(e.target.result);
        if (Array.isArray(importedNotes)) {
          // Merge with existing notes, avoiding duplicates by ID
          const existingIds = new Set(notes.map(note => note.id));
          const newNotes = importedNotes.filter(note => !existingIds.has(note.id));
          const mergedNotes = [...notes, ...newNotes];

          setNotes(mergedNotes);

          if (mergedNotes.length > 0 && !activeNote) {
            setActiveNote(mergedNotes[0].id);
            setActiveNoteTitle(mergedNotes[0].title);
            setActiveNoteContent(mergedNotes[0].content);
          }

          alert(`Successfully imported ${newNotes.length} new notes.`);
        } else {
          alert("Invalid file format. Please import a valid JSON file.");
        }
      } catch (error) {
        alert("Error importing notes: " + error.message);
      }
    };
    reader.readAsText(file);

    // Reset the file input
    event.target.value = null;
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      {/* Header */}
      <header className={`p-4 flex justify-between items-center border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h1 className="text-2xl font-bold">NotesFlow</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? "🌙" : "☀️"}
          </button>

          <div className="relative">
            <input
              type="file"
              id="import-file"
              accept=".json"
              onChange={importNotes}
              className="hidden"
            />
            <button
              onClick={() => document.getElementById('import-file').click()}
              className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Import
            </button>
          </div>

          <button
            onClick={exportNotes}
            className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Export
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`w-64 border-r ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'} flex flex-col`}>
          <div className="p-4">
            <button
              onClick={createNewNote}
              className={`w-full py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium`}
            >
              + New Note
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {notes.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notes yet. Create your first note!
              </div>
            ) : (
              <ul>
                {notes.map(note => (
                  <li
                    key={note.id}
                    className={`p-3 border-b cursor-pointer flex justify-between items-start ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-200'} ${activeNote === note.id ? (darkMode ? 'bg-gray-700' : 'bg-gray-300') : ''}`}
                    onClick={() => selectNote(note.id)}
                  >
                    <div>
                      <div className="font-medium truncate">{note.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(note.lastEdited)}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm("Are you sure you want to delete this note?")) {
                          deleteNote(note.id);
                        }
                      }}
                      className={`text-sm ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'}`}
                    >
                      🗑️
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {activeNote ? (
            <>
              <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <input
                  type="text"
                  value={activeNoteTitle}
                  onChange={(e) => setActiveNoteTitle(e.target.value)}
                  onBlur={updateNote}
                  className={`w-full text-xl font-semibold outline-none ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}
                  placeholder="Note title"
                />
              </div>
              <div className="flex-1 p-4 overflow-auto">
                <textarea
                  value={activeNoteContent}
                  onChange={(e) => setActiveNoteContent(e.target.value)}
                  onBlur={updateNote}
                  className={`w-full h-full outline-none resize-none ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}
                  placeholder="Start typing your note here..."
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <p className="text-xl">Select a note or create a new one</p>
                <button
                  onClick={createNewNote}
                  className={`mt-4 px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium`}
                >
                  Create New Note
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className={`p-3 text-center text-sm ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
        <p>NotesFlow - Your notes are stored locally for complete privacy</p>
        <p className="text-xs mt-1">
          <span className="text-blue-500 cursor-pointer">Cross-Device Sync</span> coming soon!
        </p>
      </footer>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

// Import the RichTextEditor component with dynamic loading to avoid SSR issues
const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  ssr: false,
  loading: () => <div className="flex-1 p-4 animate-pulse bg-gray-100 dark:bg-gray-800"></div>
});

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

  // Auto-save note when content changes
  useEffect(() => {
    if (activeNote) {
      const timeoutId = setTimeout(() => {
        updateNote();
      }, 1000); // Debounce save for 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [activeNoteContent, activeNoteTitle]);

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

  // Download note as txt or md
  const downloadNote = (format) => {
    if (!activeNote) return;

    let content = '';
    let extension = '';
    let mimeType = '';

    // Find the current note
    const note = notes.find(n => n.id === activeNote);
    if (!note) return;

    if (format === 'txt') {
      // For TXT, we'll strip HTML tags
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = note.content;
      content = `${note.title}\n\n${tempDiv.textContent || ''}`;
      extension = 'txt';
      mimeType = 'text/plain';
    } else if (format === 'md') {
      // For MD, we'll use a simple HTML to Markdown conversion
      // This is a very basic conversion - in a real app you'd use a proper HTML to Markdown converter
      let markdown = note.content
        .replace(/<h1>(.*?)<\/h1>/g, '# $1\n')
        .replace(/<h2>(.*?)<\/h2>/g, '## $1\n')
        .replace(/<h3>(.*?)<\/h3>/g, '### $1\n')
        .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
        .replace(/<em>(.*?)<\/em>/g, '*$1*')
        .replace(/<del>(.*?)<\/del>/g, '~~$1~~')
        .replace(/<code>(.*?)<\/code>/g, '`$1`')
        .replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)')
        .replace(/<blockquote>(.*?)<\/blockquote>/gs, '> $1\n')
        .replace(/<p>(.*?)<\/p>/g, '$1\n\n')
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/<ul>(.*?)<\/ul>/gs, function(match, p1) {
          return p1.replace(/<li>(.*?)<\/li>/g, '- $1\n');
        })
        .replace(/<ol>(.*?)<\/ol>/gs, function(match, p1) {
          let index = 1;
          return p1.replace(/<li>(.*?)<\/li>/g, function(match, p1) {
            return `${index++}. ${p1}\n`;
          });
        })
        .replace(/<[^>]*>/g, ''); // Remove any remaining HTML tags

      content = `# ${note.title}\n\n${markdown}`;
      extension = 'md';
      mimeType = 'text/markdown';
    }

    // Create a download link
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const filename = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${extension}`;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'bg-gradient-to-br from-white to-gray-50 text-gray-800'}`}>
      {/* Header */}
      <header className={`p-3 md:p-4 flex justify-between items-center ${darkMode ? 'bg-gray-900/50 backdrop-blur-md' : 'bg-white/50 backdrop-blur-md'} shadow-sm`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <span className="text-white text-lg font-bold">N</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">NoteSOP</h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* Sidebar */}
        <aside className={`md:w-64 ${darkMode ? 'bg-gray-900/80' : 'bg-white/80'} flex flex-col ${activeNote ? 'hidden md:flex' : 'flex'} backdrop-blur-sm shadow-lg z-10`}>
          <div className="p-3">
            <button
              onClick={createNewNote}
              className={`w-full py-2 px-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium shadow-md transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Note</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3">
            {notes.length === 0 ? (
              <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center h-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg font-medium">No notes yet</p>
                <p className="text-sm">Create your first note to get started!</p>
              </div>
            ) : (
              <ul className="space-y-2 py-3">
                {notes.map(note => (
                  <li
                    key={note.id}
                    className={`p-3 rounded-xl cursor-pointer transition-all duration-200 flex justify-between items-start ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} ${activeNote === note.id ? (darkMode ? 'bg-gray-800 shadow-md border-l-4 border-indigo-500' : 'bg-indigo-50 shadow-md border-l-4 border-indigo-500') : ''}`}
                    onClick={() => selectNote(note.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate text-base">{note.title}</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-1 mt-1`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
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
                      className={`ml-2 p-1.5 rounded-full transition-colors ${darkMode ? 'text-gray-400 hover:bg-red-900/30 hover:text-red-400' : 'text-gray-500 hover:bg-red-100 hover:text-red-500'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Sidebar Footer with Controls */}
          <div className={`p-3 ${darkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-sm border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-yellow-300' : 'bg-gray-100 hover:bg-gray-200 text-indigo-600'} shadow-sm flex items-center gap-1.5 text-xs w-full`}
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? "🌙" : "☀️"}
                <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
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
                  className={`w-full py-1.5 px-2 rounded-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} shadow-sm flex items-center justify-center gap-1 text-xs`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                  </svg>
                  <span>Import</span>
                </button>
              </div>

              <button
                onClick={exportNotes}
                className={`py-1.5 px-2 rounded-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} shadow-sm flex items-center justify-center gap-1 text-xs`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Export</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className={`flex-1 flex flex-col overflow-hidden ${activeNote ? 'flex' : 'hidden md:flex'} ${darkMode ? 'bg-gray-900/30' : 'bg-white/30'} backdrop-blur-sm`}>
          {/* Mobile back button */}
          {activeNote && (
            <div className={`md:hidden p-3 ${darkMode ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-md shadow-sm`}>
              <button
                onClick={() => setActiveNote(null)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} shadow-md flex items-center gap-2`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Notes
              </button>
            </div>
          )}
          {activeNote ? (
            <>
              <div className={`p-4 ${darkMode ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-md shadow-sm flex justify-between items-center`}>
                <input
                  type="text"
                  value={activeNoteTitle}
                  onChange={(e) => setActiveNoteTitle(e.target.value)}
                  onBlur={updateNote}
                  className={`flex-1 text-xl font-semibold outline-none transition-all duration-300 border-b-2 border-transparent focus:border-indigo-500 pb-1 ${darkMode ? 'bg-transparent text-white' : 'bg-transparent text-gray-800'}`}
                  placeholder="Note title"
                />
                <div className="flex items-center gap-2 ml-2">
                  <button
                    onClick={() => downloadNote('txt')}
                    className={`p-1.5 rounded-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} shadow-sm flex items-center justify-center`}
                    title="Download as TXT"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="text-xs ml-1">.txt</span>
                  </button>
                  <button
                    onClick={() => downloadNote('md')}
                    className={`p-1.5 rounded-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} shadow-sm flex items-center justify-center`}
                    title="Download as Markdown"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="text-xs ml-1">.md</span>
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-hidden p-1 md:p-3">
                <div className={`h-full rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-sm`}>
                  <RichTextEditor
                    content={activeNoteContent}
                    onChange={(newContent) => setActiveNoteContent(newContent)}
                    placeholder="Start typing your note here..."
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-blue-500/5 backdrop-blur-sm shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto mb-6 text-indigo-500 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">Welcome to NoteSOP</h2>
                <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">Select a note or create a new one to get started</p>
                <button
                  onClick={createNewNote}
                  className={`px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium shadow-md transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 mx-auto`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create New Note
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className={`py-4 px-6 text-center ${darkMode ? 'bg-gray-900/70 text-gray-400' : 'bg-white/70 text-gray-600'} backdrop-blur-md shadow-inner`}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-bold">N</span>
            </div>
            <p className="font-medium">NoteSOP - Your notes are stored locally for complete privacy</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
              <span className="text-indigo-500 font-bold">✨ Cross-Device Sync</span> coming soon!
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

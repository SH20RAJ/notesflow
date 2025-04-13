"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { useCallback, useEffect, useState } from 'react';

const lowlight = createLowlight(common);

const MenuBar = ({ editor, darkMode }) => {
  if (!editor) {
    return null;
  }

  const buttonClass = `p-1.5 rounded-lg transition-all duration-200 ${darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`;
  const activeButtonClass = `p-1.5 rounded-lg transition-all duration-200 ${darkMode ? 'bg-gray-800 text-indigo-400' : 'bg-indigo-50 text-indigo-700'} shadow-sm`;

  const addImage = useCallback(() => {
    const url = window.prompt('Enter the URL of the image:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter the URL:', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className={`flex flex-wrap gap-1 p-2 ${darkMode ? 'bg-gray-900/70' : 'bg-white/70'} backdrop-blur-sm shadow-sm border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="flex items-center gap-1 mr-1">
        <div className={`h-6 px-2 rounded-md ${darkMode ? 'bg-indigo-900/30 text-indigo-300' : 'bg-indigo-50 text-indigo-700'} text-xs font-medium flex items-center`}>
          Format
        </div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? activeButtonClass : buttonClass}
          title="Bold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
            <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? activeButtonClass : buttonClass}
          title="Italic"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="4" x2="10" y2="4"></line>
            <line x1="14" y1="20" x2="5" y2="20"></line>
            <line x1="15" y1="4" x2="9" y2="20"></line>
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? activeButtonClass : buttonClass}
          title="Strikethrough"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <path d="M16 6c-.5-1.8-2.1-3-4-3-2.2 0-4 1.8-4 4 0 1.5.8 2.8 2 3.4"></path>
            <path d="M8 18c.5 1.8 2.1 3 4 3 2.2 0 4-1.8 4-4 0-1.5-.8-2.8-2-3.4"></path>
          </svg>
        </button>
      </div>

      <div className={`h-6 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} mx-1`}></div>

      <div className="flex items-center gap-1 mr-1">
        <div className={`h-6 px-2 rounded-md ${darkMode ? 'bg-indigo-900/30 text-indigo-300' : 'bg-indigo-50 text-indigo-700'} text-xs font-medium flex items-center`}>
          Heading
        </div>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? activeButtonClass : buttonClass}
          title="Heading 1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12h16"></path>
            <path d="M4 18h16"></path>
            <path d="M4 6h16"></path>
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? activeButtonClass : buttonClass}
          title="Heading 2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9h12"></path>
            <path d="M6 15h12"></path>
            <path d="M6 4h12"></path>
            <path d="M6 20h12"></path>
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? activeButtonClass : buttonClass}
          title="Heading 3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 10h12"></path>
            <path d="M6 14h12"></path>
            <path d="M6 18h12"></path>
            <path d="M6 6h12"></path>
          </svg>
        </button>
      </div>

      <div className={`h-6 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} mx-1`}></div>

      <div className="flex items-center gap-1 mr-1">
        <div className={`h-6 px-2 rounded-md ${darkMode ? 'bg-indigo-900/30 text-indigo-300' : 'bg-indigo-50 text-indigo-700'} text-xs font-medium flex items-center`}>
          Lists
        </div>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? activeButtonClass : buttonClass}
          title="Bullet List"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? activeButtonClass : buttonClass}
          title="Numbered List"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="10" y1="6" x2="21" y2="6"></line>
            <line x1="10" y1="12" x2="21" y2="12"></line>
            <line x1="10" y1="18" x2="21" y2="18"></line>
            <path d="M4 6h1v4"></path>
            <path d="M4 10h2"></path>
            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
          </svg>
        </button>
      </div>

      <div className={`h-6 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} mx-1`}></div>

      <div className="flex items-center gap-1 mr-1">
        <div className={`h-6 px-2 rounded-md ${darkMode ? 'bg-indigo-900/30 text-indigo-300' : 'bg-indigo-50 text-indigo-700'} text-xs font-medium flex items-center`}>
          Insert
        </div>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? activeButtonClass : buttonClass}
          title="Code Block"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? activeButtonClass : buttonClass}
          title="Quote"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
          </svg>
        </button>
        <button
          onClick={setLink}
          className={editor.isActive('link') ? activeButtonClass : buttonClass}
          title="Link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </button>
        <button
          onClick={addImage}
          className={buttonClass}
          title="Image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        </button>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={buttonClass}
          title="Undo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7v6h6"></path>
            <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path>
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={buttonClass}
          title="Redo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 7v6h-6"></path>
            <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function RichTextEditor({ content, onChange, placeholder, darkMode }) {
  const [isMarkdownMode, setIsMarkdownMode] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Start typing your note here...',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);

      // When in rich text mode and content changes, update markdown content
      if (!isMarkdownMode) {
        // This is a simple conversion - in a real app you might want a more sophisticated HTML to Markdown converter
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        setMarkdownContent(tempDiv.textContent || '');
      }
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none max-w-none ${darkMode ? 'prose-invert' : ''}`,
      },
    },
  });

  // Update content when it changes externally
  useEffect(() => {
    if (editor && content !== editor.getHTML() && !isMarkdownMode) {
      editor.commands.setContent(content || '');
    }
  }, [content, editor, isMarkdownMode]);

  // Handle markdown content changes
  const handleMarkdownChange = (e) => {
    const newMarkdown = e.target.value;
    setMarkdownContent(newMarkdown);
    onChange(newMarkdown);
  };

  // When switching between modes
  useEffect(() => {
    if (isMarkdownMode) {
      // When switching to markdown mode, initialize with current content
      if (editor) {
        const html = editor.getHTML();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        setMarkdownContent(tempDiv.textContent || '');
      }
    } else {
      // When switching to rich text mode, convert markdown to HTML
      if (editor && markdownContent) {
        editor.commands.setContent(markdownContent);
      }
    }
  }, [isMarkdownMode, editor]);

  return (
    <div className={`flex flex-col h-full rounded-xl overflow-hidden ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <MenuBar
        editor={editor}
        darkMode={darkMode}
        isMarkdownMode={isMarkdownMode}
        setIsMarkdownMode={setIsMarkdownMode}
      />
      <div className="flex-1 overflow-auto">
        {isMarkdownMode ? (
          <div className={`h-full p-4 ${darkMode ? 'bg-gray-900/70' : 'bg-white/70'} backdrop-blur-sm`}>
            <textarea
              value={markdownContent}
              onChange={handleMarkdownChange}
              className={`w-full h-full outline-none resize-none font-mono rounded-lg p-4 ${darkMode ? 'bg-gray-800/50 text-white' : 'bg-gray-50/50 text-gray-800'} backdrop-blur-sm shadow-inner`}
              placeholder="Write in Markdown format..."
            />
          </div>
        ) : (
          <div className={`h-full ${darkMode ? 'bg-gray-900/70' : 'bg-white/70'} backdrop-blur-sm p-4`}>
            <EditorContent editor={editor} className="h-full" />
          </div>
        )}
      </div>
    </div>
  );
}

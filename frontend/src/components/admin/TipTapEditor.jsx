import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Undo, 
  Redo,
  RemoveFormatting
} from 'lucide-react';

export default function TipTapEditor({ content, onChange, placeholder = 'Write your publication content here...' }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3]
        }
      })
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[280px] p-5 text-slate-900 text-sm sm:text-base leading-relaxed bg-white'
      }
    }
  });

  // Keep content in sync if changed externally
  React.useEffect(() => {
    if (editor && content !== undefined && editor.getHTML() !== content) {
      editor.commands.setContent(content || '', false);
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 text-slate-500 text-sm">
        Initializing TipTap editor...
      </div>
    );
  }

  const btnClass = (isActive) =>
    `px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
      isActive
        ? 'bg-slate-900 text-white font-bold shadow-sm'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
    }`;

  return (
    <div className="border border-slate-300 rounded-xl overflow-hidden bg-white shadow-sm focus-within:border-slate-900 transition-colors">
      {/* High-Contrast Crisp Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-100 border-b border-slate-200 text-slate-700">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive('bold'))}
          title="Bold"
        >
          <Bold className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Bold</span>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive('italic'))}
          title="Italic"
        >
          <Italic className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Italic</span>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={btnClass(editor.isActive('strike'))}
          title="Strikethrough"
        >
          <Strikethrough className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={btnClass(editor.isActive('heading', { level: 2 }))}
          title="Heading 2"
        >
          <Heading2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">H2</span>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={btnClass(editor.isActive('heading', { level: 3 }))}
          title="Heading 3"
        >
          <Heading3 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">H3</span>
        </button>

        <div className="w-px h-4 bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnClass(editor.isActive('bulletList'))}
          title="Bullet List"
        >
          <List className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btnClass(editor.isActive('orderedList'))}
          title="Numbered List"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={btnClass(editor.isActive('blockquote'))}
          title="Blockquote"
        >
          <Quote className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={btnClass(editor.isActive('codeBlock'))}
          title="Code Block"
        >
          <Code className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          className={btnClass(false)}
          title="Clear formatting"
        >
          <RemoveFormatting className="w-3.5 h-3.5" />
        </button>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-1.5 rounded text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
            title="Undo"
          >
            <Undo className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-1.5 rounded text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
            title="Redo"
          >
            <Redo className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* TipTap Document Workspace */}
      <div className="bg-white min-h-[280px]">
        <EditorContent editor={editor} />
      </div>

      {/* Editor Status bar */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 text-[11px] font-mono text-slate-500 flex justify-between items-center">
        <span>TipTap Engine Active</span>
        <span>HTML Storage Mode</span>
      </div>
    </div>
  );
}

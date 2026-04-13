import { Bold, Italic, Strikethrough, List, ListOrdered, Quote, Heading1, Heading2, Heading3, Code, FileCode, Minus, Redo, Undo } from 'lucide-react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';

declare module '@tiptap/core' {
  interface Storage {
    markdown: {
      getMarkdown: () => string;
    };
  }
}

export const MarkdownEditor = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Markdown],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[150px] p-3 text-sm text-slate-800'
      }
    },
    onUpdate: ({ editor }) => {
      onChange(editor.storage.markdown.getMarkdown());
    }
  });

  if (!editor) return null;

  return (
    <div className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-2 py-1">
        <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} isActive={false} disabled={!editor.can().undo()} icon={<Undo size={16} />} title="실행 취소 ctrl+z" />
        <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} isActive={false} disabled={!editor.can().redo()} icon={<Redo size={16} />} title="다시 실행 ctrl+y" />

        <div className="mx-1 h-4 w-px bg-slate-300" />

        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} icon={<Heading1 size={16} />} title="제목 1 #" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} icon={<Heading2 size={16} />} title="제목 2 ##" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} icon={<Heading3 size={16} />} title="제목 3 ### " />

        <div className="mx-1 h-4 w-px bg-slate-300" />

        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} icon={<Bold size={16} />} title="굵게 ctrl+b" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} icon={<Italic size={16} />} title="기울임꼴 ctrl+i" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} icon={<Strikethrough size={16} />} title="취소선 ctrl+shift+5" />

        <div className="mx-1 h-4 w-px bg-slate-300" />

        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} icon={<List size={16} />} title="글머리 기호 *" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} icon={<ListOrdered size={16} />} title="번호 매기기 1." />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} icon={<Quote size={16} />} title="인용구 >" />

        <div className="mx-1 h-4 w-px bg-slate-300" />

        <ToolbarBtn onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')} icon={<Code size={16} />} title="인라인 코드 `code`" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} icon={<FileCode size={16} />} title="코드 블록 ```" />

        <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} isActive={false} icon={<Minus size={16} />} title="구분선 ---" />
      </div>
      <EditorContent editor={editor} className="cursor-text" onClick={() => editor.chain().focus().run()} />
    </div>
  );
};

const ToolbarBtn = ({ onClick, isActive, icon, title, disabled }: { onClick: () => void; isActive: boolean; icon: React.ReactNode; title: string; disabled?: boolean }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    disabled={disabled}
    className={`rounded p-1.5 transition-colors ${isActive ? 'bg-slate-200 text-blue-600' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
  >
    {icon}
  </button>
);

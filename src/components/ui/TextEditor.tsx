import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { cn } from "@/lib/utils/common";
import { UndoIcon } from "@/icon/UndoIcon";
import { RedoIcon } from "@/icon/RedoIcon";
import { AlignLeftIcon } from "@/icon/AlignLeftIcon";
import { ChevronDownIcon } from "@/icon/ChevronDownIcon";
import { BoldIcon } from "@/icon/BoldIcon";
import { ItalicIcon } from "@/icon/ItalicIcon";
import { UnderlineIcon } from "@/icon/UnderlineIcon";
import { StrikethroughIcon } from "@/icon/StrikethroughIcon";
import { BulletListIcon } from "@/icon/BulletListIcon";
import { NumberedListIcon } from "@/icon/NumberedListIcon";
import { LinkIcon } from "@/icon/LinkIcon";
import { ImageIcon } from "@/icon/ImageIcon";

interface TextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function TextEditor({
  value = "",
  onChange,
  className,
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded",
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-[200px] px-4 pt-3 pb-4",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  // Cleanup
  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  const handleInsertLink = () => {
    const url = window.prompt("Enter URL:");
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const handleInsertImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div
      className={cn(
        "bg-white border border-[#cfd6de] rounded-md overflow-hidden relative h-full flex flex-col",
        className
      )}
    >
      {/* Menu Bar */}
      <div className="border-b border-[#cfd6de] flex gap-2 items-start p-2 shrink-0">
        {/* History Group */}
        <div className="flex gap-0.5">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="flex items-center justify-center h-7 px-1 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Undo"
          >
            <UndoIcon classes="text-[#021337]" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="flex items-center justify-center h-7 px-1 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Redo"
          >
            <RedoIcon classes="text-[#021337]" />
          </button>
        </div>

        {/* Text Align Dropdown */}
        <div className="flex gap-0.5">
          <button
            className="flex items-center justify-center h-7 pl-2 pr-1 rounded hover:bg-gray-100 transition-colors"
            title="Text Alignment"
          >
            <AlignLeftIcon classes="text-[#021337]" />
            <ChevronDownIcon classes="text-[#021337]" />
          </button>
        </div>

        {/* Format Group */}
        <div className="flex gap-0.5">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              "flex items-center justify-center h-7 px-1 rounded hover:bg-gray-100 transition-colors",
              editor.isActive("bold") && "bg-gray-200"
            )}
            title="Bold"
          >
            <BoldIcon classes="text-[#021337]" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              "flex items-center justify-center h-7 px-1 rounded hover:bg-gray-100 transition-colors",
              editor.isActive("italic") && "bg-gray-200"
            )}
            title="Italic"
          >
            <ItalicIcon classes="text-[#021337]" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn(
              "flex items-center justify-center h-7 px-1 rounded hover:bg-gray-100 transition-colors",
              editor.isActive("underline") && "bg-gray-200"
            )}
            title="Underline"
          >
            <UnderlineIcon classes="text-[#021337]" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={cn(
              "flex items-center justify-center h-7 px-1 rounded hover:bg-gray-100 transition-colors",
              editor.isActive("strike") && "bg-gray-200"
            )}
            title="Strikethrough"
          >
            <StrikethroughIcon classes="text-[#021337]" />
          </button>
        </div>

        {/* List Group */}
        <div className="flex gap-0.5">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(
              "flex items-center justify-center h-7 px-1 rounded hover:bg-gray-100 transition-colors",
              editor.isActive("bulletList") && "bg-gray-200"
            )}
            title="Bullet List"
          >
            <BulletListIcon classes="text-[#021337]" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn(
              "flex items-center justify-center h-7 px-1 rounded hover:bg-gray-100 transition-colors",
              editor.isActive("orderedList") && "bg-gray-200"
            )}
            title="Numbered List"
          >
            <NumberedListIcon classes="text-[#021337]" />
          </button>
        </div>

        {/* Additional Tools */}
        <div className="flex gap-0.5">
          <button
            onClick={handleInsertLink}
            className={cn(
              "flex items-center justify-center h-7 px-1 rounded hover:bg-gray-100 transition-colors",
              editor.isActive("link") && "bg-gray-200"
            )}
            title="Insert Link"
          >
            <LinkIcon className="text-[#021337]" />
          </button>
          <button
            onClick={handleInsertImage}
            className="flex items-center justify-center h-7 px-1 rounded hover:bg-gray-100 transition-colors"
            title="Insert Image"
          >
            <ImageIcon classes="text-[#021337]" />
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto text-[#021337] text-sm leading-5">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

"use client";

import React, { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        
        if (data.url) {
          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection();
            if (range) {
              quill.insertEmbed(range.index, 'image', data.url);
            }
          }
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Lỗi khi tải ảnh lên');
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 focus-within:border-cyan-500 transition-all">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
        className="min-h-[300px]"
      />
      <style jsx global>{`
        .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid #e2e8f0;
          padding: 8px 12px;
          background: #f8fafc;
        }
        .ql-container.ql-snow {
          border: none;
          font-family: inherit;
        }
        .ql-editor {
          min-height: 200px;
          max-height: 400px;
          overflow-y: auto;
          font-size: 0.875rem;
          line-height: 1.6;
          padding: 16px;
        }
        .ql-editor.ql-blank::before {
          font-style: normal;
          color: #94a3b8;
          left: 16px;
        }
        .ql-snow .ql-stroke {
          stroke: #64748b;
        }
        .ql-snow .ql-fill {
          fill: #64748b;
        }
        .ql-snow.ql-toolbar button:hover .ql-stroke,
        .ql-snow.ql-toolbar button:hover .ql-fill,
        .ql-snow.ql-toolbar button.ql-active .ql-stroke,
        .ql-snow.ql-toolbar button.ql-active .ql-fill {
          stroke: #0891b2;
          fill: #0891b2;
        }
        /* Sửa lỗi Tooltip chèn link bị vỡ giao diện do Tailwind */
        .ql-tooltip {
          z-index: 9999 !important;
          border-radius: 8px !important;
          padding: 8px 12px !important;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1) !important;
          background-color: white !important;
          border: 1px solid #e2e8f0 !important;
          transform: translateY(10px) !important;
        }
        .ql-tooltip input[type=text] {
          border: 1px solid #cbd5e1 !important;
          border-radius: 6px !important;
          padding: 6px 12px !important;
          margin: 0 8px !important;
          color: #0f172a !important;
          font-size: 14px !important;
          outline: none !important;
        }
        .ql-tooltip input[type=text]:focus {
          border-color: #0891b2 !important;
        }
        .ql-tooltip::before {
          color: #64748b !important;
          font-weight: 600 !important;
        }
        .ql-tooltip a.ql-action::after {
          color: #0891b2 !important;
          font-weight: 700 !important;
        }
        .ql-tooltip a.ql-remove::before {
          color: #ef4444 !important;
          font-weight: 700 !important;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;

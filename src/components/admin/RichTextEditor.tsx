"use client";

import React, { useMemo, useRef, useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [hoveredImg, setHoveredImg] = useState<HTMLImageElement | null>(null);
  const [btnPosition, setBtnPosition] = useState({ top: 0, left: 0 });
  const editorContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG') {
      const img = target as HTMLImageElement;
      setHoveredImg(img);
      
      if (editorContainerRef.current) {
        const containerRect = editorContainerRef.current.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();
        
        // Căn chỉnh nút X ở góc trên bên phải của ảnh
        setBtnPosition({
          top: imgRect.top - containerRect.top + 8,
          left: imgRect.left - containerRect.left + imgRect.width - 32
        });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isOverImg = target.tagName === 'IMG';
    const isOverBtn = target.id === 'delete-img-btn' || target.closest('#delete-img-btn');
    
    // Nếu không di chuột trên ảnh hoặc nút xóa, ẩn nút xóa
    if (!isOverImg && !isOverBtn) {
      setHoveredImg(null);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (relatedTarget && (relatedTarget.id === 'delete-img-btn' || relatedTarget.closest('#delete-img-btn'))) {
      return;
    }
    setHoveredImg(null);
  };

  const handleDeleteImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hoveredImg) return;
    
    // Xóa ảnh ra khỏi DOM và cập nhật Quill editor
    hoveredImg.remove();
    const quill = quillRef.current?.getEditor();
    if (quill) {
      quill.update();
      onChange(quill.root.innerHTML);
    }
    setHoveredImg(null);
  };

  // Ẩn nút X khi người dùng cuộn trình soạn thảo
  useEffect(() => {
    const editor = quillRef.current?.getEditor()?.root;
    if (!editor) return;
    
    const handleScroll = () => {
      setHoveredImg(null);
    };
    
    editor.addEventListener('scroll', handleScroll);
    return () => editor.removeEventListener('scroll', handleScroll);
  }, [quillRef.current]);

  const handleAIGenerate = async () => {
    if (isGeneratingAI) return;
    const promptText = prompt('✨ Nhập từ khóa hoặc mô tả ngắn gọn để AI viết bài (VD: Sửa máy tính tận nơi Gò Vấp):');
    if (!promptText) return;

    setIsGeneratingAI(true);
    try {
      const res = await fetch('/api/admin/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText }),
      });
      const data = await res.json();
      
      if (res.ok && data.content) {
        const quill = quillRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection(true);
          // Chèn HTML tại vị trí con trỏ
          quill.clipboard.dangerouslyPasteHTML(range.index || 0, data.content);
          
          // Thêm một dòng trống sau khi chèn
          quill.insertText((range.index || 0) + quill.clipboard.convert({html: data.content}).length(), '\n');

          onChange(quill.root.innerHTML);
        }
      } else {
        alert('Lỗi: ' + (data.error || 'Không thể tạo nội dung'));
      }
    } catch (error) {
      console.error(error);
      alert('Đã xảy ra lỗi khi kết nối với AI');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Đăng ký thuộc tính Alt và Title cho ảnh trong Quill
  useEffect(() => {
    const Quill = require('react-quill-new').Quill;
    const Image = Quill.import('formats/image');
    
    class CustomImage extends Image {
      static create(value: any) {
        const node = super.create(value);
        if (typeof value === 'object') {
          node.setAttribute('src', value.url || value.src);
          if (value.alt) node.setAttribute('alt', value.alt);
          if (value.title) node.setAttribute('title', value.title);
        } else {
          node.setAttribute('src', value);
        }
        return node;
      }
      
      static value(node: any) {
        const data = super.value(node);
        return {
          url: node.getAttribute('src'),
          alt: node.getAttribute('alt'),
          title: node.getAttribute('title')
        };
      }
      
      formats() {
        const formats = super.formats();
        formats.alt = this.domNode.getAttribute('alt');
        formats.title = this.domNode.getAttribute('title');
        return formats;
      }
    }
    
    Quill.register(CustomImage, true);

    // Tắt kiểm tra chính tả (gạch chân đỏ) sau khi Quill khởi tạo
    const quill = quillRef.current?.getEditor();
    if (quill) {
      quill.root.setAttribute('spellcheck', 'false');
    }
  }, []);

  // Hàm xử lý khi click vào ảnh để sửa Alt/Title
  const handleImageClick = (e: any) => {
    if (e.target.tagName === 'IMG') {
      const img = e.target;
      const currentAlt = img.getAttribute('alt') || '';
      const newAlt = prompt('Nhập mô tả ảnh (Alt text - Tốt cho SEO):', currentAlt);
      
      if (newAlt !== null) {
        img.setAttribute('alt', newAlt);
        img.setAttribute('title', newAlt);
        
        // Cập nhật lại nội dung cho Quill
        const quill = quillRef.current?.getEditor();
        if (quill) {
          onChange(quill.root.innerHTML);
        }
      }
    }
  };

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
          const altText = prompt('Nhập mô tả ảnh (Ví dụ: Sửa máy tính tận nơi Quận 12):') || '';
          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection();
            if (range) {
              quill.insertEmbed(range.index, 'image', data.url);
              
              // Đợi một chút để ảnh được chèn vào DOM rồi gán Alt
              setTimeout(() => {
                const images = quill.root.querySelectorAll('img');
                const lastImg = images[images.length - 1];
                if (lastImg && lastImg.getAttribute('src') === data.url) {
                  lastImg.setAttribute('alt', altText);
                  lastImg.setAttribute('title', altText);
                  onChange(quill.root.innerHTML);
                }
              }, 100);
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
    table: true,
    toolbar: {
      container: '#custom-toolbar',
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  const getTableModule = () => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      return quill.getModule('table') as any;
    }
    return null;
  };

  return (
    <div 
      ref={editorContainerRef}
      className="bg-white rounded-xl overflow-hidden border border-slate-200 focus-within:border-cyan-500 transition-all flex flex-col relative"
      onClick={handleImageClick}
      onMouseMove={handleMouseMove}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {/* Nút X nổi để xóa ảnh */}
      {hoveredImg && (
        <button
          id="delete-img-btn"
          onClick={handleDeleteImage}
          style={{
            position: 'absolute',
            top: `${btnPosition.top}px`,
            left: `${btnPosition.left}px`,
            zIndex: 999,
          }}
          className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-110 cursor-pointer border border-white"
          title="Xóa hình ảnh này"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      {/* Custom Quill Toolbar */}
      <div id="custom-toolbar" className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex flex-wrap items-center gap-y-2">
        <span className="ql-formats mr-2">
          <select className="ql-header" defaultValue="">
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
            <option value="">Normal</option>
          </select>
        </span>
        
        <span className="ql-formats mr-2">
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
        </span>
        
        <span className="ql-formats mr-2">
          <select className="ql-color" />
          <select className="ql-background" />
        </span>
        
        <span className="ql-formats mr-2">
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />
          <select className="ql-align" />
        </span>
        
        <span className="ql-formats mr-2">
          <button className="ql-link" />
          <button className="ql-image" />
          <button className="ql-clean" />
        </span>

        <div className="w-px h-6 bg-slate-300 mx-1"></div>

        {/* AI Generator Tool */}
        <span className="relative flex items-center ml-1">
          <div 
            role="button" 
            onClick={handleAIGenerate}
            className={`px-2 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded font-bold hover:from-purple-700 hover:to-indigo-700 shadow-sm flex items-center gap-1.5 text-[12px] transition-all cursor-pointer !w-auto !h-auto !px-3 !py-1.5 ${isGeneratingAI ? 'opacity-70 cursor-wait' : ''}`}
            title="Tự động viết bài chuẩn SEO bằng AI"
          >
            {isGeneratingAI ? (
              <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              <span className="text-sm leading-none">✨</span>
            )}
            {isGeneratingAI ? 'Đang viết...' : 'Viết bài AI'}
          </div>
        </span>

        <div className="w-px h-6 bg-slate-300 mx-1"></div>

        {/* Custom Table Tools - Dropdown Menu */}
        <span className="relative group flex items-center ml-1">
          <div role="button" className="px-2 py-1.5 bg-white border border-slate-200 rounded font-bold text-cyan-600 hover:bg-cyan-50 shadow-sm flex items-center gap-1.5 text-[12px] transition-colors cursor-pointer !w-auto !h-auto !px-3 !py-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            Bảng <span className="text-[9px]">▼</span>
          </div>
          
          {/* Dropdown Content */}
          <div className="absolute top-[110%] left-0 w-52 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[9999] flex flex-col p-1.5">
            <div role="button" onMouseDown={(e) => { e.preventDefault(); getTableModule()?.insertTable(3, 3); }} className="text-left px-3 py-2 hover:bg-cyan-50 rounded text-sm font-bold text-cyan-700 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap !w-full !h-auto !p-2">
              <span className="text-lg leading-none">+</span> Chèn Bảng (3x3)
            </div>
            
            <div className="h-px bg-slate-100 my-1"></div>
            
            <div role="button" onMouseDown={(e) => { e.preventDefault(); getTableModule()?.insertRowAbove(); }} className="text-left px-3 py-1.5 hover:bg-slate-50 rounded text-xs text-slate-600 transition-colors flex justify-between items-center cursor-pointer whitespace-nowrap !w-full !h-auto !p-2">Thêm hàng trên <span>⬆</span></div>
            <div role="button" onMouseDown={(e) => { e.preventDefault(); getTableModule()?.insertRowBelow(); }} className="text-left px-3 py-1.5 hover:bg-slate-50 rounded text-xs text-slate-600 transition-colors flex justify-between items-center cursor-pointer whitespace-nowrap !w-full !h-auto !p-2">Thêm hàng dưới <span>⬇</span></div>
            <div role="button" onMouseDown={(e) => { e.preventDefault(); getTableModule()?.insertColumnLeft(); }} className="text-left px-3 py-1.5 hover:bg-slate-50 rounded text-xs text-slate-600 transition-colors flex justify-between items-center cursor-pointer whitespace-nowrap !w-full !h-auto !p-2">Thêm cột trái <span>⬅</span></div>
            <div role="button" onMouseDown={(e) => { e.preventDefault(); getTableModule()?.insertColumnRight(); }} className="text-left px-3 py-1.5 hover:bg-slate-50 rounded text-xs text-slate-600 transition-colors flex justify-between items-center cursor-pointer whitespace-nowrap !w-full !h-auto !p-2">Thêm cột phải <span>➡</span></div>
            
            <div className="h-px bg-slate-100 my-1"></div>

            <div role="button" onMouseDown={(e) => { e.preventDefault(); getTableModule()?.deleteRow(); }} className="text-left px-3 py-1.5 hover:bg-red-50 rounded text-xs text-red-600 transition-colors cursor-pointer whitespace-nowrap !w-full !h-auto !p-2">Xóa hàng hiện tại</div>
            <div role="button" onMouseDown={(e) => { e.preventDefault(); getTableModule()?.deleteColumn(); }} className="text-left px-3 py-1.5 hover:bg-red-50 rounded text-xs text-red-600 transition-colors cursor-pointer whitespace-nowrap !w-full !h-auto !p-2">Xóa cột hiện tại</div>
            <div role="button" onMouseDown={(e) => { e.preventDefault(); getTableModule()?.deleteTable(); }} className="text-left px-3 py-2 hover:bg-red-100 bg-red-50 rounded text-xs font-bold text-red-700 transition-colors mt-1 cursor-pointer whitespace-nowrap !w-full !h-auto !p-2">Xóa toàn bộ Bảng</div>
          </div>
        </span>
      </div>

      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
        className="min-h-[300px] flex-1 flex flex-col"
      />
      <style jsx global>{`
        .ql-editor img {
          cursor: pointer;
          transition: outline 0.2s;
        }
        .ql-editor img:hover {
          outline: 3px solid #0891b2;
        }
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
          max-height: 600px;
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

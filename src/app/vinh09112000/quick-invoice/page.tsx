"use client";

import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const safeHtml2Canvas = (element: HTMLElement, options: any): Promise<HTMLCanvasElement> => {
  if (typeof window === 'undefined') return Promise.resolve(document.createElement('canvas'));
  
  // 1. Prototype level override for cssRules
  const protoDesc = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, 'cssRules');
  try {
    Object.defineProperty(CSSStyleSheet.prototype, 'cssRules', {
      get: () => [] as any,
      configurable: true
    });
  } catch (e) {}

  // 2. Instance level override for all active stylesheets
  const stylesheets = Array.from(document.styleSheets);
  const originalInstances = stylesheets.map(sheet => {
    try {
      const orig = sheet.cssRules;
      Object.defineProperty(sheet, 'cssRules', {
        get: () => [] as any,
        configurable: true
      });
      return orig;
    } catch (e) {
      return null;
    }
  });

  const restore = () => {
    // Restore prototype
    try {
      if (protoDesc) {
        Object.defineProperty(CSSStyleSheet.prototype, 'cssRules', protoDesc);
      } else {
        delete (CSSStyleSheet.prototype as any).cssRules;
      }
    } catch (e) {}

    // Restore instances
    stylesheets.forEach((sheet, idx) => {
      const orig = originalInstances[idx];
      if (orig !== null) {
        try {
          Object.defineProperty(sheet, 'cssRules', {
            get: () => orig,
            configurable: true
          });
        } catch (e) {}
      }
    });
  };

  // 3. Inject ignoreElements to prevent cloning of STYLE and LINK tags
  const safeOptions = {
    ...options,
    ignoreElements: (el: Element) => {
      // Ignore STYLE and LINK tags to avoid cloning Tailwind oklch styles
      if (el.tagName === 'STYLE' || el.tagName === 'LINK') {
        return true;
      }
      // Respect user's ignoreElements if provided
      if (options.ignoreElements) {
        return options.ignoreElements(el);
      }
      return false;
    }
  };

  try {
    const promise = html2canvas(element, safeOptions);
    restore();
    return promise.finally(() => {
      restore();
    });
  } catch (err) {
    restore();
    throw err;
  }
};

interface Product {
  name: string;
  price: number;
  qty: number;
  discount: number;
}

interface Invoice {
  orderId: string;
  custName: string;
  custPhone: string;
  custAddress: string;
  payMethod: string;
  payStatus: string;
  orderNotes: string;
  grandTotalStr: string;
  dateStr: string;
  timeStr: string;
  products: Product[];
  warrantyNotes?: string;
}

export default function QuickInvoicePage() {
  // Form state
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [invoiceId, setInvoiceId] = useState('');
  const [payMethod, setPayMethod] = useState('Chuyển khoản');
  const [payStatus, setPayStatus] = useState('Đã thanh toán');
  const [orderNotes, setOrderNotes] = useState('');
  const [products, setProducts] = useState<Product[]>([
    { name: '', price: 0, qty: 1, discount: 0 }
  ]);

  // History state
  const [history, setHistory] = useState<Invoice[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [noteModalPayStatus, setNoteModalPayStatus] = useState('Đã thanh toán');
  const [noteModalPayMethod, setNoteModalPayMethod] = useState('Chuyển khoản');
  const [warrantyNotesText, setWarrantyNotesText] = useState('');
  const [zaloCardData, setZaloCardData] = useState<Invoice | null>(null);
  const zaloCardRef = useRef<HTMLDivElement>(null);
  const printInvoiceRef = useRef<HTMLDivElement>(null);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);

  // Initialize Invoice ID and load history on mount
  useEffect(() => {
    initInvoiceId();
    loadHistoryFromStorage();
  }, []);

  const initInvoiceId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const yy = year.toString().slice(-2);
    const dateKey = `${yy}${month}${day}`;
    const seqKey = `invoice_seq_${dateKey}`;
    
    let seq = 0;
    if (typeof window !== 'undefined') {
      seq = parseInt(localStorage.getItem(seqKey) || '0', 10);
    }
    const nextSeq = seq + 1;
    const nextId = `DH${dateKey}-${nextSeq.toString().padStart(2, '0')}`;
    setInvoiceId(nextId);
  };

  const loadHistoryFromStorage = () => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('quick_invoice_history');
        if (stored) {
          setHistory(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Lỗi đọc lịch sử:", e);
      }
    }
  };

  const saveHistoryToStorage = (updatedHistory: Invoice[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quick_invoice_history', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
    }
  };

  // Product table handlers
  const addProductRow = () => {
    setProducts([...products, { name: '', price: 0, qty: 1, discount: 0 }]);
  };

  const removeProductRow = (index: number) => {
    if (products.length > 1) {
      const updated = products.filter((_, i) => i !== index);
      setProducts(updated);
    }
  };

  const updateProductField = (index: number, field: keyof Product, value: any) => {
    const updated = products.map((prod, i) => {
      if (i === index) {
        return { ...prod, [field]: value };
      }
      return prod;
    });
    setProducts(updated);
  };

  const calcSubtotal = (prod: Product) => {
    return (prod.price * prod.qty) * (1 - prod.discount / 100);
  };

  const getGrandTotal = () => {
    return products.reduce((acc, prod) => acc + calcSubtotal(prod), 0);
  };

  const handlePrint = () => {
    const finalProducts = products.filter(p => p.name.trim() !== '');
    if (finalProducts.length === 0) {
      alert("Vui lòng nhập sản phẩm/dịch vụ trước khi in!");
      return;
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const timeStr = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');

    const yy = year.toString().slice(-2);
    const dateKey = `${yy}${month}${day}`;
    const seqKey = `invoice_seq_${dateKey}`;
    
    let seq = 0;
    if (typeof window !== 'undefined') {
      seq = parseInt(localStorage.getItem(seqKey) || '0', 10);
    }
    const autoGeneratedId = `DH${dateKey}-${(seq + 1).toString().padStart(2, '0')}`;
    
    let finalOrderId = invoiceId.trim();
    if (!finalOrderId) {
      finalOrderId = autoGeneratedId;
    }

    if (finalOrderId === autoGeneratedId) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(seqKey, (seq + 1).toString());
        setTimeout(initInvoiceId, 1000);
      }
    }

    const invoiceData: Invoice = {
      orderId: finalOrderId,
      custName: custName.trim() || "Khách hàng lẻ",
      custPhone: custPhone.trim() || "N/A",
      custAddress: custAddress.trim() || "N/A",
      payMethod,
      payStatus,
      orderNotes,
      grandTotalStr: getGrandTotal().toLocaleString('vi-VN'),
      dateStr,
      timeStr,
      products: finalProducts
    };

    // Save to history
    const updatedHistory = [...history];
    const existingIndex = updatedHistory.findIndex(h => h.orderId === invoiceData.orderId);
    if (existingIndex > -1) {
      updatedHistory[existingIndex] = { ...invoiceData, warrantyNotes: updatedHistory[existingIndex].warrantyNotes };
    } else {
      updatedHistory.unshift(invoiceData);
    }
    saveHistoryToStorage(updatedHistory);

    // Open window immediately to prevent popup blocker
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Trình duyệt đã chặn cửa sổ Pop-up. Vui lòng cho phép Pop-up để in hóa đơn.");
      return;
    }
    printWindow.document.write('<p style="font-family: sans-serif; text-align: center; margin-top: 50px;">Đang chuẩn bị trang in, vui lòng đợi...</p>');

    // Set state for off-screen rendering
    setZaloCardData(invoiceData);

    // Wait for DOM update, then use safeHtml2Canvas to capture and print
    setTimeout(() => {
      if (printInvoiceRef.current) {
        safeHtml2Canvas(printInvoiceRef.current, {
          scale: 3, // High resolution for sharp print
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        }).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          
          printWindow.document.open();
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>In Hoa Don ${invoiceData.orderId}</title>
              <style>
                @page {
                  margin: 0;
                  size: portrait;
                }
                body {
                  margin: 0;
                  padding: 0;
                  background: #ffffff;
                  display: flex;
                  justify-content: center;
                  align-items: flex-start;
                }
                img {
                  width: 100%;
                  max-width: 800px;
                  height: auto;
                  display: block;
                }
                @media print {
                  body {
                    margin: 0;
                  }
                  img {
                    width: 100%;
                    max-width: 100%;
                  }
                }
              </style>
            </head>
            <body>
              <img src="${imgData}" />
              <script>
                window.onload = function() {
                  setTimeout(function() {
                    window.print();
                    window.close();
                  }, 300);
                };
              </script>
            </body>
            </html>
          `);
          printWindow.document.close();
        }).catch(err => {
          printWindow.close();
          console.error("Lỗi chuẩn bị in:", err);
          alert("Gặp lỗi khi chuẩn bị in hóa đơn. Thử lại sau.");
        });
      } else {
        printWindow.close();
        alert("Không tìm thấy mẫu in hóa đơn!");
      }
    }, 450);
  };

  // Save without printing
  const handleSaveOnly = () => {
    const finalProducts = products.filter(p => p.name.trim() !== '');
    if (finalProducts.length === 0) {
      alert("Vui lòng nhập ít nhất một sản phẩm/dịch vụ!");
      return;
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const timeStr = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');

    const yy = year.toString().slice(-2);
    const dateKey = `${yy}${month}${day}`;
    const seqKey = `invoice_seq_${dateKey}`;
    
    let seq = 0;
    if (typeof window !== 'undefined') {
      seq = parseInt(localStorage.getItem(seqKey) || '0', 10);
    }
    const autoGeneratedId = `DH${dateKey}-${(seq + 1).toString().padStart(2, '0')}`;
    
    let finalOrderId = invoiceId.trim();
    if (!finalOrderId) {
      finalOrderId = autoGeneratedId;
    }

    if (finalOrderId === autoGeneratedId) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(seqKey, (seq + 1).toString());
        setTimeout(initInvoiceId, 1000);
      }
    }

    const invoiceData: Invoice = {
      orderId: finalOrderId,
      custName: custName.trim() || "Khách hàng lẻ",
      custPhone: custPhone.trim() || "N/A",
      custAddress: custAddress.trim() || "N/A",
      payMethod,
      payStatus,
      orderNotes,
      grandTotalStr: getGrandTotal().toLocaleString('vi-VN'),
      dateStr,
      timeStr,
      products: finalProducts
    };

    const updatedHistory = [...history];
    const existingIndex = updatedHistory.findIndex(h => h.orderId === invoiceData.orderId);
    if (existingIndex > -1) {
      updatedHistory[existingIndex] = { ...invoiceData, warrantyNotes: updatedHistory[existingIndex].warrantyNotes };
    } else {
      updatedHistory.unshift(invoiceData);
    }
    saveHistoryToStorage(updatedHistory);
    alert(`Đã lưu hóa đơn ${finalOrderId} thành công!`);
  };

  // Copy Zalo Text Message
  const copyZaloMessage = () => {
    const finalProducts = products.filter(p => p.name.trim() !== '');
    if (finalProducts.length === 0) {
      alert("Vui lòng nhập sản phẩm/dịch vụ trước khi tạo tin nhắn!");
      return;
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const timeStr = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
    
    const tempId = invoiceId.trim() || 'DHXXXX';
    const data: Invoice = {
      orderId: tempId,
      custName: custName.trim() || "Khách hàng lẻ",
      custPhone: custPhone.trim() || "N/A",
      custAddress: custAddress.trim() || "N/A",
      payMethod,
      payStatus,
      orderNotes,
      grandTotalStr: getGrandTotal().toLocaleString('vi-VN'),
      dateStr,
      timeStr,
      products: finalProducts
    };

    const message = generateZaloTextMessage(data);

    navigator.clipboard.writeText(message)
      .then(() => {
        alert("Đã sao chép tin nhắn Zalo thành công! Bạn chỉ cần Paste (Ctrl+V) gửi cho khách.");
      })
      .catch(err => {
        console.error("Lỗi copy:", err);
        alert("Không thể tự động copy, vui lòng copy thủ công tin nhắn này:\n\n" + message);
      });
  };

  // Download Zalo Image using safeHtml2Canvas
  const downloadZaloImage = () => {
    const finalProducts = products.filter(p => p.name.trim() !== '');
    if (finalProducts.length === 0) {
      alert("Vui lòng nhập sản phẩm/dịch vụ trước khi tạo ảnh hóa đơn!");
      return;
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const timeStr = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
    
    const tempId = invoiceId.trim() || 'DHXXXX';
    const data: Invoice = {
      orderId: tempId,
      custName: custName.trim() || "Khách hàng lẻ",
      custPhone: custPhone.trim() || "N/A",
      custAddress: custAddress.trim() || "N/A",
      payMethod,
      payStatus,
      orderNotes,
      grandTotalStr: getGrandTotal().toLocaleString('vi-VN'),
      dateStr,
      timeStr,
      products: finalProducts
    };

    setZaloCardData(data);
    setIsGeneratingImg(true);

    // Save to history automatically as well
    const updatedHistory = [...history];
    const existingIndex = updatedHistory.findIndex(h => h.orderId === data.orderId);
    if (existingIndex > -1) {
      updatedHistory[existingIndex] = { ...data, warrantyNotes: updatedHistory[existingIndex].warrantyNotes };
    } else {
      updatedHistory.unshift(data);
    }
    saveHistoryToStorage(updatedHistory);

    // Render using safeHtml2Canvas after element updates in DOM
    setTimeout(() => {
      if (zaloCardRef.current) {
        safeHtml2Canvas(zaloCardRef.current, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        }).then(canvas => {
          const link = document.createElement('a');
          link.download = `HoaDon_${data.orderId}_${data.custName.replace(/\s+/g, '')}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
          setIsGeneratingImg(false);
        }).catch(err => {
          console.error("Lỗi tạo ảnh:", err);
          alert("Lỗi xuất ảnh. Vui lòng thử lại hoặc sử dụng tính năng In.");
          setIsGeneratingImg(false);
        });
      }
    }, 450);
  };
  // Sidebar History handlers
  const handleLoadInvoice = (index: number) => {
    const invoice = history[index];
    if (!invoice) return;

    if (confirm(`Bạn muốn nạp lại dữ liệu hóa đơn ${invoice.orderId} vào form? Dữ liệu chưa lưu sẽ bị đè.`)) {
      setCustName(invoice.custName === 'Khách hàng lẻ' ? '' : invoice.custName);
      setCustPhone(invoice.custPhone === 'N/A' ? '' : invoice.custPhone);
      setCustAddress(invoice.custAddress === 'N/A' ? '' : invoice.custAddress);
      setInvoiceId(invoice.orderId);
      setPayMethod(invoice.payMethod);
      setPayStatus(invoice.payStatus);
      setOrderNotes(invoice.orderNotes);
      setProducts(invoice.products.length > 0 ? invoice.products : [{ name: '', price: 0, qty: 1, discount: 0 }]);
      alert(`Đã tải dữ liệu hóa đơn ${invoice.orderId} thành công!`);
    }
  };

  const handlePrintFromHistory = (index: number) => {
    const invoice = history[index];
    if (!invoice) return;

    // Open window immediately to prevent popup blocker
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Trình duyệt đã chặn cửa sổ Pop-up. Vui lòng cho phép Pop-up để in hóa đơn.");
      return;
    }
    printWindow.document.write('<p style="font-family: sans-serif; text-align: center; margin-top: 50px;">Đang chuẩn bị trang in, vui lòng đợi...</p>');

    // Set state for off-screen rendering (cloned to guarantee re-render)
    setZaloCardData({ ...invoice });

    // Wait for DOM update, then use safeHtml2Canvas to capture and print
    setTimeout(() => {
      if (printInvoiceRef.current) {
        safeHtml2Canvas(printInvoiceRef.current, {
          scale: 3, // High resolution for sharp print
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        }).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          
          printWindow.document.open();
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>In Hoa Don ${invoice.orderId}</title>
              <style>
                @page {
                  margin: 0;
                  size: portrait;
                }
                body {
                  margin: 0;
                  padding: 0;
                  background: #ffffff;
                  display: flex;
                  justify-content: center;
                  align-items: flex-start;
                }
                img {
                  width: 100%;
                  max-width: 800px;
                  height: auto;
                  display: block;
                }
                @media print {
                  body {
                    margin: 0;
                  }
                  img {
                    width: 100%;
                    max-width: 100%;
                  }
                }
              </style>
            </head>
            <body>
              <img src="${imgData}" />
              <script>
                window.onload = function() {
                  setTimeout(function() {
                    window.print();
                    window.close();
                  }, 300);
                };
              </script>
            </body>
            </html>
          `);
          printWindow.document.close();
        }).catch(err => {
          printWindow.close();
          console.error("Lỗi chuẩn bị in:", err);
          alert("Gặp lỗi khi chuẩn bị in hóa đơn. Thử lại sau.");
        });
      } else {
        printWindow.close();
        alert("Không tìm thấy mẫu in hóa đơn!");
      }
    }, 450);
  };

  const handleDeleteInvoice = (index: number) => {
    const invoice = history[index];
    if (!invoice) return;

    if (confirm(`Bạn muốn xóa hóa đơn ${invoice.orderId} khỏi lịch sử? Hành động này không thể hoàn tác.`)) {
      const updated = history.filter((_, i) => i !== index);
      saveHistoryToStorage(updated);
    }
  };

  const handleQuickStatusChange = (index: number, newStatus: string) => {
    const updated = [...history];
    updated[index].payStatus = newStatus;
    saveHistoryToStorage(updated);
  };

  // Warranty Notes Modal handlers
  const openWarrantyNotesModal = (index: number) => {
    const invoice = history[index];
    if (!invoice) return;

    setEditingIndex(index);
    setNoteModalPayStatus(invoice.payStatus || 'Đã thanh toán');
    setNoteModalPayMethod(invoice.payMethod || 'Chuyển khoản');
    setWarrantyNotesText(invoice.warrantyNotes || '');
    setIsModalOpen(true);
  };

  const handleSaveWarrantyNotes = () => {
    if (editingIndex === null) return;

    const updated = [...history];
    updated[editingIndex].payStatus = noteModalPayStatus;
    updated[editingIndex].payMethod = noteModalPayMethod;
    updated[editingIndex].warrantyNotes = warrantyNotesText;
    
    saveHistoryToStorage(updated);
    setIsModalOpen(false);
    setEditingIndex(null);
    alert("Đã lưu cập nhật hóa đơn!");
  };

  // Export/Import JSON backups
  const handleExportBackup = () => {
    if (history.length === 0) {
      alert("Lịch sử trống, chưa có dữ liệu để sao lưu!");
      return;
    }

    const dataStr = JSON.stringify(history, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const now = new Date();
    const dateStr = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
    const filename = `SaoLuu_HoaDon_${dateStr}.json`;
    
    const link = document.createElement('a');
    link.href = dataUri;
    link.download = filename;
    link.click();
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (!Array.isArray(imported)) {
          throw new Error("Dữ liệu sao lưu không đúng định dạng danh sách.");
        }
        
        if (imported.length > 0 && (!imported[0].orderId || !imported[0].custName)) {
          throw new Error("Định dạng file không tương thích với lịch sử hóa đơn.");
        }

        if (confirm(`Tìm thấy ${imported.length} hóa đơn trong file. Bạn có muốn khôi phục vào hệ thống? Hóa đơn trùng mã số cũ sẽ bị ghi đè.`)) {
          const current = [...history];
          imported.forEach((imp: Invoice) => {
            const idx = current.findIndex(h => h.orderId === imp.orderId);
            if (idx > -1) {
              current[idx] = imp;
            } else {
              current.push(imp);
            }
          });

          // Sort descending by date
          current.sort((a, b) => {
            const dateA = new Date((a.dateStr + 'T' + (a.timeStr || '00:00')).replace(/\//g, '-'));
            const dateB = new Date((b.dateStr + 'T' + (b.timeStr || '00:00')).replace(/\//g, '-'));
            return dateB.getTime() - dateA.getTime();
          });

          saveHistoryToStorage(current);
          alert("Khôi phục lịch sử thành công!");
        }
      } catch (err: any) {
        alert("Lỗi nhập dữ liệu: " + err.message);
      } finally {
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  const filteredHistory = history.filter(item => {
    const query = searchQuery.toLowerCase().trim();
    return item.orderId.toLowerCase().includes(query) || 
           item.custName.toLowerCase().includes(query) ||
           (item.custPhone && item.custPhone.includes(query));
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-full relative">
      {/* Form Container */}
      <div className="flex-1 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="border-b border-slate-100 pb-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-3">
            <span className="text-cyan-500 text-3xl">📋</span> TẠO HÓA ĐƠN DỊCH VỤ
          </h1>
          <p className="text-slate-500 text-sm mt-1">Lập hóa đơn và chi tiết sản phẩm linh kiện cho khách hàng.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Info Section */}
          <div className="space-y-4 p-5 border border-slate-100 rounded-2xl bg-slate-50/50">
            <h2 className="text-base font-extrabold text-slate-800 border-l-4 border-cyan-500 pl-3">
              👤 Thông tin khách hàng
            </h2>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tên khách hàng:</label>
              <input
                type="text"
                value={custName}
                onChange={e => setCustName(e.target.value)}
                placeholder="Ví dụ: Anh Quyền"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Số điện thoại:</label>
              <input
                type="text"
                value={custPhone}
                onChange={e => setCustPhone(e.target.value)}
                placeholder="Ví dụ: 0877023032"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Địa chỉ:</label>
              <input
                type="text"
                value={custAddress}
                onChange={e => setCustAddress(e.target.value)}
                placeholder="Ví dụ: Thạnh Lộc 16, Quận 12"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all"
              />
            </div>
          </div>

          {/* Invoice Info Section */}
          <div className="space-y-4 p-5 border border-slate-100 rounded-2xl bg-slate-50/50">
            <h2 className="text-base font-extrabold text-slate-800 border-l-4 border-cyan-500 pl-3">
              📄 Thông tin đơn hàng
            </h2>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Số hóa đơn (Có thể tự sửa):</label>
              <input
                type="text"
                value={invoiceId}
                onChange={e => setInvoiceId(e.target.value)}
                placeholder="Ví dụ: DH260530-01"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono font-bold focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thanh toán:</label>
                <select
                  value={payMethod}
                  onChange={e => setPayMethod(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all"
                >
                  <option value="Chuyển khoản">Chuyển khoản</option>
                  <option value="Tiền mặt">Tiền mặt</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái:</label>
                <select
                  value={payStatus}
                  onChange={e => setPayStatus(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all"
                >
                  <option value="Đã thanh toán">Đã thanh toán</option>
                  <option value="Chưa thanh toán">Chưa thanh toán</option>
                  <option value="Công nợ">Công nợ</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ghi chú đơn hàng:</label>
              <textarea
                value={orderNotes}
                onChange={e => setOrderNotes(e.target.value)}
                rows={2}
                placeholder="Ghi chú thêm (ví dụ: máy lỗi sọc màn, trầy vỏ...)"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Product List Section */}
        <div className="mt-8 p-5 border border-slate-100 rounded-2xl">
          <h2 className="text-base font-extrabold text-slate-800 border-l-4 border-cyan-500 pl-3 mb-4">
            📦 Danh sách sản phẩm / Dịch vụ
          </h2>
          
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase border-b border-slate-100">
                  <th className="p-4 w-[40%]">Tên sản phẩm / Dịch vụ</th>
                  <th className="p-4 w-[20%] text-right">Đơn giá (đ)</th>
                  <th className="p-4 w-[10%] text-center">SL</th>
                  <th className="p-4 w-[10%] text-center">Giảm %</th>
                  <th className="p-4 w-[15%] text-right font-bold text-slate-900">Thành tiền</th>
                  <th className="p-4 w-[5%] text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((prod, index) => (
                  <tr key={index} className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-3">
                      <input
                        type="text"
                        value={prod.name}
                        onChange={e => updateProductField(index, 'name', e.target.value)}
                        placeholder="Tên linh kiện / dịch vụ sửa chữa"
                        className="w-full bg-transparent border-0 border-b border-transparent focus:border-cyan-500 py-1.5 text-sm focus:outline-none"
                      />
                    </td>
                    <td className="p-3 text-right">
                      <input
                        type="number"
                        value={prod.price === 0 ? '' : prod.price}
                        onChange={e => updateProductField(index, 'price', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        className="w-24 bg-transparent border-0 border-b border-transparent focus:border-cyan-500 py-1.5 text-sm text-right focus:outline-none"
                      />
                    </td>
                    <td className="p-3 text-center">
                      <input
                        type="number"
                        value={prod.qty}
                        onChange={e => updateProductField(index, 'qty', parseInt(e.target.value) || 1)}
                        className="w-12 bg-transparent border-0 border-b border-transparent focus:border-cyan-500 py-1.5 text-sm text-center focus:outline-none"
                      />
                    </td>
                    <td className="p-3 text-center">
                      <input
                        type="number"
                        value={prod.discount}
                        onChange={e => updateProductField(index, 'discount', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        className="w-12 bg-transparent border-0 border-b border-transparent focus:border-cyan-500 py-1.5 text-sm text-center focus:outline-none"
                      />
                    </td>
                    <td className="p-3 text-right text-sm font-bold text-slate-700">
                      {calcSubtotal(prod).toLocaleString('vi-VN')} đ
                    </td>
                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => removeProductRow(index)}
                        className="text-red-500 hover:text-red-700 text-lg font-bold w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-5">
            <button
              type="button"
              onClick={addProductRow}
              className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors"
            >
              + Thêm dòng sản phẩm
            </button>

            <div className="w-full sm:w-auto text-right">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mr-2">Tổng cộng:</span>
              <span className="text-2xl font-black text-cyan-600">{getGrandTotal().toLocaleString('vi-VN')}đ</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={handlePrint}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-base py-4 rounded-2xl shadow-lg shadow-cyan-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
          >
            🖨️ XUẤT & IN HÓA ĐƠN CHUYÊN NGHIỆP
          </button>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleSaveOnly}
              className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-2xl transition-all flex items-center justify-center gap-2 text-sm"
            >
              💾 Chỉ Lưu Lịch Sử
            </button>
            <button
              type="button"
              onClick={copyZaloMessage}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-2xl shadow-md shadow-emerald-600/10 transition-all flex items-center justify-center gap-2 text-sm"
            >
              💬 Sao Chép Tin Nhắn Zalo
            </button>
            <button
              type="button"
              disabled={isGeneratingImg}
              onClick={downloadZaloImage}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-2xl shadow-md shadow-amber-500/10 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {isGeneratingImg ? '⏳ Đang tạo...' : '🖼️ Tải Ảnh Hóa Đơn Zalo'}
            </button>
          </div>
        </div>
      </div>

      {/* History Sidebar */}
      <div className="w-full lg:w-96 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-auto lg:h-[800px] lg:sticky lg:top-8 overflow-hidden">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
          <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
            📋 Lịch sử hóa đơn
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleExportBackup}
              title="Sao lưu ra JSON"
              className="p-1.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-700 text-[10px] font-bold flex items-center gap-1 transition-colors"
            >
              📥 Sao lưu
            </button>
            <button
              onClick={() => document.getElementById('importFile')?.click()}
              title="Khôi phục từ JSON"
              className="p-1.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-700 text-[10px] font-bold flex items-center gap-1 transition-colors"
            >
              📤 Khôi phục
            </button>
            <input
              type="file"
              id="importFile"
              accept=".json"
              className="hidden"
              onChange={handleImportBackup}
            />
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên khách, mã HD..."
            className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 -mr-1">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item, index) => {
              const payStatusClasses = 
                item.payStatus === 'Đã thanh toán' 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : item.payStatus === 'Công nợ'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200';

              return (
                <div key={item.orderId} className="border border-slate-100 hover:border-cyan-200 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all space-y-3 relative group">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-cyan-600 transition-colors">
                        {item.orderId} {item.warrantyNotes ? '📌' : ''}
                      </span>
                      <div className="font-bold text-slate-800 text-sm">
                        👤 {item.custName}
                      </div>
                      {item.custPhone !== 'N/A' && (
                        <div className="text-xs text-slate-500">
                          📞 {item.custPhone}
                        </div>
                      )}
                    </div>

                    <div className="text-right space-y-1">
                      <span className="text-[10px] text-slate-400 block">{item.timeStr} {item.dateStr}</span>
                      <select
                        value={item.payStatus}
                        onChange={e => handleQuickStatusChange(index, e.target.value)}
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border focus:outline-none cursor-pointer ${payStatusClasses}`}
                      >
                        <option value="Chưa thanh toán">Chưa trả</option>
                        <option value="Đã thanh toán">Đã trả</option>
                        <option value="Công nợ">Công nợ</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline border-t border-slate-50 pt-2">
                    <span className="text-xs font-semibold text-slate-400">Tổng cộng:</span>
                    <span className="font-black text-emerald-600 text-sm">{item.grandTotalStr} đ</span>
                  </div>

                  {item.warrantyNotes && (
                    <div className="bg-amber-50/50 border-l-2 border-amber-400 p-2 rounded text-[11px] text-amber-800 font-medium">
                      <strong>Ghi chú BH:</strong> {item.warrantyNotes}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-end gap-1.5 border-t border-slate-50 pt-2.5">
                    <button
                      onClick={() => handleLoadInvoice(index)}
                      className="px-2.5 py-1 text-[10px] font-bold text-cyan-600 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors"
                    >
                      📂 Nạp lại
                    </button>
                    <button
                      onClick={() => openWarrantyNotesModal(index)}
                      className="px-2.5 py-1 text-[10px] font-bold text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                    >
                      📝 Ghi chú BH
                    </button>
                    <button
                      onClick={() => handlePrintFromHistory(index)}
                      className="px-2.5 py-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                      🖨️ In
                    </button>
                    <button
                      onClick={() => handleDeleteInvoice(index)}
                      className="px-2.5 py-1 text-[10px] font-bold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
                    >
                      🗑️ Xóa
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-slate-400 italic text-xs gap-2">
              <span>📂</span>
              <span>Lịch sử hóa đơn trống hoặc không tìm thấy.</span>
            </div>
          )}
        </div>
      </div>

      {/* Warranty Notes Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-black text-slate-800 text-sm flex items-center gap-2">
                🛠️ Ghi Chú & Trạng Thái Hóa Đơn
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">
                &times;
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-cyan-50/50 border border-cyan-100 rounded-xl p-3 text-xs space-y-1 text-cyan-800">
                <div><strong>Mã hóa đơn:</strong> <span className="font-bold">{editingIndex !== null && history[editingIndex]?.orderId}</span></div>
                <div><strong>Khách hàng:</strong> <span className="font-bold">{editingIndex !== null && history[editingIndex]?.custName}</span></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Trạng thái:</label>
                  <select
                    value={noteModalPayStatus}
                    onChange={e => setNoteModalPayStatus(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Đã thanh toán">Đã thanh toán</option>
                    <option value="Chưa thanh toán">Chưa thanh toán</option>
                    <option value="Công nợ">Công nợ</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Phương thức:</label>
                  <select
                    value={noteModalPayMethod}
                    onChange={e => setNoteModalPayMethod(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Chuyển khoản">Chuyển khoản</option>
                    <option value="Tiền mặt">Tiền mặt</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Ghi chú bảo hành / nguồn hàng linh kiện:</label>
                <textarea
                  value={warrantyNotesText}
                  onChange={e => setWarrantyNotesText(e.target.value)}
                  rows={4}
                  placeholder="Ví dụ:&#10;- SSD Samsung 500GB: Tem BH Phong Vũ đến 2029&#10;- RAM Kingston 16GB: Tem SPC (BH 3 năm)&#10;- Card màn hình: Khách tự mang đến, không BH."
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold"
              >
                Đóng
              </button>
              <button
                onClick={handleSaveWarrantyNotes}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold"
              >
                💾 Lưu cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OFF-SCREEN RENDER CARD FOR ZALO (html2canvas capture target) */}
      {zaloCardData && (
        <div 
          ref={zaloCardRef}
          style={{
            position: 'absolute',
            left: '-9999px',
            top: '-9999px',
            width: '600px',
            backgroundColor: '#ffffff',
            color: '#333333',
            fontFamily: 'Segoe UI, Arial, sans-serif',
            padding: '30px',
            borderTop: '10px solid #0891b2',
            borderBottom: '10px solid #0891b2',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ textAlign: 'center', borderBottom: '2px dashed #d1d5db', paddingBottom: '15px', marginBottom: '20px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0891b2', marginBottom: '3px' }}>SỬA MÁY TÍNH VƯỜN LÀI</div>
            <div style={{ fontSize: '12px', color: '#666', lineHeight: 1.4 }}>
              Địa chỉ: 51/34 đường Vườn Lài nối dài, An Phú Đông, Q.12, TP.HCM<br />
              Hotline/Zalo: 0877.023.032
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '12px', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px', color: '#1e293b' }}>HÓA ĐƠN DỊCH VỤ</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#0891b2', backgroundColor: '#ecfdf5', display: 'inline-block', padding: '3px 10px', borderRadius: '4px', border: '1px solid #a7f3d0' }}>
              {zaloCardData.orderId}
            </div>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
            <tbody>
              <tr>
                <td style={{ padding: '6px 5px', fontSize: '13px', verticalAlign: 'top', borderBottom: '1px solid #f3f4f6', fontWeight: 600, color: '#4b5563', width: '130px' }}>Khách hàng:</td>
                <td style={{ padding: '6px 5px', fontSize: '13px', verticalAlign: 'top', borderBottom: '1px solid #f3f4f6', color: '#1f2937' }}>{zaloCardData.custName}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 5px', fontSize: '13px', verticalAlign: 'top', borderBottom: '1px solid #f3f4f6', fontWeight: 600, color: '#4b5563' }}>Số điện thoại:</td>
                <td style={{ padding: '6px 5px', fontSize: '13px', verticalAlign: 'top', borderBottom: '1px solid #f3f4f6', color: '#1f2937' }}>{zaloCardData.custPhone}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 5px', fontSize: '13px', verticalAlign: 'top', borderBottom: '1px solid #f3f4f6', fontWeight: 600, color: '#4b5563' }}>Địa chỉ:</td>
                <td style={{ padding: '6px 5px', fontSize: '13px', verticalAlign: 'top', borderBottom: '1px solid #f3f4f6', color: '#1f2937' }}>{zaloCardData.custAddress}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 5px', fontSize: '13px', verticalAlign: 'top', borderBottom: '1px solid #f3f4f6', fontWeight: 600, color: '#4b5563' }}>Ngày lập:</td>
                <td style={{ padding: '6px 5px', fontSize: '13px', verticalAlign: 'top', borderBottom: '1px solid #f3f4f6', color: '#1f2937' }}>{zaloCardData.timeStr} ngày {zaloCardData.dateStr}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 5px', fontSize: '13px', verticalAlign: 'top', borderBottom: '1px solid #f3f4f6', fontWeight: 600, color: '#4b5563' }}>Hình thức TT:</td>
                <td style={{ padding: '6px 5px', fontSize: '13px', verticalAlign: 'top', borderBottom: '1px solid #f3f4f6', color: '#1f2937' }}>{zaloCardData.payMethod}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 5px', fontSize: '13px', verticalAlign: 'top', borderBottom: '1px solid #f3f4f6', fontWeight: 600, color: '#4b5563' }}>Trạng thái:</td>
                <td 
                  style={{ 
                    padding: '6px 5px', 
                    fontSize: '13px', 
                    verticalAlign: 'top', 
                    borderBottom: '1px solid #f3f4f6', 
                    fontWeight: 'bold',
                    color: zaloCardData.payStatus === 'Đã thanh toán' ? '#047857' : zaloCardData.payStatus === 'Công nợ' ? '#b45309' : '#be123c'
                  }}
                >
                  {zaloCardData.payStatus}
                </td>
              </tr>
            </tbody>
          </table>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', borderTop: '2px solid #0891b2', borderBottom: '2px solid #0891b2' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '10px 5px', fontSize: '12px', fontWeight: 'bold', color: '#4b5563', textAlign: 'left', width: '50%' }}>Tên dịch vụ / linh kiện</th>
                <th style={{ padding: '10px 5px', fontSize: '12px', fontWeight: 'bold', color: '#4b5563', textAlign: 'center', width: '15%' }}>SL</th>
                <th style={{ padding: '10px 5px', fontSize: '12px', fontWeight: 'bold', color: '#4b5563', textAlign: 'center', width: '15%' }}>Giảm</th>
                <th style={{ padding: '10px 5px', fontSize: '12px', fontWeight: 'bold', color: '#4b5563', textAlign: 'right', width: '20%' }}>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {zaloCardData.products.map((prod, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 5px', fontSize: '13px', textAlign: 'left', fontWeight: '500' }}>{prod.name}</td>
                  <td style={{ padding: '10px 5px', fontSize: '13px', textAlign: 'center' }}>{prod.qty}</td>
                  <td style={{ padding: '10px 5px', fontSize: '13px', textAlign: 'center', color: '#64748b' }}>{prod.discount > 0 ? `-${prod.discount}%` : '0%'}</td>
                  <td style={{ padding: '10px 5px', fontSize: '13px', textAlign: 'right', fontWeight: 'bold' }}>{calcSubtotal(prod).toLocaleString('vi-VN')} đ</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <div style={{ width: '250px', borderTop: '1.5px solid #0891b2', paddingTop: '10px', textAlign: 'right' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#0891b2', display: 'flex', justifyContent: 'space-between' }}>
                <span>TỔNG CỘNG:</span>
                <span>{zaloCardData.grandTotalStr} đ</span>
              </div>
            </div>
          </div>
          
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', fontSize: '12px', marginBottom: '15px', color: '#475569' }}>
            <div style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '5px' }}>💳 THÔNG TIN THANH TOÁN CHUYỂN KHOẢN:</div>
            <div>Ngân hàng: <strong>MB Bank (Ngân hàng Quân Đội)</strong></div>
            <div>Số tài khoản: <strong>0877023032</strong></div>
            <div>Chủ tài khoản: <strong>NGUYEN VAN VINH</strong></div>
            <div style={{ marginTop: '4px', color: '#64748b', fontStyle: 'italic' }}>Nội dung CK: Tên khách hàng + Số hóa đơn</div>
          </div>
          
          <div style={{ textAlign: 'center', borderTop: '2px dashed #d1d5db', paddingTop: '15px', fontSize: '12px', color: '#666', lineHeight: 1.5 }}>
            Cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ!<br />
            <strong>Mọi yêu cầu hỗ trợ quý khách vui lòng liên hệ Zalo trên.</strong>
          </div>
        </div>
      )}

      {/* OFF-SCREEN RENDER CARD FOR PRINT (html2canvas capture target for traditional Times New Roman invoice) */}
      {zaloCardData && (
        <div 
          ref={printInvoiceRef}
          style={{
            position: 'absolute',
            left: '-9999px',
            top: '-9999px',
            width: '800px',
            backgroundColor: '#ffffff',
            color: '#333333',
            fontFamily: "'Times New Roman', serif",
            padding: '40px',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb', marginBottom: '5px' }}>Sửa máy tính Vườn Lài</div>
            <div style={{ fontSize: '14px', color: '#555', marginBottom: '15px', lineHeight: 1.4 }}>
              51/34 đường Vườn Lài nối dài An Phú Đông Quận 12 TP HCM<br />
              Điện thoại: 0877.023.032
            </div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase', color: '#333' }}>HÓA ĐƠN DỊCH VỤ</div>
            <div style={{ height: '4px', background: '#2563eb', width: '100%', marginTop: '10px', marginBottom: '40px' }}></div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px', marginBottom: '30px' }}>
            <div style={{ flex: 1, borderTop: '1px solid #e5e7eb', paddingTop: '15px' }}>
              <div style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '16px', marginBottom: '15px' }}>Thông tin hóa đơn</div>
              <div style={{ display: 'flex', marginBottom: '8px', fontSize: '14px' }}><span style={{ minWidth: '110px', color: '#1a1a1a', fontWeight: 500 }}>Số hóa đơn:</span><span style={{ flex: 1, color: '#333' }}>{zaloCardData.orderId}</span></div>
              <div style={{ display: 'flex', marginBottom: '8px', fontSize: '14px' }}><span style={{ minWidth: '110px', color: '#1a1a1a', fontWeight: 500 }}>Ngày lập:</span><span style={{ flex: 1, color: '#333' }}>{zaloCardData.dateStr}</span></div>
              <div style={{ display: 'flex', marginBottom: '8px', fontSize: '14px' }}><span style={{ minWidth: '110px', color: '#1a1a1a', fontWeight: 500 }}>Giờ lập:</span><span style={{ flex: 1, color: '#333' }}>{zaloCardData.timeStr}</span></div>
              <div style={{ display: 'flex', marginBottom: '8px', fontSize: '14px' }}><span style={{ minWidth: '110px', color: '#1a1a1a', fontWeight: 500 }}>Hình thức TT:</span><span style={{ flex: 1, color: '#333' }}>{zaloCardData.payMethod}</span></div>
            </div>
            <div style={{ flex: 1, borderTop: '1px solid #e5e7eb', paddingTop: '15px' }}>
              <div style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '16px', marginBottom: '15px' }}>Thông tin khách hàng</div>
              <div style={{ display: 'flex', marginBottom: '8px', fontSize: '14px' }}><span style={{ minWidth: '110px', color: '#1a1a1a', fontWeight: 500 }}>Tên khách hàng:</span><span style={{ flex: 1, color: '#333' }}>{zaloCardData.custName}</span></div>
              <div style={{ display: 'flex', marginBottom: '8px', fontSize: '14px' }}><span style={{ minWidth: '110px', color: '#1a1a1a', fontWeight: 500 }}>Số điện thoại:</span><span style={{ flex: 1, color: '#333' }}>{zaloCardData.custPhone}</span></div>
              <div style={{ display: 'flex', marginBottom: '8px', fontSize: '14px' }}><span style={{ minWidth: '110px', color: '#1a1a1a', fontWeight: 500 }}>Địa chỉ:</span><span style={{ flex: 1, color: '#333' }}>{zaloCardData.custAddress}</span></div>
              <div style={{ display: 'flex', marginBottom: '8px', fontSize: '14px' }}>
                <span style={{ minWidth: '110px', color: '#1a1a1a', fontWeight: 500 }}>Trạng thái TT:</span>
                <span style={{ 
                  fontWeight: 'bold',
                  color: zaloCardData.payStatus === 'Đã thanh toán' ? '#10b981' : zaloCardData.payStatus === 'Công nợ' ? '#d97706' : '#e11d48'
                }}>{zaloCardData.payStatus || 'Chưa thanh toán'}</span>
              </div>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #2563eb', marginBottom: '20px' }}>
            <thead>
              <tr>
                <th style={{ background: 'white', color: '#9ca3af', padding: '12px 8px', fontWeight: 'bold', fontSize: '13px', textAlign: 'center', borderBottom: '1px solid #f3f4f6', width: '5%' }}>STT</th>
                <th style={{ background: 'white', color: '#9ca3af', padding: '12px 8px', fontWeight: 'bold', fontSize: '13px', textAlign: 'left', paddingLeft: '10px', borderBottom: '1px solid #f3f4f6', width: '45%' }}>Tên sản phẩm</th>
                <th style={{ background: 'white', color: '#9ca3af', padding: '12px 8px', fontWeight: 'bold', fontSize: '13px', textAlign: 'center', borderBottom: '1px solid #f3f4f6', width: '15%' }}>Đơn giá</th>
                <th style={{ background: 'white', color: '#9ca3af', padding: '12px 8px', fontWeight: 'bold', fontSize: '13px', textAlign: 'center', borderBottom: '1px solid #f3f4f6', width: '10%' }}>SL</th>
                <th style={{ background: 'white', color: '#9ca3af', padding: '12px 8px', fontWeight: 'bold', fontSize: '13px', textAlign: 'center', borderBottom: '1px solid #f3f4f6', width: '10%' }}>Giảm giá</th>
                <th style={{ background: 'white', color: '#9ca3af', padding: '12px 8px', fontWeight: 'bold', fontSize: '13px', textAlign: 'right', paddingRight: '10px', borderBottom: '1px solid #f3f4f6', width: '15%' }}>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {zaloCardData.products.map((prod, index) => (
                <tr key={index}>
                  <td style={{ padding: '12px 8px', borderBottom: '1px solid #f3f4f6', fontSize: '14px', textAlign: 'center' }}>{index + 1}</td>
                  <td style={{ padding: '12px 8px', borderBottom: '1px solid #f3f4f6', fontSize: '14px', textAlign: 'left', paddingLeft: '10px' }}>{prod.name}</td>
                  <td style={{ padding: '12px 8px', borderBottom: '1px solid #f3f4f6', fontSize: '14px', textAlign: 'center' }}>{prod.price.toLocaleString('vi-VN')} đ</td>
                  <td style={{ padding: '12px 8px', borderBottom: '1px solid #f3f4f6', fontSize: '14px', textAlign: 'center' }}>{prod.qty}</td>
                  <td style={{ padding: '12px 8px', borderBottom: '1px solid #f3f4f6', fontSize: '14px', textAlign: 'center' }}>{prod.discount}%</td>
                  <td style={{ padding: '12px 8px', borderBottom: '1px solid #f3f4f6', fontSize: '14px', textAlign: 'right', paddingRight: '10px', fontWeight: 'bold' }}>
                    {((prod.price * prod.qty) * (1 - prod.discount / 100)).toLocaleString('vi-VN')} đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <div style={{ width: '320px' }}>
              <div style={{ border: '1.5px solid #0ea5e9', height: '38px', borderRadius: '10px', marginBottom: '10px' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid #2563eb', paddingBottom: '10px', fontSize: '18px', fontWeight: 'bold', color: '#2563eb' }}>
                <span style={{ flex: 1, textAlign: 'left' }}>TỔNG CỘNG:</span>
                <span style={{ flex: 1, textAlign: 'right' }}>{zaloCardData.grandTotalStr} đ</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '40px', fontSize: '13px', color: '#666', borderTop: '1px solid #e5e7eb', paddingTop: '15px' }}>
            <strong>Ghi chú:</strong>
            <div style={{ whiteSpace: 'pre-line', marginTop: '5px' }}>{zaloCardData.orderNotes || 'Không có ghi chú.'}</div>
          </div>

          <div style={{ marginTop: '60px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Cảm ơn quý khách đã sử dụng dịch vụ!</p>
            <p>Hóa đơn được tạo tự động bởi hệ thống VinIT - {zaloCardData.timeStr} {zaloCardData.dateStr}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// HELPER RENDER PRINT INVOICE HTML TEMPLATE (Times New Roman layout)
// -------------------------------------------------------------

function renderInvoiceHTML(invoice: Invoice) {
  let productsHTML = '';
  invoice.products.forEach((prod, index) => {
    productsHTML += `
      <tr>
        <td style="text-align: center;">${index + 1}</td>
        <td style="text-align: left; padding-left: 10px;">${prod.name}</td>
        <td style="text-align: center;">${prod.price.toLocaleString('vi-VN')} đ</td>
        <td style="text-align: center;">${prod.qty}</td>
        <td style="text-align: center;">${prod.discount}%</td>
        <td style="text-align: right; padding-right: 10px; font-weight: bold;">${((prod.price * prod.qty) * (1 - prod.discount / 100)).toLocaleString('vi-VN')} đ</td>
      </tr>
    `;
  });

  const statusClass = 
    invoice.payStatus === 'Đã thanh toán' 
      ? 'status-paid' 
      : invoice.payStatus === 'Công nợ'
      ? 'status-debt'
      : 'status-unpaid';

  return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <title>Hóa đơn ${invoice.orderId}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Times New Roman', serif; padding: 40px; color: #333; line-height: 1.4; }
        .invoice-container { max-width: 800px; margin: 0 auto; position: relative; }
        .header { text-align: center; margin-bottom: 20px; }
        .shop-name { font-size: 32px; font-weight: bold; color: #2563eb; margin-bottom: 5px; }
        .shop-info { font-size: 14px; color: #555; margin-bottom: 15px; }
        .invoice-title { font-size: 28px; font-weight: bold; margin-bottom: 10px; text-transform: uppercase; }
        .blue-line { height: 4px; background: #2563eb; width: 100%; margin-bottom: 30px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 30px; }
        .info-section { border-top: 1px solid #e5e7eb; padding-top: 10px; }
        .section-head { color: #2563eb; font-weight: bold; font-size: 16px; margin-bottom: 15px; }
        .info-row { display: flex; margin-bottom: 8px; font-size: 14px; }
        .info-label { min-width: 110px; color: #1a1a1a; font-weight: bold; }
        .info-value { flex: 1; color: #333; }
        .status-paid { color: #10b981; font-weight: bold; }
        .status-unpaid { color: #e11d48; font-weight: bold; }
        .status-debt { color: #d97706; font-weight: bold; }
        .products-table { width: 100%; border-collapse: collapse; border: 2px solid #2563eb; margin-bottom: 20px; }
        .products-table th { background: white; color: #9ca3af; padding: 12px 8px; font-weight: bold; font-size: 13px; text-align: center; border-bottom: 1px solid #f3f4f6; }
        .products-table td { padding: 12px 8px; border-bottom: 1px solid #f3f4f6; font-size: 14px; }
        .total-box { margin-top: 10px; display: flex; justify-content: space-between; border-bottom: 3px solid #2563eb; padding-bottom: 10px; font-size: 18px; font-weight: bold; color: #2563eb; }
        .total-label { flex: 1; text-align: left; }
        .total-value { flex: 1; text-align: right; }
        .notes-section { margin-top: 40px; font-size: 13px; color: #666; border-top: 1px solid #e5e7eb; padding-top: 15px; }
        .notes-content { white-space: pre-line; margin-top: 5px; }
        .footer { margin-top: 60px; text-align: center; font-size: 12px; color: #666; }
        .btn-print { margin: 20px auto; display: block; padding: 10px 30px; background: #22c55e; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold; }
        @media print { .no-print { display: none; } body { padding: 0; } }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <div class="shop-name">Sửa máy tính Vườn Lài</div>
          <div class="shop-info">
            51/34 đường Vườn Lài nối dài An Phú Đông Quận 12 TP HCM<br>
            Điện thoại: 0877.023.032
          </div>
          <div class="invoice-title">HÓA ĐƠN DỊCH VỤ</div>
          <div class="blue-line"></div>
        </div>

        <div class="info-grid">
          <div class="info-section">
            <div class="section-head">Thông tin hóa đơn</div>
            <div class="info-row"><span class="info-label">Số hóa đơn:</span><span class="info-value">${invoice.orderId}</span></div>
            <div class="info-row"><span class="info-label">Ngày lập:</span><span class="info-value">${invoice.dateStr}</span></div>
            <div class="info-row"><span class="info-label">Giờ lập:</span><span class="info-value">${invoice.timeStr}</span></div>
            <div class="info-row"><span class="info-label">Hình thức TT:</span><span class="info-value">${invoice.payMethod}</span></div>
          </div>
          <div class="info-section">
            <div class="section-head">Thông tin khách hàng</div>
            <div class="info-row"><span class="info-label">Tên khách hàng:</span><span class="info-value">${invoice.custName}</span></div>
            <div class="info-row"><span class="info-label">Số điện thoại:</span><span class="info-value">${invoice.custPhone}</span></div>
            <div class="info-row"><span class="info-label">Địa chỉ:</span><span class="info-value">${invoice.custAddress}</span></div>
            <div class="info-row"><span class="info-label">Trạng thái TT:</span><span class="info-value ${statusClass}">${invoice.payStatus || 'Chưa thanh toán'}</span></div>
          </div>
        </div>

        <table class="products-table">
          <thead>
            <tr>
              <th width="5%">STT</th>
              <th width="45%">Tên sản phẩm</th>
              <th width="15%">Đơn giá</th>
              <th width="10%">SL</th>
              <th width="10%">Giảm giá</th>
              <th width="15%">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            ${productsHTML}
          </tbody>
        </table>

        <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
          <div style="width: 320px;">
            <div style="border: 1.5px solid #0ea5e9; height: 38px; border-radius: 10px; margin-bottom: 10px;"></div>
            <div class="total-box">
              <span class="total-label">TỔNG CỘNG:</span>
              <span class="total-value">${invoice.grandTotalStr} đ</span>
            </div>
          </div>
        </div>

        <div class="notes-section">
          <strong>Ghi chú:</strong>
          <div class="notes-content">${invoice.orderNotes || 'Không có ghi chú.'}</div>
        </div>

        <div class="footer">
          <p style="font-weight: bold; margin-bottom: 5px;">Cảm ơn quý khách đã sử dụng dịch vụ!</p>
          <p>Hóa đơn được tạo tự động bởi hệ thống VinIT - ${invoice.timeStr} ${invoice.dateStr}</p>
          <button class="btn-print no-print" onclick="window.print()">🖨️ XÁC NHẬN IN HÓA ĐƠN</button>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateZaloTextMessage(data: Invoice) {
  let productsText = '';
  data.products.forEach((prod, index) => {
    const discText = prod.discount > 0 ? ` (Giảm ${prod.discount}%)` : '';
    productsText += `${index + 1}. ${prod.name} - ${prod.price.toLocaleString('vi-VN')} đ x ${prod.qty}${discText} = ${((prod.price * prod.qty) * (1 - prod.discount / 100)).toLocaleString('vi-VN')} đ\n`;
  });
  
  return `[HÓA ĐƠN THANH TOÁN]
Mã hóa đơn: ${data.orderId}
Ngày lập: ${data.timeStr} ngày ${data.dateStr}
------------------------------
👤 Khách hàng: ${data.custName}
📞 Số điện thoại: ${data.custPhone}
📍 Địa chỉ: ${data.custAddress}
------------------------------
📦 Dịch vụ & Linh kiện:
${productsText}------------------------------
💰 TỔNG CỘNG: ${data.grandTotalStr} đ
💳 Hình thức TT: ${data.payMethod}
Trạng thái: ${data.payStatus || 'Chưa thanh toán'}
------------------------------
💳 Thông tin tài khoản chuyển khoản:
Ngân hàng: MB Bank (Ngân hàng Quân Đội)
Số tài khoản: 0877023032
Chủ tài khoản: NGUYEN VAN VINH
Nội dung CK: ${data.custName} ${data.orderId}
------------------------------
Cửa hàng Sửa máy tính Vườn Lài cảm ơn quý khách!`;
}

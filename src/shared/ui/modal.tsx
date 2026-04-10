'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  trigger: React.ReactNode;
  children: (close: () => void) => React.ReactNode;
  title?: string;
}
export const Modal = ({ trigger, children, title }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMount = typeof document !== 'undefined';

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const modalContent = (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs" onClick={handleClose}>
      <div className="animate-in zoom-in relative w-full max-w-xl rounded-2xl bg-white p-10 shadow-2xl duration-200" onClick={(e) => e.stopPropagation()}>
        <div className="mb-8 flex items-center justify-between">
          {title && <h3 className="text-2xl font-bold text-slate-900">{title}</h3>}
          <button onClick={handleClose} className="absolute top-6 right-6 rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900">
            <X size={24} />
          </button>
        </div>
        {children(handleClose)}
      </div>
    </div>
  );

  return (
    <>
      <div onClick={handleOpen} className="inline-block cursor-pointer">
        {trigger}
      </div>
      {isMount && isOpen && createPortal(modalContent, document.body)}
    </>
  );
};

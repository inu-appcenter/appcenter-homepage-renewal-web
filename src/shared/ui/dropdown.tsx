'use client';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';

interface FilterDropdownProps<T> {
  label?: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
  renderValue?: (value: T) => string;
  className?: string;
}
export const Dropdown = <T extends string | number>({ label, options, value, onChange, renderValue = (v) => String(v), className = '' }: FilterDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMount = typeof document !== 'undefined';
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updateCoords = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  };

  useLayoutEffect(() => {
    if (!isOpen) return;

    updateCoords();
    window.addEventListener('resize', updateCoords);
    window.addEventListener('scroll', updateCoords);
    return () => {
      window.removeEventListener('resize', updateCoords);
      window.removeEventListener('scroll', updateCoords);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target) && triggerRef.current && !triggerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`flex items-center gap-10 ${className}`}>
      {label && <span className="text-custom-gray-600 hidden text-[1.5rem]/4 sm:block">{label}</span>}

      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="border-custom-gray-600 text-custom-gray-100 hover:border-brand-primary-cta flex w-14 items-center justify-between border-2 px-1 py-1 text-[0.625rem]/2.5 font-medium transition-colors sm:w-42.5 sm:px-8 sm:py-4 sm:text-[1.5rem]/6"
      >
        {renderValue(value)}
        <ChevronDown className={`h-2.5 w-2.5 transition-transform duration-300 sm:h-6 sm:w-6 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen &&
        isMount &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: `${coords.width}px`
            }}
            className="bg-background border-custom-gray-600 no-scrollbar absolute z-9998 max-h-28 overflow-y-auto border-2 sm:max-h-126"
          >
            <ul className="flex flex-col">
              {options.map((option) => (
                <li key={String(option)}>
                  <button
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                    }}
                    className={`hover:text-brand-primary-cta block w-full px-1 py-1 text-left text-[0.625rem] leading-none transition-colors hover:bg-[#08341F] sm:px-6 sm:py-5 sm:text-[2rem] ${
                      value === option ? 'text-brand-primary-cta bg-[#08341F]' : 'text-white'
                    }`}
                  >
                    {renderValue(option)}
                  </button>
                </li>
              ))}
            </ul>
          </div>,
          document.body
        )}
    </div>
  );
};

// app/live/components/LanguageSelector.jsx
'use client';
import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

export default function LanguageSelector({ languages, selectedLanguage, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors"
      >
        <span>{languages.find(lang => lang.code === selectedLanguage)?.label}</span>
       <IoIosArrowDown />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg z-10 min-w-[120px]">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onChange(language.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                selectedLanguage === language.code ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              {language.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
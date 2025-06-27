// app/live/components/LanguageSelector.jsx
'use client';

export default function LanguageSelector({ languages, selectedLanguage, onChange }) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 items-center gap-x-1 gap-y-3 bg-gray -100  rounded-full p-1">
      {languages.map((language) => (
        <button
          key={language.code}
          onClick={() => onChange(language.code)}
          className={`px-4 text-sm cursor-pointer py-2 rounded-full transition-colors ${
            selectedLanguage === language.code 
              ? 'bg-cyan-500 text-white shadow-md' 
              : 'hover:bg-gray-200 bg-gray-100'
          }`}
        >
          {language.label}
        </button>
      ))}
    </div>
  );
}
// src/components/LanguageToggle.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
      >
        {language === 'en' ? '🇹🇭 TH' : '🇺🇸 EN'}
      </button>
    </div>
  );
}
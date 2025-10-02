import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const STORAGE_KEY = "nuvora_topbar_dismissed";

const TopBar = () => {
  const { translations } = useLanguage();
  const t = translations.topbar || {
    message: "Exclusive offer! 20% off for new customers.",
    cta: "Shop now"
  };

  return (
    <div className="w-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white text-xs font-medium tracking-wide py-1.5 relative overflow-hidden group">
      {/* Dynamic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/30 to-primary/50 opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
      {/* Subtle pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] bg-[length:200px]"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <p className="text-center text-white/90">
            <span className="font-semibold text-accent mr-1.5">NEW</span>
            {t.message}
          </p>
          <span className="hidden sm:inline-block w-px h-3.5 bg-white/20 mx-3"></span>
          <a
            href="/category"
            className="group flex items-center text-white/90 hover:text-accent transition-colors duration-200 whitespace-nowrap text-xs font-medium"
          >
            {t.cta}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3 w-3 ml-1.5 -mr-0.5 transition-transform duration-200 group-hover:translate-x-0.5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

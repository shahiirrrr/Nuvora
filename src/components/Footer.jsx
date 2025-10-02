import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const iconMap = { Facebook, Twitter, Instagram };

const Footer = () => {
  const { translations, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  if (!translations.footer) {
    return null;
  }

  const { 
    description,
    quickLinksTitle,
    contactTitle,
    address,
    email,
    phone,
    newsletter,
    copyright,
    socialMedia,
    quickLinks
  } = translations.footer;

  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary/90"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold tracking-tight mb-5 text-white">{copyright.text}</h2>
            <p className="text-secondary/80 text-sm leading-relaxed mb-6">
              {description}
            </p>
            <div className="flex space-x-4">
              {socialMedia.map((social, index) => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary/80 hover:text-accent transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-medium tracking-wider uppercase mb-5 text-white/90">
              {quickLinksTitle}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-sm text-secondary/80 hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-medium tracking-wider uppercase mb-5 text-white/90">{contactTitle}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="ml-3 text-sm text-secondary/80 whitespace-pre-line">
                  {address}
                </span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${email}`} className="ml-3 text-sm text-secondary/80 hover:text-accent transition-colors duration-200">
                  {email}
                </a>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${phone}`} className="ml-3 text-sm text-secondary/80 hover:text-accent transition-colors duration-200">
                  {phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-medium tracking-wider uppercase mb-5 text-white/90">{newsletter.title}</h3>
            <p className="text-sm text-secondary/80 mb-5">
              {newsletter.description}
            </p>
            <form className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  required
                  placeholder={newsletter.placeholder}
                  aria-label={newsletter.placeholder}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-secondary/60 focus:ring-1 focus:ring-accent/50 focus:border-accent/30 focus:outline-none transition-colors duration-200 pl-4 pr-12 py-2.5 text-sm"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-4 w-4 text-secondary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-accent hover:bg-accent/90 text-primary font-medium text-sm py-2.5 px-6 rounded-md hover:shadow-sm transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>{newsletter.button || 'Subscribe'}</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center">
          <p className="text-xs text-secondary/60">
            &copy; {currentYear} {copyright.text}. {language === 'ja' ? (copyright.rights_ja || copyright.rights) : copyright.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import WishlistIcon from "./WishlistIcon";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import LanguageSwitcher from "./LanguageSwitcher";
import TopBar from "./TopBar";

const NAV_LINKS = [
  { to: "/category/living", key: "living" },
  { to: "/category/dining", key: "dining" },
  { to: "/category/bedroom", key: "bedroom" },
  { to: "/category/decor", key: "decor" },
];

const IconButton = ({ icon: Icon, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full hover:bg-primary/5 transition-colors ${className}`}
    aria-label={Icon.displayName?.toLowerCase() || 'icon-button'}
  >
    <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
  </button>
);

const NavigationLink = ({ to, label, mobile = false, onClick }) => {
  const baseClass = "text-sm font-medium tracking-wide text-primary transition-colors duration-200";
  const mobileClass = mobile ? "block py-3 px-4 hover:bg-primary/5 rounded-lg" : "px-3 py-2";
  const hoverClass = mobile ? "hover:bg-primary/5" : "hover:text-accent";

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `${baseClass} ${mobileClass} ${hoverClass} ${
          isActive ? "text-accent font-semibold" : "text-primary/90"
        }`
      }
    >
      {label}
    </NavLink>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef(null);
  const { translations } = useLanguage();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (!translations.header) return null;

  const { navLinks, button, logo } = translations.header;

  const headerHeight = 42; // Height of the header in pixels
  const topBarHeight = 24; // Height of the top bar in pixels
  const totalHeight = isScrolled ? headerHeight : headerHeight + topBarHeight;

  return (
    <>
      <div style={{ height: `${totalHeight}px` }} aria-hidden="true" />
      <header 
        ref={headerRef}
        className={`w-full bg-white/95 backdrop-blur-sm fixed top-0 left-0 z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-sm' : ''
        }`}
      >
        {!isScrolled && <TopBar />}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[64px]">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3 group">
            {!imageError && (
              <img
                src="/store_logo.png"
                alt="Logo"
                className="h-8 w-auto transition-transform duration-200 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            )}
            {imageError && (
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {logo}
              </span>
            )}
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map(({ to, key }) => (
              <NavigationLink key={key} to={to} label={navLinks[key]} />
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-1">
            <div className="mr-1">
              <LanguageSwitcher />
            </div>
            <NavLink to="/search">
              <IconButton 
                icon={Search} 
                aria-label="Search" 
                className="hover:bg-primary/5"
              />
            </NavLink>
            <NavLink to="/login" className="hidden md:block">
              <IconButton 
                icon={User} 
                aria-label="User Account" 
                className="hover:bg-primary/5"
              />
            </NavLink>
            <WishlistIcon />
            <div className="relative">
              <NavLink to="/cart">
                <IconButton 
                  icon={ShoppingCart} 
                  aria-label="Shopping Cart" 
                  className="hover:bg-primary/5 relative"
                />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-1">
            <LanguageSwitcher />
            <div className="relative ml-1">
              <NavLink to="/cart">
                <IconButton 
                  icon={ShoppingCart} 
                  aria-label="Shopping Cart" 
                  className="md:hidden hover:bg-primary/5"
                />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-accent text-primary text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-primary hover:bg-primary/5"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </Button>
          </div>
          </div>
        </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm absolute w-full z-50 shadow-lg border-t border-gray-100">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map(({ to, key }) => (
              <NavigationLink
                key={key}
                to={to}
                label={navLinks[key]}
                mobile
                onClick={closeMenu}
              />
            ))}
            <div className="pt-3 mt-2 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <NavLink to="/search" className="flex-1" onClick={closeMenu}>
                  <IconButton 
                    icon={Search} 
                    className="w-full justify-center border border-gray-200 hover:bg-primary/5"
                    aria-label="Search"
                  />
                </NavLink>
                <NavLink to="/login" className="flex-1" onClick={closeMenu}>
                  <IconButton 
                    icon={User} 
                    className="w-full justify-center border border-gray-200 hover:bg-primary/5"
                    aria-label="User Account"
                  />
                </NavLink>
                <div className="w-full">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </header>
    </>
  );
};

export default Header;

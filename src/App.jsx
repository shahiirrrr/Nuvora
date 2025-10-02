import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/Header";
import AnimatedPage from "@/components/ui/AnimatedPage";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Footer from "@/components/Footer";
import CategoryPage from "@/pages/CategoryPage";
import CategoryList from "@/pages/CategoryList";
import ProductDetailPage from "@/pages/ProductDetailPage";
import Wishlist from "@/pages/Wishlist";
import Cart from "@/pages/Cart";

const AppContent = () => {
  const location = useLocation();
  
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="min-h-[calc(100vh-160px)]">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <AnimatedPage>
                <Home />
              </AnimatedPage>
            } />
            <Route path="/category" element={
              <AnimatedPage>
                <CategoryList />
              </AnimatedPage>
            } />
            <Route path="/category/:categoryId" element={
              <AnimatedPage>
                <CategoryPage />
              </AnimatedPage>
            } />
            <Route path="/category/:categoryId/:productId" element={
              <AnimatedPage>
                <ProductDetailPage />
              </AnimatedPage>
            } />
            <Route path="/search" element={
              <AnimatedPage>
                <Search />
              </AnimatedPage>
            } />
            <Route path="/login" element={
              <AnimatedPage>
                <Login />
              </AnimatedPage>
            } />
            <Route path="/register" element={
              <AnimatedPage>
                <Register />
              </AnimatedPage>
            } />
            <Route path="/wishlist" element={
              <AnimatedPage>
                <Wishlist />
              </AnimatedPage>
            } />
            <Route path="/cart" element={
              <AnimatedPage>
                <Cart />
              </AnimatedPage>
            } />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster 
        position="top-center" 
        richColors
        closeButton
        toastOptions={{
          style: {
            borderRadius: '8px',
            background: '#fff',
            color: '#111827',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
          duration: 3000,
        }}
      />
    </>
  );
};

const App = () => (
  <Router>
    <LanguageProvider>
      <WishlistProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </WishlistProvider>
    </LanguageProvider>
  </Router>
);

export default App;

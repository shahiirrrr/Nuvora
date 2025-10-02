import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import ScrollToTop from "@/components/ScrollToTop";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/Header";
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

const App = () => (
  <LanguageProvider>
    <WishlistProvider>
      <CartProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <main className="min-h-[calc(100vh-160px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<CategoryList />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/category/:categoryId/:productId" element={<ProductDetailPage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
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
      </Router>
      </CartProvider>
    </WishlistProvider>
  </LanguageProvider>
);

export default App;

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const WishlistContext = createContext();

// Helper function to generate a unique key for each product
const getProductKey = (productId, categoryId) => {
  return `${categoryId || 'unknown'}_${productId}`;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);
        // Validate the parsed wishlist is an array
        if (Array.isArray(parsedWishlist)) {
          setWishlist(parsedWishlist);
        } else {
          console.warn('Invalid wishlist format in localStorage, resetting...');
          localStorage.removeItem('wishlist');
        }
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      localStorage.removeItem('wishlist');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isLoading) return; // Skip initial render
    
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [wishlist, isLoading]);

  const addToWishlist = useCallback((product) => {
    if (!product || !product.id) {
      console.error('Invalid product data:', product);
      return;
    }

    setWishlist((prevWishlist) => {
      const categoryId = product.categoryId || 'unknown';
      const productKey = getProductKey(product.id, categoryId);
      
      // Check if product is already in wishlist
      const isProductInWishlist = prevWishlist.some(
        (item) => getProductKey(item.id, item.categoryId) === productKey
      );

      if (isProductInWishlist) {
        return prevWishlist; // Don't add duplicate
      }

      // Ensure product has all required fields
      const productToAdd = {
        id: product.id,
        name: product.name || 'Unnamed Product',
        price: typeof product.price === 'number' ? product.price : 0,
        image: product.image || '/placeholder-product.jpg',
        description: product.description || '',
        categoryId: categoryId,
        category: product.category || 'Uncategorized',
        rating: typeof product.rating === 'number' ? product.rating : 0,
        isNew: !!product.isNew,
        ...product // Spread any additional properties
      };

      return [...prevWishlist, productToAdd];
    });
  }, []);

  const removeFromWishlist = useCallback((productId, categoryId = 'unknown') => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter(
        (item) => getProductKey(item.id, item.categoryId) !== getProductKey(productId, categoryId)
      )
    );
  }, []);

  const isInWishlist = useCallback((productId, categoryId = 'unknown') => {
    return wishlist.some(
      (item) => getProductKey(item.id, item.categoryId) === getProductKey(productId, categoryId)
    );
  }, [wishlist]);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount: wishlist.length,
    isLoading
  }), [wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist, isLoading]);

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

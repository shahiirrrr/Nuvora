import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Maximum quantity allowed per product
const MAX_QUANTITY = 10;

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Ensure we only set the cart if it's an array
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        } else {
          console.error('Invalid cart data in localStorage, resetting to empty array');
          setCart([]);
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setError('Failed to load your cart. Please refresh the page.');
      setCart([]); // Ensure cart is always an array
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
        setError('Failed to update your cart. Please try again.');
      }
    }
  }, [cart, isInitialized]);

  // Check if a product is in the cart
  const isInCart = useCallback((productId, categoryId) => {
    return Array.isArray(cart) && cart.some(item => item.id === productId && item.categoryId === categoryId);
  }, [cart]);

  // Get a specific cart item
  const getCartItem = useCallback((productId, categoryId) => {
    return Array.isArray(cart) 
      ? cart.find(item => item.id === productId && item.categoryId === categoryId) || null
      : null;
  }, [cart]);

  // Add item to cart or update quantity if already in cart
  const addToCart = useCallback(async (product, quantity = 1) => {
    if (quantity < 1) {
      setError('Quantity must be at least 1');
      return false;
    }

    try {
      // Create a promise that resolves when the state is updated
      const result = await new Promise((resolve) => {
        setCart(prevCart => {
          const currentCart = Array.isArray(prevCart) ? [...prevCart] : [];
          
          // Check if product is already in cart
          const existingItemIndex = currentCart.findIndex(
            item => item?.id === product?.id && item?.categoryId === product?.categoryId
          );

          // Check if adding this quantity would exceed the maximum
          const newQuantity = existingItemIndex >= 0 
            ? (currentCart[existingItemIndex]?.quantity || 0) + quantity 
            : quantity;
            
          if (newQuantity > MAX_QUANTITY) {
            setError(`Maximum quantity of ${MAX_QUANTITY} per product exceeded`);
            resolve(false);
            return currentCart;
          }

          // If item exists, update quantity
          if (existingItemIndex >= 0) {
            const updatedCart = [...currentCart];
            updatedCart[existingItemIndex] = {
              ...updatedCart[existingItemIndex],
              quantity: newQuantity,
              updatedAt: new Date().toISOString()
            };
            resolve(true);
            return updatedCart;
          }

          // If item doesn't exist, add it to cart
          const newItem = {
            id: product.id,
            name: product.name,
            price: product.salePrice || product.price,
            originalPrice: product.price,
            image: product.image || '/placeholder-product.jpg',
            categoryId: product.categoryId,
            category: product.category || 'Uncategorized',
            quantity,
            inStock: product.inStock !== false,
            addedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          
          resolve(true);
          return [...currentCart, newItem];
        });
      });
      
      setError(null);
      return result;
    } catch (error) {
      console.error('Error in addToCart:', error);
      setError('Failed to add item to cart');
      return false;
    }
  }, []);

  // Update quantity of a specific item in the cart
  const updateQuantity = useCallback((productId, categoryId, newQuantity) => {
    if (newQuantity < 1) {
      setError('Quantity must be at least 1');
      return false;
    }
    
    if (newQuantity > MAX_QUANTITY) {
      setError(`Maximum quantity of ${MAX_QUANTITY} per product exceeded`);
      return false;
    }
    
    setCart(prevCart => {
      const currentCart = Array.isArray(prevCart) ? [...prevCart] : [];
      return currentCart.map(item =>
        item?.id === productId && item?.categoryId === categoryId
          ? { 
              ...item, 
              quantity: newQuantity,
              updatedAt: new Date().toISOString() 
            }
          : item
      );
    });
    
    setError(null);
    return true;
  }, []);

  // Clear the entire cart
  const clearCart = useCallback(() => {
    setCart([]);
    setError(null);
  }, []);  

  // Merge a guest cart with the current user's cart
  const mergeCarts = useCallback((guestCart) => {
    if (!Array.isArray(guestCart)) return;
    
    setCart(prevCart => {
      const currentCart = Array.isArray(prevCart) ? [...prevCart] : [];
      const mergedCart = [...currentCart];
      
      guestCart.forEach(guestItem => {
        if (!guestItem?.id || !guestItem?.categoryId) return;
        
        const existingItemIndex = mergedCart.findIndex(
          item => item?.id === guestItem.id && item?.categoryId === guestItem.categoryId
        );
        
        if (existingItemIndex >= 0) {
          // Item exists, update quantity without exceeding max
          const existingItem = mergedCart[existingItemIndex];
          const newQuantity = Math.min(
            (existingItem.quantity || 0) + (guestItem.quantity || 0),
            MAX_QUANTITY
          );
          
          mergedCart[existingItemIndex] = {
            ...existingItem,
            quantity: newQuantity,
            updatedAt: new Date().toISOString()
          };
        } else {
          // Add new item
          mergedCart.push({
            ...guestItem,
            addedAt: guestItem.addedAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        }
      });
      
      return mergedCart;
    });
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((productId, categoryId) => {
    try {
      setCart(prevCart => {
        const currentCart = Array.isArray(prevCart) ? [...prevCart] : [];
        return currentCart.filter(item => 
          !(item?.id === productId && item?.categoryId === categoryId)
        );
      });
      setError(null);
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      setError('Failed to remove item from cart');
      return false;
    }
  }, []);

  // Calculate cart total
  const getCartTotal = useCallback(() => {
    if (!Array.isArray(cart)) {
      console.error('Cart is not an array:', cart);
      return 0;
    }
    return cart.reduce((total, item) => {
      return total + ((Number(item?.price) || 0) * (Number(item?.quantity) || 0));
    }, 0);
  }, [cart]);

  // Get total number of items in cart
  const getCartCount = useCallback(() => {
    if (!Array.isArray(cart)) {
      console.error('Cart is not an array:', cart);
      return 0;
    }
    return cart.reduce((total, item) => total + (Number(item?.quantity) || 0), 0);
  }, [cart]);
  
  // Get cart summary (count and total)
  const getCartSummary = useCallback(() => {
    const count = getCartCount();
    const total = getCartTotal();
    return {
      count,
      total,
      formattedTotal: `$${total.toFixed(2)}`
    };
  }, [getCartCount, getCartTotal]);

  return (
    <CartContext.Provider
      value={{
        cart: Array.isArray(cart) ? cart : [],
        isInitialized,
        error,
        // Actions
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        mergeCarts,
        // Getters
        isInCart,
        getCartItem,
        getCartCount,
        getCartTotal,
        getCartSummary,
        // Constants
        MAX_QUANTITY
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
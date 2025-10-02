import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';

export default function AddToWishlistButton({ 
  product, 
  variant = 'icon', 
  className = '',
  showLabel = false
}) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Update active state when product or wishlist changes
  useEffect(() => {
    setIsActive(isInWishlist(product.id, product.categoryId));
  }, [product, isInWishlist]);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isActive) {
      removeFromWishlist(product.id, product.categoryId);
    } else {
      // Ensure we have all required product data
      const productData = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        categoryId: product.categoryId || product.category?.id || 'living',
        category: product.category || 'Living Room',
        rating: product.rating || 4.5,
        isNew: product.isNew || false
      };
      
      addToWishlist(productData);
      setIsAnimating(true);
      
      // Reset animation
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  };

  // Determine button content based on variant
  const getButtonContent = () => {
    const heartIcon = (
      <Heart 
        className={`${variant === 'icon' ? 'h-5 w-5' : 'h-4 w-4 mr-1.5'} ${
          isActive ? 'fill-accent' : ''
        } ${isAnimating ? 'animate-heart-beat' : ''}`} 
        strokeWidth={isActive ? 2 : 1.5} 
      />
    );

    if (variant === 'icon') {
      return (
        <>
          <span className={`absolute inset-0 rounded-full bg-accent/20 ${isAnimating ? 'animate-ping-slow' : 'hidden'}`} aria-hidden="true" />
          {heartIcon}
        </>
      );
    }

    return (
      <>
        <span className={`absolute inset-0 rounded-md bg-accent/20 ${isAnimating ? 'animate-ping-slow' : 'hidden'}`} aria-hidden="true" />
        {heartIcon}
        <span className="relative">
          {isActive ? 'Saved' : 'Save for later'}
        </span>
      </>
    );
  };

  const buttonClass = `
    relative inline-flex items-center justify-center overflow-hidden
    ${variant === 'icon' 
      ? 'p-2 rounded-full h-9 w-9' 
      : 'text-sm font-medium px-3 py-2 rounded-md min-w-[120px]'
    }
    transition-all duration-200 ease-out
    ${isActive 
      ? 'text-accent ' + (variant === 'icon' ? 'bg-accent/10 hover:bg-accent/20' : '') 
      : 'text-gray-500 hover:text-gray-700 ' + (variant === 'icon' ? 'hover:bg-gray-100' : 'hover:bg-gray-50')
    }
    ${isAnimating ? 'scale-105' : ''}
    ${className}
  `;

  return (
    <button
      onClick={handleClick}
      className={buttonClass.trim()}
      aria-label={isActive ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-pressed={isActive}
    >
      {getButtonContent()}
    </button>
  );
}

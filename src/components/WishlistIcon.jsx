import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';

export default function WishlistIcon() {
  const { wishlist, wishlistCount } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);
  const prevCountRef = React.useRef(wishlistCount);

  // Animate when count changes
  useEffect(() => {
    // Only animate when count increases (item added)
    if (wishlistCount > prevCountRef.current) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    // Update the previous count ref
    prevCountRef.current = wishlistCount;
  }, [wishlistCount]);

  // Reset animation when wishlist is cleared
  useEffect(() => {
    if (wishlistCount === 0) {
      setIsAnimating(false);
    }
  }, [wishlistCount]);

  return (
    <div className="relative">
      <Link 
        to="/wishlist" 
        className={`p-2 text-gray-600 hover:text-gray-900 transition-all duration-200 rounded-full hover:bg-primary/5 flex items-center justify-center ${
          isAnimating ? 'text-accent' : ''
        }`}
        aria-label={`Wishlist (${wishlistCount} ${wishlistCount === 1 ? 'item' : 'items'})`}
      >
        <Heart 
          className={`h-5 w-5 transition-transform duration-300 ${
            isAnimating ? 'scale-125 animate-heart-beat' : ''
          }`} 
          fill={wishlist.length > 0 ? 'currentColor' : 'none'}
          strokeWidth={1.5}
        />
      </Link>
      
      {wishlistCount > 0 && (
        <span 
          className="absolute -top-1 -right-1 bg-accent text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          aria-hidden="true"
        >
          {wishlistCount}
        </span>
      )}
    </div>
  );
}

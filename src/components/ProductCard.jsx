import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Eye, ArrowRight, Loader2 } from 'lucide-react';
import AddToWishlistButton from '@/components/AddToWishlistButton';
import { useCart } from '@/contexts/CartContext';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    
    try {
      setIsAddingToCart(true);
      setError(null);
      
      // Add to cart with quantity 1 by default
      await addToCart({
        ...product,
        categoryId: product.categoryId || 'living',
        category: product.category || 'Living'
      }, 1);
      
      // You can add a toast notification here if you want
      // Example: toast.success('Added to cart!');
      
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Generate a random discount between 10-30%
  const discountPercentage = Math.floor(Math.random() * 21) + 10;
  const originalPrice = (product.price * (1 + discountPercentage / 100)).toFixed(2);

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/category/${product.categoryId || 'living'}/${product.id}`);
  };

  const isListView = product.viewType === 'list';

  return (
    <div 
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-white ${
        isListView ? 'flex flex-col sm:flex-row rounded-lg' : 'rounded-xl'
      }`}
    >
      {/* Badges */}
      <div className={`absolute left-3 top-3 z-10 space-y-2 ${isListView ? 'sm:relative sm:left-0 sm:top-0 sm:mr-4' : ''}`}>
        <div className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
          -{discountPercentage}%
        </div>
        {product.isNew && (
          <div className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
            New
          </div>
        )}
      </div>

      {/* Wishlist Button */}
      <div className={`absolute right-2 top-2 z-10 ${isListView ? 'sm:relative sm:right-0 sm:top-0 sm:order-last sm:ml-4' : ''}`}>
        <AddToWishlistButton 
          product={{
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            categoryId: product.categoryId || 'living',
            category: product.category,
            rating: product.rating,
            isNew: product.isNew
          }}
          variant="icon"
          className="backdrop-blur-sm bg-white/80 hover:bg-white/90"
        />
      </div>

      {/* Product Image */}
      <Link 
        to={`/category/${product.categoryId || 'living'}/${product.id}`}
        className={`block ${isListView ? 'sm:w-1/3' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`relative overflow-hidden ${isListView ? 'aspect-[4/3] sm:rounded-l-lg' : 'aspect-[4/5] rounded-t-xl'} bg-gray-50`}>
          <div className="relative h-full w-full overflow-hidden">
            {/* Low-quality image placeholder (LQIP) */}
            <img 
              src={product.image} 
              alt={product.name}
              loading="lazy"
              width={400}
              height={500}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-product.jpg';
              }}
              style={{
                contentVisibility: 'auto',
                backgroundColor: '#f5f5f5',
                backgroundImage: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
              }}
            />
            <style jsx global>{`
              @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
              }
            `}</style>
          </div>
        
          {/* Quick Actions (Only shown in grid view on hover) */}
          {!isListView && (
            <div className={`absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-4 transition-all duration-300 ${
              isHovered ? 'translate-y-0' : 'translate-y-full'
            }`}>
              <Button 
                variant="secondary" 
                size="sm" 
                className="h-10 w-10 rounded-full p-0"
                title="Quick View"
                onClick={handleQuickView}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                size="sm" 
                className="h-10 flex-1 gap-2"
              >
                {isAddingToCart ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {error && (
          <p className="mt-2 text-xs text-red-500">{error}</p>
        )}
      </Link>

      {/* Product Info */}
      <div className={`p-4 ${isListView ? 'sm:flex-1' : ''}`}>
        <div className="mb-2 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating || 0)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-200'
                }`}
              />
            ))}
            <span className="ml-1 text-xs text-gray-500">
              ({product.reviewCount || '0'} reviews)
            </span>
          </div>
        </div>

        <h3 className={`font-semibold text-gray-900 ${isListView ? 'text-xl mb-2' : 'text-lg mb-1'}`}>
          {product.name}
        </h3>
        <p className={`${isListView ? 'mb-4' : 'mb-3'} line-clamp-2 text-sm text-gray-600`}>
          {product.description}
        </p>

        <div className={`flex items-center justify-between ${isListView ? 'mt-4' : ''}`}>
          <div>
            <span className={`font-bold text-gray-900 ${isListView ? 'text-xl' : 'text-lg'}`}>
              ${product.price.toFixed(2)}
            </span>
            <span className="ml-2 text-sm text-gray-500 line-through">
              ${parseFloat(originalPrice).toFixed(2)}
            </span>
          </div>

          <div className="flex space-x-2">
            <Button 
              variant={isListView ? 'outline' : 'default'}
              size={isListView ? 'sm' : 'icon'}
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`${isListView ? 'rounded-full' : 'rounded-full bg-black text-white hover:bg-gray-800'}`}
            >
              {isAddingToCart ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isListView ? (
                'Add to Cart'
              ) : (
                <ShoppingCart className="h-4 w-4" />
              )}
            </Button>
            
            {isListView && (
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full"
                onClick={handleQuickView}
              >
                <Eye className="mr-1 h-4 w-4" /> View
              </Button>
            )}
          </div>
        </div>

        {error && (
          <p className="mt-2 text-xs text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

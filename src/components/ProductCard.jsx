import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Eye, Loader2, Check } from 'lucide-react';
import AddToWishlistButton from '@/components/AddToWishlistButton';
import { useCart } from '@/contexts/CartContext';

const ProductCard = ({ product, viewType = 'grid' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Fixed height for card images
  const imageHeight = viewType === 'list' ? '200px' : '300px';
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    hover: { 
      y: -5,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: { duration: 0.2 }
    }
  };
  
  const buttonVariants = {
    initial: { opacity: 0, y: 10 },
    hover: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2 }
    }
  };
  
  const addToCartButtonVariants = {
    initial: { width: 'auto' },
    added: { 
      width: 'auto',
      backgroundColor: '#10B981',
      transition: { duration: 0.3 }
    }
  };

  // Generate a random discount between 10-30%
  const discountPercentage = Math.floor(Math.random() * 21) + 10;
  const originalPrice = (product.price * (1 + discountPercentage / 100)).toFixed(2);
  const isListView = viewType === 'list';

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/category/${product.categoryId || 'living'}/${product.id}`);
  };

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
      
      // Show success state
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
      
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <motion.div 
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={isListView ? {} : "hover"}
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-white ${
        isListView ? 'flex flex-col sm:flex-row rounded-lg' : 'rounded-xl h-full flex flex-col'
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
      <motion.div 
        className="absolute top-2 right-2 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0.8, 
          scale: isHovered ? 1.1 : 1,
          transition: { duration: 0.2 }
        }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
      >
        <AddToWishlistButton product={product} />
      </motion.div>

      {/* Product Image */}
      <Link 
        to={`/category/${product.categoryId || 'living'}/${product.id}`}
        className={`block ${isListView ? 'sm:w-1/3' : 'flex-1'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full overflow-hidden" style={{ height: imageHeight, minHeight: imageHeight }}>
          <div className="relative h-full w-full">
            <img
              src={product.image || '/placeholder-product.jpg'}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                e.target.src = '/placeholder-product.jpg';
              }}
            />
          </div>
          
          {/* Quick Actions Overlay */}
          <motion.div 
            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <motion.div 
              className="flex gap-2"
              variants={buttonVariants}
              initial="initial"
              animate={isHovered ? 'hover' : 'initial'}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="rounded-full h-10 w-10 shadow-md"
                  onClick={handleQuickView}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </motion.div>
              
              <motion.div 
                variants={addToCartButtonVariants}
                initial="initial"
                animate={isAddedToCart ? 'added' : 'initial'}
                className="bg-primary text-primary-foreground rounded-full overflow-hidden"
              >
                <Button 
                  variant={isAddedToCart ? 'default' : 'default'}
                  size="default"
                  className={`h-10 transition-all duration-300 ${isAddedToCart ? 'px-4' : 'w-10 p-0'}`}
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || isAddedToCart}
                >
                  {isAddingToCart ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isAddedToCart ? (
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      <span>Added</span>
                    </div>
                  ) : (
                    <ShoppingCart className="h-4 w-4" />
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Link>

      {/* Product Info */}
      <div className={`p-4 ${isListView ? 'sm:flex-1' : 'flex-1 flex flex-col'}`}>
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
        <p className={`${isListView ? 'mb-4' : 'mb-3 flex-1'} line-clamp-2 text-sm text-gray-600`}>
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

          {!isListView && (
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full hidden sm:flex"
                onClick={handleQuickView}
              >
                <Eye className="mr-1 h-4 w-4" /> View
              </Button>
            </div>
          )}
        </div>

        {error && (
          <p className="mt-2 text-xs text-red-500">{error}</p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;

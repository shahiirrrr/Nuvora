import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Heart, ShoppingCart, ArrowRight, Loader2 } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Wishlist() {
  const navigate = useNavigate();
  const { translations: t } = useLanguage();
  const { 
    wishlist, 
    removeFromWishlist, 
    clearWishlist,
    wishlistCount,
    isLoading
  } = useWishlist();
  const [isRemoving, setIsRemoving] = useState({});
  const [isClearing, setIsClearing] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState({});
  
  if (!t?.wishlist) {
    return null;
  }

  const Banner = () => (
    <div className="bg-primary py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          {t.wishlist.title || 'My Wishlist'}
        </h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto">
          {t.wishlist.subtitle || 'Your saved items are waiting for you'}
        </p>
      </div>
    </div>
  );

  const handleRemoveItem = async (itemId, categoryId) => {
    try {
      setIsRemoving(prev => ({ ...prev, [itemId]: true }));
      await new Promise(resolve => setTimeout(resolve, 300));
      removeFromWishlist(itemId, categoryId);
      toast.success(t.wishlist.itemRemoved);
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error(t.wishlist.error?.removeItem || 'Failed to remove item');
    } finally {
      setIsRemoving(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const handleClearAll = async () => {
    if (wishlistCount === 0) return;
    
    try {
      setIsClearing(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      clearWishlist();
      toast.success(t.wishlist.wishlistCleared);
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      toast.error(t.wishlist.error?.clearAll || 'Failed to clear wishlist');
    } finally {
      setIsClearing(false);
    }
  };

  const handleAddToCart = async (item) => {
    try {
      setIsAddingToCart(prev => ({ ...prev, [item.id]: true }));
      await new Promise(resolve => setTimeout(resolve, 1000));
      // TODO: Implement actual add to cart logic
      toast.success(t.wishlist.addedToCart);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(t.wishlist.error?.addToCart || 'Failed to add to cart');
    } finally {
      setIsAddingToCart(prev => ({ ...prev, [item.id]: false }));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">{t.wishlist.loading}</p>
        </div>
      </div>
    );
  }

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Banner />
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {t.wishlist.emptyTitle}
            </h1>
            <p className="text-gray-500 mb-8">
              {t.wishlist.emptyMessage}
            </p>
            <Button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-6 py-3 text-base font-medium"
            >
              {t.wishlist.continueShopping}
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{t.wishlist.title}</h1>
            <Button
              variant="outline"
              onClick={handleClearAll}
              disabled={isClearing || wishlistCount === 0}
              className="text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300"
            >
              {isClearing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.common?.clearing || 'Clearing'}...
                </>
              ) : (
                t.wishlist.clearAll
              )}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((item) => (
              <div
                key={`${item.categoryId}-${item.id}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 border border-gray-100"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-product.jpg';
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveItem(item.id, item.categoryId);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                    aria-label={t.wishlist.removeItem}
                  >
                    {isRemoving[item.id] ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <X className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    <Link
                      to={`/category/${item.categoryId}#${item.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="text-lg font-semibold text-gray-900">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="ml-2 text-sm text-gray-400 line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(item);
                      }}
                      disabled={isAddingToCart[item.id]}
                    >
                      {isAddingToCart[item.id] ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t.common?.adding || 'Adding'}...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          {t.wishlist.addToCart}
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <Link to={`/category/${item.categoryId}#${item.id}`}>
                        {t.wishlist.viewProduct}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
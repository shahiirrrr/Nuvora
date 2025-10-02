import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    getCartCount,
    clearCart
  } = useCart();
  
  const { translations: t } = useLanguage();
  const navigate = useNavigate();

  if (!t?.cart) return null;
  const { title, emptyCart, subtotal, checkout, continueShopping, remove, quantity } = t.cart;

  const Banner = () => (
    <div className="bg-primary py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          {t.cart.title || 'Your Cart'}
        </h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto">
          {t.cart.subtitle || 'Review your items and proceed to checkout'}
        </p>
      </div>
    </div>
  );

  const handleQuantityChange = (productId, categoryId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (quantity >= 1) {
      updateQuantity(productId, categoryId, quantity);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Banner />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <ShoppingCart className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {emptyCart.title}
            </h2>
            <p className="text-gray-500 mb-6">
              {emptyCart.description}
            </p>
            <Button 
              onClick={() => navigate('/')} 
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {continueShopping}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
        {/* Cart Items */}
        <div className="md:w-2/3">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{title} ({getCartCount()})</h1>
            <Button 
              variant="ghost" 
              onClick={clearCart}
              className="text-red-500 hover:bg-red-50"
            >
              {emptyCart.clear}
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
            {cart.map((item) => (
              <div key={`${item.id}-${item.categoryId}`} className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-shrink-0 w-full sm:w-32 h-32 bg-gray-50 rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-product.jpg';
                      }}
                    />
                  </div>
                  
                  <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-base font-medium text-gray-900">
                          <Link to={`/product/${item.categoryId}/${item.id}`}>
                            {item.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          ${item.price.toFixed(2)}
                          {item.originalPrice > item.price && (
                            <span className="ml-2 text-xs text-gray-400 line-through">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.categoryId)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">{remove}</span>
                      </button>
                    </div>
                    
                    <div className="mt-4 flex items-center">
                      <label htmlFor={`quantity-${item.id}`} className="sr-only">
                        {quantity}
                      </label>
                      <select
                        id={`quantity-${item.id}`}
                        value={item.quantity}
                        onChange={(e) => 
                          handleQuantityChange(
                            item.id, 
                            item.categoryId, 
                            parseInt(e.target.value, 10)
                          )
                        }
                        className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                      
                      <div className="ml-4 text-sm text-gray-500">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {t.cart.orderSummary}
            </h2>
            
            <div className="flex justify-between text-base font-medium text-gray-900 mb-4 pb-4 border-b border-gray-200">
              <p>{subtotal}</p>
              <p>${getCartTotal().toFixed(2)}</p>
            </div>
            
            <p className="mt-0.5 text-sm text-gray-500">
              {t.cart.shippingTaxes}
            </p>
            
            <div className="mt-6">
              <Button className="w-full py-6 text-base font-medium">
                {checkout}
              </Button>
            </div>
            
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                {t.cart.or}{' '}
                <Link 
                  to="/" 
                  className="font-medium text-primary hover:text-primary/80"
                >
                  {continueShopping}
                </Link>
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

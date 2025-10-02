import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductsByCategory } from '@/data/products';
import { Button } from '@/components/ui/button';
import { 
  Star, ShoppingCart, ChevronLeft, Minus, Plus, 
  Check, Truck, Shield, RefreshCw 
} from 'lucide-react';
import AddToWishlistButton from '@/components/AddToWishlistButton';
import { useCart } from '@/contexts/CartContext';

const ProductDetailPage = () => {
  const { productId, categoryId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // Find the current product
    const products = getProductsByCategory(categoryId);
    const currentProduct = products.find(p => p.id === productId);
    
    if (currentProduct) {
      setProduct(currentProduct);
      // Get related products
      setRelatedProducts(
        products.filter(p => p.id !== productId).slice(0, 4)
      );
    }
  }, [productId, categoryId]);

  const handleAddToCart = async () => {
    if (quantity < 1) {
      setError('Please select a valid quantity');
      return;
    }
    
    try {
      setIsAddingToCart(true);
      await addToCart(product, quantity);
      // Navigate to cart after successful addition
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError(error.message || 'Failed to add item to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl mb-6">Product not found</p>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Calculate price details
  const discountPercentage = 15;
  const originalPrice = (product.price * (1 + discountPercentage / 100)).toFixed(2);
  const currentPrice = product.salePrice || product.price;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
        >
          <ChevronLeft className="h-5 w-5 mr-1 transition-transform group-hover:-translate-x-1" />
          Back to products
        </button>
        
        {/* Main product section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="md:flex">
            
            {/* Product images */}
            <div className="md:w-1/2 p-6">
              <div className="relative h-96 bg-gray-50 rounded-lg overflow-hidden mb-4 group">
                <img 
                  src={product.images?.[selectedImage] || product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-product.jpg';
                  }}
                />
                
                {/* Sale/New badge */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.isNew && (
                    <span className="bg-blue-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                      New
                    </span>
                  )}
                  {product.salePrice && (
                    <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                      {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                    </span>
                  )}
                </div>
              </div>
            
              {/* Thumbnails */}
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {(product.images || [product.image]).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-accent ring-2 ring-offset-2 ring-accent/30' 
                        : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-product.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product details */}
            <div className="md:w-1/2 p-6 md:pl-0">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <AddToWishlistButton 
                  product={product} 
                  variant="icon"
                  className="text-gray-400 hover:text-red-500 hover:scale-110 transition-all"
                />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating || 4.5)
                          ? 'fill-current'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  {product.rating || '4.5'} ({Math.floor(Math.random() * 100) + 20} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center">
                  <span className="text-4xl font-bold text-gray-900">
                    ${currentPrice.toFixed(2)}
                  </span>
                  <span className="ml-2 px-2 py-1 bg-red-50 text-red-600 text-sm font-medium rounded-full">
                    -{discountPercentage}%
                  </span>
                </div>
                <div className="text-sm text-gray-400 line-through">
                  ${originalPrice}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">
                {product.description || 'No description available.'}
              </p>

              {/* Color Selector */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                <div className="flex space-x-2">
                  {['Black', 'White', 'Gray', 'Brown'].map((color) => (
                    <button
                      key={color}
                      className="w-10 h-10 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    >
                      <span className="sr-only">{color}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        decrementQuantity();
                      }}
                      className="px-3 py-1 text-xl text-gray-600 hover:bg-gray-100 focus:outline-none"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-12 text-center border-l border-r border-gray-300 py-1">
                      {quantity}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        incrementQuantity();
                      }}
                      className="px-3 py-1 text-xl text-gray-600 hover:bg-gray-100 focus:outline-none"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {quantity} {quantity === 1 ? 'item' : 'items'} selected
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 w-full">
                  <Button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-white py-6 px-8 text-base font-medium transition-colors"
                  >
                    {isAddingToCart ? (
                      <>
                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart ({quantity})
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    variant="outline"
                    className="flex-1 md:flex-none py-6 px-8 text-base font-medium"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
              
              {/* Features */}
              <div className="space-y-4 py-6 border-t border-gray-200">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Free Shipping</h4>
                    <p className="text-sm text-gray-500">
                      Free shipping on all orders over $50
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">2-Year Warranty</h4>
                    <p className="text-sm text-gray-500">
                      Protection against manufacturing defects
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">In Stock</h4>
                    <p className="text-sm text-gray-500">
                      Ready to ship within 1-2 business days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 border-t border-gray-200 pt-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button className="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600">
                Product Details
              </button>
              <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                Reviews
              </button>
              <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                Shipping & Returns
              </button>
            </nav>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Description</h3>
            <div className="prose max-w-none text-gray-600">
              <p>{product.description || 'No detailed description available.'}</p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>High-quality materials for durability and comfort</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Designed for both style and functionality</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Easy to assemble with included instructions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="group relative">
                  <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gray-50">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      <a href={`/product/${categoryId}/${relatedProduct.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {relatedProduct.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;

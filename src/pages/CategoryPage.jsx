import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryById, getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import CategoryBanner from '@/components/CategoryBanner';
import { Button } from '@/components/ui/button';
import { ChevronLeft, SlidersHorizontal, X, ChevronDown, Grid, List } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = getCategoryById(categoryId);
  const allProducts = getProductsByCategory(categoryId);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    ratings: [],
    categories: []
  });
  
  const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'
  const { translations } = useLanguage();

  // Apply filters to products
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const withinPriceRange = 
        product.price >= filters.priceRange[0] && 
        product.price <= filters.priceRange[1];
      const matchesRating = filters.ratings.length === 0 || 
        filters.ratings.some(rating => Math.floor(product.rating) >= rating);
      const matchesCategory = filters.categories.length === 0;
      return withinPriceRange && matchesRating && matchesCategory;
    });
  }, [allProducts, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl mb-6">{translations.category?.notFound || 'Category not found'}</p>
          <Button onClick={() => navigate('/')}>
            {translations.common?.backToHome || 'Back to Home'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Full Width Banner Section */}
      <div className="w-full">
        <CategoryBanner category={categoryId} />
        
        <div className="container mx-auto px-0 text-center space-y-4 py-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            {category.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {category.description}
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>{translations.category?.productsFound?.replace('{count}', filteredProducts.length) || `${filteredProducts.length} products available`}</span>
            <button 
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {translations.category?.filters?.filterAndSort || 'Filter & Sort'}
            </button>
          </div>
      </div>

      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div 
                className="absolute inset-0 bg-black/20" 
                onClick={() => setShowMobileFilters(false)} 
              />
              <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">{translations.category?.filters?.title || 'Filters'}</h2>
                  <button 
                    onClick={() => setShowMobileFilters(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterSidebar 
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  maxPrice={5000}
                />
              </div>
            </div>
          )}

          {/* Desktop Filter Sidebar */}

          <div className="hidden lg:block w-72 shrink-0 pl-4">
            <FilterSidebar 
              filters={filters}
              onFilterChange={handleFilterChange}
              maxPrice={5000}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  {filteredProducts.length} {filteredProducts.length === 1 
                    ? translations.category?.singleProduct || 'Item'
                    : translations.category?.multipleProducts || 'Items'}
                </span>
                <div className="h-5 w-px bg-gray-200" />
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center">
                  {translations.category?.filters?.sortBy || 'Sort by:'} 
                  <span className="ml-1 font-semibold text-gray-900">
                    {translations.category?.sortOptions?.featured || 'Featured'}
                  </span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
              <div className="hidden sm:flex items-center space-x-2">
                <button 
                  onClick={() => setViewType('grid')}
                  className={`p-2 rounded-md ${viewType === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  aria-label="Grid view"
                >
                  <Grid 
                    className={`w-5 h-5 ${viewType === 'grid' ? 'text-gray-900' : 'text-gray-400'}`} 
                    title={translations.category?.filters?.viewOptions?.grid || 'Grid view'}
                  />
                </button>
                <button 
                  onClick={() => setViewType('list')}
                  className={`p-2 rounded-md ${viewType === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  aria-label="List view"
                >
                  <List 
                    className={`w-5 h-5 ${viewType === 'list' ? 'text-gray-900' : 'text-gray-400'}`} 
                    title={translations.category?.filters?.viewOptions?.list || 'List view'}
                  />
                </button>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className={viewType === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8' 
                : 'space-y-4'}
              >
                {filteredProducts.map((product) => (
                  <div key={product.id} className={viewType === 'list' ? 'border-b pb-6 last:border-b-0' : ''}>
                    <ProductCard 
                      product={{
                        ...product,
                        categoryId: categoryId,
                        viewType: viewType
                      }} 
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">
                  {translations.category?.filters?.noProducts?.title || 'No products found'}
                </h3>
                <p className="mt-2 text-gray-500">
                  {translations.category?.filters?.noProducts?.description || "Try adjusting your filters to find what you're looking for."}
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setFilters({ priceRange: [0, 5000], ratings: [], categories: [] })}
                >
                  {translations.category?.filters?.noProducts?.clearFilters || 'Clear all filters'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
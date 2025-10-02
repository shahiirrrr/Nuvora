import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Star, ChevronRight, Clock } from 'lucide-react';
import { searchProducts } from '@/data/products';
import { useLanguage } from '@/contexts/LanguageContext';

const Search = () => {
  const { translations } = useLanguage();
  const t = translations.search || {};
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounce search to avoid too many re-renders
  const debounce = (func, delay) => {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Perform the actual search
  const performSearch = useCallback((query) => {
    if (!query || query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const results = searchProducts(query);
      setSearchResults(results);
      setIsSearching(false);
      setHasSearched(true);
    }, 300);
  }, []);

  // Create debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchParams({ q: query });
      performSearch(query);
    }, 500),
    []
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setHasSearched(false);
    
    if (query.trim() === '') {
      setSearchResults([]);
      setSearchParams({});
      return;
    }
    
    debouncedSearch(query);
  };

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  // Initial search when component mounts with query param
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams, performSearch]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Banner */}
      <div className="bg-primary py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t.title || 'Find What You\'re Looking For'}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            {t.subtitle || 'Discover our wide range of furniture and home decor items'}
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={t.placeholder || 'Search for furniture, decor, and more...'}
              className="w-full px-6 py-5 pr-16 text-gray-700 bg-white rounded-lg shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-lg"
              autoComplete="off"
              aria-label={t.ariaLabel || 'Search products'}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-accent hover:bg-accent/90 text-white p-3 rounded-full transition-colors duration-200"
              aria-label="Search"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isSearching ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-3 w-64 bg-gray-100 rounded"></div>
            </div>
          </div>
        ) : searchQuery ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {t.results?.title?.replace('{query}', searchQuery) || `Search results for "${searchQuery}"`}
              {searchResults.length > 0 && (
                <span className="text-gray-500 text-lg font-normal ml-2">
                  {t.results?.itemsFound?.replace('{count}', searchResults.length) || `${searchResults.length} ${searchResults.length === 1 ? 'item' : 'items'} found`}
                </span>
              )}
            </h2>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((product) => (
                  <Link 
                    key={`${product.categoryId}-${product.id}`}
                    to={`/category/${product.categoryId}#${product.id}`}
                    className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 border border-gray-100"
                  >
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder-product.jpg';
                        }}
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 mr-1 fill-yellow-400" />
                        {product.rating}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                        </div>
                        <span className="font-semibold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-3 flex items-center text-sm text-primary font-medium">
                        View details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : hasSearched ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
                <div className="max-w-md mx-auto">
                  <div className="h-16 w-16 mx-auto mb-4 flex items-center justify-center bg-gray-50 rounded-full">
                    <SearchIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {t.results?.noResults?.title || 'No results found'}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {t.results?.noResults?.message?.replace('{query}', searchQuery) || 
                      `We couldn't find any products matching "${searchQuery}". Try checking your spelling or using different keywords.`}
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {t.results?.noResults?.button || 'Clear search'}
                  </button>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-lg mx-auto">
              <div className="h-16 w-16 mx-auto mb-4 flex items-center justify-center bg-gray-50 rounded-full">
                <SearchIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                {t.results?.suggestions?.title || 'What are you looking for?'}
              </h2>
              <p className="text-gray-500 mb-6">
                {t.results?.suggestions?.message || 'Search for furniture, decor, or any home essentials. Try terms like "sofa", "dining table", or "bedroom set".'}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
                {(t.results?.suggestions?.popularSearches || ['Sofas', 'Dining Sets', 'Beds', 'Lighting', 'Storage', 'Decor']).map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

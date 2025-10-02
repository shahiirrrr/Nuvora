import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X, Star, Filter, ChevronDown, ChevronUp } from 'lucide-react';

const FilterSection = ({ title, children, isOpen: isOpenProp = true, onToggle }) => {
  const [isOpen, setIsOpen] = useState(isOpenProp);
  
  const toggleSection = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <div className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
      <button 
        onClick={toggleSection}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="space-y-4 pb-2">
          {children}
        </div>
      )}
    </div>
  );
};

const FilterSidebar = ({ 
  filters, 
  onFilterChange,
  priceRange = [0, 5000],
  maxPrice = 5000
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [openSections, setOpenSections] = useState({
    price: true,
    rating: true,
    category: true
  });

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handlePriceChange = (value) => {
    setLocalPriceRange(value);
  };

  const handlePriceChangeEnd = (value) => {
    onFilterChange({ ...localFilters, priceRange: value });
  };

  const handleRatingChange = (rating) => {
    const newRatings = localFilters.ratings?.includes(rating)
      ? localFilters.ratings.filter(r => r !== rating)
      : [...(localFilters.ratings || []), rating];
    
    const newFilters = { ...localFilters, ratings: newRatings };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryChange = (category) => {
    const newCategories = localFilters.categories?.includes(category)
      ? localFilters.categories.filter(c => c !== category)
      : [...(localFilters.categories || []), category];
    
    const newFilters = { ...localFilters, categories: newCategories };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = { ratings: [], categories: [], priceRange: [0, maxPrice] };
    setLocalFilters(resetFilters);
    setLocalPriceRange([0, maxPrice]);
    onFilterChange(resetFilters);
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="w-72 space-y-2 rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        <button 
          onClick={clearFilters}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-6">
        {/* Price Range Filter */}
        <FilterSection 
          title="Price Range" 
          isOpen={openSections.price}
          onToggle={(isOpen) => toggleSection('price')}
        >
          <div className="px-1">
            <Slider
              min={0}
              max={maxPrice}
              step={50}
              value={localPriceRange}
              onValueChange={handlePriceChange}
              onValueCommit={handlePriceChangeEnd}
              minStepsBetweenThumbs={1}
              className="my-4"
            />
            <div className="mt-6 flex items-center justify-between gap-2">
              <div className="flex-1 rounded-md border border-gray-300 px-3 py-2">
                <span className="text-sm text-gray-500">Min</span>
                <div className="text-base font-medium">${localPriceRange[0]}</div>
              </div>
              <div className="h-px w-3 bg-gray-300"></div>
              <div className="flex-1 rounded-md border border-gray-300 px-3 py-2">
                <span className="text-sm text-gray-500">Max</span>
                <div className="text-base font-medium">${localPriceRange[1]}</div>
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Rating Filter */}
        <FilterSection 
          title="Rating" 
          isOpen={openSections.rating}
          onToggle={(isOpen) => toggleSection('rating')}
        >
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const isActive = localFilters.ratings?.includes(rating);
              return (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`flex w-full items-center justify-between rounded-lg p-2 ${isActive ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">& Up</span>
                  </div>
                  {isActive && <div className="h-2 w-2 rounded-full bg-blue-600"></div>}
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* Categories Filter */}
        <FilterSection 
          title="Categories" 
          isOpen={openSections.category}
          onToggle={(isOpen) => toggleSection('category')}
        >
          <div className="space-y-3">
            {['Sofas', 'Chairs', 'Tables', 'Beds', 'Storage', 'Lighting'].map((category) => {
              const isActive = localFilters.categories?.includes(category);
              return (
                <div key={category} className="flex items-center">
                  <Checkbox 
                    id={`category-${category}`}
                    checked={isActive}
                    onCheckedChange={() => handleCategoryChange(category)}
                    className={`h-5 w-5 rounded ${isActive ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}
                  />
                  <label 
                    htmlFor={`category-${category}`}
                    className="ml-3 text-sm font-medium text-gray-700"
                  >
                    {category}
                  </label>
                </div>
              );
            })}
          </div>
        </FilterSection>
      </div>
    </div>
  );
};

export default FilterSidebar;

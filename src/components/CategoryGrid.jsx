import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

const CategoryGrid = () => {
  const categoryImages = {
    living: '/Living.jpg',
    dining: '/Dining.jpg',
    bedroom: '/Bedroom.jpg',
    decor: '/Decor.jpg',
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative block rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={categoryImages[category.id]}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                  {category.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {category.products ? `${category.products} products` : 'Shop now'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;

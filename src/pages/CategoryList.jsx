import React from 'react';
import { Link } from 'react-router-dom';
import CategoryBanner from '@/components/CategoryBanner';
import CategoryGrid from '@/components/CategoryGrid';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const CategoryList = () => {
  return (
    <div className="w-full">
      <div className="w-full">
        <CategoryBanner />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <CategoryGrid />
      
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-gray-600 mb-6">Explore our full collection or contact our support team for assistance.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-black hover:bg-gray-800 flex items-center gap-2">
              <Link to="/search">
                <Search className="w-4 h-4" />
                Search Products
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const CategoryBanner = ({ category }) => {
  const { translations } = useLanguage();
  
  const getOptimizedImage = (imagePath) => {
    if (!imagePath) return '';
    const filename = imagePath.split('/').pop();
    const name = filename.split('.')[0];
    return {
      webp: `/optimized/${name}.webp`,
      jpg: `/optimized/${name}.jpg`,
      placeholder: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYwMCI+PHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1JSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjY2NjIj5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg==`,
    };
  };

  const banners = {
    living: {
      title: translations.category?.banners?.living?.title || 'Living Room Collection',
      subtitle: translations.category?.banners?.living?.subtitle || 'Discover comfort and style for your living space',
      image: getOptimizedImage('/banner-living.jpg'),
      buttonText: translations.category?.banners?.living?.buttonText || 'Shop Now',
      position: 'left'
    },
    dining: {
      title: translations.category?.banners?.dining?.title || 'Dining in Style',
      subtitle: translations.category?.banners?.dining?.subtitle || 'Elevate your dining experience with our collection',
      image: getOptimizedImage('/banner-dining.jpg'),
      buttonText: translations.category?.banners?.dining?.buttonText || 'View Collection',
      position: 'right'
    },
    bedroom: {
      title: translations.category?.banners?.bedroom?.title || 'Your Dream Bedroom',
      subtitle: translations.category?.banners?.bedroom?.subtitle || 'Create a peaceful retreat with our bedroom furniture',
      image: getOptimizedImage('/banner-bedroom.jpg'),
      buttonText: translations.category?.banners?.bedroom?.buttonText || 'Shop Bedroom',
      position: 'left'
    },
    decor: {
      title: translations.category?.banners?.decor?.title || 'Home Decor',
      subtitle: translations.category?.banners?.decor?.subtitle || 'Find the perfect accents to complete your space',
      image: getOptimizedImage('/banner-decor.jpg'),
      buttonText: translations.category?.banners?.decor?.buttonText || 'Explore Decor',
      position: 'right'
    },
    default: {
      title: translations.category?.banners?.default?.title || 'Shop by Category',
      subtitle: translations.category?.banners?.default?.subtitle || 'Discover our curated collections for every room in your home',
      image: getOptimizedImage('/category-banner.jpg'),
      buttonText: translations.category?.banners?.default?.buttonText || 'Explore All',
      position: 'center'
    }
  };
  const banner = category ? banners[category] || banners.default : banners.default;
  const isCentered = banner.position === 'center';

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
      <div className="relative h-64 md:h-96 overflow-hidden rounded-xl bg-gray-100">
        <picture>
          <source srcSet={banner.image.webp} type="image/webp" />
          <img
            src={banner.image.jpg}
            alt=""
            loading="lazy"
            width={1200}
            height={600}
            className={`w-full h-full object-cover ${isCentered ? 'object-center' : ''}`}
            style={{
              contentVisibility: 'auto',
              backgroundColor: '#f5f5f5',
              backgroundImage: `url(${banner.image.placeholder})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
            decoding="async"
          />
        </picture>
      </div>
      <div className={`relative z-10 h-full flex ${isCentered ? 'items-center justify-center text-center' : 'items-center'} p-8 md:p-12`}>
        <div className={`max-w-2xl ${isCentered ? 'mx-auto' : ''}`}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            {banner.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6">
            {banner.subtitle}
          </p>
          <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
            <Link to={category ? `/category/${category}` : '/category'}>
              {banner.buttonText}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;

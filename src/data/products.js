export const categories = [
  {
    id: 'living',
    name: 'Living Room',
    description: 'Stylish and comfortable furniture for your living space',
    products: 45
  },
  {
    id: 'dining',
    name: 'Dining',
    description: 'Elegant dining sets for memorable meals',
    products: 32
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    description: 'Create your perfect sleep sanctuary',
    products: 56
  },
  {
    id: 'decor',
    name: 'Home Decor',
    description: 'Beautiful accents to complete your space',
    products: 78
  }
];

export const products = {
  living: [
    {
      id: 'l1',
      name: 'Modern Sofa Set',
      price: 1299.99,
      image: '/src/assets/images/products/living/modern-sofa-set.jpg',
      description: 'Contemporary 3-seater sofa with matching armchairs',
      rating: 4.8
    },
    {
      id: 'l2',
      name: 'Coffee Table',
      price: 349.99,
      image: '/src/assets/images/products/living/coffee-table.jpg',
      description: 'Minimalist oak coffee table with storage',
      rating: 4.5
    },
    {
      id: 'l3',
      name: 'TV Stand',
      price: 429.99,
      image: '/src/assets/images/products/living/tv-stand.jpg',
      description: 'Sleek 60" media console with glass doors',
    },
    {
      id: 'l4',
      name: 'Accent chair',
      price: 279.99,
      image: '/src/assets/images/products/living/accent-chair.jpg',
      description: 'Velvet upholstered accent chair with gold legs',
      rating: 4.6
    },
    {
      id: 'l5',
      name: 'Bookshelf',
      price: 199.99,
      image: '/src/assets/images/products/living/bookshelf.jpg',
      description: '5-tier industrial bookshelf',
      rating: 4.4
    },
    {
      id: 'l6',
      name: 'Sectional Sofa',
      price: 1899.99,
      image: '/src/assets/images/products/living/sectional-sofa.jpg',
      description: 'L-shaped sectional with chaise',
      rating: 4.9
    }
  ],
  dining: [
    {
      id: 'd1',
      name: 'Dining Table Set',
      price: 899.99,
      image: '/src/assets/images/products/dining/dining-table-set.jpg',
      description: '6-seater extendable dining table with chairs',
      rating: 4.7
    },
    {
      id: 'd2',
      name: 'Modern Bar Stools',
      price: 199.99,
      image: '/src/assets/images/products/dining/bar-stools.jpg',
      description: 'Set of 2 modern counter stools with backrest',
      rating: 4.5
    },
    {
      id: 'd3',
      name: 'Buffet Sideboard',
      price: 649.99,
      image: '/src/assets/images/products/dining/buffet-sideboard.jpg',
      description: 'Mid-century modern sideboard with 4 doors',
      rating: 4.6
    },
    {
      id: 'd4',
      name: 'Upholstered Dining Bench',
      price: 229.99,
      image: '/src/assets/images/products/dining/upholstered-dining-bench.jpg',
      description: 'Upholstered dining bench with wood legs',
      rating: 4.4
    },
    {
      id: 'd5',
      name: 'China Cabinet',
      price: 749.99,
      image: '/src/assets/images/products/dining/china-cabinet.jpg',
      description: 'Glass-front display cabinet with lighting',
      rating: 4.8
    },
    {
      id: 'd6',
      name: 'Kitchen Island',
      price: 1299.99,
      image: '/src/assets/images/products/dining/kitchen-island.jpg',
      description: 'Rolling kitchen island with butcher block top',
      rating: 4.9
    }
  ],
  bedroom: [
    {
      id: 'b1',
      name: 'Queen Bed Frame',
      price: 799.99,
      image: '/src/assets/images/products/bedroom/queen-bed-frame.jpg',
      description: 'Upholstered platform bed with headboard',
      rating: 4.8
    }
  ],
  decor: [
    {
      id: 'dc1',
      name: 'Floor Lamp',
      price: 129.99,
      image: '/src/assets/images/products/decor/floor-lamp.jpg',
      description: 'Modern arc floor lamp with dimmer',
      rating: 4.7
    }
  ]
};

export const getCategoryById = (id) => {
  return categories.find(category => category.id === id);
};

export const getProductsByCategory = (categoryId) => {
  return products[categoryId] || [];
};

export const searchProducts = (query) => {
  if (!query || query.trim() === '') return [];
  
  const searchTerm = query.toLowerCase().trim();
  const results = [];
  
  // Search through all categories
  Object.entries(products).forEach(([category, items]) => {
    items.forEach(product => {
      const matchesName = product.name.toLowerCase().includes(searchTerm);
      const matchesDescription = product.description.toLowerCase().includes(searchTerm);
      const matchesCategory = categories.find(cat => 
        cat.id === category && 
        (cat.name.toLowerCase().includes(searchTerm) || 
         cat.description.toLowerCase().includes(searchTerm))
      );
      
      if (matchesName || matchesDescription || matchesCategory) {
        results.push({
          ...product,
          category: categories.find(cat => cat.id === category)?.name || 'Unknown',
          categoryId: category
        });
      }
    });
  });
  
  return results;
};

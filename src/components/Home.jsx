import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';
import config from '../utils/config';

const Home = () => {
  const { menuItems } = useMenu();
  // Normalize category names to match Menu.jsx logic
  const normalizeCategory = (category) => {
    if (!category) return '';
    const categoryName = typeof category === 'object' ? category.name : category;
    return categoryName.toString().toLowerCase().trim();
  };

  // Match createSlug logic from Menu.jsx to preserve parentheses
  const createSlug = (category) => {
    const categoryName = typeof category === 'object' ? category.name : category;
    return normalizeCategory(categoryName)
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, ''); // Remove all characters that are not a-z, 0-9, or hyphen
  };
  const categoriesWithCount = useMemo(() => {
    if (!menuItems) return [];
    const categoryMap = new Map();


    menuItems.forEach(item => {
      if (!categoryMap.has(item.category)) {
        const originalCategory = item.category;
        const lowerCaseCategory = createSlug(originalCategory);//.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, ''); // Normalize category name: lowercase, spaces to hyphens, remove other special chars
        const imageUrl = `/categoryImages/${lowerCaseCategory}.png`; // Construct image URL directly
        console.log(`Processing category: "${originalCategory}", Processed for matching: "${lowerCaseCategory}", Image URL: ${imageUrl}`);
        categoryMap.set(item.category, { name: item.category, imageUrl: imageUrl, count: 0 });
      }
      categoryMap.get(item.category).count++;
    });
    return Array.from(categoryMap.values());
  }, [menuItems]);



  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="bg-amber-50 py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to {config.restaurantName}</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the authentic taste of traditional Indian sweets and snacks, made with love and the finest ingredients.
          </p>
          <Link
            to="/menu"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-full inline-block transition duration-300"
          >
            View Our Menu
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">Our Categories</h2>
          <div className="categories-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoriesWithCount.map((category) => (
              <Link
                to={`/menu/${createSlug(category.name)}`}
                key={category.name}
                className="category-card relative block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{
                  backgroundImage: `url(${category.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  paddingTop: '100%', // Maintain aspect ratio for card size
                }}
              >
                <div className="absolute inset-0  flex items-center justify-center p-4">
                  <h3 className="text-white text-xl font-semibold text-center">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-lg text-gray-800 mb-8">Established with a passion for authentic Indian sweets and snacks, {config.restaurantName} has been serving happiness since 1990.</p>
            <Link
              to="/about"
              className="text-amber-600 font-semibold hover:text-amber-700 inline-flex items-center"
            >
              Learn more about us
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
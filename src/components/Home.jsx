import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';
import config from '../utils/config';

const Home = () => {
  const { menuItems } = useMenu();

  const categories = useMemo(() => {
    if (!menuItems) return [];
    const categoryMap = new Map();
    menuItems.forEach(item => {
      if (!categoryMap.has(item.category)) {
        categoryMap.set(item.category, { name: item.category, imageUrl: '/category-image.png' });
      }
    });
    return Array.from(categoryMap.values());
  }, [menuItems]);

  const createSlug = (category) => {
    return category.toLowerCase().replace(/ /g, '-').replace(/\//g, '-');
  };

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

      <div className="categories-grid">
        {categories.map((category) => (
          <Link
            to={`/menu/${createSlug(category.name)}`}
            key={category.name}
            className="category-card"
            style={{
              backgroundImage: `url(${category.imageUrl})`,
            }}
          >
            <div className="category-card-overlay">
              <h3>{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>

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
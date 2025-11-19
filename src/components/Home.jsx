import React from 'react';
import { Link } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';
import config from '../utils/config';

const Home = () => {
  const { categories } = useMenu();
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

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="bg-amber-50 py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to <span className="text-amber-600">{config.restaurantName}</span></h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {config.description}
          </p>
          <Link
            to="/menu"
            className="my-special-color bg-primary hover:bg-primary text-white font-semibold py-3 px-8 rounded-full inline-block transition duration-300"
          >
            View Our Menu
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Explore Our Menu</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/menu"
              className="category-card block overflow-hidden rounded-xl shadow-xl hover:shadow-xl transition-shadow duration-300 bg-white relative group aspect-w-16 aspect-h-9 relative"
              style={{
                backgroundImage: `url(/logo.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >

              {/* Category name */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black rounded-lg p-2 z-10">
                <h3 className="text-white text-lg md:text-xl font-semibold">All Items</h3>
              </div>
            </Link>
            {categories.map((category) => (
              <Link
                to={`/menu/${createSlug(category.name)}`}
                key={category.name}
                className="category-card block overflow-hidden rounded-xl shadow-xl hover:shadow-xl transition-shadow duration-300 bg-white relative group aspect-w-16 aspect-h-9 relative"
                style={{
                  backgroundImage: `url(${category.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
               

                {/* Category name */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black rounded-lg p-2 z-10">
                  <h3 className="text-white text-lg md:text-xl font-semibold">{category.name}</h3>
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
            <p className="text-lg text-gray-800 mb-8">{config.ourStory}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
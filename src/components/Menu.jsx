import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';

const Menu = () => {
  const { menuItems, categories, loading, error } = useMenu();
  const { category: urlCategory } = useParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  // Normalize category names for comparison and URL slugs
  const normalizeCategory = (category) => {
    if (!category) return '';
    return category.toString().toLowerCase().trim();
  };

  const createSlug = (category) => {
    return normalizeCategory(category).replace(/\s+/g, '-');
  };

  // Find the exact category name from the URL parameter
  useEffect(() => {
    if (!urlCategory) {
      setActiveCategory('all');
      return;
    }

    if (categories.length > 0) {
      // Find category by comparing slugs
      const foundCategory = categories.find(
        cat => createSlug(cat) === urlCategory.toLowerCase()
      );

      console.log('URL Category:', urlCategory);
      console.log('Available categories:', categories);
      console.log('Found category:', foundCategory);

      if (foundCategory) {
        setActiveCategory(foundCategory);
      } else {
        console.warn(`Category "${urlCategory}" not found. Redirecting to all items.`);
        navigate('/menu');
        setActiveCategory('all');
      }
    }
  }, [urlCategory, categories, navigate]);

  // Filter items by active category
  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => 
        normalizeCategory(item.category) === normalizeCategory(activeCategory)
      );

  const handleCategoryClick = (category) => {
    if (category === 'all') {
      navigate('/menu');
      setActiveCategory('all');
    } else {
      const urlFriendlyCategory = createSlug(category);
      navigate(`/menu/${urlFriendlyCategory}`);
      setActiveCategory(category);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {activeCategory === 'all' ? 'Our Menu' : activeCategory}
        </h1>
        
        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-2 mb-6 hide-scrollbar">
          <div className="flex space-x-2">
            <button
              onClick={() => handleCategoryClick('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === 'all'
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All Items
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  normalizeCategory(activeCategory) === normalizeCategory(category)
                    ? 'bg-amber-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div key={index} className="group bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200 aspect-square flex flex-col">
                <div className="p-3 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium text-gray-800 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                    <span className="text-amber-600 font-medium text-sm whitespace-nowrap ml-2">
                      ₹{item.price}
                    </span>
                  </div>
                  <span className="mt-auto text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full self-start">
                    {item.category}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No items found in this category.</p>
            </div>
          )}
        </div>
        
        {error && (
          <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-lg text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
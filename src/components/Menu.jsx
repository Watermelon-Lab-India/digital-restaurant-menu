import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';
import config from '../utils/config';
import ItemList from './ItemList';
const Menu = () => {
  const { menuItems, categories, subCategories, loading, error } = useMenu();
  const { category: urlCategory } = useParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubCategory, setActiveSubCategory] = useState('all');
  const navigate = useNavigate();
  const activeCategoryRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Effect to reset active category to 'all' when search term is entered
  useEffect(() => {
    if (searchTerm) {
      setActiveCategory('all');
      setActiveSubCategory('all');
      navigate('/menu'); // Optionally navigate to /menu to clear category from URL
    }
  }, [searchTerm, navigate]);

  // Normalize category names for comparison and URL slugs
  const normalizeCategory = (category) => {
    if (!category) return '';
    // If category is an object, use its name property, otherwise use the category itself
    const categoryName = typeof category === 'object' ? category.name : category;
    return categoryName.toString().toLowerCase().trim();
  };

  const createSlug = (category) => {
    // If category is an object, use its name property, otherwise use the category itself
    const categoryName = typeof category === 'object' ? category.name : category;
    return normalizeCategory(categoryName)
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, ''); // Remove all characters that are not a-z, 0-9, or hyphen
  };

  // Find the exact category name from the URL parameter
  useEffect(() => {
    if (!urlCategory) {
      setActiveCategory('all');
      setActiveSubCategory('all');
      return;
    }

    if (categories.length > 0) {
      // Find category by comparing slugs
      const foundCategory = categories.find(
        cat => createSlug(cat) === urlCategory.toLowerCase()
      );

      if (foundCategory) {
        setActiveCategory(foundCategory);
        setActiveSubCategory('all'); // Reset sub-category when main category changes
      } else {
        navigate('/menu');
        setActiveCategory('all');
        setActiveSubCategory('all');
      }
    }
  }, [urlCategory, categories, navigate]);

  // Scroll to top when category changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [urlCategory]);

  // Scroll active category into view
  useEffect(() => {
    if (activeCategoryRef.current) {
      activeCategoryRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeCategory]);

  // Filter items by active category and search term
  const filteredItems = useMemo(() => {
    let itemsToFilter = menuItems;

    if (activeCategory !== 'all') {
      itemsToFilter = itemsToFilter.filter(item => 
        normalizeCategory(item.category) === normalizeCategory(activeCategory)
      );
    }

    if (activeSubCategory !== 'all') {
      itemsToFilter = itemsToFilter.filter(item => 
        normalizeCategory(item.subCategory) === normalizeCategory(activeSubCategory)
      );
    }

    if (searchTerm) {
      itemsToFilter = itemsToFilter.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    return itemsToFilter;
  }, [activeCategory, activeSubCategory, menuItems, searchTerm]);

  const handleCategoryClick = (category) => {
    if (category === 'all') {
      navigate('/menu');
      setActiveCategory('all');
      setActiveSubCategory('all');
    } else {
      const urlFriendlyCategory = createSlug(category);
      navigate(`/menu/${urlFriendlyCategory}`);
      setActiveCategory(category); // Keep the full category object in activeCategory
      setActiveSubCategory('all'); // Reset sub-category when main category changes
    }
  };

  const handleSubCategoryClick = (subCategory) => {
    setActiveSubCategory(subCategory);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  const currentCategoryTitle = activeCategory === 'all' ? 'Our Menu' : activeCategory.name;
  const currentSubCategoryTitle = activeSubCategory === 'all' ? '' : ` - ${activeSubCategory}`;

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {currentCategoryTitle}{currentSubCategoryTitle}
        </h1>
        
        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for dishes..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-2 mb-6 hide-scrollbar">
          <div className="flex space-x-2">
            <button
              onClick={() => handleCategoryClick('all')}
              className={`flex-shrink-0 flex flex-col items-center justify-center p-2 rounded-lg transition-colors w-24 h-24 ${
                activeCategory === 'all'
                  ? 'my-special-color bg-amber-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              ref={activeCategory === 'all' ? activeCategoryRef : null}
            >
              {/* <img
                src={config.logoPath} // Using the logo from config for "All Items"
                alt="All Items"
                className="w-15 h-15 object-cover rounded-lg mb-1"
              /> */}
              <span className="text-xs font-medium text-center whitespace-nowrap overflow-hidden text-ellipsis">
                All Items
              </span>
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className={`flex-shrink-0 flex flex-col items-center justify-center p-2 rounded-lg transition-colors w-24 h-24 ${
                  normalizeCategory(activeCategory) === normalizeCategory(category)
                    ? 'my-special-color bg-amber-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
                ref={normalizeCategory(activeCategory) === normalizeCategory(category) ? activeCategoryRef : null}
              >
                {category.imageUrl && (
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-15 h-15 object-cover rounded-lg mb-1"
                  />
                )}
                <span className="text-xs font-medium text-center whitespace-nowrap overflow-hidden text-ellipsis">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Sub-Category Filter */}
        {activeCategory !== 'all' && (
          <div className="flex overflow-x-auto pb-2 mb-6 hide-scrollbar">
            <div className="flex space-x-2">
              <button
                onClick={() => handleSubCategoryClick('all')}
                className={`px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  activeSubCategory === 'all'
                    ? 'my-special-color bg-amber-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                All Sub-Categories
              </button>
              {subCategories
                .filter(subCat => 
                  menuItems.some(item => 
                    normalizeCategory(item.category) === normalizeCategory(activeCategory) && 
                    normalizeCategory(item.subCategory) === normalizeCategory(subCat)
                  )
                )
                .map((subCategory, index) => (
                  <button
                    key={index}
                    onClick={() => handleSubCategoryClick(subCategory)}
                    className={`px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                      normalizeCategory(activeSubCategory) === normalizeCategory(subCategory)
                        ? 'my-special-color bg-amber-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {subCategory}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Menu Items */}
        <ItemList items={filteredItems} />
        
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
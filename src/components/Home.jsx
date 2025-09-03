import { Link } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';

const Home = () => {
  const { categories, menuItems, loading } = useMenu();

  // Create URL-friendly slug for categories
  const createSlug = (category) => {
    return category.toLowerCase().replace(/\s+/g, '-');
  };

  // Count items per category
  const categoriesWithCount = categories.map(category => ({
    name: category,
    count: menuItems.filter(item => item.category === category).length,
    slug: createSlug(category)
  }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-amber-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Welcome to Apna Sweets
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
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
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Our Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {categoriesWithCount.map((category, index) => (
              <Link 
                key={index} 
                to={`/menu/${category.slug}`}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 aspect-square flex flex-col items-center justify-center p-3 text-center"
              >
                <h3 className="text-sm font-medium text-gray-800 group-hover:text-amber-600 transition-colors line-clamp-2">
                  {category.name}
                </h3>
                <p className="text-xs text-amber-600 mt-1">{category.count} items</p>
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
            <p className="text-gray-600 mb-8">
              Established with a passion for authentic Indian sweets and snacks, Apna Sweets has been serving happiness since 1990. 
              Our secret recipes passed down through generations, ensure every bite is a delightful experience.
            </p>
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
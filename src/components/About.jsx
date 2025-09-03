import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Story</h1>
          
          <div className="prose max-w-none">
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Apna Sweets</h2>
              <p className="text-gray-600 mb-6">
                Established in 1990, Apna Sweets has been serving authentic Indian sweets and snacks with love and dedication. 
                What started as a small sweet shop has now become a beloved destination for food lovers seeking traditional flavors.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Philosophy</h2>
              <p className="text-gray-600 mb-6">
                We believe in preserving the authentic taste of Indian sweets and snacks while maintaining the highest 
                standards of quality and hygiene. Every sweet is prepared with care, following traditional recipes 
                passed down through generations.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Specialties</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Traditional Indian Sweets made with pure ingredients</li>
                <li>Freshly prepared snacks throughout the day</li>
                <li>Custom orders for special occasions</li>
                <li>Catering services for events and celebrations</li>
              </ul>
            </div>

            <div className="text-center mt-12">
              <Link 
                to="/menu" 
                className="inline-flex items-center px-6 py-3 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
              >
                Explore Our Menu
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

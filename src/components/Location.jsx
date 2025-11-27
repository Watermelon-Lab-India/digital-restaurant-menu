import config from '../utils/config';
const Location = () => {
  const address = {
    street: config.contact.address.split(',')[0].trim(),
    city: config.contact.address.split(',')[1].trim(),
    state: config.contact.address.split(',')[2].trim().split(' ')[0],
    pincode: config.contact.address.split(',')[2].trim().split(' ')[1],
    phone: config.contact.phone,
    email: config.contact.email,
    mapUrl: config.mapUrl,
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Find Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Address Section */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Location</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700">Address</h3>
                <p className="text-gray-600">
                  {config.contact.address}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700">Phone</h3>
                {address.phone ? (
                  <a href={`tel:${address.phone.replace(/\s+/g, '')}`} className="text-my-special-color hover:underline">
                    {address.phone}
                  </a>
                ) : (
                  <p className="text-gray-600">N/A</p>
                )}
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700">Email</h3>
                {address.email ? (
                  <a href={`mailto:${address.email}`} className="text-my-special-color hover:underline">
                    {address.email}
                  </a>
                ) : (
                  <p className="text-gray-600">N/A</p>
                )}
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium text-gray-700 mb-2">Opening Hours</h3>
                <p className="text-gray-600">
                  {config.openingHours}
                </p>
              </div>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="h-96 w-full">
            <iframe
              title="Restaurant Location"
              src={address.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">We're Waiting For You!</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visit us today and experience the authentic taste of our traditional sweets and snacks. 
            Our friendly staff will be happy to serve you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Location;

          <h1 className="text-3xl font-bold text-gray-800 mb-6">Visit {config.restaurantName}</h1>

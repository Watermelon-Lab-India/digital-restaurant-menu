const Location = () => {
  const address = {
    street: '123 Sweet Street',
    city: 'Indore',
    state: 'Madhya Pradesh',
    pincode: '452001',
    phone: '+91 9424900099',
    email: 'info@apnasweets.com',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235527.4544703886!2d75.72376168437498!3d22.72391167701489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da2c1d43333!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin'
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
                  {address.street}<br />
                  {address.city}, {address.state}<br />
                  {address.pincode}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700">Phone</h3>
                <a href={`tel:${address.phone.replace(/\s+/g, '')}`} className="text-amber-600 hover:underline">
                  {address.phone}
                </a>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700">Email</h3>
                <a href={`mailto:${address.email}`} className="text-amber-600 hover:underline">
                  {address.email}
                </a>
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium text-gray-700 mb-2">Opening Hours</h3>
                <p className="text-gray-600">
                  Monday - Sunday: 10:30 AM - 11:30 PM
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

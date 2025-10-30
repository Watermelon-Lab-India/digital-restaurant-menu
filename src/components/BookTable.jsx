import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const BookTable = () => {
  const location = useLocation();
  const [customerInfo, setCustomerInfo] = useState({
    phone: '',
    name: '',
    tenantId: '',
  });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const jsonData = params.get('data');

    if (jsonData) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(jsonData)); // Decode URL component and parse JSON string
        setCustomerInfo({
          phone: parsedData.phone || '',
          name: parsedData.name || '',
          tenantId: parsedData.tenantId || '',
        });
      } catch (error) {
        console.error('Error decoding or parsing customer data:', error);
        // Optionally, handle error by setting default values or showing a message
      }
    }
  }, [location.search]);

  const getFormattedDate = (offset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  const timeSlots = [
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM',
  ];

  const guestOptions = [2, 4, 6, 8, '>10'];

  const today = getFormattedDate();
  const tomorrow = getFormattedDate(1);

  const handleBookTable = () => {
    if (!selectedDate || !selectedTime || !numberOfGuests) {
      alert('Please select a date, time, and number of guests.');
      return;
    }

    const bookingDetails = {
      date: selectedDate,
      time: selectedTime,
      guests: numberOfGuests,
      customerInfo: customerInfo,
    };
    alert('Booking functionality coming soon!');
    // Here you would typically make an API call to your backend
  };

  return (
    <div className="container mx-auto p-4 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Book a Table</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Removed customer info display for privacy */}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-center">Select Day:</label>
          <div className="flex flex-col sm:flex-row justify-around space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              className={`flex-1 py-2 px-4 rounded focus:outline-none ${selectedDate === today ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => setSelectedDate(today)}
            >
              Today
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded focus:outline-none ${selectedDate === tomorrow ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => setSelectedDate(tomorrow)}
            >
              Tomorrow
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-center">Select Time:</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {timeSlots.map((time, index) => (
              <button
                key={index}
                className={`py-2 px-4 rounded focus:outline-none ${selectedTime === time ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-center">Number of Guests:</label>
          <div className="flex flex-col sm:flex-row justify-around space-y-2 sm:space-y-0 sm:space-x-2">
            {guestOptions.map((guests, index) => (
              <button
                key={index}
                className={`flex-1 py-2 px-4 rounded focus:outline-none ${numberOfGuests === guests ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => setNumberOfGuests(guests)}
              >
                {guests}
              </button>
            ))}
          </div>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          onClick={handleBookTable}
        >
          Book Table
        </button>
      </div>
    </div>
  );
};

export default BookTable;
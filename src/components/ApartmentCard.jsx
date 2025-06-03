import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ApartmentCard = ({ apartment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleBookingClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDateRange([null, null]);
    setFormData({ name: '', email: '', phone: '' });
    setError(null);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setDateRange([start, end]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [startDate, endDate] = dateRange;
    if (!startDate || !endDate || !formData.name || !formData.email || !formData.phone) {
      setError('Please fill all fields and select a date range.');
      return;
    }

    // Generate array of dates between start and end
    const selectedDates = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      selectedDates.push(new Date(d).toISOString().split('T')[0]);
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5152/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apartmentId: apartment._id,
          selectedDates,
          userDetails: formData,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Booking successful!');
        handleCloseModal();
      } else {
        setError(result.error || 'Booking failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while booking. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Ensure bookedDates are valid Date objects
  const bookedDates = apartment.bookedDates
    ? apartment.bookedDates
        .map((date) => {
          const parsedDate = new Date(date);
          return isNaN(parsedDate.getTime()) ? null : parsedDate;
        })
        .filter((date) => date !== null)
    : [];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
      <img
        src={apartment.image}
        alt={apartment.title}
        className="h-60 w-full object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="p-6 space-y-3">
        <h3 className="text-2xl font-bold text-gray-800">{apartment.title}</h3>
        <p className="text-gray-500 uppercase text-xs tracking-wide font-medium">{apartment.type}</p>
        <p className="text-yellow-500 font-extrabold text-lg">
          PKR {apartment.pricePerDay.toLocaleString()}/day
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Amenities:</span> {apartment.amenities.join(', ')}
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handleBookingClick}
            className="inline-block mt-3 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Book Now
          </button>
          <a
            href={`https://wa.me/+923102700608`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Contact via WhatsApp
          </a>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl relative transform transition-all duration-300 scale-100 hover:scale-[1.02]">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
              aria-label="Close booking form"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Book {apartment.title}</h2>
            <p className="text-xs text-gray-500 mb-4">Select your stay dates</p>
            {error && (
              <p className="text-red-500 bg-red-50 p-2 rounded-lg mb-4 text-xs font-medium">{error}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 px-3 py-1.5 text-xs placeholder-gray-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 px-3 py-1.5 text-xs placeholder-gray-400"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="block w-full border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 px-3 py-1.5 text-xs placeholder-gray-400"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Stay Dates</label>
                <DatePicker
                  selectsRange
                  startDate={dateRange[0]}
                  endDate={dateRange[1]}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  excludeDates={bookedDates}
                  inline
                  calendarClassName="bg-white shadow-lg rounded-lg border border-gray-200 text-xs"
                  dayClassName={(date) =>
                    dateRange[0] && dateRange[1] && date >= dateRange[0] && date <= dateRange[1]
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : undefined
                  }
                  placeholderText="Select start and end dates"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-xs font-medium transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-xs font-medium transition-all duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApartmentCard;
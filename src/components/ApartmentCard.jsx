import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ApartmentCard = ({ apartment }) => {
  if (!apartment) return null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [shortUrl, setShortUrl] = useState('');

  const title = apartment.title?.trim() || 'Apartment';
  const image = apartment.image || 'https://via.placeholder.com/400x250?text=No+Image';
  const pricePerDay = apartment.pricePerDay ?? 0;
  const amenities = Array.isArray(apartment.amenities) ? apartment.amenities : [];

  const bookedDates = apartment.bookedDates?.map((date) => {
    const parsed = new Date(date);
    return isNaN(parsed) ? null : parsed;
  }).filter(Boolean) || [];

  useEffect(() => {
    const fetchShortUrl = async () => {
      const originalUrl = `http://127.0.0.0:5152/apartments/${apartment._id}`;
      try {
        const response = await fetch('http://127.0.0.0:5152/shorten-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: originalUrl }),
        });
        const data = await response.json();
        setShortUrl(data.shortUrl || originalUrl);
      } catch (err) {
        console.error('Shorten URL failed:', err);
        setShortUrl(originalUrl);
      }
    };
    fetchShortUrl();
  }, [apartment._id]);

  const handleBookingClick = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDateRange([null, null]);
    setFormData({ name: '', email: '', phone: '' });
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (dates) => setDateRange(dates);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [startDate, endDate] = dateRange;
    if (!startDate || !endDate || !formData.name || !formData.email || !formData.phone) {
      setError('Please fill all fields and select a date range.');
      return;
    }

    const selectedDates = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      selectedDates.push(new Date(d).toISOString().split('T')[0]);
    }

    setIsSubmitting(true);
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
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello! I'm interested in *${title}*. Can you tell me more? ${shortUrl}`
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden max-w-sm mx-auto">
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="h-64 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-1 truncate">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{apartment.city} • {apartment.type}</p>

        <div className="text-lg font-semibold text-amber-600 mb-3">
          PKR {pricePerDay.toLocaleString()}/day
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Amenities:</p>
          <div className="flex flex-wrap gap-2">
            {amenities.length > 0 ? (
              amenities.map((item, index) => (
                <span key={index} className="bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded-full">
                  {item}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">N/A</span>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleBookingClick}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-all"
          >
            Book Now
          </button>

          <a
            href={`https://wa.me/+923102700608?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded text-center transition-all"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button onClick={handleCloseModal} className="absolute top-3 right-3 text-gray-500 text-xl font-bold">×</button>
            <h2 className="text-lg font-bold mb-4">Book {title}</h2>
            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="peer w-full border-b-2 border-gray-300 bg-transparent px-1 pt-5 pb-2 text-sm text-gray-900 placeholder-transparent focus:border-indigo-600 focus:outline-none"
                  placeholder="Full Name"
                />
                <label htmlFor="name" className="absolute left-1 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600">Full Name</label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="peer w-full border-b-2 border-gray-300 bg-transparent px-1 pt-5 pb-2 text-sm text-gray-900 placeholder-transparent focus:border-indigo-600 focus:outline-none"
                  placeholder="Email"
                />
                <label htmlFor="email" className="absolute left-1 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600">Email</label>
              </div>

              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="peer w-full border-b-2 border-gray-300 bg-transparent px-1 pt-5 pb-2 text-sm text-gray-900 placeholder-transparent focus:border-indigo-600 focus:outline-none"
                  placeholder="Phone Number"
                />
                <label htmlFor="phone" className="absolute left-1 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600">Phone Number</label>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Select Dates:</p>
                <DatePicker
                  selectsRange
                  startDate={dateRange[0]}
                  endDate={dateRange[1]}
                  onChange={handleDateChange}
                  excludeDates={bookedDates}
                  minDate={new Date()}
                  inline
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
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

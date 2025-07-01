import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApartmentCard = ({ apartment }) => {
  if (!apartment) return null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    priceOption: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [shortUrl, setShortUrl] = useState('');

  const title = apartment.title?.trim() || 'Apartment';
  const image =
    apartment.image || 'https://via.placeholder.com/400x250?text=No+Image';

  const amenities = Array.isArray(apartment.amenities)
    ? apartment.amenities
    : [];

  const bookedDates =
    apartment.bookedDates
      ?.map((date) => {
        const parsed = new Date(date);
        return isNaN(parsed) ? null : parsed;
      })
      .filter(Boolean) || [];

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
    setFormData({
      name: '',
      email: '',
      phone: '',
      priceOption: '',
    });
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ UPDATED: Block selecting ranges that cross booked dates
  const handleDateChange = (dates) => {
    const [start, end] = dates;

    if (!end) {
      setDateRange([start, null]);
      return;
    }

    const overlaps = bookedDates.some(
      (bookedDate) => bookedDate >= start && bookedDate <= end
    );

    if (overlaps) {
      setError('Selected range includes unavailable dates. Please choose a different range.');
      setDateRange([null, null]);
    } else {
      setError(null);
      setDateRange([start, end]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [startDate, endDate] = dateRange;
    if (
      !startDate ||
      !endDate ||
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.priceOption
    ) {
      setError('Please complete all fields.');
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
          priceOption: formData.priceOption,
          userDetails: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Booking successful!');
        handleCloseModal();
      } else {
        toast.error(result.error || 'Booking failed.');
      }
    } catch (err) {
      setError('Booking failed. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello! I'm interested in *${title}*. Can you tell me more? ${shortUrl}`
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition overflow-hidden max-w-sm mx-auto">
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="h-64 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate">
          {title}
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          {apartment.city} • {apartment.type}
        </p>

        <div className="text-base font-medium text-amber-600 mb-3">
          {apartment.pricePerDay && (
            <div>PKR {apartment.pricePerDay.toLocaleString()}/day</div>
          )}
          {apartment.pricePerWeek && (
            <div>PKR {apartment.pricePerWeek.toLocaleString()}/week</div>
          )}
          {apartment.pricePerMonth && (
            <div>PKR {apartment.pricePerMonth.toLocaleString()}/month</div>
          )}
        </div>

        <div className="mb-3">
          <p className="text-xs font-medium text-gray-600 mb-1">Amenities:</p>
          <div className="flex flex-wrap gap-1">
            {amenities.length > 0 ? (
              amenities.map((item, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-[10px] text-gray-700 px-2 py-1 rounded-full"
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-xs">N/A</span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleBookingClick}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 px-3 rounded"
          >
            Book Now
          </button>

          <a
            href={`https://wa.me/+923102700608?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold py-2 px-3 rounded text-center"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 w-full max-w-sm relative shadow-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg font-bold"
            >
              ×
            </button>
            <h2 className="text-base font-semibold mb-4">Book {title}</h2>
            {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Email"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="Phone"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />

              <select
                name="priceOption"
                value={formData.priceOption || ''}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              >
                <option value="" disabled>
                  Select price option
                </option>
                {apartment.pricePerDay && (
                  <option value="day">
                    Per Day - PKR {apartment.pricePerDay}
                  </option>
                )}
                {apartment.pricePerWeek && (
                  <option value="week">
                    Per Week - PKR {apartment.pricePerWeek}
                  </option>
                )}
                {apartment.pricePerMonth && (
                  <option value="month">
                    Per Month - PKR {apartment.pricePerMonth}
                  </option>
                )}
              </select>

              <div>
                <p className="text-xs text-gray-600 mb-1">Select Dates:</p>
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded transition"
              >
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApartmentCard;

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const title = apartment.title?.trim() || 'Apartment';
  
  // Enhanced image handling - check multiple possible image sources
  const getImages = () => {
    if (apartment.images && Array.isArray(apartment.images) && apartment.images.length > 0) {
      return apartment.images;
    }
    if (apartment.image) {
      return [apartment.image];
    }
    if (apartment.mainImage) {
      return [apartment.mainImage];
    }
    return [];
  };

  const images = getImages();
  const currentImage = images[currentImageIndex] || 
    apartment.mainImage || 
    apartment.image || 
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';

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

  // useEffect(() => {
  //   const fetchShortUrl = async () => {
  //     const originalUrl = `${window.location.origin}/apartments/${apartment._id}`;
  //     try {
  //       const response = await fetch('/api/shorten-url', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ url: originalUrl }),
  //       });
  //       const data = await response.json();
  //       setShortUrl(data.shortUrl || originalUrl);
  //     } catch (err) {
  //       console.error('Shorten URL failed:', err);
  //       setShortUrl(originalUrl);
  //     }
  //   };
  //   fetchShortUrl();
  // }, [apartment._id]);

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

  const handleImageChange = (direction) => {
    if (images.length <= 1) return;
    
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
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
      const response = await fetch('/api/book', {
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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition overflow-hidden w-full h-full flex flex-col">
      {/* Image Gallery */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={currentImage}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
          }}
        />
        
        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => handleImageChange('prev')}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleImageChange('next')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
            
            {/* Image Counter */}
            <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          {apartment.city} • {apartment.type}
        </p>

        {/* Property Details */}
        {(apartment.bedrooms || apartment.bathrooms || apartment.maxGuests) && (
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
            {apartment.bedrooms && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {apartment.bedrooms} Bed
              </span>
            )}
            {apartment.bathrooms && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {apartment.bathrooms} Bath
              </span>
            )}
            {apartment.maxGuests && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                {apartment.maxGuests} Guests
              </span>
            )}
          </div>
        )}

        <div className="text-lg font-medium text-amber-600 mb-4">
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

        {/* Description */}
        {apartment.description && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 line-clamp-2">
              {apartment.description}
            </p>
          </div>
        )}

        <div className="mb-4 flex-1">
          <p className="text-xs font-medium text-gray-600 mb-2">Amenities:</p>
          <div className="flex flex-wrap gap-1">
            {amenities.length > 0 ? (
              amenities.slice(0, 4).map((item, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded-full"
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-xs">N/A</span>
            )}
            {amenities.length > 4 && (
              <span className="bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded-full">
                +{amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleBookingClick}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-3 px-4 rounded-lg transition"
          >
            Book Now
          </button>

          <a
            href={`https://wa.me/+923102700608?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-3 px-4 rounded-lg text-center transition"
          >
            WhatsApp
          </a>
        </div>
        
        {/* View Details Button */}
        <a
          href={`/apartments/${apartment._id}`}
          className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold py-2 px-4 rounded-lg text-center transition mt-2"
        >
          View Details
        </a>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg font-bold"
            >
              ×
            </button>
            <h2 className="text-lg font-semibold mb-4">Book {title}</h2>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="Phone"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />

              <select
                name="priceOption"
                value={formData.priceOption || ''}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              >
                <option value="" disabled>
                  Select price option
                </option>
                {apartment.pricePerDay && (
                  <option value="day">
                    Per Day - PKR {apartment.pricePerDay.toLocaleString()}
                  </option>
                )}
                {apartment.pricePerWeek && (
                  <option value="week">
                    Per Week - PKR {apartment.pricePerWeek.toLocaleString()}
                  </option>
                )}
                {apartment.pricePerMonth && (
                  <option value="month">
                    Per Month - PKR {apartment.pricePerMonth.toLocaleString()}
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
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-3 rounded-lg transition disabled:opacity-50"
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

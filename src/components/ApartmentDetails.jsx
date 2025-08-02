import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApartmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  useEffect(() => {
    fetchApartmentDetails();
  }, [id]);

  const fetchApartmentDetails = async () => {
    try {
      const response = await fetch(`/api/apartments/${id}`);
      if (!response.ok) {
        throw new Error('Apartment not found');
      }
      const data = await response.json();
      setApartment(data);
    } catch (error) {
      console.error('Error fetching apartment:', error);
      toast.error('Failed to load apartment details');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (direction) => {
    if (!apartment?.images || apartment.images.length <= 1) return;
    
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % apartment.images.length);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + apartment.images.length) % apartment.images.length);
    }
  };

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

  const handleDateChange = (dates) => {
    const [start, end] = dates;

    if (!end) {
      setDateRange([start, null]);
      return;
    }

    const bookedDates = apartment?.bookedDates?.map(date => new Date(date)) || [];
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
        toast.success('Booking successful! Check your email for confirmation.');
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Apartment Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Handle both old single image and new multiple images structure
  const images = apartment.images || (apartment.image ? [apartment.image] : []);
  const currentImage = images[currentImageIndex] || apartment.mainImage || apartment.image || 'https://via.placeholder.com/800x500?text=No+Image';

  const amenities = Array.isArray(apartment.amenities) ? apartment.amenities : [];
  const bookedDates = apartment.bookedDates?.map((date) => new Date(date)).filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Apartments
          </button>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="relative h-96 md:h-[500px] overflow-hidden">
            <img
              src={currentImage}
              alt={apartment.title}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => handleImageChange('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => handleImageChange('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {apartment.title}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  {apartment.city} • {apartment.type}
                </p>
                
                {/* Property Details */}
                {(apartment.bedrooms || apartment.bathrooms || apartment.maxGuests) && (
                  <div className="flex items-center gap-6 mb-4">
                    {apartment.bedrooms && (
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">{apartment.bedrooms} Bedroom{apartment.bedrooms > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    {apartment.bathrooms && (
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">{apartment.bathrooms} Bathroom{apartment.bathrooms > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    {apartment.maxGuests && (
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        <span className="text-gray-700">Up to {apartment.maxGuests} Guests</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div className="mt-4 md:mt-0 md:ml-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Pricing</h3>
                  {apartment.pricePerDay && (
                    <div className="text-2xl font-bold text-amber-600 mb-2">
                      PKR {apartment.pricePerDay.toLocaleString()}
                      <span className="text-sm font-normal text-gray-600">/day</span>
                    </div>
                  )}
                  {apartment.pricePerWeek && (
                    <div className="text-lg text-gray-700 mb-1">
                      PKR {apartment.pricePerWeek.toLocaleString()}/week
                    </div>
                  )}
                  {apartment.pricePerMonth && (
                    <div className="text-lg text-gray-700">
                      PKR {apartment.pricePerMonth.toLocaleString()}/month
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {apartment.description && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{apartment.description}</p>
              </div>
            )}

            {/* Amenities */}
            {amenities.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg"
                    >
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleBookingClick}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Book Now
              </button>
              <a
                href={`https://wa.me/+923041513361?text=Hello! I'm interested in ${apartment.title}. Can you tell me more?`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition"
              >
                Contact on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">Book {apartment.title}</h2>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-indigo-500 focus:outline-none"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-indigo-500 focus:outline-none"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="Phone"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-indigo-500 focus:outline-none"
              />

              <select
                name="priceOption"
                value={formData.priceOption || ''}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-indigo-500 focus:outline-none"
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
                <p className="text-sm text-gray-600 mb-2">Select Dates:</p>
                <DatePicker
                  selectsRange
                  startDate={dateRange[0]}
                  endDate={dateRange[1]}
                  onChange={handleDateChange}
                  excludeDates={bookedDates}
                  minDate={new Date()}
                  inline
                  className="w-full"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApartmentDetails;
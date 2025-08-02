import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import apiService from '../services/api.js';

export default function BookingForm({ apartmentId, apartment }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [priceOption, setPriceOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await apiService.makeRequest(`/available?startDate=2025-06-01&endDate=2025-06-30`);
        const apt = res.find((a) => a._id === apartmentId);
        setAvailableDates(
          apt?.availableRanges?.flatMap((range) => {
            const dates = [];
            let d = new Date(range.start);
            const end = new Date(range.end);
            while (d <= end) {
              dates.push(new Date(d).toISOString().split("T")[0]);
              d.setDate(d.getDate() + 1);
            }
            return dates;
          }) || []
        );
      } catch (error) {
        console.error("Error fetching available dates", error);
      }
    };

    fetchAvailability();
  }, [apartmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !phone.trim() || selectedDates.length === 0 || !priceOption) {
      return Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill all fields, select dates, and choose a price option.",
        confirmButtonColor: "#3b82f6",
        background: "#1f2937",
        color: "#f9fafb"
      });
    }

    try {
      setLoading(true);
      await apiService.bookApartment({
        apartmentId,
        selectedDates,
        priceOption,
        userDetails: {
          name: username,
          email,
          phone,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Booking Confirmed! 🎉",
        text: "Your apartment has been successfully booked. We'll send you a confirmation email shortly.",
        confirmButtonColor: "#10b981",
        background: "#1f2937",
        color: "#f9fafb"
      });

      setUsername("");
      setEmail("");
      setPhone("");
      setSelectedDates([]);
      setPriceOption("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: err.response?.data?.error || "Something went wrong. Please try again.",
        confirmButtonColor: "#ef4444",
        background: "#1f2937",
        color: "#f9fafb"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDateToggle = (date) => {
    setSelectedDates(prev => 
      prev.includes(date) 
        ? prev.filter(d => d !== date)
        : [...prev, date]
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl"></div>
      
      {/* Main form container */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Book Your Stay
          </h2>
          <p className="text-gray-600 text-lg">
            Secure your perfect apartment today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Full Name"
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                    focusedField === "username" 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Email Address"
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                    focusedField === "email" 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField("")}
                placeholder="Phone Number"
                required
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                  focusedField === "phone" 
                    ? "border-blue-500 bg-blue-50" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Date Selection Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Select Your Dates
            </h3>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                {availableDates.map((date) => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => handleDateToggle(date)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedDates.includes(date)
                        ? "bg-blue-500 text-white shadow-lg transform scale-105"
                        : "bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-200 border border-gray-200"
                    }`}
                  >
                    {formatDate(date)}
                  </button>
                ))}
              </div>
              {selectedDates.length > 0 && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">
                    Selected: {selectedDates.length} date{selectedDates.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Price Selection Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Choose Your Plan
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {apartment?.pricePerDay && (
                <div 
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    priceOption === "day" 
                      ? "border-blue-500 bg-blue-50 shadow-lg" 
                      : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                  }`}
                  onClick={() => setPriceOption("day")}
                >
                  <input
                    type="radio"
                    name="priceOption"
                    value="day"
                    checked={priceOption === "day"}
                    onChange={() => setPriceOption("day")}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">PKR {apartment.pricePerDay}</div>
                    <div className="text-sm text-gray-600">Per Day</div>
                  </div>
                  {priceOption === "day" && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              )}

              {apartment?.pricePerWeek && (
                <div 
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    priceOption === "week" 
                      ? "border-blue-500 bg-blue-50 shadow-lg" 
                      : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                  }`}
                  onClick={() => setPriceOption("week")}
                >
                  <input
                    type="radio"
                    name="priceOption"
                    value="week"
                    checked={priceOption === "week"}
                    onChange={() => setPriceOption("week")}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">PKR {apartment.pricePerWeek}</div>
                    <div className="text-sm text-gray-600">Per Week</div>
                  </div>
                  {priceOption === "week" && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              )}

              {apartment?.pricePerMonth && (
                <div 
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    priceOption === "month" 
                      ? "border-blue-500 bg-blue-50 shadow-lg" 
                      : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                  }`}
                  onClick={() => setPriceOption("month")}
                >
                  <input
                    type="radio"
                    name="priceOption"
                    value="month"
                    checked={priceOption === "month"}
                    onChange={() => setPriceOption("month")}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">PKR {apartment.pricePerMonth}</div>
                    <div className="text-sm text-gray-600">Per Month</div>
                  </div>
                  {priceOption === "month" && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Confirm Booking
                </div>
              )}
            </button>
          </div>
        </form>

        {/* Security notice */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Your information is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}

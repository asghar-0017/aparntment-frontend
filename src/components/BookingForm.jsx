import { useState, useEffect } from "react";
import axios from "axios";

export default function BookingForm({ apartmentId }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await axios.get(`/available?startDate=2025-06-01&endDate=2025-06-30`);
        const apt = res.data.find(a => a._id === apartmentId);
        setAvailableDates(apt?.availableDates || []);
      } catch (error) {
        console.error("Error fetching available dates", error);
      }
    };

    fetchAvailability();
  }, [apartmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/book", {
        apartmentId,
        username,
        email,
        selectedDates,
      });
      alert("Booking successful!");
    } catch (err) {
      alert(err.response?.data?.error || "Booking failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Your Name"
        required
        className="border p-2 rounded w-full"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
        required
        className="border p-2 rounded w-full"
      />
      <select
        multiple
        value={selectedDates}
        onChange={(e) => {
          const values = Array.from(e.target.selectedOptions, o => o.value);
          setSelectedDates(values);
        }}
        className="border p-2 rounded w-full"
      >
        {availableDates.map(date => {
          const iso = new Date(date).toISOString().split("T")[0];
          return (
            <option key={iso} value={iso}>
              {new Date(date).toDateString()}
            </option>
          );
        })}
      </select>
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Book Apartment
      </button>
    </form>
  );
}

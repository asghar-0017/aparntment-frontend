import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function BookingForm({ apartmentId }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await axios.get(`/available?startDate=2025-06-01&endDate=2025-06-30`);
        const apt = res.data.find((a) => a._id === apartmentId);
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

    if (!username.trim() || !email.trim() || selectedDates.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill all fields and select at least one date.",
      });
    }

    try {
      setLoading(true);
      await axios.post("/book", {
        apartmentId,
        selectedDates,
        userDetails: {
          name: username,
          email,
          phone: "N/A", // Optional: Add a phone field if needed
        },
      });

      Swal.fire({
        icon: "success",
        title: "Booking Confirmed",
        text: "Your apartment has been successfully booked.",
      });

      setUsername("");
      setEmail("");
      setSelectedDates([]);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: err.response?.data?.error || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
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
          const values = Array.from(e.target.selectedOptions, (o) => o.value);
          setSelectedDates(values);
        }}
        className="border p-2 rounded w-full"
      >
        {availableDates.map((date) => (
          <option key={date} value={date}>
            {new Date(date).toDateString()}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Booking..." : "Book Apartment"}
      </button>
    </form>
  );
}

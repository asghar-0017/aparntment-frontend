import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import ApartmentCard from "./ApartmentCard"; // assumes you have this component

export default function DateSearch() {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!checkIn || !checkOut) return;

    try {
      const start = checkIn.toISOString().split("T")[0];
      const end = checkOut.toISOString().split("T")[0];

      const res = await axios.get(
        `https://aparntment-rental-frontend.vercel.app/available?startDate=${start}&endDate=${end}`
      );

      setResults(res.data);
      setError(null);
      setHasSearched(true);
    } catch (err) {
      console.error(err);
      setError("Failed to check availability.");
      setHasSearched(true);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Search Available Apartments</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <DatePicker
          selected={checkIn}
          onChange={setCheckIn}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={new Date()}
          placeholderText="Check-in"
          className="border p-2 rounded w-full"
        />

        <DatePicker
          selected={checkOut}
          onChange={setCheckOut}
          selectsEnd
          startDate={checkIn}
          endDate={checkOut}
          minDate={checkIn || new Date()}
          placeholderText="Check-out"
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleSearch}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!hasSearched ? (
          <p className="text-gray-500 col-span-full text-center">
            🏡 Please select dates and click "Search" to see available apartments.
          </p>
        ) : results.length > 0 ? (
          results.map((apartment) => (
            <ApartmentCard key={apartment._id} apartment={apartment} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            🚫 No available apartments for the selected dates.
          </p>
        )}
      </div>
    </div>
  );
}

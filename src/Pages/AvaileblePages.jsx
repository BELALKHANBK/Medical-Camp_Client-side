import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxoiseSecure from "../AuthProvider/UseAxios";
import Pagination from "../pagination/Pagination";
import { Helmet } from "react-helmet-async";
import '../../src/App.css'

const AvailablePages = () => {
  const [camps, setCamps] = useState([]);
  const [filteredCamps, setFilteredCamps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [layout, setLayout] = useState("three");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const axios = useAxoiseSecure();

  // Fetch camps from API
  useEffect(() => {
    axios.get("https://medical-camp-server-sage.vercel.app/camps")
      .then((res) => {
        setCamps(res.data);
        setFilteredCamps(res.data);
        setLoading(false); // data loaded
      })
      .catch((err) => {
        console.error("Failed to fetch camps:", err);
        setLoading(false);
      });
  }, []);

  // Search filter
  useEffect(() => {
    const keyword = searchTerm.toLowerCase();
    const temp = camps.filter((camp) =>
      camp.name.toLowerCase().includes(keyword) ||
      camp.doctor.toLowerCase().includes(keyword) ||
      camp.location.toLowerCase().includes(keyword)
    );
    setFilteredCamps(temp);
    setCurrentPage(1);
  }, [searchTerm, camps]);

  // Sort filter
  useEffect(() => {
    let temp = [...filteredCamps];
    if (sortBy === "mostRegistered") {
      temp.sort((a, b) => b.participantCount - a.participantCount);
    } else if (sortBy === "fees") {
      temp.sort((a, b) => a.fees - b.fees);
    } else if (sortBy === "alphabetical") {
      temp.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredCamps(temp);
    setCurrentPage(1);
  }, [sortBy]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredCamps.slice(startIndex, startIndex + itemsPerPage);

  // Loading Spinner
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex space-x-2">
      <span class="loader"></span>    
        </div>
   
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto p-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Helmet>
        <title>Available Camps | MedCampMS</title>
        <meta name="description" content="Welcome to MedCampMS - Your trusted medical camp management system." />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Available Medical Camps</h2>

      {/* Search, Sort, Layout */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by name, doctor, or location"
          className="input input-bordered w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-1/4"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="mostRegistered">Most Registered</option>
          <option value="fees">Camp Fees (Low to High)</option>
          <option value="alphabetical">Alphabetical Order</option>
        </select>

        <button
          onClick={() => setLayout(layout === "three" ? "two" : "three")}
          className="btn btn-outline"
        >
          Layout: {layout === "three" ? "3 Columns" : "2 Columns"}
        </button>
      </div>

      {/* Camps Grid */}
      <div className={`grid gap-8 ${layout === "three" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
        {currentItems.length === 0 && (
          <p className="col-span-full text-center mt-20 text-gray-600 dark:text-white">No camps found.</p>
        )}

        {currentItems.map((camp) => (
          <div
            key={camp._id}
            className="border rounded-xl shadow-lg font-cinzel p-4 flex flex-col text-black bg-white hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300 hover:scale-[1.03]  dark:bg-gray-800 dark:text-white"
          >
            <img
              src={camp.image}
              className="h-48 w-full object-cover rounded mb-4"
              alt={camp.name}
            />
            <h1 className="text-center font-bold">OrganizerName: {camp.name}</h1>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400">campName: {camp.name}</h3>
              <p className="text-sm font-medium">💰Camp Fees: ${camp.fees}</p>
            </div>
            <p className="text-sm"><strong>📅 Date & Time:</strong> {new Date(camp.dateTime).toLocaleString()}</p>
            <p className="text-sm"><strong>📍 Location:</strong> {camp.location}</p>
            <p className="text-sm"><strong>👨‍⚕️ Professional:</strong> {camp.doctor}</p>
            <p className="text-sm"><strong>👥 Participants count:</strong> {camp.participantCount}</p>
            <p className="flex-grow text-sm italic text-gray-700 dark:text-gray-300 mt-2">{camp.description}</p>

           <Link
  to={`/camp-details/${camp._id}`}
  className="btn mt-4 btn-gradient-hover"
>
  View Details
</Link>

          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 text-blue-700">
        <Pagination
          totalItems={filteredCamps.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AvailablePages;

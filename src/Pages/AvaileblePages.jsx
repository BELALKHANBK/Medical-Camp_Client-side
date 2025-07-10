import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import useAxoiseSecure from "../AuthProvider/UseAxios";

const AvailablePages = () => {
  const [camps, setCamps] = useState([]);
  const [filteredCamps, setFilteredCamps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [layout, setLayout] = useState("three"); // three or two columns
  const [loading, setLoading] = useState(true);
const axios=useAxoiseSecure()
  useEffect(() => {
    axios.get("http://localhost:5000/camps")
      .then((res) => {
        setCamps(res.data);
        setFilteredCamps(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch camps:", err);
        setLoading(false);
      });
  }, []);

  // Search handler
  useEffect(() => {
    let temp = camps.filter((camp) => {
      const keyword = searchTerm.toLowerCase();
      return (
        camp.name.toLowerCase().includes(keyword) ||
        camp.doctor.toLowerCase().includes(keyword) ||
        camp.location.toLowerCase().includes(keyword)
      );
    });
    setFilteredCamps(temp);
  }, [searchTerm, camps]);

  // Sort handler
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
  }, [sortBy]);

  if (loading) return <p>Loading camps...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Available Medical Camps</h2>

      {/* Search + Sort + Layout Controls */}
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
      <div
        className={`grid gap-6 ${
          layout === "three" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {filteredCamps.length === 0 && (
          <p className="col-span-full text-center">No camps found.</p>
        )}

        {filteredCamps.map((camp) => (
          <div
            key={camp._id}
            className="border rounded-lg shadow p-4 flex flex-col"
          >
            <img
              src={camp.image}
              alt={camp.name}
              className="h-48 w-full object-cover rounded mb-4"
            />
          <div className="flex justify-between">
              <h3 className="text-xl font-semibold mb-2">{camp.name}</h3>
            
            <h3 className="text-xl font-semibold mb-2">Fees:{camp.fees}</h3>
          </div>

            <p><strong>Date & Time:</strong> {new Date(camp.dateTime).toLocaleString()}</p>
            <p><strong>Location:</strong> {camp.location}</p>
            <p><strong>Healthcare Professional:</strong> {camp.doctor}</p>
            <p><strong>Participants:</strong> {camp.participantCount}</p>
            <p className="flex-grow my-2">{camp.description}</p>
            <Link
              to={`/camp-details/${camp._id}`}
              className="btn btn-primary mt-auto"
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailablePages;

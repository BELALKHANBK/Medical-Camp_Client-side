import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

const NotFoundPages = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-4">
      <Helmet>
        <title>Error Page| MedCampMS</title>
        <meta name="description" content="Welcome to MedCampMS - Your trusted medical camp management system." />
      </Helmet>
      <h1 className="text-9xl font-extrabold mb-6">404</h1>
      <p className="text-2xl md:text-3xl mb-4 font-semibold">Page Not Found</p>
      <p className="mb-8 max-w-md text-center">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-white text-purple-700 font-bold rounded-lg shadow-lg hover:bg-purple-100 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPages;

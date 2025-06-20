import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-primary to-secondary flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl p-10 max-w-xl w-full animate-fade-in">
        {/* App Title */}
        <h1 className="text-5xl font-extrabold text-primary text-center mb-2 tracking-tight animate-slide-down">
          🐞 Namaste Bugs
        </h1>
        <p className="text-center text-gray-600 text-sm mb-10 animate-fade-in delay-150">
          Streamline your project management & bug tracking effortlessly.
        </p>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 animate-slide-up">
          <Link
            to="/login"
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold text-lg shadow hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            🔐 Login
          </Link>
          <Link
            to="/register"
            className="bg-white border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold text-lg hover:bg-primary hover:text-white shadow transform hover:scale-105 transition duration-300"
          >
            📝 Register
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-gray-400 animate-fade-in delay-500">
          © {new Date().getFullYear()} Namaste Bugs. Built with 💙 for
          developers.
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

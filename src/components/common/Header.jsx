import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  // Helper to check if menu item is active
  const isActive = (path) => {
    // You can extend for more complex routes if needed
    return location.pathname === path;
  };

  return (
    <header className="bg-amazon-blue shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl">📚</span>
            <span className="ml-2 text-xl font-bold text-white">Library App</span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={
                isActive('/')
                  ? "bg-amazon-orange text-white rounded-lg px-4 py-2 font-semibold"
                  : "text-white hover:text-amazon-orange rounded-lg px-4 py-2 font-semibold transition"
              }
            >
              Home
            </Link>
            <Link
              to="/books"
              className={
                isActive('/books')
                  ? "bg-amazon-orange text-white rounded-lg px-4 py-2 font-semibold"
                  : "text-white hover:text-amazon-orange rounded-lg px-4 py-2 font-semibold transition"
              }
            >
              Index of Books
            </Link>
            <Link
              to="/upload"
              className={
                isActive('/upload')
                  ? "bg-amazon-orange text-white rounded-lg px-4 py-2 font-semibold"
                  : "text-white hover:text-amazon-orange rounded-lg px-4 py-2 font-semibold transition"
              }
            >
              Upload
            </Link>
            <Link
              to="/about"
              className={
                isActive('/about')
                  ? "bg-amazon-orange text-white rounded-lg px-4 py-2 font-semibold"
                  : "text-white hover:text-amazon-orange rounded-lg px-4 py-2 font-semibold transition"
              }
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

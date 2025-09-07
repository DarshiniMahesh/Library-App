import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BookCard from '../components/books/BookCard';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filters, setFilters] = useState({
    script: '',
    language: '',
    category: '',
  });

  const searchRef = useRef(null);

  const filterOptions = {
    script: ['', 'English (Roman)', 'Devanagari'],
    language: ['', 'English', 'Hindi', 'Marathi', 'Sanskrit', 'Kannada'],
    category: [
      '',
      'Astrology',
      'Tantra',
      'Yoga',
      'Philosophy',
      'Upanishad',
      'Veda',
      'Bhashya',
      'Purana',
    ],
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      params.append('search', searchQuery);
      if (filters.script) params.append('script', filters.script);
      if (filters.language) params.append('language', filters.language);
      if (filters.category) params.append('category', filters.category);

      fetch(`http://localhost:5000/api/books?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data.slice(0, 5));
          setShowSuggestions(true);
        })
        .catch(() => {
          setSuggestions([]);
          setShowSuggestions(false);
        });
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery, filters]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredBooks([]);
      return;
    }

    const params = new URLSearchParams();
    params.append('search', searchQuery);
    if (filters.script) params.append('script', filters.script);
    if (filters.language) params.append('language', filters.language);
    if (filters.category) params.append('category', filters.category);

    fetch(`http://localhost:5000/api/books?${params.toString()}`)
      .then((res) => res.json())
      .then(setFilteredBooks)
      .catch(() => setFilteredBooks([]));
  }, [searchQuery, filters]);

  const handleSuggestionClick = (book) => {
    setSearchQuery(book.title);
    setShowSuggestions(false);
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  useEffect(() => {
    const onClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-amazon-light">
      <Header />
      <main className="flex flex-1">
        {/* Filter Section */}
        <aside className="w-1/4 bg-gray-50 p-6">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Script</label>
            <select
              value={filters.script}
              onChange={(e) => handleFilterChange('script', e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              {filterOptions.script.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === '' ? 'Select Script' : opt}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Language</label>
            <select
              value={filters.language}
              onChange={(e) => handleFilterChange('language', e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              {filterOptions.language.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === '' ? 'Select Language' : opt}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              {filterOptions.category.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === '' ? 'Select Category' : opt}
                </option>
              ))}
            </select>
          </div>
        </aside>

        {/* Slogan & Search Section */}
        <section className="flex-1 p-6 rounded-lg shadow-md mb-6">
          <div className="pt-4 pb-2">
            <h1 className="text-4xl font-extrabold text-amazon-blue mb-2 text-center">
              Your Digital Library, Anytime, Anywhere <span role="img" aria-label="books">📚</span>
            </h1>
            <p className="text-gray-700 mb-6 text-center">
              Browse, read, and bookmark your favorite books—fast and beautifully.
            </p>
            <div
              ref={searchRef}
              className="relative max-w-md mx-auto"
              style={{ marginBottom: '10px' }}
            >
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books, authors..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border bg-white text-black focus:outline-none focus:ring-2 focus:ring-amazon-blue focus:border-transparent transition placeholder-black"
                style={{ height: '40px' }}
              />

              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-200 rounded-lg w-full mt-1 max-h-48 overflow-y-auto shadow-lg z-10 text-black">
                  {suggestions.map((b) => (
                    <li
                      key={b.id}
                      onClick={() => handleSuggestionClick(b)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <span className="font-medium">{b.title}</span>
                      <span className="text-sm text-gray-500"> by {b.author}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {searchQuery && (
            <div>
              {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {filteredBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-700 text-center mt-6">No books found.</p>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

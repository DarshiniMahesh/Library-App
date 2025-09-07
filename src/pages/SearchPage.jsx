import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BookCard from '../components/books/BookCard';

export default function SearchPage() {
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    language: '',
    year: '',
  });
  const [books, setBooks] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.title) params.append('search', filters.title);
    if (filters.author) params.append('author', filters.author);
    if (filters.language) params.append('language', filters.language);
    if (filters.year) params.append('year', filters.year);

    try {
      const res = await fetch(`http://localhost:5000/api/books?${params.toString()}`);
      const data = await res.json();
      setBooks(data);
    } catch {
      setBooks([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amazon-light">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-amazon-blue mb-8">Search Books</h1>
        <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Book Name"
            value={filters.title}
            onChange={handleChange}
            className="px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={filters.author}
            onChange={handleChange}
            className="px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="language"
            placeholder="Language"
            value={filters.language}
            onChange={handleChange}
            className="px-4 py-2 border rounded"
          />
          <input
            type="number"
            name="year"
            placeholder="Year of Publication"
            value={filters.year}
            onChange={handleChange}
            className="px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="sm:col-span-2 lg:col-span-1 px-6 py-2 bg-amazon-orange text-white font-semibold rounded hover:bg-orange-600 transition"
          >
            Search
          </button>
        </form>
        <div>
          {books.length === 0 ? (
            <p className="text-gray-500">No books found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function IndexPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(() => setBooks([]));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    const res = await fetch(`http://localhost:5000/api/books/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setBooks(books.filter(book => book.id !== id));
    } else {
      alert('Failed to delete book');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto p-6 flex-grow">
        <h1 className="text-3xl font-bold mb-4 flex items-center space-x-2">
          <span>📚</span>
          <span>Index of Books</span>
        </h1>
        <p className="mb-6">Total books in library: {books.length}</p>

        <table className="min-w-full border-collapse rounded overflow-hidden shadow-lg bg-white">
          <thead className="bg-amazon-blue text-white">
            <tr>
              <th className="px-6 py-3 text-left">Book Title</th>
              <th className="px-6 py-3 text-left">Author</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Year of Publication</th>
              <th className="px-6 py-3 text-left">Script</th>
              <th className="px-6 py-3 text-left">Language</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  No books found.
                </td>
              </tr>
            ) : (
              books.map(book => (
                <tr key={book.id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">
                    <a
                      href={`http://localhost:5000${book.file_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amazon-blue font-semibold hover:underline"
                    >
                      {book.title}
                    </a>
                  </td>
                  <td className="px-6 py-4">{book.author}</td>
                  <td className="px-6 py-4">{book.category}</td>
                  <td className="px-6 py-4">{book.year}</td>
                  <td className="px-6 py-4">{book.script}</td>
                  <td className="px-6 py-4">{book.language}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
}

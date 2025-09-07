import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Breadcrumbs from '../components/navigation/Breadcrumbs';

export default function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then(res => res.json())
      .then(data => setBook(data));
  }, [id]);

  return (
    <div>
      <Header />
      <Breadcrumbs />
      <main className="p-4 max-w-2xl mx-auto">
        {!book ? (
          <p className="text-gray-500">Loading book details...</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold text-amazon-blue mb-2">{book.title}</h1>
            <p><span className="font-medium">Author:</span> {book.author}</p>
            <p><span className="font-medium">Script:</span> {book.script}</p>
            <p><span className="font-medium">Language:</span> {book.language}</p>
            <p><span className="font-medium">Category:</span> {book.category}</p>
            <p><span className="font-medium">Year:</span> {book.year}</p>
            {book.file_path && (
              <a
                href={`http://localhost:5000${book.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-amazon-blue text-white rounded hover:bg-indigo-800"
              >
                Download PDF
              </a>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

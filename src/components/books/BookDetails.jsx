import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookDetails, borrowBook, returnBook } from '../../utils/api';
import Loading from '../common/Loading'
import ErrorMessage from '../common/ErrorMessage'


export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getBookDetails(id)
      .then(res => { setBook(res.data); setLoading(false); })
      .catch(() => { setError('Failed to load details.'); setLoading(false); });
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!book) return <ErrorMessage message="Book not found." />;

  return (
    <div className="p-4 bg-white shadow rounded">
      <div className="flex flex-col md:flex-row gap-4">
        <img src={book.cover} alt={book.title} className="w-full md:w-1/3 h-auto rounded" />
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
          <p className="mb-1"><strong>Author:</strong> {book.author}</p>
          <p className="mb-1"><strong>Genre:</strong> {book.genre}</p>
          <p className="mb-1"><strong>Year:</strong> {book.year}</p>
          <p className="mb-1"><strong>Language:</strong> {book.language}</p>
          <p className="mb-1"><strong>Rating:</strong> {book.rating}</p>
          <p className="mb-1"><strong>Pages:</strong> {book.pages}</p>
          <p className="mb-3">{book.description}</p>
          <button
            onClick={() => book.available ? borrowBook(book.id) : returnBook(book.id)}
            className="btn-primary"
          >
            {book.available ? 'Borrow Book' : 'Return Book'}
          </button>
        </div>
      </div>
    </div>
  );
}

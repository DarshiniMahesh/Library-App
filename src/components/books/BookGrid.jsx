import React from 'react';
import BookCard from './BookCard';
import { useNavigate } from 'react-router-dom';

export default function BookGrid({ books }) {
  const navigate = useNavigate();

  const handleAction = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onAction={handleAction}
          actionLabel={book.available ? 'Borrow' : 'Add to Wishlist'}
        />
      ))}
    </div>
  );
}

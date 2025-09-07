import React from 'react';
import BookGrid from './BookGrid';

export default function BookRecommendations({ recommendations }) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">Readers also liked</h3>
      <BookGrid books={recommendations} />
    </div>
  );
}

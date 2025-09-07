import React from 'react';

export default function BookCard({ book }) {
  return (
    <div className="rounded-lg shadow-md p-6 mb-6" style={{ backgroundColor: '#ffffffff' }}>
      <div className="mb-2">
        <span className="font-semibold">Book Name:</span>{' '}
        {book.title || 'Untitled'}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Author:</span>{' '}
        {book.author || 'Unknown'}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Language:</span>{' '}
        {book.language || 'Unknown'}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Year of Publication:</span>{' '}
        {book.year || 'Unknown'}
      </div>
      {book.file_path && (
        <div className="flex justify-center mt-4">
          <a
            href={`http://localhost:5000${book.file_path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-amazon-blue text-white rounded hover:bg-indigo-800"
          >
            View PDF
          </a>
        </div>
      )}
    </div>
  );
}

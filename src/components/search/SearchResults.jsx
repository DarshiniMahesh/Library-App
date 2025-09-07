import React from 'react';
import BookGrid from '../books/BookGrid'
import Loading from '../common/Loading'
import ErrorMessage from '../common/ErrorMessage'


export default function SearchResults({ books, loading, error }) {
  if (loading) return <Loading />;
  if (error)   return <ErrorMessage message={error} />;
  return <BookGrid books={books} />;
}

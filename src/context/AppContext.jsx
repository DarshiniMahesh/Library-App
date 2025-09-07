import React, { createContext, useState } from 'react';
import booksData from '../data/books.json';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [books] = useState(booksData);
  const [genre, setGenre] = useState('All Genres');
  const [year, setYear] = useState('All Years');
  const [language, setLanguage] = useState('All Languages');
  const [available, setAvailable] = useState(null);
  const [sortBy, setSortBy] = useState('relevance');

  return (
    <AppContext.Provider value={{
      books,
      genre, setGenre,
      year, setYear,
      language, setLanguage,
      available, setAvailable,
      sortBy, setSortBy
    }}>
      {children}
    </AppContext.Provider>
  );
}

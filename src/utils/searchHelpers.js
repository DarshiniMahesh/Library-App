import Fuse from 'fuse.js';

export const createFuseInstance = (data) => {
  const options = {
    keys: ['title', 'author', 'genre', 'tags'],
    threshold: 0.3,
    includeScore: true,
  };
  return new Fuse(data, options);
};

export const filterBooks = (books, filters) => {
  return books.filter(book => {
    if (filters.genre && filters.genre !== 'All Genres' && book.genre !== filters.genre) {
      return false;
    }
    if (filters.year && filters.year !== 'All Years') {
      if (filters.year === 'Before 2015' && book.year >= 2015) return false;
      if (filters.year === '2015-2017' && (book.year < 2015 || book.year > 2017)) return false;
      if (filters.year.length === 4 && book.year !== parseInt(filters.year)) return false;
    }
    if (filters.language && filters.language !== 'All Languages' && book.language !== filters.language) {
      return false;
    }
    if (filters.available !== null && book.available !== filters.available) {
      return false;
    }
    return true;
  });
};

export const sortBooks = (books, sortBy) => {
  const sorted = [...books];
  
  switch (sortBy) {
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'author':
      return sorted.sort((a, b) => a.author.localeCompare(b.author));
    case 'year':
      return sorted.sort((a, b) => b.year - a.year);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
};

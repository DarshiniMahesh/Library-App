import React from 'react';
import { recentSearches, popularSearches } from '../../data/mockData';

export default function SearchSuggestions({ query, onSelect }) {
  const list = query
    ? popularSearches.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : recentSearches;

  return (
    <div className="bg-white shadow rounded mb-4 p-2">
      {list.map(item => (
        <div
          key={item}
          onClick={() => onSelect(item)}
          className="py-1 px-2 hover:bg-amazon-light cursor-pointer"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

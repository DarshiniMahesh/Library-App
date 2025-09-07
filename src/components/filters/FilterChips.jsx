import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export default function FilterChips() {
  const { genre, year, language, available, setGenre, setYear, setLanguage, setAvailable } =
    useContext(AppContext);

  const chips = [];
  if (genre && genre !== 'All Genres') chips.push({ label: genre, action: () => setGenre('All Genres') });
  if (year && year !== 'All Years') chips.push({ label: year, action: () => setYear('All Years') });
  if (language && language !== 'All Languages') chips.push({ label: language, action: () => setLanguage('All Languages') });
  if (available) chips.push({ label: 'Available Now', action: () => setAvailable(false) });

  return (
    <div className="flex gap-2 mb-4">
      {chips.map((c, i) => (
        <div key={i} onClick={c.action} className="filter-chip bg-amazon-orange text-white">
          {c.label} &times;
        </div>
      ))}
    </div>
  );
}

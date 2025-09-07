import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { GENRES, YEARS, LANGUAGES } from '../../utils/constants';

export default function SidebarFilters() {
  const { genre, setGenre, year, setYear, language, setLanguage, available, setAvailable } =
    useContext(AppContext);

  return (
    <div className="p-4 bg-white shadow mb-4">
      <h3 className="font-bold mb-2">Filters</h3>
      <div className="mb-2">
        <label className="block mb-1">Genre</label>
        <select value={genre} onChange={e => setGenre(e.target.value)} className="w-full border p-2 rounded">
          {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>
      <div className="mb-2">
        <label className="block mb-1">Year</label>
        <select value={year} onChange={e => setYear(e.target.value)} className="w-full border p-2 rounded">
          {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
      <div className="mb-2">
        <label className="block mb-1">Language</label>
        <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full border p-2 rounded">
          {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>
      <div className="mb-2">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={available || false}
            onChange={e => setAvailable(e.target.checked)}
            className="mr-2"
          />
          Available Now
        </label>
      </div>
    </div>
  );
}

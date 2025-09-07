import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { SORT_OPTIONS } from '../../utils/constants';

export default function SortDropdown() {
  const { sortBy, setSortBy } = useContext(AppContext);
  return (
    <div className="mb-4">
      <label className="mr-2">Sort By:</label>
      <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border p-2 rounded">
        {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

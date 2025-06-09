import React from 'react';
import { Search } from 'lucide-react';

const SearchFilterBar = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, passwords }) => {
  const categories = ['All', ...Array.from(new Set(passwords.map(p => p.category).filter(Boolean)))];
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <div className="relative w-full sm:w-1/2">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Search passwords..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
      </div>
      <select
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilterBar; 
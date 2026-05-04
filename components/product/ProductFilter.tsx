'use client';

import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Filters {
  search: string;
  categories: string[];
  inStockOnly: boolean;
  minPrice: number;
  maxPrice: number;
}

interface ProductFilterProps {
  categories: { id: string, name: string }[];
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function ProductFilter({ categories, filters, onChange }: ProductFilterProps) {
  const [localSearch, setLocalSearch] = useState(filters.search);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange({ ...filters, search: localSearch });
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch]);

  const toggleCategory = (categoryName: string) => {
    const newCategories = filters.categories.includes(categoryName)
      ? filters.categories.filter((c) => c !== categoryName)
      : [...filters.categories, categoryName];
    onChange({ ...filters, categories: newCategories });
  };

  const handleClear = () => {
    setLocalSearch('');
    onChange({
      search: '',
      categories: [],
      inStockOnly: false,
      minPrice: 0,
      maxPrice: 5000000,
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg font-serif">Filters</h3>
        <button onClick={handleClear} className="text-sm font-medium text-text-muted hover:text-accent-green transition">
          Clear All
        </button>
      </div>

      <div className="space-y-8">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Items</label>
          <div className="relative">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="e.g. Indomie, Batik..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent text-sm"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            {localSearch && (
              <button 
                onClick={() => setLocalSearch('')}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Categories</label>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat.name)}
                  onChange={() => toggleCategory(cat.name)}
                  className="rounded border-gray-300 text-accent-green focus:ring-accent-green cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-600 group-hover:text-primary-navy transition">{cat.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Stock Toggle */}
        <div>
           <label className="flex items-center group cursor-pointer justify-between">
              <span className="text-sm font-medium text-gray-700">In Stock Only</span>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input 
                    type="checkbox" 
                    name="toggle" 
                    id="toggle" 
                    checked={filters.inStockOnly}
                    onChange={(e) => onChange({...filters, inStockOnly: e.target.checked})}
                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                    style={{ transform: filters.inStockOnly ? 'translateX(100%)' : 'translateX(0)', borderColor: filters.inStockOnly ? '#2D7A4F' : '#E5E7EB' }}
                  />
                  <label htmlFor="toggle" className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${filters.inStockOnly ? 'bg-accent-green' : 'bg-gray-200'}`}></label>
              </div>
            </label>
        </div>
      </div>
    </div>
  );
}

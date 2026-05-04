'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductFilter from './ProductFilter';
import ProductGrid from './ProductGrid';
import { Product } from '@/types/product';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

export default function ProductFilterWrapper() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{id:string, name:string}[]>([
      { id: '1', name: 'Food & Spices' },
      { id: '2', name: 'Textiles/Batik' },
      { id: '3', name: 'Personal Care' },
      { id: '4', name: 'Home & Living' },
      { id: '5', name: 'Crafts' },
      { id: '6', name: 'Apparel' },
  ]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    search: '',
    categories: categoryParam ? [categoryParam] : [],
    inStockOnly: false,
    minPrice: 0,
    maxPrice: 5000000,
  });
  
  const [sortBy, setSortBy] = useState('Newest');

  // We should mock some data if Firebase connects fail or return 0, just so UI works
  useEffect(() => {
    // Simulate fetching
    const mockProducts: Product[] = [
      {
        id: 'p1', sku: 'IND-01', name: 'Indomie Goreng Original (Pack of 40)', slug: 'indomie-goreng',
        categoryId: 'Food & Spices', shortDescription: 'The classic beloved instant noodle.',
        description: '...', diasporaStory: '...', priceIdr: 150000, priceUsd: 10,
        stockQuantity: 100, stockStatus: 'In Stock', weightGram: 3400, originCity: 'Jakarta',
        supplierName: 'Indofood', isReadyStock: true, isFeatured: true, isActive: true,
        thumbnailUrl: 'https://picsum.photos/seed/indomie/400/400', images: [],
        seoTitle: '', seoDescription: '', tags: [], rating: 4.9, reviewCount: 240,
        createdAt: Date.parse('2023-01-01'), updatedAt: Date.parse('2023-01-01')
      },
      {
         id: 'p2', sku: 'BTK-01', name: 'Hand-Drawn Silk Batik Scarf', slug: 'hand-drawn-silk-batik',
         categoryId: 'Textiles/Batik', shortDescription: 'Authentic hand-drawn (tulis) batik from Pekalongan.',
         description: '...', diasporaStory: '...', priceIdr: 450000, priceUsd: 30,
         stockQuantity: 5, stockStatus: 'In Stock', weightGram: 200, originCity: 'Pekalongan',
         supplierName: 'Batik Danar Hadi', isReadyStock: true, isFeatured: true, isActive: true,
         thumbnailUrl: 'https://picsum.photos/seed/batik1/400/400', images: [],
         seoTitle: '', seoDescription: '', tags: [], rating: 5.0, reviewCount: 12,
         createdAt: Date.parse('2023-01-01'), updatedAt: Date.parse('2023-01-01')
      },
      {
         id: 'p3', sku: 'CRAFT-01', name: 'Jepara Teak Wood Serving Tray', slug: 'teak-wood-tray',
         categoryId: 'Crafts', shortDescription: 'Hand-carved premium teak wood tray.',
         description: '...', diasporaStory: '...', priceIdr: 250000, priceUsd: 18,
         stockQuantity: 0, stockStatus: 'Out of Stock', weightGram: 800, originCity: 'Jepara',
         supplierName: 'Jepara Crafters', isReadyStock: false, isFeatured: true, isActive: true,
         thumbnailUrl: 'https://picsum.photos/seed/tray/400/400', images: [],
         seoTitle: '', seoDescription: '', tags: [], rating: 4.8, reviewCount: 8,
         createdAt: Date.parse('2023-01-01'), updatedAt: Date.parse('2023-01-01')
      }
    ];

    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);

  }, []);

  // Filter local logic
  const filteredProducts = products.filter(p => {
    if (filters.search && !p.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.categories.length > 0 && !filters.categories.includes(p.categoryId)) return false;
    if (filters.inStockOnly && p.stockStatus === 'Out of Stock') return false;
    // skip price filter for now
    return true;
  }).sort((a, b) => {
    if (sortBy === 'Price Low-High') return a.priceIdr - b.priceIdr;
    if (sortBy === 'Price High-Low') return b.priceIdr - a.priceIdr;
    return b.createdAt - a.createdAt; // Newest
  });

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full md:w-64 shrink-0">
        <ProductFilter 
          categories={categories} 
          filters={filters} 
          onChange={setFilters} 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="font-medium text-gray-700">{filteredProducts.length} Results Found</p>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <label className="text-sm text-text-muted">Sort By:</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-green"
            >
              <option>Newest Arrival</option>
              <option>Price Low-High</option>
              <option>Price High-Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-green"></div>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>
    </div>
  );
}

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
      { id: 'food-spices', name: 'Food & Spices' },
      { id: 'textiles-batik', name: 'Textiles/Batik' },
      { id: 'personal-care', name: 'Personal Care' },
      { id: 'crafts', name: 'Crafts' },
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('isActive', '==', true));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          console.log('No products found in Firestore, using mock data');
          setProducts(mockProducts);
        } else {
          const fetchedProducts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Product[];
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error('Error fetching products from Firestore:', error);
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const mockProducts: Product[] = [
    {
      id: 'p1', sku: 'IND-01', name: 'Indomie Goreng Original (Pack of 40)', slug: 'indomie-goreng',
      categoryId: 'food-spices', shortDescription: 'The classic beloved instant noodle.',
      description: '...', diasporaStory: '...', priceIdr: 150000, priceUsd: 10,
      stockQuantity: 100, stockStatus: 'In Stock', weightGram: 3400, originCity: 'Jakarta',
      supplierName: 'Indofood', isReadyStock: true, isFeatured: true, isActive: true,
      thumbnailUrl: 'https://picsum.photos/seed/indomie/400/400', images: [],
      seoTitle: '', seoDescription: '', tags: [], rating: 4.9, reviewCount: 240,
      createdAt: Date.now(), updatedAt: Date.now()
    },
    {
       id: 'p2', sku: 'BTK-01', name: 'Hand-Drawn Silk Batik Scarf', slug: 'hand-drawn-silk-batik',
       categoryId: 'textiles-batik', shortDescription: 'Authentic hand-drawn (tulis) batik from Pekalongan.',
       description: '...', diasporaStory: '...', priceIdr: 450000, priceUsd: 30,
       stockQuantity: 5, stockStatus: 'In Stock', weightGram: 200, originCity: 'Pekalongan',
       supplierName: 'Batik Danar Hadi', isReadyStock: true, isFeatured: true, isActive: true,
       thumbnailUrl: 'https://picsum.photos/seed/batik1/400/400', images: [],
       seoTitle: '', seoDescription: '', tags: [], rating: 5.0, reviewCount: 12,
       createdAt: Date.now(), updatedAt: Date.now()
    }
  ];


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

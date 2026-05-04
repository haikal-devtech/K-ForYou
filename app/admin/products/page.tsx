'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { Product } from '@/types/product';
import { formatIDR } from '@/lib/utils';
import { Trash2, Edit, Search, Plus, Filter } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
          <p className="text-gray-500">Manage products, stock, and pricing across all categories.</p>
        </div>
        <Link href="/admin/products/new" className="px-5 py-3 bg-primary-navy hover:bg-accent-green text-white font-bold rounded-xl transition flex items-center gap-2 shadow-lg">
          <Plus className="w-5 h-5" /> New Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white">
            <div className="relative flex-1 max-w-md">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
               <input 
                type="text" 
                placeholder="Search by name or SKU..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-accent-green text-sm transition" 
               />
            </div>
            <div className="flex items-center gap-3">
               <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm flex items-center gap-2 hover:bg-gray-50 transition">
                  <Filter className="w-4 h-4" /> Filters
               </button>
            </div>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
               <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold tracking-wider">
                  <tr>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4">Product</th>
                     <th className="px-6 py-4">Category</th>
                     <th className="px-6 py-4">Price</th>
                     <th className="px-6 py-4 text-center">Stock</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                         <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-green"></div>
                         </div>
                         <p className="mt-4 text-gray-400">Loading products...</p>
                      </td>
                    </tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                         No products found.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 transition group">
                        <td className="px-6 py-4">
                           <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                             product.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                           }`}>
                             <span className={`w-1.5 h-1.5 rounded-full ${product.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                             {product.isActive ? 'Active' : 'Inactive'}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gray-100 shrink-0 overflow-hidden relative border border-gray-50">
                                 {product.thumbnailUrl && (
                                   <img src={product.thumbnailUrl} alt={product.name} className="object-cover w-full h-full" />
                                 )}
                              </div>
                              <div>
                                 <p className="font-bold text-gray-900">{product.name}</p>
                                 <p className="text-xs text-gray-400">SKU: {product.sku}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <span className="text-gray-600">{product.categoryId}</span>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">
                           {formatIDR(product.priceIdr)}
                        </td>
                        <td className="px-6 py-4 text-center">
                           <span className={`font-medium ${product.stockQuantity < 10 ? 'text-orange-600' : 'text-gray-900'}`}>
                             {product.stockQuantity}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                              <Link 
                                href={`/admin/products/${product.id}`}
                                className="p-2 text-gray-400 hover:text-primary-navy hover:bg-gray-100 rounded-lg transition"
                                title="Edit Product"
                              >
                                 <Edit className="w-4 h-4" />
                              </Link>
                              <button 
                                onClick={() => handleDelete(product.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                                title="Delete Product"
                              >
                                 <Trash2 className="w-4 h-4" />
                              </button>
                           </div>
                        </td>
                      </tr>
                    ))
                  )}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}


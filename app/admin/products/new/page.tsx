'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/lib/validators';
import { z } from 'zod';
import { useState } from 'react';
import Link from 'next/link';

type ProductForm = z.infer<typeof productSchema>;

export default function NewProductPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ProductForm>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: { stockStatus: 'In Stock', isReadyStock: true, isFeatured: false, isActive: true }
  });

  const onSubmit = async (data: ProductForm) => {
    setIsSubmitting(true);
    // In a real app we'd save to Firestore here:
    // await addDoc(collection(db, 'products'), data)
    setTimeout(() => {
      alert('Product saved locally (mock).');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">New Product</h1>
          <p className="text-gray-500">Add a new item to your marketplace.</p>
        </div>
        <Link href="/admin/products" className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition">
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
         <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-bold text-gray-900">Basic Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                 <input {...register('name')} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green" />
                 {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                 <input {...register('sku')} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green" />
                 {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku.message}</p>}
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                 <select {...register('categoryId')} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green">
                    <option value="">Select Category</option>
                    <option value="Food & Spices">Food & Spices</option>
                    <option value="Textiles/Batik">Textiles/Batik</option>
                 </select>
                 {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>}
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Origin City</label>
                 <input {...register('originCity')} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green" />
               </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
               <input {...register('shortDescription')} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green" />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Diaspora Story (Italic, Tone)</label>
               <textarea {...register('diasporaStory')} rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green font-serif" />
            </div>
            
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
               <textarea {...register('description')} rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green" />
            </div>
         </div>

         <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
             <h2 className="text-lg font-bold text-gray-900">Pricing & Inventory</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (IDR)</label>
                  <input type="number" {...register('priceIdr')} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (USD)</label>
                  <input type="number" {...register('priceUsd')} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                  <input type="number" {...register('stockQuantity')} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock Status</label>
                  <select {...register('stockStatus')} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green">
                     <option value="In Stock">In Stock</option>
                     <option value="Out of Stock">Out of Stock</option>
                     <option value="Pre-order">Pre-order</option>
                  </select>
                </div>
             </div>
         </div>

         <div className="flex justify-end gap-4">
             <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-accent-green text-white font-bold rounded-lg hover:bg-green-700 transition disabled:opacity-50">
               {isSubmitting ? 'Saving...' : 'Save Product'}
             </button>
         </div>
      </form>
    </div>
  );
}

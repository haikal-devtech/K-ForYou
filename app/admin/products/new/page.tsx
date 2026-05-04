'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/lib/validators';
import { z } from 'zod';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ArrowLeft, Upload, Package, Info, DollarSign, Archive } from 'lucide-react';

type ProductForm = z.infer<typeof productSchema>;

export default function NewProductPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, watch } = useForm<ProductForm>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: { 
      stockStatus: 'In Stock', 
      isReadyStock: true, 
      isFeatured: false, 
      isActive: true,
      priceIdr: 0,
      priceUsd: 0,
      stockQuantity: 0,
      weightGram: 0,
      tags: ''
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const onSubmit = async (data: ProductForm) => {
    setIsSubmitting(true);
    try {
      let thumbnailUrl = '';
      
      // 1. Upload Image to Firebase Storage
      if (imageFile) {
        const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        thumbnailUrl = await getDownloadURL(snapshot.ref);
      }

      // 2. Prepare Data
      const finalData = {
        ...data,
        slug: generateSlug(data.name),
        thumbnailUrl: thumbnailUrl || 'https://picsum.photos/seed/placeholder/800/800',
        images: [thumbnailUrl].filter(Boolean),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // 3. Save to Firestore
      await addDoc(collection(db, 'products'), finalData);
      
      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <Link href="/admin/products" className="text-sm text-text-muted hover:text-primary-navy flex items-center gap-1 mb-2 transition">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        </div>
        <div className="flex gap-3">
           <Link href="/admin/products" className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition shadow-sm">
             Cancel
           </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Main Content */}
         <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
               <div className="flex items-center gap-2 text-primary-navy mb-2">
                  <Info className="w-5 h-5" />
                  <h2 className="text-lg font-bold">General Information</h2>
               </div>
               
               <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Product Name</label>
                    <input 
                      {...register('name')} 
                      placeholder="e.g. Sambal Bajak Homemade"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-green outline-none transition" 
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">SKU</label>
                      <input {...register('sku')} placeholder="SAM-001" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-green outline-none transition" />
                      {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                      <select {...register('categoryId')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-green outline-none transition appearance-none">
                         <option value="">Select Category</option>
                         <option value="food-spices">Food & Spices</option>
                         <option value="textiles-batik">Textiles/Batik</option>
                         <option value="personal-care">Personal Care</option>
                         <option value="crafts">Crafts</option>
                      </select>
                      {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>}
                    </div>
                  </div>

                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1.5">Short Description</label>
                     <input {...register('shortDescription')} placeholder="Catchy one-liner for search results" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-green outline-none transition" />
                     {errors.shortDescription && <p className="text-red-500 text-xs mt-1">{errors.shortDescription.message}</p>}
                  </div>

                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Description</label>
                     <textarea {...register('description')} rows={5} placeholder="Detailed product specifications and benefits..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-green outline-none transition resize-none" />
                     {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                  </div>

                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1.5 italic">Diaspora Story (Automated storytelling tone)</label>
                     <textarea {...register('diasporaStory')} rows={3} placeholder="Tell the emotional connection of this product..." className="w-full px-4 py-3 rounded-xl border border-amber-100 bg-amber-50/30 focus:ring-2 focus:ring-amber-200 outline-none transition font-serif italic" />
                     {errors.diasporaStory && <p className="text-red-500 text-xs mt-1">{errors.diasporaStory.message}</p>}
                  </div>
               </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
               <div className="flex items-center gap-2 text-primary-navy mb-2">
                  <DollarSign className="w-5 h-5" />
                  <h2 className="text-lg font-bold">Pricing & Logistics</h2>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <div>
                       <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price (IDR)</label>
                       <input type="number" {...register('priceIdr')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-green outline-none transition" />
                       {errors.priceIdr && <p className="text-red-500 text-xs mt-1">{errors.priceIdr.message}</p>}
                     </div>
                     <div>
                       <label className="block text-sm font-semibold text-gray-700 mb-1.5">Weight (Grams)</label>
                       <input type="number" {...register('weightGram')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-green outline-none transition" />
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div>
                       <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price (USD Approx.)</label>
                       <input type="number" {...register('priceUsd')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-green outline-none transition" />
                     </div>
                     <div>
                       <label className="block text-sm font-semibold text-gray-700 mb-1.5">Origin City</label>
                       <input {...register('originCity')} placeholder="e.g. Solo" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-green outline-none transition" />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Sidebar Content */}
         <div className="space-y-8">
            {/* Image Upload */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-4">
               <h2 className="text-lg font-bold text-gray-900">Product Image</h2>
               <div className="aspect-square w-full rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center relative overflow-hidden group">
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                         <button type="button" onClick={() => setImageFile(null) || setImagePreview(null)} className="text-white text-sm font-bold underline">Remove</button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-6">
                       <Upload className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                       <p className="text-xs text-gray-400">Click to upload product thumbnail</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
               </div>
               <p className="text-[10px] text-gray-400 text-center">Recommend size: 800x800px. Max 2MB.</p>
            </div>

            {/* Inventory Status */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
               <div className="flex items-center gap-2 text-primary-navy mb-2">
                  <Archive className="w-5 h-5" />
                  <h2 className="text-lg font-bold">Inventory</h2>
               </div>
               
               <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Stock Quantity</label>
                    <input type="number" {...register('stockQuantity')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-green outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Stock Status</label>
                    <select {...register('stockStatus')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-green outline-none transition appearance-none">
                       <option value="In Stock">In Stock</option>
                       <option value="Out of Stock">Out of Stock</option>
                       <option value="Pre-order">Pre-order</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                     <input type="checkbox" {...register('isActive')} id="isActive" className="w-4 h-4 rounded text-accent-green focus:ring-accent-green" />
                     <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Publish Product</label>
                  </div>
               </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
               <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full py-4 bg-primary-navy text-white font-bold rounded-2xl hover:bg-accent-green transition disabled:opacity-50 shadow-xl flex items-center justify-center gap-2"
               >
                 {isSubmitting ? (
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                 ) : (
                   <>
                     <Package className="w-5 h-5" /> Save & Publish
                   </>
                 )}
               </button>
            </div>
         </div>
      </form>
    </div>
  );
}


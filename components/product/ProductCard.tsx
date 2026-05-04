'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Product } from '@/types/product';
import { formatIDR } from '@/lib/utils';
import { useCartStore } from '@/lib/cart-store';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();

  const getBadgeColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'food & spices': return 'bg-orange-100 text-orange-800';
      case 'textiles/batik': return 'bg-indigo-100 text-indigo-800';
      case 'personal care': return 'bg-pink-100 text-pink-800';
      case 'home & living': return 'bg-teal-100 text-teal-800';
      case 'crafts': return 'bg-amber-100 text-amber-800';
      case 'apparel': return 'bg-violet-100 text-violet-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full">
      <Link href={`/marketplace/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.thumbnailUrl || `https://picsum.photos/seed/${product.id}/400/400`}
          alt={product.name}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {/* We will map categoryId to name in the grid level, passing full name here, but for now pretend product.categoryId is the name */}
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(product.categoryId)}`}>
            {product.categoryId}
          </span>
          {product.stockStatus !== 'In Stock' && (
             <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
               {product.stockStatus}
             </span>
          )}
        </div>
      </Link>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
           <Link href={`/marketplace/${product.slug}`}>
            <h3 className="font-bold text-lg text-primary-navy group-hover:text-accent-green transition-colors line-clamp-2">
              {product.name}
            </h3>
           </Link>
        </div>
        
        <p className="text-sm text-text-muted mb-4">{product.originCity}</p>
        
        <div className="flex items-center gap-1 mb-4 mt-auto">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium">{product.rating ? product.rating.toFixed(1) : 'New'}</span>
          {product.reviewCount > 0 && <span className="text-xs text-text-muted">({product.reviewCount})</span>}
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div>
            <p className="font-bold text-lg text-primary-navy">{formatIDR(product.priceIdr)}</p>
          </div>
          <button 
             onClick={(e) => {
               e.preventDefault();
               addItem(product);
             }}
             className="px-4 py-2 bg-primary-navy hover:bg-accent-green text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
             disabled={product.stockStatus === 'Out of Stock'}
          >
            {product.stockStatus === 'Out of Stock' ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

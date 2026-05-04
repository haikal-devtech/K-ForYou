import { Product } from '@/types/product';
import { Star, Truck, ShieldCheck } from 'lucide-react';
import { formatIDR } from '@/lib/utils';
import ProductImageGallery from '@/components/product/ProductImageGallery';

// For demo purposes, receiving static product data
export default function ProductDetail({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Gallery */}
        <div>
          <ProductImageGallery images={product.images.length ? product.images : [product.thumbnailUrl]} />
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-4">
              {product.categoryId}
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-navy mb-2">
              {product.name}
            </h1>
            <p className="text-text-muted flex items-center gap-2">
              From <span className="font-semibold text-gray-700">{product.originCity}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="font-medium">{product.rating ? product.rating.toFixed(1) : 'New'}</span>
              <span className="text-text-muted">({product.reviewCount} reviews)</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
             {product.stockStatus === 'In Stock' ? (
                <span className="text-accent-green font-medium">In Stock</span>
             ) : (
                <span className="text-red-500 font-medium">{product.stockStatus}</span>
             )}
          </div>

          <div className="mb-8">
            <p className="text-3xl font-bold text-primary-navy mb-1">{formatIDR(product.priceIdr)}</p>
            <p className="text-text-muted text-sm">approx. ${product.priceUsd} USD</p>
          </div>

          <div className="prose prose-sm text-gray-600 mb-8 max-w-none">
            <p>{product.shortDescription}</p>
          </div>

          {product.diasporaStory && (
            <div className="bg-bg-warm p-6 rounded-2xl mb-8 border border-amber-100">
               <h4 className="font-serif font-bold text-primary-navy mb-2">The Diaspora Connection</h4>
               <p className="italic text-gray-700 text-sm leading-relaxed">
                 &quot;{product.diasporaStory}&quot;
               </p>
            </div>
          )}

          <div className="mt-auto flex flex-col gap-4">
            <button 
              disabled={product.stockStatus === 'Out of Stock'}
              className="w-full py-4 rounded-xl bg-accent-green text-white font-bold text-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {product.stockStatus === 'Out of Stock' ? 'Currently Unavailable' : 'Add to Cart'}
            </button>
            <div className="flex items-center justify-center gap-6 text-sm text-text-muted mt-4">
               <div className="flex items-center gap-2">
                 <Truck className="w-4 h-4" /> Consolidated Shipping
               </div>
               <div className="flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4" /> Authentic Quality
               </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Tab details could go below here */}
      <div className="mt-16 border-t border-gray-100 pt-12">
        <h3 className="text-2xl font-serif font-bold text-primary-navy mb-6">Product Details</h3>
        <div className="prose text-gray-600 max-w-none">
           <p>{product.description || "Detailed description unavailable."}</p>
        </div>
      </div>
    </div>
  );
}

import ProductFilterWrapper from '@/components/product/ProductFilterWrapper';
import { Suspense } from 'react';

export default function MarketplacePage() {
  return (
    <div className="bg-bg-warm min-h-screen pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
           <h1 className="text-4xl font-serif font-bold text-primary-navy mb-4">Marketplace</h1>
           <p className="text-text-muted">Discover authentic flavors, cultural crafts, and a piece of home from our curated selection of Indonesian diaspora goods.</p>
        </div>

        {/* Client side wrapper for filters and grid */}
        <Suspense fallback={<div className="text-center py-10">Loading products...</div>}>
          <ProductFilterWrapper />
        </Suspense>

      </div>
    </div>
  );
}

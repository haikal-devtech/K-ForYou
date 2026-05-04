import ProductDetail from '@/components/product/ProductDetail';
import ProductGrid from '@/components/product/ProductGrid';
import { Product } from '@/types/product';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let product: Product | null = null;
  let error = false;

  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      product = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as Product;
    }
  } catch (e) {
    console.error('Error fetching product:', e);
    error = true;
  }

  // Fallback to mock if not found or error
  if (!product) {
    product = mockProducts.find(p => p.slug === slug) || null;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-serif font-bold text-primary-navy mb-4">Product Not Found</h1>
        <Link href="/marketplace" className="text-accent-green hover:underline">Return to Marketplace</Link>
      </div>
    );
  }

  const relatedProducts: Product[] = []; 

  return (
    <div className="bg-bg-warm min-h-screen pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/marketplace" className="inline-flex items-center gap-2 text-text-muted hover:text-primary-navy font-medium mb-8 transition group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Marketplace
        </Link>
        
        <ProductDetail product={product} />

        {/* Related Products */}
        <div>
          <h3 className="text-2xl font-serif font-bold text-primary-navy mb-8">You May Also Like</h3>
          <ProductGrid products={relatedProducts} />
        </div>

      </div>
    </div>
  );
}

const mockProducts: Product[] = [
  {
    id: 'p1', sku: 'IND-01', name: 'Original Indomie Goreng (Pack of 40)', slug: 'indomie-goreng',
    categoryId: 'food-spices', shortDescription: 'The classic beloved instant noodle directly from Indonesia.',
    description: 'A full carton of 40 packets of the original Indomie Mi Goreng. The perfect balance of sweet, savory, and umami that instantly transports you back to local warungs.', 
    diasporaStory: 'Nothing cures homesickness faster than the scent of Indomie Goreng wafting from the kitchen. It is the taste of college dorms in Bandung and late-night talks in Jakarta, now brought to your global pantry.', priceIdr: 150000, priceUsd: 10,
    stockQuantity: 100, stockStatus: 'In Stock', weightGram: 3400, originCity: 'Jakarta',
    supplierName: 'Indofood', isReadyStock: true, isFeatured: true, isActive: true,
    thumbnailUrl: 'https://picsum.photos/seed/indomie/800/800', images: ['https://picsum.photos/seed/indomie/800/800', 'https://picsum.photos/seed/indomie2/800/800'],
    seoTitle: '', seoDescription: '', tags: [], rating: 4.9, reviewCount: 240,
    createdAt: Date.now(), updatedAt: Date.now()
  }
];


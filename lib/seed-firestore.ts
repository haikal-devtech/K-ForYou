import { db } from './firebase';

import { collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';

const categories = [
  { id: 'food-spices', name: 'Food & Spices', icon: '🌶️', slug: 'food-spices' },
  { id: 'textiles-batik', name: 'Textiles & Batik', icon: '🎨', slug: 'textiles-batik' },
  { id: 'personal-care', name: 'Personal Care', icon: '🌿', slug: 'personal-care' },
  { id: 'crafts', name: 'Crafts', icon: '🏺', slug: 'crafts' },
];

const products = [
  {
    id: 'prod-001',
    sku: 'KFY-BUM-001',
    name: 'Bumbu Rendang Padang Autentik',
    slug: 'bumbu-rendang-padang-autentik',
    categoryId: 'food-spices',
    shortDescription: 'Rempah rendang asli dari Minangkabau.',
    description: 'Bumbu rendang siap saji yang diracik dengan 15 jenis rempah pilihan dari dataran tinggi Sumatera Barat. Tanpa pengawet dan MSG.',
    diasporaStory: 'Membawa aroma dapur Ibu di Padang langsung ke meja makan Anda di luar negeri.',
    priceIdr: 45000,
    priceUsd: 3,
    stockQuantity: 100,
    stockStatus: 'In Stock',
    weightGram: 250,
    originCity: 'Padang',
    supplierName: 'Rempah Nusantara',
    isReadyStock: true,
    isFeatured: true,
    isActive: true,
    thumbnailUrl: 'https://picsum.photos/seed/rendang/400/400',
    images: ['https://picsum.photos/seed/rendang/800/800'],
    rating: 4.8,
    reviewCount: 124,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'prod-002',
    sku: 'KFY-BTK-001',
    name: 'Kain Batik Tulis Solo - Motif Parang',
    slug: 'kain-batik-tulis-solo-parang',
    categoryId: 'textiles-batik',
    shortDescription: 'Batik tulis tangan asli Surakarta.',
    description: 'Kain batik tulis premium dengan motif Parang Rusak. Dibuat selama 3 bulan oleh pengrajin senior di Solo.',
    diasporaStory: 'Setiap goresan canting adalah doa dan warisan leluhur yang kami jaga untuk Anda.',
    priceIdr: 1250000,
    priceUsd: 85,
    stockQuantity: 5,
    stockStatus: 'In Stock',
    weightGram: 500,
    originCity: 'Solo',
    supplierName: 'Batik Laweyan',
    isReadyStock: true,
    isFeatured: true,
    isActive: true,
    thumbnailUrl: 'https://picsum.photos/seed/batik/400/400',
    images: ['https://picsum.photos/seed/batik/800/800'],
    rating: 5.0,
    reviewCount: 12,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
];

export async function seedFirestore() {
  try {
    console.log('Seeding categories...');
    for (const cat of categories) {
      console.log(`Writing category: ${cat.id}`);
      await setDoc(doc(db, 'categories', cat.id), cat);
    }

    console.log('Seeding products...');
    for (const prod of products) {
      console.log(`Writing product: ${prod.id}`);
      await setDoc(doc(db, 'products', prod.id), prod);
    }
    
    console.log('Seeding completed!');
  } catch (error) {
    console.error('Error seeding Firestore:', error);
    throw error;
  }
}


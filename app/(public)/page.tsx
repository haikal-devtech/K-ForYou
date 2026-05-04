import Hero from '@/components/layout/Hero';
import Link from 'next/link';
import { ShoppingBag, Globe, ShieldCheck, Truck } from 'lucide-react';

const categories = [
  { id: 'food', name: 'Food & Spices', icon: '🌶️', slug: 'food-spices' },
  { id: 'textiles', name: 'Textiles/Batik', icon: '🎨', slug: 'textiles-batik' },
  { id: 'care', name: 'Personal Care', icon: '🌿', slug: 'personal-care' },
  { id: 'crafts', name: 'Crafts', icon: '🏺', slug: 'crafts' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-50">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-primary-navy mb-2">Kurasi Autentik</h3>
            <p className="text-sm text-text-muted">Produk langsung dari pengrajin & UMKM pilihan.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-50">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-primary-navy mb-2">Jangkauan Global</h3>
            <p className="text-sm text-text-muted">Hadir untuk Diaspora Indonesia di mana saja.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-50">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-primary-navy mb-2">Pengiriman Aman</h3>
            <p className="text-sm text-text-muted">Logistik terpercaya hingga ke depan pintu.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-50">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-4">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-primary-navy mb-2">Mudah & Cepat</h3>
            <p className="text-sm text-text-muted">Transaksi mudah dengan berbagai metode bayar.</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary-navy mb-2">Jelajahi Kategori</h2>
            <p className="text-text-muted">Temukan keunikan Nusantara sesuai keinginan Anda.</p>
          </div>
          <Link href="/marketplace" className="text-accent-green font-bold hover:underline">Lihat Semua</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/marketplace?category=${cat.id}`}
              className="group p-8 bg-white rounded-3xl border border-gray-100 hover:border-accent-green hover:shadow-xl transition-all text-center"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <h3 className="font-bold text-primary-navy group-hover:text-accent-green transition-colors">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-primary-navy rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
          <div className="relative z-10 md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Cerita di Balik Setiap Produk</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Kami tidak hanya menjual barang. Setiap produk membawa cerita dari pengrajin lokal, perjuangan UMKM, dan warisan budaya yang kami jaga keasliannya.
            </p>
            <Link href="/about" className="inline-block px-8 py-4 bg-accent-green text-white font-bold rounded-full hover:bg-green-600 transition-all">
              Baca Diaspora Story
            </Link>
          </div>
          <div className="md:w-1/2 relative h-64 md:h-96 w-full">
            <div className="absolute inset-0 bg-accent-green/20 rounded-full blur-3xl -right-20 -bottom-20"></div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 absolute top-0 right-0 border border-white/10 rotate-3 hidden md:block">
               <div className="w-48 h-48 bg-gray-800 rounded-lg animate-pulse"></div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 absolute bottom-0 left-0 border border-white/10 -rotate-3 hidden md:block">
               <div className="w-64 h-64 bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


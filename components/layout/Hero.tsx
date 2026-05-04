import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-[#FAFAF7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 py-16 sm:py-24 lg:py-32 lg:w-1/2">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary-navy leading-tight mb-6">
            Membawa Cita Rasa <span className="text-accent-green italic">Indonesia</span> ke Seluruh Dunia
          </h1>
          <p className="text-lg text-text-muted mb-8 max-w-lg">
            Kurasi produk terbaik dari UMKM Indonesia. Mulai dari rempah autentik hingga kerajinan tangan bernilai seni tinggi, kami hantarkan kerinduan akan tanah air ke pintu rumah Anda.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/marketplace" 
              className="px-8 py-4 bg-primary-navy text-white font-bold rounded-full hover:bg-accent-green transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group"
            >
              Belanja Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-4 bg-white text-primary-navy font-bold rounded-full border-2 border-primary-navy/10 hover:border-primary-navy transition-all"
            >
              Tentang Kami
            </Link>
          </div>
          
          <div className="mt-12 flex items-center gap-8">
            <div>
              <p className="text-2xl font-bold text-primary-navy">500+</p>
              <p className="text-sm text-text-muted">Produk UMKM</p>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div>
              <p className="text-2xl font-bold text-primary-navy">50+</p>
              <p className="text-sm text-text-muted">Kota Asal</p>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div>
              <p className="text-2xl font-bold text-primary-navy">Global</p>
              <p className="text-sm text-text-muted">Pengiriman</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Image
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="/kforyou_hero_banner.png" // We will move the generated image here
          alt="Indonesian Crafts and Spices"
          width={1200}
          height={800}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAF7] via-transparent to-transparent lg:hidden"></div>
      </div>
    </div>
  );
}

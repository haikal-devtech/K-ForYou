'use client';

import Link from 'next/link';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { items, openCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-[#FAFAF7]/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="font-serif text-2xl font-bold text-primary-navy">
              K-For You
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/marketplace" className="text-text-primary hover:text-accent-green transition-colors font-medium">Marketplace</Link>
            <Link href="/about" className="text-text-primary hover:text-accent-green transition-colors font-medium">About Us</Link>
            <Link href="/faq" className="text-text-primary hover:text-accent-green transition-colors font-medium">FAQ</Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-text-primary hover:text-accent-green hidden md:block">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={openCart} className="p-2 text-text-primary hover:text-accent-green relative">
              <ShoppingBag className="w-5 h-5" />
              {mounted && itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-accent-green rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
            <button className="p-2 text-text-primary md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}


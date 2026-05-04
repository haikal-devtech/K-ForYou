'use client';

import { useCartStore } from '@/lib/cart-store';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { formatIDR } from '@/lib/utils';
import Link from 'next/link';

import { useEffect, useState } from 'react';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Do not render anything reliant on local storage until hydrated to prevent mismatch
  if (!mounted || !isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity" 
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[400px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300">
        
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-primary-navy flex items-center gap-2">
            <ShoppingBag className="w-5 h-5"/> Your Cart
          </h2>
          <button onClick={closeCart} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 gap-4">
              <ShoppingBag className="w-16 h-16 text-gray-300" />
              <p>Your cart is empty.</p>
              <button onClick={closeCart} className="text-accent-green font-medium hover:underline">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                    <Image src={item.product.thumbnailUrl || `https://picsum.photos/seed/${item.product.id}/200/200`} alt={item.product.name} fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-sm text-primary-navy line-clamp-2">{item.product.name}</h4>
                      <button onClick={() => removeItem(item.product.id)} className="text-gray-400 hover:text-red-500 transition">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-text-muted mb-2">{item.product.originCity}</p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-1 text-gray-500 hover:bg-gray-50 transition">
                           <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 text-gray-500 hover:bg-gray-50 transition">
                           <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-bold text-sm text-primary-navy">
                        {formatIDR(item.product.priceIdr * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="font-medium text-gray-600">Subtotal (IDR)</span>
              <span className="font-bold text-xl text-primary-navy">{formatIDR(getSubtotal())}</span>
            </div>
            <Link 
              href="/inquiry"
              onClick={closeCart}
              className="block w-full py-4 bg-accent-green text-center text-white font-bold rounded-xl hover:bg-green-700 transition"
            >
              Request Shipping Quote
            </Link>
            <p className="text-xs text-center text-gray-500 mt-4">Shipping fees will be calculated based on destination.</p>
          </div>
        )}
      </div>
    </>
  );
}

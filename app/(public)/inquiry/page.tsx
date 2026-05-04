'use client';

import { useCartStore } from '@/lib/cart-store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inquirySchema } from '@/lib/validators';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { formatIDR } from '@/lib/utils';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ShoppingBag, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type InquiryForm = z.infer<typeof inquirySchema>;

export default function InquiryPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InquiryForm>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      preferredContact: 'WhatsApp',
    },
  });

  const onSubmit = async (data: InquiryForm) => {
    if (items.length === 0) return;
    
    setIsSubmitting(true);
    try {
      // 1. Create Inquiry in Firestore
      const inquiryData = {
        ...data,
        items: items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          priceIdr: item.product.priceIdr,
        })),
        subtotal: getSubtotal(),
        status: 'new',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'inquiries'), inquiryData);

      // 2. Add to Leads
      const leadData = {
        name: data.buyerName,
        email: data.buyerEmail,
        phone: data.buyerPhone,
        country: data.country,
        city: data.city,
        source: 'Website Inquiry',
        createdAt: serverTimestamp(),
      };
      
      await addDoc(collection(db, 'leads'), leadData);

      // 3. Cleanup
      clearCart();
      router.push('/inquiry/confirmation');
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-serif font-bold text-primary-navy mb-2">Your cart is empty</h1>
        <p className="text-text-muted mb-8 text-center max-w-md">You haven&apos;t added any products to your inquiry yet. Let&apos;s find something authentic!</p>
        <Link href="/marketplace" className="px-8 py-3 bg-accent-green text-white font-bold rounded-full hover:bg-green-700 transition shadow-lg">
          Browse Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-bg-warm min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/marketplace" className="inline-flex items-center gap-2 text-text-muted hover:text-primary-navy font-medium mb-8 transition group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Kembali ke Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Form */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 order-2 lg:order-1">
            <h2 className="text-2xl font-serif font-bold text-primary-navy mb-8">Informasi Pengiriman</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                  <input 
                    {...register('buyerName')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-green focus:border-transparent outline-none transition"
                    placeholder="Contoh: Budi Santoso"
                  />
                  {errors.buyerName && <p className="text-red-500 text-xs mt-1">{errors.buyerName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    {...register('buyerEmail')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-green focus:border-transparent outline-none transition"
                    placeholder="email@contoh.com"
                  />
                  {errors.buyerEmail && <p className="text-red-500 text-xs mt-1">{errors.buyerEmail.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp (dengan kode negara)</label>
                <input 
                  {...register('buyerPhone')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-green focus:border-transparent outline-none transition"
                  placeholder="+62 812 3456 7890"
                />
                {errors.buyerPhone && <p className="text-red-500 text-xs mt-1">{errors.buyerPhone.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Negara Tujuan</label>
                  <input 
                    {...register('country')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-green focus:border-transparent outline-none transition"
                    placeholder="Contoh: USA, Australia, Germany"
                  />
                  {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
                  <input 
                    {...register('city')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-green focus:border-transparent outline-none transition"
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-1">
                   <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                   <input 
                    {...register('address')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-green focus:border-transparent outline-none transition"
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
                  <input 
                    {...register('postalCode')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-green focus:border-transparent outline-none transition"
                  />
                  {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Metode Kontak Pilihan</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value="WhatsApp" {...register('preferredContact')} className="w-4 h-4 text-accent-green focus:ring-accent-green" />
                    <span className="text-sm">WhatsApp</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value="Email" {...register('preferredContact')} className="w-4 h-4 text-accent-green focus:ring-accent-green" />
                    <span className="text-sm">Email</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catatan Tambahan (Opsional)</label>
                <textarea 
                  {...register('notes')}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-green focus:border-transparent outline-none transition resize-none"
                  placeholder="Instruksi khusus pengiriman atau pertanyaan..."
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary-navy text-white font-bold rounded-2xl hover:bg-accent-green transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Kirim Request Quotation <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Cart Summary */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-24">
               <h2 className="text-2xl font-serif font-bold text-primary-navy mb-8">Ringkasan Pesanan</h2>
               <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 mb-8 custom-scrollbar">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-gray-50">
                        <Image 
                          src={item.product.thumbnailUrl || `https://picsum.photos/seed/${item.product.id}/200/200`} 
                          alt={item.product.name} 
                          fill 
                          className="object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-primary-navy line-clamp-1">{item.product.name}</h4>
                        <p className="text-xs text-text-muted mb-1">{item.product.originCity}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium text-gray-500">{item.quantity} x {formatIDR(item.product.priceIdr)}</span>
                          <span className="text-sm font-bold text-primary-navy">{formatIDR(item.product.priceIdr * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
               
               <div className="pt-6 border-t border-gray-100 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal Produk</span>
                    <span className="font-semibold">{formatIDR(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Ongkos Kirim Global</span>
                    <span className="italic text-accent-green text-sm">Menunggu Quotation</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                    <span className="font-serif font-bold text-lg text-primary-navy">Total Estimasi</span>
                    <div className="text-right">
                       <p className="text-2xl font-bold text-primary-navy leading-none">{formatIDR(getSubtotal())}</p>
                       <p className="text-xs text-text-muted mt-1">*Belum termasuk ongkir</p>
                    </div>
                  </div>
               </div>

               <div className="mt-8 p-4 bg-orange-50 rounded-2xl border border-orange-100 flex gap-3">
                  <div className="text-orange-600 mt-0.5">⚠️</div>
                  <p className="text-xs text-orange-800 leading-relaxed">
                    Pesanan Anda bersifat <strong>Inquiry (Permintaan Penawaran)</strong>. Kami akan menghubungi Anda via WhatsApp/Email untuk memberikan rincian ongkos kirim ke negara tujuan sebelum Anda melakukan pembayaran.
                  </p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


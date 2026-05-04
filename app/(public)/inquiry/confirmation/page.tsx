import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ConfirmationPage() {
  return (
    <div className="bg-bg-warm min-h-screen pt-20 pb-24 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
         <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-accent-green" />
         </div>
         <h1 className="text-4xl font-serif font-bold text-primary-navy mb-4">Inquiry Received!</h1>
         <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Thank you for your request. Our team is now calculating the best shipping options for your Indonesian goods. We will contact you shortly with the final quote.
         </p>
         
         <div className="flex flex-col gap-4">
             <Link href="/marketplace" className="inline-flex justify-center items-center px-8 py-4 bg-primary-navy text-white font-medium rounded-xl hover:bg-opacity-90 transition">
               Continue Shopping
             </Link>
         </div>
      </div>
    </div>
  );
}

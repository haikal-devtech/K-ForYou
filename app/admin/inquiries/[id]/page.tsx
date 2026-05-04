import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { formatIDR } from '@/lib/utils';

export default async function AdminInquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className="max-w-5xl mx-auto pb-12">
      <Link href="/admin/inquiries" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium mb-6 transition">
        <ArrowLeft className="w-4 h-4" /> Back to Inquiries
      </Link>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inquiry {id}</h1>
          <p className="text-gray-500">Submitted by Agus Pratama (United States)</p>
        </div>
        <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-green font-medium">
           <option value="new">New</option>
           <option value="reviewing">Reviewing</option>
           <option value="quoted">Quoted</option>
           <option value="waiting_payment">Waiting Payment</option>
           <option value="paid">Paid</option>
           <option value="processing">Processing</option>
           <option value="shipped">Shipped</option>
           <option value="completed">Completed</option>
           <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Cart Items</h2>
              <div className="space-y-4">
                 <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div>
                       <p className="font-medium text-gray-900">Original Indomie Goreng (Pack of 40)</p>
                       <p className="text-sm text-gray-500">SKU: IND-01 • Qty: 2</p>
                    </div>
                    <p className="font-medium text-gray-900">{formatIDR(150000 * 2)}</p>
                 </div>
              </div>
              <div className="mt-6 flex justify-end">
                 <div className="w-64 space-y-2">
                    <div className="flex justify-between text-gray-600">
                       <span>Subtotal</span>
                       <span>{formatIDR(300000)}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                       <span className="text-gray-600">Shipping Fee</span>
                       <input type="number" placeholder="Enter fee (IDR)" className="w-32 px-3 py-1 border border-gray-200 rounded-md text-right focus:outline-none focus:ring-2 focus:ring-accent-green" />
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2">
                       <span>Total</span>
                       <span>{formatIDR(300000)}</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Admin Actions</h2>
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes (Internal)</label>
                    <textarea rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green" placeholder="Notes about shipping routes or buyer communication..." />
                 </div>
                 <div className="flex gap-4">
                    <button className="px-5 py-2.5 bg-primary-navy text-white font-medium rounded-lg hover:bg-opacity-90 transition">
                       Save Changes
                    </button>
                    <button className="px-5 py-2.5 bg-[#25D366] text-white font-medium rounded-lg hover:bg-opacity-90 transition">
                       Copy WhatsApp Template
                    </button>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Buyer Info</h2>
              <div className="space-y-4 text-sm">
                 <div>
                   <p className="text-gray-500">Name</p>
                   <p className="font-medium text-gray-900">Agus Pratama</p>
                 </div>
                 <div>
                   <p className="text-gray-500">Email</p>
                   <p className="font-medium text-gray-900">agus.p@example.com</p>
                 </div>
                 <div>
                   <p className="text-gray-500">Phone / WhatsApp</p>
                   <p className="font-medium text-gray-900">+1 555-019-2834</p>
                 </div>
                 <div>
                   <p className="text-gray-500">Destination</p>
                   <p className="font-medium text-gray-900">United States, Los Angeles</p>
                 </div>
                 <div>
                   <p className="text-gray-500">Preferred Contact</p>
                   <p className="font-medium text-gray-900">WhatsApp</p>
                 </div>
              </div>
           </div>
           
           <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Shipping Address</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                 123 Palm Drive, Apt 4B <br/>
                 Los Angeles, CA 90001 <br/>
                 United States
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}

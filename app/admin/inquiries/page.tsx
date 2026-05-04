'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import Link from 'next/link';
import { format } from 'date-fns';
import { Search, Filter, ArrowUpRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetched = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setInquiries(fetched);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600"><Clock className="w-3 h-3" /> New</span>;
      case 'quoted':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-50 text-yellow-600"><AlertCircle className="w-3 h-3" /> Quoted</span>;
      case 'paid':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600"><CheckCircle2 className="w-3 h-3" /> Paid</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-600">{status}</span>;
    }
  };

  const filteredInquiries = inquiries.filter(inq => 
    inq.buyerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.buyerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Shipping Quotes & Inquiries</h1>
        <p className="text-gray-500">Review incoming requests and process global shipping quotations for diaspora buyers.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            <div className="relative flex-1 max-w-md">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
               <input 
                type="text" 
                placeholder="Search inquiries..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-accent-green text-sm transition" 
               />
            </div>
            <div className="flex items-center gap-3">
               <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm flex items-center gap-2 hover:bg-gray-50 transition">
                  <Filter className="w-4 h-4" /> Filters
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
               <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold tracking-wider">
                  <tr>
                     <th className="px-6 py-4">Inquiry ID</th>
                     <th className="px-6 py-4">Buyer</th>
                     <th className="px-6 py-4">Destination</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4">Items</th>
                     <th className="px-6 py-4">Date</th>
                     <th className="px-6 py-4 text-right">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                       <td colSpan={7} className="px-6 py-12 text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-green mx-auto"></div>
                          <p className="mt-4 text-gray-400">Loading inquiries...</p>
                       </td>
                    </tr>
                  ) : filteredInquiries.length === 0 ? (
                    <tr>
                       <td colSpan={7} className="px-6 py-12 text-center text-gray-400 font-medium">
                          No inquiries found.
                       </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-gray-50 transition group">
                        <td className="px-6 py-4 font-mono text-xs font-bold text-gray-400 uppercase">
                           #{inq.id.slice(-6)}
                        </td>
                        <td className="px-6 py-4">
                           <p className="font-bold text-gray-900">{inq.buyerName}</p>
                           <p className="text-xs text-gray-400">{inq.buyerEmail}</p>
                        </td>
                        <td className="px-6 py-4">
                           <p className="text-gray-900">{inq.country}</p>
                           <p className="text-xs text-gray-400">{inq.city}</p>
                        </td>
                        <td className="px-6 py-4">
                           {getStatusBadge(inq.status || 'new')}
                        </td>
                        <td className="px-6 py-4 text-gray-900 font-medium">
                           {inq.items?.length || 0} Products
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                           {inq.createdAt?.toDate ? format(inq.createdAt.toDate(), 'MMM dd, HH:mm') : 'Recently'}
                        </td>
                        <td className="px-6 py-4 text-right">
                           <Link 
                            href={`/admin/inquiries/${inq.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold hover:bg-primary-navy hover:text-white transition"
                           >
                              Review <ArrowUpRight className="w-3 h-3" />
                           </Link>
                        </td>
                      </tr>
                    ))
                  )}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}


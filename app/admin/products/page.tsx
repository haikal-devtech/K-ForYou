import Link from 'next/link';

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-500">Manage your marketplace inventory.</p>
        </div>
        <Link href="/admin/products/new" className="px-5 py-2.5 bg-accent-green hover:bg-green-700 text-white font-medium rounded-lg transition">
          + New Product
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
         <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <input type="text" placeholder="Search products..." className="px-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-accent-green text-sm" />
            <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-green">
               <option>All Categories</option>
               <option>Food & Spices</option>
               <option>Textiles/Batik</option>
            </select>
         </div>
         <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-medium">
               <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Price (IDR)</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
               <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4"><span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span></td>
                  <td className="px-6 py-4 font-medium text-gray-900">Indomie Goreng Original</td>
                  <td className="px-6 py-4">Food & Spices</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">100</td>
                  <td className="px-6 py-4">Rp 150,000</td>
               </tr>
            </tbody>
         </table>
      </div>
    </div>
  );
}

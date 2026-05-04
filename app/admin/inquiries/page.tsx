export default function AdminInquiriesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shipping Quotes & Inquiries</h1>
        <p className="text-gray-500">Review quote requests and update statuses to process manual orders.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
         <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-medium">
               <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Buyer Name</th>
                  <th className="px-6 py-4">Country</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
               <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 font-medium text-gray-900">INQ-00123</td>
                  <td className="px-6 py-4">Agus Pratama</td>
                  <td className="px-6 py-4">United States</td>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Reviewing</span></td>
                  <td className="px-6 py-4">Today, 10:42 AM</td>
               </tr>
            </tbody>
         </table>
      </div>
    </div>
  );
}

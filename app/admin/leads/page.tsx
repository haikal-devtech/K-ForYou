export default function AdminLeadsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buyer Leads</h1>
          <p className="text-gray-500">Database of potential buyers from various sources.</p>
        </div>
        <button className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition">
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
         <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-medium">
               <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Country</th>
                  <th className="px-6 py-4">Source</th>
                  <th className="px-6 py-4">Date</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
               <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Budi Santoso</td>
                  <td className="px-6 py-4">budi@example.com</td>
                  <td className="px-6 py-4">Netherlands</td>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Facebook Group</span></td>
                  <td className="px-6 py-4">May 02, 2026</td>
               </tr>
            </tbody>
         </table>
      </div>
    </div>
  );
}

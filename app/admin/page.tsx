import { Package, Inbox, Users, Activity } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-lg bg-blue-50 text-blue-600">
             <Package className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Products</p>
            <p className="text-2xl font-bold text-gray-900">128</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-lg bg-orange-50 text-orange-600">
             <Inbox className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Inquiries</p>
            <p className="text-2xl font-bold text-gray-900">14</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-lg bg-purple-50 text-purple-600">
             <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Leads</p>
            <p className="text-2xl font-bold text-gray-900">1,204</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-lg bg-green-50 text-green-600">
             <Activity className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Orders This Month</p>
            <p className="text-2xl font-bold text-gray-900">45</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 line-clamp-2">
         <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Inquiries</h2>
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
               <thead className="bg-gray-50 text-gray-700 uppercase font-medium">
                  <tr>
                     <th className="px-6 py-4 rounded-l-lg">ID</th>
                     <th className="px-6 py-4">Buyer Name</th>
                     <th className="px-6 py-4">Country</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4 rounded-r-lg">Date</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                     <td className="px-6 py-4 font-medium text-gray-900">INQ-00123</td>
                     <td className="px-6 py-4">Agus Pratama</td>
                     <td className="px-6 py-4">United States</td>
                     <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Reviewing</span></td>
                     <td className="px-6 py-4">Today, 10:42 AM</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                     <td className="px-6 py-4 font-medium text-gray-900">INQ-00122</td>
                     <td className="px-6 py-4">Siti Aminah</td>
                     <td className="px-6 py-4">Australia</td>
                     <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Quoted</span></td>
                     <td className="px-6 py-4">Yesterday, 02:15 PM</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}

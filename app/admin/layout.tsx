import AdminSidebar from '@/components/layout/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // In a real app we check Firebase Auth here or configure Next middleware
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-8">
        {children}
      </div>
    </div>
  );
}

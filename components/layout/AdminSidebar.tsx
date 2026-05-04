import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-primary-navy text-white min-h-screen flex flex-col fixed inset-y-0 left-0">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="font-serif text-2xl font-bold">
          K-For You Admin
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <Link href="/admin" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium">Dashboard</Link>
        <Link href="/admin/products" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium">Products</Link>
        <Link href="/admin/inquiries" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium">Inquiries</Link>
        <Link href="/admin/leads" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium">Leads</Link>
        <Link href="/admin/ai-tools" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium text-accent-green">AI Tools</Link>
      </nav>
      <div className="p-4 border-t border-white/10">
        <Link href="/" className="block px-4 py-2 text-sm text-gray-400 hover:text-white transition">← Back to Site</Link>
      </div>
    </div>
  );
}

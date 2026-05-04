'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary-navy text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-2xl font-bold text-white mb-4 block">
              K-For You
            </Link>
            <p className="text-sm text-gray-300">
              A curated Indonesian diaspora marketplace. Kangen Rasa Indonesia? Kami Hantarkan Untukmu!
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 font-serif">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/marketplace" className="text-sm text-gray-300 hover:text-white transition">Marketplace</Link></li>
              <li><Link href="/about" className="text-sm text-gray-300 hover:text-white transition">About Us</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-300 hover:text-white transition">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-300 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 font-serif">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/shipping-policy" className="text-sm text-gray-300 hover:text-white transition">Shipping Policy</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-300 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-300 hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 font-serif">Newsletter</h3>
            <p className="text-sm text-gray-300 mb-4">Subscribe for updates on new arrivals and diaspora stories.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email" className="w-full px-3 py-2 rounded-l-md text-gray-900 focus:outline-none" />
              <button type="submit" className="bg-accent-green px-4 py-2 rounded-r-md font-medium hover:bg-green-700 transition">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© 2026 KForYou. Supporting Indonesian Diaspora Worldwide.</p>
        </div>
      </div>
    </footer>
  );
}

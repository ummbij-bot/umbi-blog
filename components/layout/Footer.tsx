import Link from 'next/link';
import { FiTwitter, FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--color-neutral-900)', color: 'var(--color-neutral-300)' }}>
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))' }}>
                <span className="text-white font-bold text-xl">U</span>
              </div>
              <span className="font-bold text-2xl text-white">umbi</span>
            </Link>
            <p className="text-sm mb-6" style={{ color: 'var(--color-neutral-400)' }}>
              Your source for insightful articles on finance, technology, and wellness.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-neutral-800)' }}>
                <FiTwitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-neutral-800)' }}>
                <FiFacebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-neutral-800)' }}>
                <FiInstagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-neutral-800)' }}>
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-3">
              <li><Link href="/finance" className="text-sm">Personal Finance</Link></li>
              <li><Link href="/tech" className="text-sm">Tech & Productivity</Link></li>
              <li><Link href="/wellness" className="text-sm">Health & Wellness</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
             style={{ borderTop: '1px solid var(--color-neutral-800)' }}>
          <p className="text-sm" style={{ color: 'var(--color-neutral-400)' }}>
            © {currentYear} Umbi. All rights reserved.
          </p>
          <p className="text-sm" style={{ color: 'var(--color-neutral-400)' }}>
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
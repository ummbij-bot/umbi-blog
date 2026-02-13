import Link from 'next/link';
import { FiGithub, FiMail } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-400">
      {/* Gradient top border */}
      <div className="h-[2px] bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500" />

      <div className="container-custom py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
                U
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">umbi</span>
            </Link>
            <p className="text-sm text-stone-500 mb-1 italic">Better decisions, every day.</p>
            <p className="text-sm text-stone-500 mb-6 leading-relaxed">
              Your source for insightful articles on finance, technology, and wellness.
            </p>

            <div className="flex gap-3">
              <a href="https://github.com/ummbij-bot/umbi-blog" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center hover:bg-emerald-600 hover:scale-110 transition-all duration-200 text-stone-400 hover:text-white">
                <FiGithub size={18} />
              </a>
              <a href="mailto:ummbij@gmail.com" className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center hover:bg-emerald-600 hover:scale-110 transition-all duration-200 text-stone-400 hover:text-white">
                <FiMail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">Categories</h3>
            <ul className="space-y-2.5">
              <li><Link href="/finance" className="text-sm hover:text-emerald-400 transition-colors">Personal Finance</Link></li>
              <li><Link href="/tech" className="text-sm hover:text-blue-400 transition-colors">Tech & Productivity</Link></li>
              <li><Link href="/wellness" className="text-sm hover:text-purple-400 transition-colors">Health & Wellness</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">Company</h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">Legal</h3>
            <ul className="space-y-2.5">
              <li><Link href="/privacy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-stone-500">
            © {currentYear} Umbi. All rights reserved.
          </p>
          <p className="text-xs text-stone-600">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

import { motion } from 'framer-motion';
import { FaHeart, FaRocket } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-nebula-purple to-nebula-blue flex items-center justify-center font-orbitron font-bold text-white text-xs">
              KC
            </div>
            <span className="font-orbitron text-sm font-semibold text-star-white">
              KUSH<span className="text-nebula-purple">.</span>CHAUHAN
            </span>
          </div>

          {/* Center */}
          <p className="text-sm text-star-silver/40 flex items-center gap-1.5">
            Built with <FaHeart className="text-red-400" size={12} /> and <FaRocket className="text-nebula-purple" size={12} /> by Kush Chauhan
          </p>

          {/* Year */}
          <p className="text-xs text-star-silver/30 font-mono">
            © {currentYear} • All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

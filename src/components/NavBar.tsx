import { motion } from 'framer-motion';
import logo from '../assets/logo.webp';
import { HOME_URL } from '../viewMode';

export const NavBar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-24 w-full">
          {/* Logo */}
          <div className="shrink-0 flex items-center gap-3 cursor-pointer group">
            <div className="relative w-auto h-20">
              <img src={logo} alt="SOUL3 Logo" className="h-full object-contain" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 logo-hover-overlay"></div>
            </div>
          </div>
          <a
            href={HOME_URL}
            className="absolute right-4 sm:right-6 lg:right-8 px-4 py-2 rounded-full border border-white/25 text-white/80 text-sm tracking-wide hover:text-white hover:border-white transition-colors bg-black/30 backdrop-blur-sm"
          >
            Exit experience
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

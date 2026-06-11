import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

export const NavBar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo */}
          <div className="shrink-0 flex items-center gap-3 cursor-pointer group">
            <div className="relative w-auto h-16">
              <img src={logo} alt="SOUL3 Logo" className="h-full object-contain" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 logo-hover-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

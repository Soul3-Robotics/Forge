import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';

export const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Technology', href: '#' },
    { name: 'Vision', href: '#' },
    { name: 'Solutions', href: '#' },
    { name: 'About', href: '#' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-black/40 border-b border-white/5"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="shrink-0 flex items-center gap-3 cursor-pointer group">
              <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                <img src={logo} alt="Forge Logo" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-tr from-red-600/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="relative group px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-red-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button className="group relative px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 text-sm font-medium text-white group-hover:text-red-400 flex items-center gap-2">
                  Get Access <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-red-600/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              >
                {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-black/90 backdrop-blur-xl border-t border-white/10"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <button className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-red-600 to-orange-600 text-white font-medium hover:from-red-700 hover:to-orange-700 transition-all">
                  Get Access <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

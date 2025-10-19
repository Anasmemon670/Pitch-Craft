import { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAuthenticated?: boolean;
}

export default function Navigation({ currentPage, onNavigate, isAuthenticated = false }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = isAuthenticated
    ? [
        { label: 'Dashboard', page: 'dashboard' },
        { label: 'Create Pitch', page: 'create' },
        { label: 'Landing Generator', page: 'landing-generator' },
        { label: 'Export & Share', page: 'export' },
      ]
    : [
        { label: 'Home', page: 'home' },
        { label: 'Features', page: 'home' },
        { label: 'Pricing', page: 'home' },
      ];

  return (
    <nav className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'home')}
          >
            <div className="relative">
              <Sparkles className="w-8 h-8 text-[#4F46E5]" />
              <div className="absolute inset-0 blur-xl bg-[#4F46E5] opacity-50"></div>
            </div>
            <span className="bg-gradient-to-r from-[#4F46E5] via-[#8B5CF6] to-[#14B8A6] bg-clip-text text-transparent">
              PitchCraft
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.page}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onNavigate(item.page)}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentPage === item.page
                    ? 'text-[#4F46E5]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                {currentPage === item.page && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#4F46E5]/10 rounded-lg border border-[#4F46E5]/30"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-6 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="px-6 py-2 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] rounded-lg hover:shadow-lg hover:shadow-[#4F46E5]/50 transition-all duration-300"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={() => onNavigate('home')}
                className="px-6 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Log Out
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1a1a1a] border-t border-gray-800"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${
                    currentPage === item.page
                      ? 'bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/30'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      onNavigate('login');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('register');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full px-4 py-3 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] rounded-lg"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onNavigate('home');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800"
                >
                  Log Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

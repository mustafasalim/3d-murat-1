import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Hizmetler', path: '/hizmetler' },
    { name: 'Portfolyo', path: '/portfolyo' },
    { name: 'İletişim', path: '/iletisim' },
  ];

  return (
    <nav className={cn(
      "fixed w-full z-50 transition-all duration-300 border-b border-brand-accent/50",
      isScrolled ? "bg-brand-dark/90 backdrop-blur-md py-2" : "bg-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-extrabold tracking-tighter text-white">
              3D <span className="text-brand-orange">MURAT</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-brand-orange",
                    location.pathname === link.path ? "text-brand-orange" : "text-gray-300"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/teklif-al"
                className="bg-brand-orange hover:bg-orange-600 px-5 py-2.5 rounded-md text-sm font-bold transition-all text-white"
              >
                Hemen Teklif Al
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden bg-brand-gray border-b border-brand-accent transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block px-3 py-2 text-base font-medium rounded-md",
                location.pathname === link.path ? "text-brand-orange bg-brand-accent" : "text-gray-300 hover:bg-brand-accent"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/teklif-al"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-brand-orange border border-brand-orange/20 rounded-md mt-4 text-center"
          >
            Hemen Teklif Al
          </Link>
        </div>
      </div>
    </nav>
  );
}

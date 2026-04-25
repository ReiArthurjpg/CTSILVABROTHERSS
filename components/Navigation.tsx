'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

const navLinks = [
  { name: 'O Esporte', href: '#esporte' },
  { name: 'A Academia', href: '#academia' },
  { name: 'Diferenciais', href: '#diferenciais' },
  { name: 'Horários', href: '#horarios' },
  { name: 'Depoimentos', href: '#depoimentos' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${
      scrolled 
        ? 'top-0 bg-black/90 backdrop-blur-md border-b border-red-600/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
        : 'top-0 lg:top-4 bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center group cursor-pointer">
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black tracking-tighter uppercase italic">CT SILVA</span>
              <span className="text-red-600 text-[10px] font-black tracking-[0.4em] uppercase italic -mt-1">BROTHERS</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="relative text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400 hover:text-white transition-colors py-2 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-500 group-hover:w-full"></span>
              </a>
            ))}
            
            <button className="relative group overflow-hidden bg-red-600 px-8 py-4 font-black text-xs tracking-[0.2em] uppercase italic transform -skew-x-12 transition-all hover:bg-red-700 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] active:scale-95">
              <span className="relative z-10 skew-x-12 flex items-center gap-2 text-white">
                Aula Experimental <ChevronRight size={14} strokeWidth={3} />
              </span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className={`p-3 rounded-full transition-all ${isMenuOpen ? 'bg-red-600 text-white' : 'bg-zinc-900 text-red-600'}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-zinc-950 border-b border-red-600/30 overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-10 space-y-8 text-center uppercase tracking-[0.2em]">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="block text-xl font-black italic hover:text-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="w-full bg-red-600 text-white py-5 font-black text-sm tracking-widest shadow-xl">
            AULA EXPERIMENTAL
          </button>
        </div>
      </div>
    </nav>
  );
}

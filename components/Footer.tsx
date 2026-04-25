import { MapPin, Phone, Instagram, Youtube, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t-2 border-red-600/50 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start mb-6">
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black tracking-tighter uppercase italic">CT SILVA</span>
              <span className="text-red-600 text-[10px] font-black tracking-[0.4em] uppercase italic -mt-1">BROTHERS</span>
            </div>
          </div>
          <p className="text-zinc-600 font-bold uppercase tracking-widest text-[10px]">Construindo campeões dentro e fora do tatame.</p>
          <div className="mt-8 space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-3 text-zinc-500 text-xs">
              <MapPin size={14} className="text-red-600" /> Rua Combatente, 123 - Centro
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3 text-zinc-500 text-xs">
              <Phone size={14} className="text-red-600" /> (11) 98765-4321
            </div>
          </div>
        </div>
        
        <div className="flex gap-8">
          <a href="#" className="text-zinc-400 hover:text-white transition-all transform hover:-translate-y-1">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-zinc-400 hover:text-white transition-all transform hover:-translate-y-1">
            <Youtube size={24} />
          </a>
          <a href="#" className="text-zinc-400 hover:text-white transition-all transform hover:-translate-y-1">
            <Facebook size={24} />
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-[9px] text-zinc-700 font-black tracking-[0.5em] text-center uppercase">
        © 2024 CT SILVA BROTHERS - TODOS OS DIREITOS RESERVADOS
      </div>
    </footer>
  );
}

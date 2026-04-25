import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <>
      {/* Estilos customizados para animações */}
      <style>{`
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        .animate-scroll-dot {
          animation: scrollDot 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10 opacity-80" />
          <img 
            src="https://wallpapers.com/images/hd/jiu-jitsu-1920-x-1080-5apb8ujim4llp13f.jpg" 
            alt="Plano de fundo Jiu Jitsu" 
            className="w-full h-full object-cover grayscale brightness-[0.35]"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 text-left w-full mt-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl md:text-[10rem] font-black mb-6 leading-[0.8] uppercase italic tracking-tighter">
              CT SILVA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-800 drop-shadow-[0_10px_20px_rgba(220,38,38,0.3)]">BROTHERS</span>
            </h1>
            
            <p className="text-zinc-400 text-lg md:text-2xl mb-12 leading-relaxed max-w-2xl font-light border-l-2 border-red-600 pl-8">
              A excelência técnica do <span className="text-white font-bold">Jiu-Jitsu</span> em um ambiente focado em disciplina, respeito e alta performance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="group relative bg-white text-black px-12 py-5 font-black flex items-center justify-center gap-3 hover:bg-red-600 hover:text-white transition-all text-xl uppercase tracking-tighter overflow-hidden">
                <span className="relative z-10">QUERO TREINAR</span>
                <ChevronRight size={24} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-red-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>
              <button className="bg-transparent border border-white/10 hover:border-red-600/50 hover:bg-zinc-900/50 text-white px-12 py-5 font-black transition-all text-xl uppercase tracking-tighter">
                CONHECER GRADE
              </button>
            </div>
          </div>
        </div>

        {/* Indicador de Scroll */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
          <div className="w-[26px] h-[42px] border-2 border-white/20 rounded-full flex justify-center p-1.5">
            <div className="w-1 h-2 bg-red-600 rounded-full animate-scroll-dot"></div>
          </div>
          <span className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-500">Scroll</span>
        </div>
      </section>
    </>
  );
}

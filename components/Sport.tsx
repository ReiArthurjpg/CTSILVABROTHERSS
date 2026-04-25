import { ChevronRight } from 'lucide-react';

const items = ['Metodologia de Competição', 'Jiu-Jitsu para Iniciantes', 'Defesa Pessoal Avançada'];

export default function Sport() {
  return (
    <section id="esporte" className="py-32 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative group">
          <div className="absolute -top-6 -left-6 w-32 h-32 border-t-4 border-l-4 border-red-600"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-4 border-r-4 border-red-600"></div>
          <img 
            src="https://images.unsplash.com/photo-1511883040705-6011fad9ed39?auto=format&fit=crop&q=80&w=1000" 
            className="relative grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
            alt="Treino de Jiu Jitsu"
          />
        </div>
        <div>
          <h2 className="text-6xl font-black mb-8 uppercase italic leading-none">
            A FORÇA DO <br /><span className="text-red-600 underline decoration-red-600/20 underline-offset-8 italic">COLETIVO</span>
          </h2>
          <p className="text-zinc-500 text-xl mb-12 font-medium leading-relaxed italic">
            {"\"No tatame do Silva Brothers, não lutamos uns contra os outros, lutamos uns com os outros para que todos evoluam.\""}
          </p>
          <div className="space-y-4">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-zinc-900/40 p-5 border border-white/5 hover:border-red-600/30 transition-all cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-red-600/10 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
                  <ChevronRight size={16} />
                </div>
                <span className="font-black uppercase italic tracking-widest text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

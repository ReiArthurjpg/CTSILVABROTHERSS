export default function Academy() {
  return (
    <section id="academia" className="py-32 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-red-600 font-black tracking-[0.4em] uppercase text-xs">Nossa Casa</span>
            <h2 className="text-6xl font-black uppercase italic mt-4 tracking-tighter">ONDE OS <span className="text-red-600">BRUTOS</span> TREINAM</h2>
          </div>
          <p className="text-zinc-500 max-w-md text-right font-medium italic">Estrutura de ponta com tatames olímpicos, vestiários modernos e área de musculação.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 h-[400px] overflow-hidden group relative">
            <img src="https://images.unsplash.com/photo-1599058917233-35f91d1c997e?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" alt="Área de treino" />
            <div className="absolute inset-0 bg-black/40 group-hover:opacity-0 transition-opacity" />
          </div>
          <div className="h-[400px] overflow-hidden group relative">
            <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" alt="Equipamentos" />
            <div className="absolute inset-0 bg-black/40 group-hover:opacity-0 transition-opacity" />
          </div>
        </div>
      </div>
    </section>
  );
}

import { Target, Shield, Heart, Zap } from 'lucide-react';

const pillars = [
  { title: 'Disciplina', label: 'Foco no Objetivo', icon: <Target size={28}/>, desc: 'A constância que gera o resultado.' },
  { title: 'Respeito', label: 'Honra no Tatame', icon: <Shield size={28}/>, desc: 'A base de toda arte marcial.' },
  { title: 'Família', label: 'União e Suporte', icon: <Heart size={28}/>, desc: 'Crescemos juntos como um time.' },
  { title: 'Evolução', label: 'Progresso Diário', icon: <Zap size={28}/>, desc: 'Superação a cada novo treino.' },
];

export default function Pillars() {
  return (
    <div className="bg-black py-24 relative z-30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8">
          {pillars.map((pilar, i) => (
            <div 
              key={i} 
              className="relative p-8 bg-zinc-950 border border-white/5 overflow-hidden"
            >
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-red-600/5 rounded-full blur-2xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="text-red-600 mb-8 origin-left">
                  {pilar.icon}
                </div>
                
                <div className="mt-auto">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 block mb-2">
                    {pilar.label}
                  </span>
                  <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-4 leading-none">
                    {pilar.title}
                  </h3>
                  <p className="text-zinc-600 text-sm font-medium leading-relaxed">
                    {pilar.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Award, Users, Target, CheckCircle2, Clock } from 'lucide-react';

const differentials = [
  { title: 'INSTRUTORES CERTIFICADOS', desc: 'Professores com linhagem direta e experiência em competições mundiais.', icon: <Award className="text-red-600" size={32} /> },
  { title: 'AMBIENTE FAMILIAR', desc: 'Respeito mútuo é a nossa primeira regra. Aqui todos se ajudam.', icon: <Users className="text-red-600" size={32} /> },
  { title: 'FOCO EM RESULTADO', desc: 'Seja para saúde ou competição, temos o plano certo para você.', icon: <Target className="text-red-600" size={32} /> }
];

export default function Differentials() {
  return (
    <section id="diferenciais" className="py-32 px-6 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <h2 className="text-5xl font-black uppercase italic leading-tight">POR QUE <span className="text-red-600">ESCOLHER</span><br />NOSSO CENTRO?</h2>
            
            {differentials.map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="mt-1">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-black italic uppercase mb-2 tracking-wide group-hover:text-red-600 transition-colors">{item.title}</h3>
                  <p className="text-zinc-500 font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-red-600/10 blur-[120px] rounded-full" />
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="pt-12">
                <div className="bg-zinc-900 p-8 border border-white/5 space-y-4">
                  <CheckCircle2 className="text-red-600" />
                  <h4 className="font-black italic uppercase">TATAME 100M²</h4>
                  <p className="text-zinc-500 text-sm">Área climatizada e protegida.</p>
                </div>
              </div>
              <div>
                <div className="bg-red-600 p-8 space-y-4">
                  <Clock className="text-white" />
                  <h4 className="font-black italic uppercase">7 DIAS POR SEMANA</h4>
                  <p className="text-white/80 text-sm">Treinos em diversos horários.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

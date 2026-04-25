import { Quote, Star } from 'lucide-react';

const testimonials = [
  { name: 'Ricardo Santos', role: 'Faixa Azul', text: 'Mudei completamente meu estilo de vida. O foco e a disciplina que aprendi aqui levo para o meu trabalho todos os dias.' },
  { name: 'Ana Beatriz', role: 'Iniciante', text: 'Tinha medo de começar por ser mulher, mas fui recebida com muito respeito. Hoje o tatame é minha segunda casa.' },
  { name: 'Marcos Silva', role: 'Faixa Preta', text: 'A técnica ensinada aqui é de nível mundial. É raro encontrar um CT com tanta atenção aos detalhes fundamentais.' }
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((dep, i) => (
            <div key={i} className="bg-zinc-900 p-10 border-b-4 border-red-600 relative group hover:-translate-y-2 transition-all duration-500">
              <Quote className="absolute top-6 right-6 text-red-600/20 group-hover:text-red-600 transition-colors" size={40} />
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-red-600 text-red-600" />)}
              </div>
              <p className="text-zinc-400 italic mb-8 leading-relaxed">{`\"${dep.text}\"`}</p>
              <div>
                <h5 className="font-black italic uppercase tracking-tighter">{dep.name}</h5>
                <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em]">{dep.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

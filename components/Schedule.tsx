const scheduleData = [
  { h: '07:00 - 08:30', m: 'Jiu-Jitsu Matutino' },
  { h: '12:00 - 13:30', m: 'Treino Meio-Dia' },
  { h: '18:00 - 19:30', m: 'Kids & Juvenil' },
  { h: '20:00 - 21:30', m: 'Adulto Iniciante' },
  { h: '21:30 - 23:00', m: 'Adulto Avançado' }
];

export default function Schedule() {
  return (
    <section id="horarios" className="py-32 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-4">GRADE DE <span className="text-red-600">TREINOS</span></h2>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-white/5">
            <thead>
              <tr className="bg-red-600/10">
                <th className="p-6 border border-white/5 text-xs font-black uppercase tracking-widest text-red-600">Horário</th>
                <th className="p-6 border border-white/5 text-xs font-black uppercase tracking-widest">Segunda</th>
                <th className="p-6 border border-white/5 text-xs font-black uppercase tracking-widest">Quarta</th>
                <th className="p-6 border border-white/5 text-xs font-black uppercase tracking-widest">Sexta</th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors group">
                  <td className="p-6 border border-white/5 font-black italic text-zinc-400 group-hover:text-white">{row.h}</td>
                  <td className="p-6 border border-white/5 font-bold uppercase text-sm tracking-wide">{row.m}</td>
                  <td className="p-6 border border-white/5 font-bold uppercase text-sm tracking-wide">{row.m}</td>
                  <td className="p-6 border border-white/5 font-bold uppercase text-sm tracking-wide">{row.m}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

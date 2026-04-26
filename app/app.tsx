import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Users, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  ChevronRight, 
  Menu, 
  X, 
  Award, 
  Trophy,
  Flame,
  Target,
  Youtube,
  Facebook,
  CheckCircle2,
  Quote,
  Star,
  Heart,
  Scale,
  Zap,
  Swords,
  Medal,
  Dumbbell,
  ChevronDown,
  ArrowRight,
  Maximize,
  Wind,
  Droplets,
  BrickWall,
  Construction,
  MessageCircle,
  Mail,
  ShoppingBag,
  Tag,
  ExternalLink,
  BookOpen,
  Cross,
  Calendar,
  Send,
  Sparkles,
  TrendingUp,
  Crown
} from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// --- COMPONENTES AUXILIARES ---

const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden border border-white/5 bg-zinc-900 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(220, 38, 38, 0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

const FadeIn = ({ children, delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
        x: direction === "left" ? 60 : direction === "right" ? -60 : 0
      }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'O Esporte', href: '#esporte' },
    { name: 'Modalidades', href: '#modalidades' },
    { name: 'A Academia', href: '#academia' },
    { name: 'Professor', href: '#professor' },
    { name: 'Loja', href: '#loja' },
    { name: 'Horários', href: '#agenda' },
    { name: 'Planos', href: '#planos' },
    { name: 'Contato', href: '#agenda' },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
      <style>{`
        .text-stroke {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
          color: transparent;
        }
        .text-stroke-red {
          -webkit-text-stroke: 1px rgba(220, 38, 38, 0.5);
          color: transparent;
        }
        @keyframes vertical-slide {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(15px); opacity: 0; }
        }
        .animate-scroll-dot {
          animation: vertical-slide 2s ease-in-out infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>

      {/* Navegação */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${
        scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 py-3' : 'py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex flex-col leading-none italic font-black">
            <span className="text-2xl tracking-tighter">CT SILVA</span>
            <span className="text-red-600 text-[10px] tracking-[0.4em] -mt-1">BROTHERS</span>
          </div>
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors">{link.name}</a>
            ))}
            <button className="bg-red-600 px-6 py-3 font-black text-[10px] uppercase tracking-widest italic -skew-x-12 hover:bg-white hover:text-black transition-all">AULA GRÁTIS</button>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-red-600"><Menu size={24} /></button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          <img src="https://wallpapers.com/images/hd/jiu-jitsu-1920-x-1080-5apb8ujim4llp13f.jpg" className="w-full h-full object-cover opacity-30 grayscale" alt="Fundo Hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <FadeIn direction="up">
            <span className="text-red-600 font-black italic tracking-[0.5em] text-xs uppercase block mb-4">Campina Grande • PB</span>
            <h1 className="text-7xl md:text-[9rem] font-black uppercase italic leading-[0.8] tracking-tighter mb-8">
              FORJANDO <br />
              <span className="text-stroke-red">CAMPEÕES</span>
            </h1>
            <div className="h-1 w-24 bg-red-600 mb-8" />
            <p className="text-zinc-400 max-w-xl text-lg md:text-xl font-light">Equipe Silva Brothers: Onde a técnica encontra a resiliência. Venha treinar no CT mais autêntico da região.</p>
          </FadeIn>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center p-1 bg-white/5">
            <div className="w-1 h-2 bg-red-600 rounded-full animate-scroll-dot" />
          </div>
          <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-zinc-500">Scroll</span>
        </div>
      </section>

      {/* Pilares */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { t: 'DISCIPLINA', d: 'Foco total no processo.', i: <Target /> },
            { t: 'RESPEITO', d: 'Base da nossa filosofia.', i: <Shield /> },
            { t: 'UNIÃO', d: 'Crescemos como família.', i: <Users /> },
            { t: 'EVOLUÇÃO', d: '1% melhor a cada dia.', i: <Flame /> }
          ].map((p, i) => (
            <SpotlightCard key={i} className="p-8 border-white/5">
              <div className="text-red-600 mb-6">{p.i}</div>
              <h4 className="text-xl font-black italic mb-2 uppercase">{p.t}</h4>
              <p className="text-zinc-500 text-xs uppercase tracking-widest">{p.d}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* --- SESSÃO: CONTATO RÁPIDO --- */}
      <section className="bg-red-600 py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex items-center pointer-events-none">
          <span className="text-8xl font-black italic uppercase whitespace-nowrap -ml-20">
            JOIN THE TEAM • JOIN THE TEAM • JOIN THE TEAM
          </span>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-3xl md:text-5xl font-black uppercase italic leading-none tracking-tighter text-white mb-2">
              PRONTO PARA O PRÓXIMO NÍVEL?
            </h3>
            <p className="text-black/80 font-bold uppercase tracking-widest text-xs">
              Fale agora com um de nossos instrutores e agende sua visita.
            </p>
          </div>
          <motion.a 
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-10 py-5 flex items-center gap-4 font-black italic uppercase tracking-widest -skew-x-12 hover:bg-zinc-900 transition-all shadow-2xl"
          >
            <MessageCircle size={24} className="skew-x-12" />
            <span className="skew-x-12">CHAMAR NO WHATSAPP</span>
          </motion.a>
        </div>
      </section>

      {/* --- SEÇÃO: A FORÇA DO COLETIVO --- */}
      <section id="esporte" className="relative py-40 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="max-w-7xl mx-auto h-full grid grid-cols-12 gap-0 border-x border-white">
            {[...Array(11)].map((_, i) => <div key={i} className="border-r border-white h-full" />)}
          </div>
        </div>

        <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 select-none pointer-events-none">
          <span className="text-[30rem] font-black italic uppercase text-stroke opacity-10 leading-none">
            TEAM
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-6 lg:pt-20 relative z-20">
              <FadeIn direction="right">
                <div className="inline-block bg-red-600 text-white px-4 py-1 font-black italic text-[10px] uppercase tracking-[0.3em] mb-8">
                  Filosofia Silva Brothers
                </div>
                
                <h2 className="text-6xl md:text-[8rem] font-black uppercase italic leading-[0.8] tracking-tighter mb-10">
                  A FORÇA DO <br />
                  <span className="text-red-600">COLETIVO</span>
                </h2>

                <div className="max-w-md">
                  <p className="text-xl md:text-2xl font-light text-zinc-300 leading-tight mb-8">
                    Não é sobre quem finaliza mais rápido, é sobre <span className="text-white font-bold italic">não deixar ninguém para trás</span>.
                  </p>
                  
                  <div className="space-y-6 text-zinc-500 text-sm leading-relaxed mb-12">
                    <p>No CT Silva Brothers, acreditamos que o ambiente molda o lutador. Nosso tatame é um ecossistema de evolução mútua onde a graduação traz a responsabilidade de ensinar.</p>
                    <p>Aqui, o iniciante é acolhido e o veterano é desafiado. Essa troca constante cria uma base técnica inigualável e laços que transcendem o esporte.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                    <div>
                      <span className="block text-4xl font-black italic text-white mb-1">01.</span>
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Respeito à Hierarquia</span>
                    </div>
                    <div>
                      <span className="block text-4xl font-black italic text-white mb-1">02.</span>
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Suporte Mútuo</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-6 relative mt-20 lg:mt-0">
              <FadeIn direction="left">
                <div className="relative">
                  <div className="absolute top-10 right-10 w-full h-full border border-red-600/30 -z-10 translate-x-4 translate-y-4"></div>
                  <div className="relative overflow-hidden group">
                    <div className="absolute inset-0 bg-red-600/20 group-hover:bg-transparent transition-all duration-700 z-10"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1400" 
                      className="w-full grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-105 group-hover:scale-100"
                      alt="Treino Coletivo"
                    />
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="absolute bottom-10 left-10 z-20"
                    >
                      <button className="bg-white text-black p-6 rounded-full shadow-2xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <ArrowRight size={32} />
                      </button>
                    </motion.div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO: NOSSAS MODALIDADES --- */}
      <section id="modalidades" className="py-32 bg-zinc-950 relative overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn direction="up">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-6">
                NOSSAS <span className="text-red-600">MODALIDADES</span>
              </h2>
              <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto border-t border-red-600/30 pt-4 uppercase tracking-widest">
                Treinamento de elite para quem busca a essência da luta
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'Jiu-Jitsu', 
                desc: 'Técnica e estratégia filiada às maiores confederações mundiais.', 
                icon: <Award size={32} /> 
              },
              { 
                title: 'Defesa Pessoal', 
                desc: 'Situações reais exigem respostas rápidas e eficientes.', 
                icon: <Shield size={32} /> 
              },
              { 
                title: 'Submission', 
                desc: 'O jogo de finalizações sem kimono, focado em mobilidade.', 
                icon: <Swords size={32} /> 
              },
              { 
                title: 'Wrestling', 
                desc: 'Domine as quedas e o controle posicional no tatame.', 
                icon: <Flame size={32} /> 
              }
            ].map((mod, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <SpotlightCard className="p-10 flex flex-col h-full group hover:bg-zinc-900 transition-all duration-500">
                   <div className="w-16 h-16 bg-black flex items-center justify-center text-red-600 mb-8 border border-white/5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    {mod.icon}
                  </div>
                  <h3 className="text-2xl font-black italic uppercase mb-4 tracking-tighter group-hover:text-red-600 transition-colors">
                    {mod.title}
                  </h3>
                  <div className="h-[2px] w-8 bg-red-600 mb-4 group-hover:w-full transition-all duration-700" />
                  <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                    {mod.desc}
                  </p>
                  <button className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 group-hover:text-white flex items-center gap-2 mt-auto">
                    VER HORÁRIOS <ChevronRight size={12} />
                  </button>
                </SpotlightCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- SEÇÃO: A ACADEMIA (REALIDADE DAS FOTOS) --- */}
      <section id="academia" className="py-40 bg-black relative overflow-hidden">
        <div className="absolute left-0 top-0 h-full flex items-center opacity-[0.02] pointer-events-none select-none">
          <span className="text-[25rem] font-black uppercase italic -rotate-90 origin-center whitespace-nowrap">
            REALITY
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-10">
            <FadeIn direction="right">
              <div className="max-w-2xl">
                <span className="text-red-600 font-black italic tracking-[0.5em] text-xs uppercase block mb-6">Ambiente Old School</span>
                <h2 className="text-6xl md:text-8xl font-black uppercase italic leading-[0.8] tracking-tighter">
                  NOSSO <br />
                  <span className="text-stroke-red">CENTRO DE TREINO</span>
                </h2>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <div className="max-w-md text-right lg:pb-4 border-r-4 border-red-600 pr-8">
                <p className="text-zinc-400 uppercase tracking-widest text-sm leading-relaxed font-bold">
                  Esqueça as luzes de neon. Aqui o foco é o suor, o tijolo aparente e a técnica pura.
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Estrutura Industrial",
                desc: "Pé direito alto e ventilação natural de galpão. O clima perfeito para quem busca a intensidade real dos grandes CTs de luta.",
                icon: <Construction size={40} />
              },
              {
                title: "Tijolo & Sangue",
                desc: "Um ambiente rústico que respira artes marciais. Sem distrações, apenas você, seu parceiro e a evolução técnica.",
                icon: <BrickWall size={40} />
              },
              {
                title: "Tatame Focado",
                desc: "Área otimizada para o combate, mantendo a tradição e a higiene necessária para o treino diário de alto nível.",
                icon: <Maximize size={40} />
              }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.2}>
                <div className="group">
                  <div className="mb-8 text-red-600 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <h4 className="text-2xl font-black italic uppercase mb-4 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-zinc-500 leading-relaxed font-light text-lg">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Galeria Grid */}
          <div className="mt-32 grid grid-cols-12 gap-4 h-[600px]">
            <div className="col-span-12 md:col-span-7 h-full bg-zinc-900 border border-white/5 overflow-hidden group">
              <div className="w-full h-full relative">
                <img 
                  src="https://images.unsplash.com/photo-1590502160462-09971842820b?q=80&w=1600" 
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-80 transition-all duration-1000"
                  alt="Estrutura rústica"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <span className="bg-red-600 px-4 py-1 text-[10px] font-black italic uppercase tracking-widest">O Templo</span>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 grid grid-rows-2 gap-4">
              <div className="bg-zinc-900 border border-white/5 overflow-hidden group relative">
                <img 
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000" 
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-80 transition-all duration-700"
                  alt="Treino pesado"
                />
              </div>
              <div className="bg-zinc-900 border border-white/5 p-8 flex flex-col justify-center">
                <span className="text-red-600 font-black italic text-4xl mb-4">RAIZ.</span>
                <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] leading-loose">
                  Nascido no tijolo, forjado no suor. Onde a tradição encontra a técnica em Campina Grande.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SESSÃO: PROFESSOR / DONO --- */}
      <section id="professor" className="py-40 bg-zinc-950 relative overflow-hidden border-t border-white/5">
        <div className="absolute right-0 bottom-0 opacity-[0.02] pointer-events-none select-none">
          <span className="text-[20rem] font-black uppercase italic leading-none">MASTER</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Foto do Professor */}
            <div className="lg:col-span-5">
              <FadeIn direction="right">
                <div className="relative group">
                  <div className="absolute -inset-4 border border-red-600/30 -z-10 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                  <div className="aspect-[3/4] bg-zinc-900 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1552072047-399363238d71?q=80&w=1000" 
                      className="w-full h-full object-cover object-top opacity-80"
                      alt="Professor Felipe Silva"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <p className="text-red-600 font-black italic uppercase tracking-widest text-xs mb-1">Head Coach</p>
                      <h3 className="text-4xl font-black italic uppercase tracking-tighter">Felipe Silva</h3>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Informações do Professor */}
            <div className="lg:col-span-7">
              <FadeIn direction="left">
                <span className="text-red-600 font-black italic tracking-[0.5em] text-xs uppercase block mb-6">Liderança Técnica</span>
                <h2 className="text-5xl md:text-7xl font-black uppercase italic leading-[0.8] tracking-tighter mb-10">
                  A MENTE POR TRÁS <br />
                  <span className="text-stroke-red">DO TATAME</span>
                </h2>

                <div className="space-y-8">
                  {/* Graduações Principais */}
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-red-600/10 border border-red-600/20 px-4 py-2 flex items-center gap-3">
                      <Medal className="text-red-600" size={20} />
                      <span className="font-black italic uppercase text-xs tracking-widest">Faixa Preta 3º Grau (CBJJ/IBJJF)</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-4 py-2 flex items-center gap-3">
                      <Swords className="text-zinc-400" size={20} />
                      <span className="font-black italic uppercase text-xs tracking-widest">Submission GB-PB (SBJJ)</span>
                    </div>
                  </div>

                  {/* Lista de Detalhes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-white/5">
                    <div>
                      <h5 className="text-red-600 font-black italic uppercase text-[10px] tracking-widest mb-3 flex items-center gap-2">
                        <Award size={14} /> Graduações
                      </h5>
                      <p className="text-zinc-400 text-sm font-light leading-relaxed">
                        Faixa Preta 3º Grau em Jiu-Jitsu, Wrestling e Submission.
                      </p>
                    </div>
                    <div>
                      <h5 className="text-red-600 font-black italic uppercase text-[10px] tracking-widest mb-3 flex items-center gap-2">
                        <BookOpen size={14} /> Formação
                      </h5>
                      <p className="text-zinc-400 text-sm font-light leading-relaxed">
                        Pós-graduando em Educação Física, unindo ciência e prática.
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <h5 className="text-red-600 font-black italic uppercase text-[10px] tracking-widest mb-3 flex items-center gap-2">
                        <Cross size={14} /> Filosofia de Vida
                      </h5>
                      <p className="text-zinc-300 text-lg italic font-medium leading-relaxed">
                        "Cristão dedicado ao ensino de valores através das artes marciais."
                      </p>
                    </div>
                  </div>

                  {/* CTA Social */}
                  <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <motion.a 
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      className="bg-white text-black px-8 py-4 font-black italic uppercase tracking-widest text-xs -skew-x-12 flex items-center gap-3"
                    >
                      <Instagram size={18} className="skew-x-12" />
                      <span className="skew-x-12">SIGA O PROFESSOR</span>
                    </motion.a>
                    <div className="flex gap-4">
                      <div className="h-1 bg-red-600 w-12" />
                      <span className="text-zinc-500 font-black italic uppercase text-[10px] tracking-widest">@felipesilvabjj</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO: E-COMMERCE / LOJA --- */}
      <section id="loja" className="py-40 bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-20">
             <FadeIn direction="right">
              <div>
                <span className="text-red-600 font-black italic tracking-[0.5em] text-xs uppercase block mb-4">Silva Brothers Armory</span>
                <h2 className="text-5xl md:text-7xl font-black uppercase italic leading-none tracking-tighter">
                  EQUIPAMENTO <br />
                  <span className="text-white">DE GUERRA</span>
                </h2>
              </div>
            </FadeIn>
            <FadeIn direction="left">
               <button className="mt-8 md:mt-0 flex items-center gap-4 bg-white text-black px-8 py-4 font-black italic uppercase tracking-widest -skew-x-12 hover:bg-red-600 hover:text-white transition-all">
                <ShoppingBag size={20} />
                VISITAR E-COMMERCE
              </button>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Kimono 'Berserker' Black",
                price: "R$ 489,90",
                tag: "Best Seller",
                img: "https://images.unsplash.com/photo-1615118385458-7f938d8d341b?q=80&w=1000"
              },
              {
                name: "Rashguard 'Ancestry' Red",
                price: "R$ 189,00",
                tag: "New Drop",
                img: "https://images.unsplash.com/photo-1599058917233-3583c8340182?q=80&w=1000"
              },
              {
                name: "Bermuda 'No-Gi' Industrial",
                price: "R$ 159,00",
                tag: "Limited",
                img: "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=1000"
              }
            ].map((prod, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <div className="group relative">
                  <div className="aspect-[4/5] bg-zinc-900 border border-white/5 overflow-hidden relative">
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-red-600 text-white text-[8px] font-black uppercase px-2 py-1 tracking-widest italic">
                        {prod.tag}
                      </span>
                    </div>
                    <img 
                      src={prod.img} 
                      className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700"
                      alt={prod.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                       <button className="w-full bg-white text-black py-4 font-black italic uppercase text-xs tracking-widest flex items-center justify-center gap-2">
                        <Tag size={14} /> ADICIONAR AO CARRINHO
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-black italic uppercase tracking-tighter mb-1">{prod.name}</h4>
                      <p className="text-red-600 font-black italic tracking-widest text-sm">{prod.price}</p>
                    </div>
                    <div className="text-zinc-600">
                      <ExternalLink size={16} />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- SEÇÃO: REDES SOCIAIS (FAIXA) --- */}
      <section className="bg-zinc-900 border-y border-white/10 py-16 relative overflow-hidden">
        {/* Marquee Background */}
        <div className="absolute inset-0 flex items-center opacity-[0.03] pointer-events-none select-none">
          <div className="whitespace-nowrap animate-marquee flex">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-9xl font-black italic uppercase mx-4">
                FOLLOW US • INSTAGRAM • YOUTUBE • FACEBOOK • 
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-4xl md:text-6xl font-black uppercase italic leading-none tracking-tighter mb-2">
              SIGA-NOS NO <span className="text-red-600">INSTAGRAM</span>
            </h3>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px]">
              Fique por dentro dos treinos, seminários e bastidores do CT.
            </p>
          </div>
          
          <div className="flex gap-4">
            <motion.a 
              href="#"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white p-6 -skew-x-12 flex items-center justify-center shadow-xl hover:bg-white hover:text-black transition-all"
            >
              <Instagram size={32} className="skew-x-12" />
            </motion.a>
            <motion.a 
              href="#"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-zinc-800 text-white p-6 -skew-x-12 flex items-center justify-center shadow-xl hover:bg-red-600 transition-all border border-white/5"
            >
              <Youtube size={32} className="skew-x-12" />
            </motion.a>
            <motion.a 
              href="#"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-zinc-800 text-white p-6 -skew-x-12 flex items-center justify-center shadow-xl hover:bg-red-600 transition-all border border-white/5"
            >
              <Facebook size={32} className="skew-x-12" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO: HORÁRIOS + CONTATO --- */}
      <section id="agenda" className="py-32 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start border-b border-white/5 pb-24">
            
            {/* Coluna Horários */}
            <FadeIn direction="right">
              <div className="relative">
                <div className="inline-block bg-red-600 text-white px-4 py-1 font-black italic text-[10px] uppercase tracking-[0.3em] mb-6">
                  Check the Schedule
                </div>
                <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-12">
                  TREINOS <br />
                  <span className="text-stroke-red">DIÁRIOS</span>
                </h2>

                <div className="border-t-2 border-red-600 pt-8">
                  <div className="space-y-4">
                    {[
                      { dia: "SEGUNDA-FEIRA", aulas: ["18:30 — Jiu-Jitsu Kids"] },
                      { dia: "TERÇA-FEIRA", aulas: ["12:00 — Jiu-Jitsu Kimono", "19:00 — Jiu-Jitsu Kimono"] },
                      { dia: "QUARTA-FEIRA", aulas: ["16:00 — No-Gi Grappling", "18:30 — Jiu-Jitsu Kids"] },
                      { dia: "QUINTA-FEIRA", aulas: ["12:00 — Jiu-Jitsu Kimono", "19:00 — Jiu-Jitsu Kimono"] },
                      { dia: "SEXTA-FEIRA", aulas: ["16:00 — No-Gi Grappling", "19:00 — Jiu-Jitsu Kimono"] }
                    ].map((row, i) => (
                      <div key={i} className="group border-b border-white/10 pb-4 hover:border-red-600 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                          <span className="text-zinc-500 font-black italic uppercase text-xs tracking-widest group-hover:text-red-600 transition-colors">
                            {row.dia}
                          </span>
                          <div className="flex flex-col items-end gap-1">
                            {row.aulas.map((aula, idx) => (
                              <span key={idx} className="text-lg md:text-xl font-black italic uppercase tracking-tighter text-white">
                                {aula}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Coluna Contato */}
            <FadeIn direction="left">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-br from-red-600 to-zinc-900 opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-zinc-900 border border-white/5 p-8 md:p-12 overflow-hidden shadow-2xl">
                  <div className="absolute -bottom-10 -right-10 text-white/5 pointer-events-none select-none">
                    <Shield size={240} />
                  </div>
                  <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-10 flex items-center gap-4">
                    JOIN THE <span className="text-red-600">FAMILY</span>
                  </h3>
                  <div className="space-y-10 relative z-10">
                    <div className="group/item flex gap-6 items-start">
                      <div className="p-3 bg-white/5 border border-white/10 group-hover/item:border-red-600 transition-colors">
                        <MapPin size={24} className="text-red-600" />
                      </div>
                      <div>
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Localização</h5>
                        <p className="text-white font-bold italic uppercase tracking-tighter text-lg">
                          Campina Grande, PB <br />
                          <span className="text-zinc-400 text-sm font-normal normal-case italic">Rua do Treino, 123 - Centro</span>
                        </p>
                      </div>
                    </div>
                    <div className="group/item flex gap-6 items-start">
                      <div className="p-3 bg-white/5 border border-white/10 group-hover/item:border-red-600 transition-colors">
                        <Phone size={24} className="text-red-600" />
                      </div>
                      <div>
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">WhatsApp direto</h5>
                        <p className="text-white font-bold italic uppercase tracking-tighter text-lg">(83) 98888-8888</p>
                      </div>
                    </div>
                    <div className="pt-4">
                      <motion.a 
                        href="#"
                        className="w-full bg-red-600 text-white py-5 font-black italic uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-xl"
                      >
                        <MessageCircle size={18} /> MARCAR TREINO EXPERIMENTAL
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO: PLANOS E PACOTES (UPGRADED LAYOUT) --- */}
      <section id="planos" className="py-40 bg-zinc-950 relative overflow-hidden border-t border-white/5">
        {/* Decoração Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
          <div className="flex rotate-12 scale-150 gap-20">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col gap-10">
                <span className="text-[10rem] font-black italic text-stroke">PLANOS</span>
                <span className="text-[10rem] font-black italic text-stroke">PACOTES</span>
                <span className="text-[10rem] font-black italic text-stroke">O TEMPLO</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <FadeIn direction="right">
              <div>
                <span className="text-red-600 font-black italic tracking-[0.6em] text-xs uppercase block mb-4">Pricing Strategy</span>
                <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8] mb-4">
                  ESCOLHA <br />
                  <span className="text-stroke-red">SEU PLANO</span>
                </h2>
                <div className="h-2 w-40 bg-red-600"></div>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <p className="text-zinc-500 max-w-sm text-right font-black italic uppercase text-xs tracking-widest leading-loose border-r-4 border-white/10 pr-6">
                Investimento focado em performance. Sem taxas escondidas, apenas a verdade do tatame.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-2">
            {[
              {
                nome: "MENSAL",
                desc: "Pagamento mês a mês",
                preco: "Individual",
                icon: <Zap size={24} />,
                features: ["Acesso Livre", "Sem Carência", "Aulas Coletivas"],
                accent: "border-white/10"
              },
              {
                nome: "TRIMESTRAL",
                desc: "3 meses de foco",
                preco: "Evolução",
                icon: <Target size={24} />,
                features: ["Desconto Progressivo", "Avaliação Técnica", "Aulas Coletivas"],
                accent: "border-white/10"
              },
              {
                nome: "SEMESTRAL",
                desc: "O caminho do guerreiro",
                preco: "Dominante",
                popular: true,
                icon: <Crown size={24} />,
                features: ["Melhor Custo Benefício", "Kit Boas Vindas", "Acompanhamento VIP"],
                accent: "border-red-600 shadow-[0_0_40px_rgba(220,38,38,0.15)]"
              },
              {
                nome: "ANUAL",
                desc: "Estilo de vida total",
                preco: "Imortal",
                icon: <TrendingUp size={24} />,
                features: ["Menor Mensalidade", "Semestre Congelável", "Masterclasses Grátis"],
                accent: "border-white/10"
              }
            ].map((plano, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <div className={`relative h-full flex flex-col group ${plano.popular ? 'z-20 -mt-4 lg:-mt-8' : 'z-10'}`}>
                  <div className={`flex-1 bg-zinc-900/50 backdrop-blur-sm border-2 ${plano.accent} p-8 flex flex-col transition-all duration-700 group-hover:bg-zinc-900 group-hover:border-red-600/50`}>
                    
                    {plano.popular && (
                      <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 text-[8px] font-black italic tracking-[0.3em] -rotate-0">
                        MAIS PROCURADO
                      </div>
                    )}

                    <div className="mb-10">
                      <div className={`w-12 h-12 flex items-center justify-center mb-6 border ${plano.popular ? 'border-red-600 bg-red-600 text-white' : 'border-white/10 text-red-600'} transition-colors duration-500`}>
                        {plano.icon}
                      </div>
                      <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-1 group-hover:text-red-600 transition-colors">
                        {plano.nome}
                      </h3>
                      <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">{plano.desc}</p>
                    </div>

                    <div className="mb-12 space-y-4">
                      {plano.features.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                          <div className="w-1 h-1 bg-red-600"></div>
                          <span className="text-[10px] font-bold uppercase tracking-widest">{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <div className="mb-6">
                        <span className="text-zinc-600 text-[8px] font-black uppercase block tracking-widest mb-1">Status do Plano</span>
                        <span className="text-xl font-black italic uppercase tracking-tighter">{plano.preco}</span>
                      </div>
                      <button className={`w-full py-5 text-[10px] font-black italic uppercase tracking-[0.3em] transition-all duration-500 border ${plano.popular ? 'bg-red-600 border-red-600 text-white hover:bg-white hover:text-black hover:border-white' : 'bg-transparent border-white/10 text-white hover:bg-red-600 hover:border-red-600'}`}>
                        SOLICITAR VALORES
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Destaque Aula Experimental (Layout Premium) */}
          <div className="mt-24">
            <FadeIn direction="up">
              <div className="relative group overflow-hidden">
                <div className="absolute inset-0 bg-red-600 translate-y-[90%] group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>
                <div className="relative border-2 border-white/5 p-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-zinc-900 group-hover:bg-transparent transition-colors duration-700">
                  
                  <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="w-24 h-24 bg-black border border-white/10 flex items-center justify-center text-red-600 group-hover:text-white group-hover:border-white transition-all duration-700">
                      <Flame size={48} />
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-2">
                        TESTE SUA <span className="text-stroke-red group-hover:text-white">FORÇA</span>
                      </h3>
                      <p className="text-zinc-500 group-hover:text-black font-black italic uppercase text-xs tracking-[0.3em] transition-colors duration-700">
                        Primeira aula é por nossa conta. Sinta o peso do tatame.
                      </p>
                    </div>
                  </div>

                  <button className="bg-white text-black px-12 py-6 font-black italic uppercase text-xs tracking-[0.4em] -skew-x-12 hover:scale-110 active:scale-95 transition-all shadow-2xl">
                    AGENDAR AGORA
                  </button>

                  {/* Detalhe estético */}
                  <div className="absolute -bottom-4 -right-4 opacity-[0.05] group-hover:opacity-20 transition-opacity">
                    <Shield size={200} />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-black border-t border-white/10 text-center">
        <div className="flex flex-col italic font-black mb-8">
          <span className="text-3xl tracking-tighter">CT SILVA</span>
          <span className="text-red-600 text-[12px] tracking-[0.4em] -mt-1">BROTHERS</span>
        </div>
        <div className="flex justify-center gap-6 mb-12">
          <Instagram className="text-zinc-600 hover:text-white cursor-pointer" />
          <Youtube className="text-zinc-600 hover:text-white cursor-pointer" />
          <Facebook className="text-zinc-600 hover:text-white cursor-pointer" />
        </div>
        <p className="text-[10px] font-bold text-zinc-800 uppercase tracking-[0.5em]">Campina Grande - Paraíba - Brasil</p>
      </footer>
    </div>
  );
};

export default App;
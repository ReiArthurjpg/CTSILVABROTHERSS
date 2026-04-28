import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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
  Crown,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform } from 'framer-motion';

// --- COMPONENTES AUXILIARES ---

const SpotlightCard = ({ children, className = "", isDarkMode = true }) => {
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
      className={`relative overflow-hidden border ${isDarkMode ? 'border-white/5 bg-zinc-900' : 'border-black/5 bg-white shadow-xl'} ${className}`}
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

// --- REACT BITS: SplitText (Framer Motion) ---
const SplitText = ({ text, className = "", baseDelay = 0, charDelay = 0.04 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const chars = text.split('');
  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 80, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.9,
            delay: baseDelay + i * charDelay,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

// --- REACT BITS: GlitchText (CSS pseudo-element) ---
const GlitchText = ({ children, className = "", speed = 1 }) => (
  <span
    className={`glitch-hero ${className}`}
    data-text={children}
    style={{
      '--ga-dur': `${speed * 3}s`,
      '--gb-dur': `${speed * 2}s`,
    } as React.CSSProperties}
  >
    {children}
  </span>
);

// --- REACT BITS: Magnet ---
const Magnet = ({ children, padding = 80, magnetStrength = 3 }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const dx = Math.abs(cx - e.clientX);
      const dy = Math.abs(cy - e.clientY);
      if (dx < width / 2 + padding && dy < height / 2 + padding) {
        setIsActive(true);
        setPosition({ x: (e.clientX - cx) / magnetStrength, y: (e.clientY - cy) / magnetStrength });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, magnetStrength]);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isActive ? 'transform 0.2s ease-out' : 'transform 0.5s ease-in-out',
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
};

// --- REACT BITS: TiltCard 3D ---
const TiltCard = ({ children, className = '' }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- REACT BITS: DecryptedText ---
const DecryptedText = ({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  clickMode = 'once',
  ...props
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== 'click');
  const [direction, setDirection] = useState('forward');

  const containerRef = useRef(null);
  const orderRef = useRef([]);
  const pointerRef = useRef(0);
  const intervalRef = useRef(null);

  const availableChars = useMemo(() => {
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter(char => char !== ' ')
      : characters.split('');
  }, [useOriginalCharsOnly, text, characters]);

  const shuffleText = useCallback(
    (originalText, currentRevealed) => {
      return originalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join('');
    },
    [availableChars]
  );

  const computeOrder = useCallback(
    len => {
      const order = [];
      if (len <= 0) return order;
      if (revealDirection === 'start') {
        for (let i = 0; i < len; i++) order.push(i);
        return order;
      }
      if (revealDirection === 'end') {
        for (let i = len - 1; i >= 0; i--) order.push(i);
        return order;
      }
      const middle = Math.floor(len / 2);
      let offset = 0;
      while (order.length < len) {
        if (offset % 2 === 0) {
          const idx = middle + offset / 2;
          if (idx >= 0 && idx < len) order.push(idx);
        } else {
          const idx = middle - Math.ceil(offset / 2);
          if (idx >= 0 && idx < len) order.push(idx);
        }
        offset++;
      }
      return order.slice(0, len);
    },
    [revealDirection]
  );

  const fillAllIndices = useCallback(() => {
    const s = new Set();
    for (let i = 0; i < text.length; i++) s.add(i);
    return s;
  }, [text]);

  const removeRandomIndices = useCallback((set, count) => {
    const arr = Array.from(set);
    for (let i = 0; i < count && arr.length > 0; i++) {
      const idx = Math.floor(Math.random() * arr.length);
      arr.splice(idx, 1);
    }
    return new Set(arr);
  }, []);

  const encryptInstantly = useCallback(() => {
    const emptySet = new Set();
    setRevealedIndices(emptySet);
    setDisplayText(shuffleText(text, emptySet));
    setIsDecrypted(false);
  }, [text, shuffleText]);

  const triggerDecrypt = useCallback(() => {
    if (sequential) {
      orderRef.current = computeOrder(text.length);
      pointerRef.current = 0;
      setRevealedIndices(new Set());
    } else {
      setRevealedIndices(new Set());
    }
    setDirection('forward');
    setIsAnimating(true);
  }, [sequential, computeOrder, text.length]);

  const triggerReverse = useCallback(() => {
    if (sequential) {
      orderRef.current = computeOrder(text.length).slice().reverse();
      pointerRef.current = 0;
      setRevealedIndices(fillAllIndices());
      setDisplayText(shuffleText(text, fillAllIndices()));
    } else {
      setRevealedIndices(fillAllIndices());
      setDisplayText(shuffleText(text, fillAllIndices()));
    }
    setDirection('reverse');
    setIsAnimating(true);
  }, [sequential, computeOrder, fillAllIndices, shuffleText, text]);

  useEffect(() => {
    if (!isAnimating) return;
    let currentIteration = 0;

    const getNextIndex = revealedSet => {
      const textLength = text.length;
      switch (revealDirection) {
        case 'start': return revealedSet.size;
        case 'end': return textLength - 1 - revealedSet.size;
        case 'center': {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;
          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) return nextIndex;
          for (let i = 0; i < textLength; i++) if (!revealedSet.has(i)) return i;
          return 0;
        }
        default: return revealedSet.size;
      }
    };

    intervalRef.current = setInterval(() => {
      setRevealedIndices(prevRevealed => {
        if (sequential) {
          if (direction === 'forward') {
            if (prevRevealed.size < text.length) {
              const nextIndex = getNextIndex(prevRevealed);
              const newRevealed = new Set(prevRevealed);
              newRevealed.add(nextIndex);
              setDisplayText(shuffleText(text, newRevealed));
              return newRevealed;
            } else {
              clearInterval(intervalRef.current);
              setIsAnimating(false);
              setIsDecrypted(true);
              return prevRevealed;
            }
          }
          if (direction === 'reverse') {
            if (pointerRef.current < orderRef.current.length) {
              const idxToRemove = orderRef.current[pointerRef.current++];
              const newRevealed = new Set(prevRevealed);
              newRevealed.delete(idxToRemove);
              setDisplayText(shuffleText(text, newRevealed));
              if (newRevealed.size === 0) {
                clearInterval(intervalRef.current);
                setIsAnimating(false);
                setIsDecrypted(false);
              }
              return newRevealed;
            } else {
              clearInterval(intervalRef.current);
              setIsAnimating(false);
              setIsDecrypted(false);
              return prevRevealed;
            }
          }
        } else {
          if (direction === 'forward') {
            setDisplayText(shuffleText(text, prevRevealed));
            currentIteration++;
            if (currentIteration >= maxIterations) {
              clearInterval(intervalRef.current);
              setIsAnimating(false);
              setDisplayText(text);
              setIsDecrypted(true);
            }
            return prevRevealed;
          }
          if (direction === 'reverse') {
            let currentSet = prevRevealed;
            if (currentSet.size === 0) currentSet = fillAllIndices();
            const removeCount = Math.max(1, Math.ceil(text.length / Math.max(1, maxIterations)));
            const nextSet = removeRandomIndices(currentSet, removeCount);
            setDisplayText(shuffleText(text, nextSet));
            currentIteration++;
            if (nextSet.size === 0 || currentIteration >= maxIterations) {
              clearInterval(intervalRef.current);
              setIsAnimating(false);
              setIsDecrypted(false);
              setDisplayText(shuffleText(text, new Set()));
              return new Set();
            }
            return nextSet;
          }
        }
        return prevRevealed;
      });
    }, speed);
    return () => clearInterval(intervalRef.current);
  }, [isAnimating, text, speed, maxIterations, sequential, revealDirection, shuffleText, direction, fillAllIndices, removeRandomIndices]);

  const handleClick = () => {
    if (animateOn !== 'click') return;
    if (clickMode === 'once') {
      if (isDecrypted) return;
      setDirection('forward');
      triggerDecrypt();
    }
    if (clickMode === 'toggle') {
      if (isDecrypted) triggerReverse();
      else {
        setDirection('forward');
        triggerDecrypt();
      }
    }
  };

  const triggerHoverDecrypt = useCallback(() => {
    if (isAnimating) return;
    setRevealedIndices(new Set());
    setIsDecrypted(false);
    setDisplayText(text);
    setDirection('forward');
    setIsAnimating(true);
  }, [isAnimating, text]);

  const resetToPlainText = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsAnimating(false);
    setRevealedIndices(new Set());
    setDisplayText(text);
    setIsDecrypted(true);
    setDirection('forward');
  }, [text]);

  useEffect(() => {
    if (animateOn !== 'view' && animateOn !== 'inViewHover') return;
    const observerCallback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          triggerDecrypt();
          setHasAnimated(true);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, { threshold: 0.1 });
    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [animateOn, hasAnimated, triggerDecrypt]);

  useEffect(() => {
    if (animateOn === 'click') encryptInstantly();
    else {
      setDisplayText(text);
      setIsDecrypted(true);
    }
    setRevealedIndices(new Set());
    setDirection('forward');
  }, [animateOn, text, encryptInstantly]);

  const animateProps = animateOn === 'hover' || animateOn === 'inViewHover'
    ? { onMouseEnter: triggerHoverDecrypt, onMouseLeave: resetToPlainText }
    : animateOn === 'click' ? { onClick: handleClick } : {};

  return (
    <motion.span className={parentClassName} ref={containerRef} style={{ display: 'inline-block', whiteSpace: 'pre-wrap' }} {...animateProps} {...props}>
      <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>{displayText}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isRevealedOrDone = revealedIndices.has(index) || (!isAnimating && isDecrypted);
          return (
            <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // 1. Detecta a preferência do sistema operacional assim que a página carrega
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    // 2. Adiciona um ouvinte para mudar automaticamente se o usuário alterar o tema do celular/PC com o site aberto
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'O Esporte', href: '#esporte' },
    { name: 'Modalidades', href: '#modalidades' },
    { name: 'A Academia', href: '#academia' },
    { name: 'Diferenciais', href: '#diferenciais' },
    { name: 'Professor', href: '#professor' },
    { name: 'Loja', href: '#loja' },
    { name: 'Horários', href: '#agenda' },
    { name: 'Planos', href: '#planos' },
    { name: 'Contato', href: '#agenda' },
  ];

  const scrollToSection = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        const offset = 80; 
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} font-sans selection:bg-red-600 selection:text-white overflow-x-hidden transition-colors duration-500`}>
      <style>{`
        .text-stroke {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
          color: transparent;
        }
        .text-stroke-red {
          -webkit-text-stroke: 1px rgba(220, 38, 38, 0.5);
          color: transparent;
        }
        html {
          scroll-behavior: smooth;
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

        /* === REACT BITS: GlitchText === */
        .glitch-hero {
          position: relative;
          display: inline-block;
          -webkit-text-stroke: 1px rgba(220, 38, 38, 0.5);
          color: transparent;
        }
        .glitch-hero::after,
        .glitch-hero::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: black;
          -webkit-text-stroke: 1px rgba(220, 38, 38, 0.5);
          color: transparent;
          overflow: hidden;
        }
        .glitch-hero::after {
          left: 3px;
          text-shadow: -3px 0 rgba(220, 38, 38, 0.9);
          animation: glitch-a var(--ga-dur, 3.5s) infinite linear alternate-reverse;
        }
        .glitch-hero::before {
          left: -3px;
          text-shadow: 3px 0 rgba(0, 180, 255, 0.35);
          animation: glitch-b var(--gb-dur, 2.5s) infinite linear alternate-reverse;
        }
        @keyframes glitch-a {
          0%   { clip-path: inset(22% 0 62% 0); }
          10%  { clip-path: inset(8%  0 78% 0); }
          20%  { clip-path: inset(45% 0 40% 0); }
          30%  { clip-path: inset(2%  0 85% 0); }
          40%  { clip-path: inset(30% 0 55% 0); }
          50%  { clip-path: inset(60% 0 18% 0); }
          60%  { clip-path: inset(15% 0 72% 0); }
          70%  { clip-path: inset(50% 0 35% 0); }
          80%  { clip-path: inset(5%  0 80% 0); }
          90%  { clip-path: inset(70% 0 10% 0); }
          100% { clip-path: inset(35% 0 50% 0); }
        }
        @keyframes glitch-b {
          0%   { clip-path: inset(65% 0 10% 0); }
          10%  { clip-path: inset(80% 0 5%  0); }
          20%  { clip-path: inset(40% 0 35% 0); }
          30%  { clip-path: inset(75% 0 8%  0); }
          40%  { clip-path: inset(20% 0 60% 0); }
          50%  { clip-path: inset(55% 0 28% 0); }
          60%  { clip-path: inset(88% 0 2%  0); }
          70%  { clip-path: inset(30% 0 50% 0); }
          80%  { clip-path: inset(62% 0 18% 0); }
          90%  { clip-path: inset(10% 0 70% 0); }
          100% { clip-path: inset(48% 0 30% 0); }
        }
      `}</style>

      {/* Navegação */}
      <motion.nav
        className={`fixed w-full z-50 transition-colors duration-700 ${
          scrolled 
            ? isDarkMode ? 'bg-black/95 backdrop-blur-xl' : 'bg-white/95 backdrop-blur-xl shadow-sm'
            : 'bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Linha inferior animada */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', transformOrigin: 'center' }}
        />

        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-4">
          
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col leading-none italic font-black">
              <span className={`text-xl tracking-tighter ${isDarkMode ? 'text-white' : 'text-black'}`}>CT SILVA</span>
              <span className="text-red-600 text-[9px] tracking-[0.4em] -mt-0.5">BROTHERS</span>
            </div>
          </motion.a>

          {/* Links Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 py-1 group ${
                  isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
              >
                {link.name}
                {/* Underline animado */}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-red-600 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}

            {/* Separador */}
            <div className={`h-4 w-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />

            {/* Botão Tema */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isDarkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-black hover:bg-black/10'
              }`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Botão CTA */}
            <motion.button
              className="relative bg-red-600 px-6 py-2.5 font-black text-[10px] uppercase tracking-widest italic -skew-x-12 overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span className="absolute cursor-pointer inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className={`relative cursor-pointer z-10 ${isDarkMode ? 'text-white' : 'text-white'} group-hover:text-black transition-colors duration-300 skew-x-12 flex items-center gap-2`}>
                <Flame size={12} className="skew-x-12" />
                AULA GRÁTIS
              </span>
            </motion.button>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            {/* Theme Toggle Mobile */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Menu Toggle Mobile */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] group"
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                className={`w-6 h-[2px] ${isDarkMode ? 'bg-white' : (scrolled ? 'bg-black' : 'bg-black')} block`}
                animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 7 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-[2px] bg-red-600 block"
                animate={{ opacity: isMenuOpen ? 0 : 1, scaleX: isMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className={`w-6 h-[2px] ${isDarkMode ? 'bg-white' : (scrolled ? 'bg-black' : 'bg-black')} block`}
                animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -7 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden bg-black/98 border-t border-white/10"
            >
              <div className={`max-w-7xl mx-auto px-6 py-8 flex flex-col gap-4 ${isDarkMode ? 'bg-black/98 border-white/10' : 'bg-white/98 border-black/10'}`}>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`text-sm font-black uppercase tracking-widest transition-colors py-2 border-b flex items-center justify-between group ${
                      isDarkMode 
                        ? 'text-zinc-400 hover:text-red-600 border-white/5' 
                        : 'text-zinc-600 hover:text-red-600 border-black/5'
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.name}
                    <ChevronRight size={14} className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
                <motion.button
                  className="mt-4 bg-red-600 w-full py-4 font-black text-sm uppercase tracking-widest italic -skew-x-6 hover:bg-white hover:text-black transition-all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  AULA GRÁTIS
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 z-0 transition-colors duration-1000 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
          <img 
            src="https://wallpapers.com/images/hd/jiu-jitsu-1920-x-1080-5apb8ujim4llp13f.jpg" 
            className={`w-full h-full object-cover transition-opacity duration-1000 ${isDarkMode ? 'opacity-30 grayscale' : 'opacity-0'}`} 
            alt="Fundo Hero" 
          />
          <div className={`absolute inset-0 transition-opacity duration-1000 ${isDarkMode ? 'opacity-100 bg-gradient-to-t from-black via-transparent to-black/80' : 'opacity-0'}`} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.span
            className="text-red-600 font-black italic tracking-[0.5em] text-xs uppercase block mb-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Campina Grande • PB
          </motion.span>

          <h1 className="text-7xl md:text-[9rem] font-black uppercase italic leading-[0.8] tracking-tighter mb-8 overflow-hidden">
            <SplitText
              text="FORJANDO"
              className="block"
              baseDelay={0.4}
              charDelay={0.055}
            />
            <SplitText
              text="CAMPEÕES"
              className="block text-red-600"
              baseDelay={0.8}
              charDelay={0.06}
            />
          </h1>

          <motion.div
            className="h-1 bg-red-600 mb-8"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.p
            className={`${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} max-w-xl text-lg md:text-xl font-light`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Equipe Silva Brothers: Onde a técnica encontra a resiliência. Venha treinar no CT mais autêntico da região.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className={`w-6 h-10 rounded-full border flex justify-center p-1 ${isDarkMode ? 'border-white/20 bg-white/5' : 'border-black/20 bg-black/5'}`}>
            <div className="w-1 h-2 bg-red-600 rounded-full animate-scroll-dot" />
          </div>
          <span className={`text-[8px] font-bold uppercase tracking-[0.4em] ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Scroll</span>
        </div>
      </section>

      {/* Pilares — TiltCard 3D + Magnet icons (React Bits) */}
      <section className={`py-20 transition-colors duration-500 ${isDarkMode ? 'bg-black' : 'bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { t: 'DISCIPLINA', d: 'Foco total no processo.', i: <Target size={28} />, num: '01' },
            { t: 'RESPEITO',   d: 'Base da nossa filosofia.', i: <Shield size={28} />, num: '02' },
            { t: 'UNIÃO',      d: 'Crescemos como família.', i: <Users size={28} />,  num: '03' },
            { t: 'EVOLUÇÃO',   d: '1% melhor a cada dia.', i: <Flame size={28} />,  num: '04' }
          ].map((p, i) => (
            <FadeIn key={i} delay={i * 0.12} direction="up">
              <TiltCard className="h-full">
                <SpotlightCard isDarkMode={isDarkMode} className="p-8 h-full flex flex-col justify-between group">
                  {/* Número decorativo */}
                  <span className={`text-[3rem] font-black italic leading-none select-none absolute top-4 right-4 transition-colors duration-500 ${isDarkMode ? 'text-white/[0.04]' : 'text-black/[0.04]'}`}>
                    {p.num}
                  </span>

                  {/* Ícone com Magnet */}
                  <div className="mb-8">
                    <Magnet padding={60} magnetStrength={4}>
                      <div className="w-14 h-14 border border-red-600/30 bg-red-600/10 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all duration-500">
                        {p.i}
                      </div>
                    </Magnet>
                  </div>

                  <div>
                    {/* Linha decorativa */}
                    <div className="h-[2px] w-8 bg-red-600 mb-4 group-hover:w-full transition-all duration-700" />
                    <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-2 group-hover:text-red-600 transition-colors duration-300">
                      {p.t}
                    </h4>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest leading-relaxed">
                      {p.d}
                    </p>
                  </div>
                </SpotlightCard>
              </TiltCard>
            </FadeIn>
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
            <Magnet padding={50} magnetStrength={5}>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-10 py-5 flex items-center gap-4 font-black italic uppercase tracking-widest -skew-x-12 hover:bg-zinc-900 transition-all shadow-2xl shrink-0 group"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  size={20} 
                  className="w-5 h-5 skew-x-12 group-hover:text-red-600 transition-colors fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="skew-x-12">CHAMAR NO WHATSAPP</span>
              </motion.a>
            </Magnet>
        </div>
      </section>

      {/* --- SEÇÃO: A FORÇA DO COLETIVO --- */}
      <section id="esporte" className={`relative py-40 overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950' : 'bg-white'}`}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className={`max-w-7xl mx-auto h-full grid grid-cols-12 gap-0 border-x ${isDarkMode ? 'border-white' : 'border-black'}`}>
            {[...Array(11)].map((_, i) => <div key={i} className={`border-r h-full ${isDarkMode ? 'border-white' : 'border-black'}`} />)}
          </div>
        </div>

        <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 select-none pointer-events-none">
          <span 
            className="text-[30rem] font-black italic uppercase opacity-10 leading-none text-transparent"
            style={{ WebkitTextStroke: isDarkMode ? '1px rgba(255, 255, 255, 0.15)' : '1px rgba(0, 0, 0, 0.15)' }}
          >
            TEAM
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-6 lg:pt-20 relative z-20">
              <FadeIn direction="right">
                <h2 className="text-6xl md:text-[8rem] font-black uppercase italic leading-[0.8] tracking-tighter mb-10">
                  A FORÇA DO <br />
                  <span className="text-red-600">COLETIVO</span>
                </h2>

                <div className="max-w-md">
                  <p className={`text-xl md:text-2xl font-light leading-tight mb-8 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    Não é sobre quem finaliza mais rápido, é sobre <span className={`font-bold italic ${isDarkMode ? 'text-white' : 'text-black'}`}>não deixar ninguém para trás</span>.
                  </p>
                  
                  <div className={`space-y-6 text-sm leading-relaxed mb-12 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
                    <p>No CT Silva Brothers, acreditamos que o ambiente molda o lutador. Nosso tatame é um ecossistema de evolução mútua onde a graduação traz a responsabilidade de ensinar.</p>
                    <p>Aqui, o iniciante é acolhido e o veterano é desafiado. Essa troca constante cria uma base técnica inigualável e laços que transcendem o esporte.</p>
                  </div>

                  <div className={`grid grid-cols-2 gap-8 border-t pt-10 ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                    <div>
                      <span className={`block text-4xl font-black italic mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>01.</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-600' : 'text-zinc-500'}`}>Respeito à Hierarquia</span>
                    </div>
                    <div>
                      <span className={`block text-4xl font-black italic mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>02.</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-600' : 'text-zinc-500'}`}>Suporte Mútuo</span>
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
                      src="/images/forca-coletivo.jpg" 
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
                  <div className={`mt-12 grid grid-cols-2 gap-8 border-t pt-8 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border border-red-600/30 flex items-center justify-center text-red-600 bg-red-600/5 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                        <Shield size={20} />
                      </div>
                      <div>
                        <span className={`block text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Ambiente</span>
                        <span className={`block text-sm font-bold uppercase italic ${isDarkMode ? 'text-white' : 'text-black'}`}>Seguro & Profissional</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border border-red-600/30 flex items-center justify-center text-red-600 bg-red-600/5 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                        <Users size={20} />
                      </div>
                      <div>
                        <span className={`block text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Comunidade</span>
                        <span className={`block text-sm font-bold uppercase italic ${isDarkMode ? 'text-white' : 'text-black'}`}>União & Respeito</span>
                      </div>
                    </div>
                  </div>

                  {/* Citação do Mestre */}
                  <div className={`mt-12 p-8 relative group overflow-hidden border transition-colors duration-500 ${isDarkMode ? 'bg-zinc-900/50 border-white/5' : 'bg-zinc-50 border-black/5 shadow-sm'}`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-red-600/20 transition-all duration-700"></div>
                    <Quote className={`text-red-600 mb-4 ${isDarkMode ? 'opacity-50' : 'opacity-80'}`} size={32} />
                    <p className={`italic text-lg leading-relaxed mb-6 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      "A união da nossa equipe é o que nos torna invencíveis. No tatame, somos um só corpo, uma só mente."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-[1px] w-8 bg-red-600"></div>
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white' : 'text-black'}`}>Linhagem Silva Brothers</span>
                    </div>
                  </div>

                  {/* Mini Stats */}
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    {[
                      { label: 'Treinos / Sem', val: '20+' },
                      { label: 'Alunos Ativos', val: '150+' },
                      { label: 'Graduados', val: '40+' }
                    ].map((stat, i) => (
                      <div key={i} className={`text-center p-6 border group-hover:border-red-600/30 transition-colors ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-black/5 bg-black/5'}`}>
                        <span className="block text-2xl font-black italic text-red-600 mb-1">{stat.val}</span>
                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO: NOSSAS MODALIDADES --- */}
      <section id="modalidades" className={`py-32 relative overflow-hidden border-y transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950 border-white/5' : 'bg-white border-black/5'}`}>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn direction="up">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-6">
                NOSSAS <span className="text-red-600">MODALIDADES</span>
              </h2>
              <p className={`text-lg md:text-xl font-light max-w-2xl mx-auto border-t border-red-600/30 pt-4 uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
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
                <SpotlightCard isDarkMode={isDarkMode} className={`p-10 flex flex-col h-full group transition-all duration-500 ${isDarkMode ? 'hover:bg-zinc-900' : 'hover:bg-zinc-50'}`}>
                   <div className={`w-16 h-16 flex items-center justify-center text-red-600 mb-8 border group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 ${isDarkMode ? 'bg-black border-white/5' : 'bg-zinc-100 border-black/5'}`}>
                    {mod.icon}
                  </div>
                  <h3 className="text-2xl font-black italic uppercase mb-4 tracking-tighter group-hover:text-red-600 transition-colors">
                    {mod.title}
                  </h3>
                  <div className="h-[2px] w-8 bg-red-600 mb-4 group-hover:w-full transition-all duration-700" />
                  <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                    {mod.desc}
                  </p>
                  <button className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 mt-auto transition-colors ${isDarkMode ? 'text-zinc-400 group-hover:text-white' : 'text-zinc-500 group-hover:text-black'}`}>
                    VER HORÁRIOS <ChevronRight size={12} />
                  </button>
                </SpotlightCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- SEÇÃO: A ACADEMIA (REALIDADE DAS FOTOS) --- */}
      <section id="academia" className={`py-40 relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-black' : 'bg-zinc-50'}`}>
        <div className="absolute left-0 top-0 h-full flex items-center opacity-[0.02] pointer-events-none select-none">
          <span className="text-[25rem] font-black uppercase italic -rotate-90 origin-center whitespace-nowrap">
            REALITY
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-10">
            <FadeIn direction="right">
              <div className="max-w-4xl">
                <span className="text-red-600 font-black italic tracking-[0.5em] text-xs uppercase block mb-6">Ambiente Old School</span>
                <h2 className="text-6xl md:text-7xl font-black uppercase italic leading-[0.8] tracking-tighter">
                  NOSSO <br />
                  <SplitText
                    text="CENTRO DE TREINO"
                    className="block text-red-600"
                    baseDelay={0.3}
                    charDelay={0.04}
                  />
                </h2>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <div className="max-w-md text-right lg:pb-4 border-r-4 border-red-600 pr-8">
                <p className={`uppercase tracking-widest text-sm leading-relaxed font-bold ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>
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


        </div>
      </section>

      {/* --- SESSÃO: PROFESSOR / DONO --- */}
      <section id="professor" className={`py-40 relative overflow-hidden border-t transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950 border-white/5' : 'bg-white border-black/5'}`}>
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
                  <div className={`aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative ${isDarkMode ? 'bg-zinc-900' : 'bg-zinc-200'}`}>
                    <img 
                      src="/images/professor-felipe.jpg" 
                      className="w-full h-full object-cover object-center opacity-90"
                      alt="Professor Felipe Silva"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <p className="text-red-600 font-black italic uppercase tracking-widest text-xs mb-1">Head Coach</p>
                      <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white">Felipe Silva</h3>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Informações do Professor */}
            <div className="lg:col-span-7">
              <FadeIn direction="left">
                <h2 className="text-5xl md:text-7xl font-black uppercase italic leading-[0.8] tracking-tighter mb-10">
                  A MENTE POR TRÁS <br />
                  <SplitText
                    text="DO TATAME"
                    className="block text-red-600"
                    baseDelay={0.3}
                    charDelay={0.05}
                  />
                </h2>

                <div className="space-y-8">
                  {/* Graduações Principais */}
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-red-600/10 border border-red-600/20 px-4 py-2 flex items-center gap-3">
                      <Medal className="text-red-600" size={20} />
                      <span className={`font-black italic uppercase text-xs tracking-widest ${isDarkMode ? 'text-white' : 'text-black'}`}>Faixa Preta 3º Grau (CBJJ/IBJJF)</span>
                    </div>
                    <div className={`border px-4 py-2 flex items-center gap-3 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                      <Swords className={isDarkMode ? "text-zinc-400" : "text-zinc-600"} size={20} />
                      <span className={`font-black italic uppercase text-xs tracking-widest ${isDarkMode ? 'text-white' : 'text-black'}`}>Submission GB-PB (SBJJ)</span>
                    </div>
                  </div>

                  {/* Lista de Detalhes */}
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                    <div>
                      <h5 className="text-red-600 font-black italic uppercase text-[10px] tracking-widest mb-3 flex items-center gap-2">
                        <Award size={14} /> Graduações
                      </h5>
                      <p className={`text-sm font-light leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        Faixa Preta 3º Grau em Jiu-Jitsu, Wrestling e Submission.
                      </p>
                    </div>
                    <div>
                      <h5 className="text-red-600 font-black italic uppercase text-[10px] tracking-widest mb-3 flex items-center gap-2">
                        <BookOpen size={14} /> Formação
                      </h5>
                      <p className={`text-sm font-light leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        Pós-graduando em Educação Física, unindo ciência e prática.
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <h5 className="text-red-600 font-black italic uppercase text-[10px] tracking-widest mb-3 flex items-center gap-2">
                        <Cross size={14} /> Filosofia de Vida
                      </h5>
                      <p className={`text-lg italic font-medium leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                        "Cristão dedicado ao ensino de valores através das artes marciais."
                      </p>
                    </div>
                  </div>

                  {/* CTA Social */}
                  <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <motion.a 
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      className={`px-8 py-4 font-black italic uppercase tracking-widest text-xs -skew-x-12 flex items-center gap-3 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
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
      <section id="loja" className={`py-40 relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-20">
             <FadeIn direction="right">
              <div>
                <span className="text-red-600 font-black italic tracking-[0.5em] text-xs uppercase block mb-4">Silva Brothers Armory</span>
                <h2 className="text-5xl md:text-7xl font-black uppercase italic leading-none tracking-tighter">
                  EQUIPAMENTO <br />
                  <span className={isDarkMode ? 'text-white' : 'text-black'}>DE GUERRA</span>
                </h2>
              </div>
            </FadeIn>
            <FadeIn direction="left">
               <button disabled className={`mt-8 md:mt-0 flex items-center gap-4 px-8 py-4 font-black italic uppercase tracking-widest -skew-x-12 opacity-50 cursor-not-allowed transition-all ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
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
                  {/* OVERLAY EM DESENVOLVIMENTO */}
                  <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
                    <div className="bg-red-600 text-white px-6 py-3 font-black italic uppercase tracking-widest text-sm -skew-x-12 shadow-2xl">
                      <span className="skew-x-12 block">EM DESENVOLVIMENTO</span>
                    </div>
                  </div>

                  <div className={`aspect-[4/5] border overflow-hidden relative pointer-events-none transition-colors duration-500 ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-black/5 shadow-xl'}`}>
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-red-600 text-white text-[8px] font-black uppercase px-2 py-1 tracking-widest italic opacity-50">
                        {prod.tag}
                      </span>
                    </div>
                    <img 
                      src={prod.img} 
                      className={`w-full h-full object-cover grayscale transition-all duration-500 ${isDarkMode ? 'brightness-50' : 'brightness-90 opacity-70'}`}
                      alt={prod.name}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t opacity-60 ${isDarkMode ? 'from-black via-transparent to-transparent' : 'from-black/80 via-transparent to-transparent'}`} />
                    <div className="absolute bottom-6 left-6 right-6">
                       <button disabled className={`w-full py-4 font-black italic uppercase text-xs tracking-widest flex items-center justify-center gap-2 ${isDarkMode ? 'bg-white/10 text-white/50' : 'bg-white/90 text-black/50'}`}>
                        <Tag size={14} /> ADICIONAR AO CARRINHO
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between items-start opacity-50 pointer-events-none">
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

      {/* --- SEÇÃO: DIFERENCIAIS --- */}
      <section id="diferenciais" className={`py-40 relative overflow-hidden border-t transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950 border-white/5' : 'bg-white border-black/5'}`}>
        {/* Background Decorativo */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600/5 blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-red-600/5 blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn direction="up">
            <div className="mb-24">
              <span className="text-red-600 font-black italic tracking-[0.5em] text-xs uppercase block mb-6">Por que treinar conosco?</span>
              <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-6">
                NOSSAS <br />
                <SplitText text="VANTAGENS" className="text-red-600" baseDelay={0.3} />
              </h2>
              <div className="h-1 w-24 bg-red-600" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tecnologia e Acompanhamento */}
            <FadeIn delay={0.1}>
              <SpotlightCard isDarkMode={isDarkMode} className={`p-10 h-full flex flex-col gap-8 group ${isDarkMode ? '' : 'shadow-xl'}`}>
                <div className={`w-14 h-14 border flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 -skew-x-12 ${isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-zinc-100 border-black/10'}`}>
                  <Zap size={28} className="skew-x-12" />
                </div>
                <div>
                  <h3 className={`text-2xl font-black italic uppercase tracking-tighter mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Ecosistema Digital</h3>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed mb-8">Gestão moderna para sua evolução constante.</p>
                  <ul className="space-y-5">
                    {[
                      "Agendamento de aulas via App",
                      "App exclusivo do aluno",
                      "Sistema de acompanhamento técnico",
                      "Integração entre modalidades"
                    ].map((item, i) => (
                      <li key={i} className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>
                        <CheckCircle2 size={16} className="text-red-600 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </FadeIn>

            {/* Qualidade de Ensino */}
            <FadeIn delay={0.2}>
              <SpotlightCard isDarkMode={isDarkMode} className={`p-10 h-full flex flex-col gap-8 group ${isDarkMode ? '' : 'shadow-xl'}`}>
                <div className={`w-14 h-14 border flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 -skew-x-12 ${isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-zinc-100 border-black/10'}`}>
                  <Award size={28} className="skew-x-12" />
                </div>
                <div>
                  <h3 className={`text-2xl font-black italic uppercase tracking-tighter mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Metodologia Silva</h3>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed mb-8">Saber ensinar é a nossa maior graduação.</p>
                  <ul className="space-y-5">
                    {[
                      "Aulas 100% estruturadas",
                      "Didática específica para iniciantes",
                      "Atenção individual no tatame",
                      "Linhagem e histórico comprovados"
                    ].map((item, i) => (
                      <li key={i} className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>
                        <CheckCircle2 size={16} className="text-red-600 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </FadeIn>

            {/* Público Alvo */}
            <FadeIn delay={0.3}>
              <SpotlightCard isDarkMode={isDarkMode} className={`p-10 h-full flex flex-col gap-8 group ${isDarkMode ? '' : 'shadow-xl'}`}>
                <div className={`w-14 h-14 border flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 -skew-x-12 ${isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-zinc-100 border-black/10'}`}>
                  <Target size={28} className="skew-x-12" />
                </div>
                <div>
                  <h3 className={`text-2xl font-black italic uppercase tracking-tighter mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Para todos os perfis</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { t: "Infantil", e: "👶" },
                      { t: "Competição", e: "🏆" },
                      { t: "Defesa Pessoal", e: "🛡️" },
                      { t: "Hobby / Saúde", e: "🧘" }
                    ].map((p, i) => (
                      <div key={i} className={`border p-4 flex flex-col items-center gap-2 hover:bg-red-600/10 hover:border-red-600/50 transition-all cursor-default ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                        <span className="text-2xl mb-1">{p.e}</span>
                        <span className={`text-[8px] font-black uppercase tracking-widest text-center ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{p.t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* --- SEÇÃO: REDES SOCIAIS (FAIXA) --- */}
      <section className={`border-y py-16 relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-zinc-100 border-black/10'}`}>
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
      <section id="agenda" className={`py-32 relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-black' : 'bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start border-b border-white/5 pb-24">
            
            {/* Coluna Horários */}
            <FadeIn direction="right">
              <div className="relative">
                <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-12">
                  TREINOS <br />
                  <SplitText
                    text="DIÁRIOS"
                    className="block text-red-600"
                    baseDelay={0.3}
                    charDelay={0.08}
                  />
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
                      <div key={i} className={`group border-b pb-4 hover:border-red-600 transition-colors ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                          <span className="text-zinc-500 font-black italic uppercase text-xs tracking-widest group-hover:text-red-600 transition-colors">
                            {row.dia}
                          </span>
                          <div className="flex flex-col items-end gap-1">
                            {row.aulas.map((aula, idx) => (
                              <span key={idx} className={`text-lg md:text-xl font-black italic uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-black'}`}>
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
                <div className={`relative border p-8 md:p-12 overflow-hidden shadow-2xl transition-colors duration-500 ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-black/5'}`}>
                  <div className={`absolute -bottom-10 -right-10 pointer-events-none select-none ${isDarkMode ? 'text-white/5' : 'text-black/5'}`}>
                    <Shield size={240} />
                  </div>
                  <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-10 flex items-center gap-4">
                    JOIN THE <span className="text-red-600">FAMILY</span>
                  </h3>
                  <div className="space-y-10 relative z-10">
                    <div className="group/item flex gap-6 items-start">
                      <div className={`p-3 border group-hover/item:border-red-600 transition-colors ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                        <MapPin size={24} className="text-red-600" />
                      </div>
                      <div>
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Localização</h5>
                        <p className={`font-bold italic uppercase tracking-tighter text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
                          Campina Grande, PB <br />
                          <span className={`text-sm font-normal normal-case italic ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Rua do Treino, 123 - Centro</span>
                        </p>
                      </div>
                    </div>
                    <div className="group/item flex gap-6 items-start">
                      <div className={`p-3 border group-hover/item:border-red-600 transition-colors ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                        <Phone size={24} className="text-red-600" />
                      </div>
                      <div>
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">WhatsApp direto</h5>
                        <p className={`font-bold italic uppercase tracking-tighter text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>(83) 98888-8888</p>
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
      <section id="planos" className={`py-40 relative overflow-hidden border-t transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950 border-white/5' : 'bg-white border-black/5'}`}>
        {/* Decoração Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
          <div className="flex rotate-12 scale-150 gap-20">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col gap-10">
                <span className="text-[10rem] font-black italic text-transparent" style={{ WebkitTextStroke: isDarkMode ? '1px rgba(255,255,255,0.15)' : '1px rgba(0,0,0,0.15)' }}>PLANOS</span>
                <span className="text-[10rem] font-black italic text-transparent" style={{ WebkitTextStroke: isDarkMode ? '1px rgba(255,255,255,0.15)' : '1px rgba(0,0,0,0.15)' }}>PACOTES</span>
                <span className="text-[10rem] font-black italic text-transparent" style={{ WebkitTextStroke: isDarkMode ? '1px rgba(255,255,255,0.15)' : '1px rgba(0,0,0,0.15)' }}>O TEMPLO</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <FadeIn direction="right">
              <div>
                <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8] mb-4">
                  ESCOLHA <br />
                  <SplitText
                    text="SEU PLANO"
                    className="block text-red-600"
                    baseDelay={0.3}
                    charDelay={0.05}
                  />
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
                accent: isDarkMode ? "border-white/10" : "border-black/10"
              },
              {
                nome: "TRIMESTRAL",
                desc: "3 meses de foco",
                preco: "Evolução",
                icon: <Target size={24} />,
                features: ["Desconto Progressivo", "Avaliação Técnica", "Aulas Coletivas"],
                accent: isDarkMode ? "border-white/10" : "border-black/10"
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
                accent: isDarkMode ? "border-white/10" : "border-black/10"
              }
            ].map((plano, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <div className={`relative h-full flex flex-col group ${plano.popular ? 'z-20 -mt-4 lg:-mt-8' : 'z-10'}`}>
                  <div className={`flex-1 backdrop-blur-sm border-2 ${plano.accent} p-8 flex flex-col transition-all duration-700 ${isDarkMode ? 'bg-zinc-900/50 group-hover:bg-zinc-900' : 'bg-white/80 group-hover:bg-white'} group-hover:border-red-600/50`}>
                    
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
                        <span className={`text-xl font-black italic uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-black'}`}>{plano.preco}</span>
                      </div>
                      <button className={`w-full py-5 text-[10px] font-black italic uppercase tracking-[0.3em] transition-all duration-500 border ${plano.popular ? 'bg-red-600 border-red-600 text-white hover:bg-black hover:text-white hover:border-black' : isDarkMode ? 'bg-transparent border-white/10 text-white hover:bg-red-600 hover:border-red-600' : 'bg-transparent border-black/10 text-black hover:bg-red-600 hover:text-white hover:border-red-600'}`}>
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
                <div className={`relative border-2 p-12 flex flex-col md:flex-row items-center justify-between gap-8 group-hover:bg-transparent transition-colors duration-700 ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-black/5 shadow-2xl'}`}>
                  
                  <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className={`w-24 h-24 border flex items-center justify-center text-red-600 group-hover:text-white group-hover:border-white transition-all duration-700 ${isDarkMode ? 'bg-black border-white/10' : 'bg-zinc-100 border-black/10'}`}>
                      <Flame size={48} />
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-2">
                        TESTE SUA <SplitText text="FORÇA" className="text-red-600 group-hover:text-white transition-colors" baseDelay={0.2} />
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

      {/* --- SEÇÃO: DEPOIMENTOS / PROVA SOCIAL --- */}
      <section className={`py-32 relative overflow-hidden border-t transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950 border-white/5' : 'bg-zinc-50 border-black/5'}`}>
        {/* Background decorativo */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-[0.025]">
          <div className="flex items-center h-full">
            <span className="text-[20rem] font-black italic uppercase whitespace-nowrap">
              OSS • OSS • OSS •
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn direction="up">
            <div className="text-center mb-20">
              <span className="text-red-600 font-black italic tracking-[0.5em] text-xs uppercase block mb-6">
                Prova Social
              </span>
              <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-6">
                O QUE DIZEM OS <span className="text-red-600">ALUNOS</span>
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] w-16 bg-red-600/50" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-red-600 fill-red-600" />
                  ))}
                </div>
                <div className="h-[1px] w-16 bg-red-600/50" />
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                nome: "Misael Almeida",
                texto: "O melhor CT que já treinei, mestre Felipe além de saber muito, sabe passar perfeitamente o conteúdo aos alunos. Se vc quer aprender jiu-jitsu o lugar é esse.",
                inicial: "M"
              },
              {
                nome: "Telmo Petrucci",
                texto: "CT de altíssima qualidade, ensinando o Jiu-Jitsu raiz!!!",
                inicial: "T"
              },
              {
                nome: "José Antoniel",
                texto: "Melhor academia de jiu-jitsu de CG.",
                inicial: "J"
              },
              {
                nome: "Dayvison Alexandre",
                texto: "Centro de treinamento melhor da cidade. Oss!",
                inicial: "D"
              },
              {
                nome: "Davi Simoes",
                texto: "Excelente academia de artes marciais.",
                inicial: "D"
              }
            ].map((dep, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <SpotlightCard isDarkMode={isDarkMode} className={`p-8 flex flex-col h-full group transition-all duration-500 ${isDarkMode ? 'hover:bg-zinc-900' : 'hover:bg-white shadow-md'}`}>
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={14} className="text-red-600 fill-red-600" />
                    ))}
                  </div>

                  {/* Aspas */}
                  <Quote size={24} className="text-red-600/30 mb-4 group-hover:text-red-600/60 transition-colors" />

                  {/* Texto */}
                  <p className={`text-sm leading-relaxed italic flex-1 transition-colors ${isDarkMode ? 'text-zinc-400 group-hover:text-zinc-300' : 'text-zinc-600 group-hover:text-black'}`}>
                    "{dep.texto}"
                  </p>

                  {/* Divisor */}
                  <div className={`h-[1px] my-6 group-hover:bg-red-600/30 transition-colors ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`} />

                  {/* Autor */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-600 font-black italic text-sm group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                      {dep.inicial}
                    </div>
                    <div>
                      <span className={`block font-black italic uppercase tracking-tighter text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>{dep.nome}</span>
                      <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Aluno CT Silva Brothers</span>
                    </div>
                  </div>
                </SpotlightCard>
              </FadeIn>
            ))}

            {/* Card de CTA */}
            <FadeIn delay={0.5} direction="up">
              <div className="relative h-full overflow-hidden group border border-red-600/20 bg-red-600/5 hover:bg-red-600 transition-all duration-700 cursor-pointer p-8 flex flex-col justify-between">
                <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Shield size={160} />
                </div>
                <div>
                  <span className="text-red-600 group-hover:text-white font-black italic uppercase tracking-[0.3em] text-[10px] block mb-4 transition-colors">Sua história começa aqui</span>
                  <h4 className="text-3xl font-black italic uppercase leading-tight tracking-tighter group-hover:text-white transition-colors">
                    SEJA O PRÓXIMO <span className="text-red-600 group-hover:text-white">CASE</span> DE SUCESSO
                  </h4>
                </div>
                <div className="mt-8 flex items-center gap-3 text-zinc-500 group-hover:text-white transition-colors font-black italic uppercase text-[10px] tracking-widest">
                  <MessageCircle size={16} />
                  AGENDAR AULA GRÁTIS
                  <ArrowRight size={16} />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>


      <footer className={`border-t relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-black border-white/10' : 'bg-white border-black/10'}`}>
        {/* Faixa superior vermelha com CTA */}
        <div className="bg-red-600 py-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 flex items-center pointer-events-none select-none">
            <span className="text-8xl font-black italic uppercase whitespace-nowrap -ml-10">
              OSS • SILVA BROTHERS • OSS • SILVA BROTHERS •
            </span>
          </div>
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="max-w-xl">
              <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white leading-none mb-2">
                <DecryptedText 
                  text="PRONTO PARA O PRÓXIMO NÍVEL?" 
                  animateOn="view"
                  revealDirection="start"
                  speed={40}
                />
              </h3>
              <p className="text-black font-bold uppercase tracking-[0.2em] text-[10px] opacity-80">
                Fale agora com um de nossos instrutores e agende sua visita.
              </p>
            </div>
            
            <Magnet padding={50} magnetStrength={5}>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-10 py-5 flex items-center gap-4 font-black italic uppercase tracking-widest -skew-x-12 hover:bg-zinc-900 transition-all shadow-2xl shrink-0 group"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  size={20} 
                  className="w-5 h-5 skew-x-12 group-hover:text-red-600 transition-colors fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="skew-x-12">CHAMAR NO WHATSAPP</span>
              </motion.a>
            </Magnet>
          </div>
        </div>

        {/* Corpo principal do footer */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Coluna 1: Logo e Descrição */}
            <div className="lg:col-span-1">
              <div className={`flex flex-col leading-none italic font-black mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                <span className="text-3xl tracking-tighter">CT SILVA</span>
                <span className="text-red-600 text-[10px] tracking-[0.4em] -mt-1">BROTHERS</span>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed uppercase tracking-widest mb-8">
                Forjando campeões em Campina Grande — PB. Jiu-Jitsu, Submission e Wrestling de elite.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: <Instagram size={18} />, label: "Instagram" },
                  { icon: <Youtube size={18} />, label: "YouTube" },
                  { icon: <Facebook size={18} />, label: "Facebook" },
                ].map((s, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    aria-label={s.label}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 border flex items-center justify-center text-zinc-500 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Coluna 2: Navegação */}
            <div>
              <h5 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                <div className="h-[2px] w-4 bg-red-600" />
                Navegação
              </h5>
              <ul className="space-y-3">
                {[
                  { label: 'O Esporte', href: '#esporte' },
                  { label: 'Modalidades', href: '#modalidades' },
                  { label: 'A Academia', href: '#academia' },
                  { label: 'Professor', href: '#professor' },
                  { label: 'Loja', href: '#loja' },
                  { label: 'Horários', href: '#agenda' },
                  { label: 'Planos', href: '#planos' },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest hover:text-red-600 hover:pl-2 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <ChevronRight size={10} className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 3: Modalidades */}
            <div>
              <h5 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                <div className="h-[2px] w-4 bg-red-600" />
                Modalidades
              </h5>
              <ul className="space-y-3">
                {['Jiu-Jitsu Kimono', 'No-Gi Grappling', 'Submission', 'Wrestling', 'Defesa Pessoal', 'Jiu-Jitsu Kids'].map((m) => (
                  <li key={m}>
                    <span className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1 h-1 bg-red-600 rounded-full" />
                      {m}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 4: Contato */}
            <div>
              <h5 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                <div className="h-[2px] w-4 bg-red-600" />
                Contato
              </h5>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <MapPin size={16} className="text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <span className={`block text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-black'}`}>Campina Grande, PB</span>
                    <span className="text-zinc-600 text-[11px] font-normal">Rua do Treino, 123 — Centro</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone size={16} className="text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <span className={`block text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-black'}`}>(83) 98888-8888</span>
                    <span className="text-zinc-600 text-[11px]">WhatsApp disponível</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Clock size={16} className="text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <span className={`block text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-black'}`}>Seg — Sex</span>
                    <span className="text-zinc-600 text-[11px]">12h às 21h</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Barra de copyright */}
        <div className={`border-t py-6 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.4em]">
              © {new Date().getFullYear()} CT Silva Brothers. Todos os direitos reservados.
            </p>
            <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.4em]">
              Campina Grande • Paraíba • Brasil
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
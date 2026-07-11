import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ExternalLink, Code, Brain, Smartphone, Database, Award, Sun, Moon, ChevronDown, MapPin, Download, Send, MessageSquare, User, ChevronLeft, ChevronRight, Zap, Layers, Shield, Clock, CalendarCheck, Banknote, Globe2 } from 'lucide-react';
import './App.css';
import servijoLogo from './assets/ServiJo/logoServi.png';
import servijo1 from './assets/ServiJo/1.png';
import servijo2 from './assets/ServiJo/2.png';
import servijo3 from './assets/ServiJo/3.png';
import servijo4 from './assets/ServiJo/4.png';
import servijo5 from './assets/ServiJo/5.png';
import servijo6 from './assets/ServiJo/6.png';
import servijo7 from './assets/ServiJo/7.png';

import dawamLogo from './assets/Dawam/Dawanlogo2.png';
import dawam1 from './assets/Dawam/1.png';
import dawam2 from './assets/Dawam/2.png';

// ─── Animation Variants ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

// ─── Typewriter Hook ─────────────────────────────────────────────────
const useTypewriter = (words, typingSpeed = 80, deletingSpeed = 50, pauseTime = 2000) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? currentWord.substring(0, text.length - 1)
              : currentWord.substring(0, text.length + 1)
          );
        },
        isDeleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
};

// ─── Animated Counter ────────────────────────────────────────────────
const AnimatedCounter = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const isFloat = !Number.isInteger(target);

          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            setCount(isFloat ? parseFloat(current.toFixed(2)) : Math.floor(current));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="stat-number">
      {count}{suffix}
    </span>
  );
};

// ─── ServiJo Featured Card Component ────────────────────────────────
const ServijoCard = ({ servijo, dark, textHeading, textMuted }) => {
  const [activeImg, setActiveImg] = useState(0);
  if (!servijo) return null;

  const prev = (activeImg - 1 + servijo.images.length) % servijo.images.length;
  const next = (activeImg + 1) % servijo.images.length;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-10"
    >
      <div className={`relative rounded-3xl overflow-hidden border backdrop-blur-sm ${dark
          ? 'bg-slate-900/70 border-slate-700/60 shadow-2xl shadow-emerald-500/10'
          : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/80'
        }`}>
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500" />

        <div className="grid lg:grid-cols-2 gap-0">
          {/* LEFT — Logo + Info */}
          <div className="p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="w-20 h-20 rounded-2xl bg-white shadow-lg border border-slate-200 flex items-center justify-center overflow-hidden mb-6">
                <img src={servijo.logo} alt="ServiJo Logo" className="w-full h-full object-contain" />
              </div>

              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${dark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  }`}>✦ Featured Project</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${dark ? 'bg-slate-800 text-slate-400 border border-slate-700' : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}>{servijo.category}</span>
              </div>

              <h3 className={`text-3xl lg:text-4xl font-bold mb-3 ${textHeading}`}>ServiJo</h3>
              <p className={`text-base leading-relaxed mb-2 ${textMuted}`}>
                Smart Service Marketplace — cross-platform app connecting customers with trusted service providers in real-time.
              </p>
              <p className={`text-sm leading-relaxed mb-6 ${dark ? 'text-slate-500' : 'text-slate-500'}`}>
                Built with Flutter + Firebase, featuring GPS-based provider matching, in-app real-time chat, and an AI-powered assistant called{' '}
                <span className={`font-semibold ${dark ? 'text-cyan-400' : 'text-cyan-600'}`}>"Nashmi"</span>.
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-5">
                {servijo.highlights.map((h, i) => (
                  <span key={i} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${dark ? 'bg-slate-800/80 text-slate-300 border-slate-700/60' : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}>{h}</span>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {servijo.tech.map((t, i) => (
                  <span key={i} className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border ${dark ? 'border-emerald-500/20 text-emerald-300' : 'border-emerald-500/15 text-emerald-700'
                    }`}>{t}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={servijo.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:scale-105 ${dark
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-500/40 hover:text-emerald-600'
                  }`}
              >
                <Github className="w-4 h-4" /> View on GitHub
              </a>
            </div>
          </div>

          {/* RIGHT — Phone Mockup Showcase */}
          <div className={`relative flex flex-col items-center justify-center py-12 px-4 overflow-hidden ${dark ? 'bg-slate-950/50' : 'bg-gradient-to-br from-slate-100 to-slate-50'
            } border-l ${dark ? 'border-slate-800/50' : 'border-slate-200'}`}>

            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl ${dark ? 'bg-emerald-500/8' : 'bg-emerald-400/12'
                }`} />
            </div>

            {/* Phone fan showcase */}
            <div className="relative flex items-center justify-center" style={{ height: '380px', width: '100%' }}>

              {/* LEFT side phone */}
              <motion.div
                className="absolute cursor-pointer"
                style={{ left: '2%', zIndex: 1 }}
                animate={{ rotate: -18, x: 0, scale: 0.72, opacity: 0.75 }}
                whileHover={{ scale: 0.78, opacity: 0.9 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                onClick={() => setActiveImg(prev)}
              >
                <div className={`relative rounded-[2.2rem] border-4 shadow-xl overflow-hidden ${dark ? 'border-slate-600 shadow-black/50' : 'border-slate-400 shadow-slate-300/60'
                  }`} style={{ width: '130px', height: '270px' }}>
                  {/* Phone notch */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 rounded-b-xl z-10 ${dark ? 'bg-slate-600' : 'bg-slate-400'}`} />
                  <img
                    src={servijo.images[prev]}
                    alt="prev screen"
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 ${dark ? 'bg-slate-900/30' : 'bg-white/20'}`} />
                </div>
              </motion.div>

              {/* CENTER — Active phone */}
              <motion.div
                className="relative z-10"
                layout
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {/* Glow ring behind phone */}
                <div className="absolute inset-0 -m-3 rounded-[2.8rem] bg-gradient-to-br from-emerald-500/30 via-cyan-500/20 to-violet-500/30 blur-xl" />

                <div className={`relative rounded-[2.5rem] border-[5px] shadow-2xl overflow-hidden ${dark ? 'border-slate-500 shadow-emerald-500/20' : 'border-slate-300 shadow-emerald-400/30'
                  }`} style={{ width: '175px', height: '360px' }}>
                  {/* Phone notch */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 rounded-b-2xl z-10 ${dark ? 'bg-slate-500' : 'bg-slate-300'}`} />
                  {/* Status bar */}
                  <div className={`absolute top-0 left-0 right-0 h-6 z-[5] ${dark ? 'bg-slate-800/60' : 'bg-black/10'}`} />

                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImg}
                      src={servijo.images[activeImg]}
                      alt={`ServiJo screen ${activeImg + 1}`}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Home indicator */}
                  <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full z-10 ${dark ? 'bg-slate-400/60' : 'bg-slate-500/50'}`} />
                </div>

                {/* Screen label */}
                <div className={`mt-4 text-center text-xs font-mono ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                  {activeImg + 1} / {servijo.images.length}
                </div>
              </motion.div>

              {/* RIGHT side phone */}
              <motion.div
                className="absolute cursor-pointer"
                style={{ right: '2%', zIndex: 1 }}
                animate={{ rotate: 18, x: 0, scale: 0.72, opacity: 0.75 }}
                whileHover={{ scale: 0.78, opacity: 0.9 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                onClick={() => setActiveImg(next)}
              >
                <div className={`relative rounded-[2.2rem] border-4 shadow-xl overflow-hidden ${dark ? 'border-slate-600 shadow-black/50' : 'border-slate-400 shadow-slate-300/60'
                  }`} style={{ width: '130px', height: '270px' }}>
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 rounded-b-xl z-10 ${dark ? 'bg-slate-600' : 'bg-slate-400'}`} />
                  <img
                    src={servijo.images[next]}
                    alt="next screen"
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 ${dark ? 'bg-slate-900/30' : 'bg-white/20'}`} />
                </div>
              </motion.div>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2 mt-4">
              {servijo.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`transition-all duration-300 rounded-full ${activeImg === i
                      ? 'w-6 h-2 bg-emerald-500'
                      : `w-2 h-2 ${dark ? 'bg-slate-600 hover:bg-slate-400' : 'bg-slate-300 hover:bg-slate-500'}`
                    }`}
                />
              ))}
            </div>

            {/* Prev / Next nav */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setActiveImg(prev)}
                className={`p-2.5 rounded-xl border transition-all hover:scale-110 ${dark ? 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50' : 'bg-white border-slate-200 text-slate-500 hover:text-emerald-600'
                  }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveImg(next)}
                className={`p-2.5 rounded-xl border transition-all hover:scale-110 ${dark ? 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50' : 'bg-white border-slate-200 text-slate-500 hover:text-emerald-600'
                  }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Dawam Featured Card Component ──────────────────────────────────
const DawamCard = ({ dawam, dark, textHeading, textMuted }) => {
  const [activeImg, setActiveImg] = useState(0);

  if (!dawam) return null;

  const prevImg = (activeImg - 1 + dawam.images.length) % dawam.images.length;
  const nextImg = (activeImg + 1) % dawam.images.length;


  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-10"
    >
      <div className={`relative rounded-3xl overflow-hidden border backdrop-blur-sm ${dark
          ? 'bg-slate-900/70 border-slate-700/60 shadow-2xl shadow-emerald-500/10'
          : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/80'
        }`}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400" />

        <div className="grid lg:grid-cols-2 gap-0">
          <div className="p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="w-20 h-20 rounded-2xl bg-white shadow-lg border border-slate-200 flex items-center justify-center overflow-hidden mb-6 p-2">
                <img src={dawam.logo} alt="Dawam Logo" className="w-full h-full object-contain" />
              </div>

              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${dark ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' : 'bg-violet-50 text-violet-600 border border-violet-200'
                  }`}>✦ Featured Full-Stack</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${dark ? 'bg-slate-800 text-slate-400 border border-slate-700' : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}>{dawam.category}</span>
              </div>

              <h3 className={`text-3xl lg:text-4xl font-bold mb-3 ${textHeading}`}>Dawam</h3>
              <p className={`text-base leading-relaxed mb-4 ${textMuted}`}>
                Bilingual ERP/HR Management System built using modern enterprise architecture principles. Includes dynamic dashboards, employee contract directories, real-time payroll, check-in logs, and workflow approval mechanisms.
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {dawam.highlights.map((h, i) => (
                  <span key={i} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${dark ? 'bg-slate-800/80 text-slate-300 border-slate-700/60' : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}>{h}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {dawam.tech.map((t, i) => (
                  <span key={i} className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border ${dark ? 'border-violet-500/20 text-violet-300' : 'border-violet-500/15 text-violet-700'
                    }`}>{t}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={dawam.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:scale-105 ${dark
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-violet-500/50 hover:text-violet-400'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-violet-500/40 hover:text-violet-600'
                  }`}
              >
                <Github className="w-4 h-4" /> View on GitHub
              </a>
            </div>
          </div>

          <div className={`relative flex flex-col p-6 lg:p-8 ${dark ? 'bg-slate-950/40' : 'bg-slate-50'
            } border-l ${dark ? 'border-slate-800/50' : 'border-slate-200'}`}>

            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <h4 className={`text-sm font-bold ${textHeading}`}>ERP Dashboard Screenshots</h4>
                <p className="text-xs text-slate-400">Administrative dashboard stats &amp; profiles directory.</p>
              </div>

              <div className={`relative rounded-xl border overflow-hidden shadow-2xl flex flex-col ${dark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-100'
                }`} style={{ minHeight: '340px' }}>
                <div className={`h-8 px-4 flex items-center gap-1.5 border-b shrink-0 ${dark ? 'bg-slate-900 border-slate-800' : 'bg-slate-200/80 border-slate-300'
                  }`}>
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <div className={`w-3/5 mx-auto h-5 rounded text-[9px] font-mono flex items-center justify-center ${dark ? 'bg-slate-950 text-slate-500' : 'bg-white text-slate-400'
                    }`}>
                    dawam-hrms.karamalali.com
                  </div>
                </div>

                <div className="relative flex-1 bg-slate-950 flex items-center justify-center overflow-hidden h-[240px] md:h-[280px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImg}
                      src={dawam.images[activeImg]}
                      alt={`Dawam screenshot ${activeImg + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="w-full h-full object-contain"
                    />
                  </AnimatePresence>

                  <button
                    onClick={() => setActiveImg(prevImg)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:text-emerald-400 hover:scale-105 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveImg(nextImg)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:text-emerald-400 hover:scale-105 transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex justify-center gap-1.5 shrink-0">
                {dawam.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${activeImg === idx ? 'bg-emerald-500 w-4' : 'bg-slate-600'
                      }`}
                  />
                ))}
              </div>

              {/* Quick Stats */}
              <div className={`grid grid-cols-4 divide-x rounded-xl border mt-2 ${dark
                  ? 'border-slate-800 divide-slate-800 bg-slate-900/40'
                  : 'border-slate-200 divide-slate-200 bg-slate-50'
                }`}>
                {[
                  { value: '3', label: 'User Roles' },
                  { value: '4', label: 'Modules' },
                  { value: 'AR/EN', label: 'Languages' },
                  { value: 'REST', label: 'API Layer' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center py-3 px-1">
                    <span className={`text-sm font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>
                      {stat.value}
                    </span>
                    <span className={`text-[10px] mt-0.5 text-center ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────
const Portfolio = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const heroRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  const typedText = useTypewriter([
    'Mobile Developer',
    'AI Enthusiast',
    'Problem Solver',
    'Flutter Expert',
    'Full-Stack Learner',
  ]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll-spy for nav
      const sections = ['projects', 'skills', 'education', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // ─── Data ───────────────────────────────────────────────────────
  const servijoImages = [servijo1, servijo2, servijo3, servijo4, servijo5, servijo6, servijo7];

  const projects = [
    {
      title: 'Dawam',
      tech: ['Angular 18', '.NET 10.0', 'Clean Architecture', 'EF Core', 'JWT', 'SQLite'],
      description: 'Bilingual enterprise ERP/HR Management System (HRMS) featuring dynamic dashboards, real-time check-in logging, auto-computed payslips, leave workflow approvals, and role-based permissions.',
      icon: <Layers className="w-5 h-5" />,
      category: 'Full-Stack ERP',
      logo: dawamLogo,
      images: [dawam1, dawam2],
      github: 'https://github.com/KaramAlali33',
      highlights: ['Clean Architecture', 'CQRS MediatR', 'Signals State', 'Bilingual RTL'],
      featuredFullStack: true,
    },
    {
      title: 'ServiJo',
      tech: ['Flutter', 'Firebase', 'Google AI', 'GPS'],
      description: 'Smart service marketplace connecting customers with trusted providers in real-time. Features GPS-based matching, in-app chat, AI assistant "Nashmi", and seamless booking management.',
      icon: <Zap className="w-5 h-5" />,
      category: 'Mobile Marketplace',
      image: servijoLogo,
      images: servijoImages,
      logo: servijoLogo,
      github: 'https://github.com/KaramAlali33',
      highlights: ['GPS Matching', 'AI Assistant', 'Real-time Chat', 'Cloud Firestore'],
      featured: true,
    },
    {
      title: 'ComputerPartsAPP',
      tech: ['Flutter', 'Dart', 'Hive'],
      description: 'E-commerce mobile application with product search, cart management, profile customization, and local data persistence for checkout history.',
      icon: <Smartphone className="w-5 h-5" />,
      category: 'Mobile Dev',
      image: 'computerparts1.png',
      github: 'https://github.com/KaramAlali33/ComputerPartsAPP',
      highlights: ['Local Storage', 'Search Filter', 'Cart System'],
    },
    {
      title: 'Salati Mobile App',
      tech: ['Flutter', 'Dart'],
      description: 'Grocery and food shopping app with clean, intuitive UI featuring category browsing, product carousels, and dynamic cart management.',
      icon: <Smartphone className="w-5 h-5" />,
      category: 'Mobile Dev',
      image: 'salati1.png',
      github: 'https://github.com/KaramAlali33/Salati',
      highlights: ['Clean UI', 'Product Carousels', 'Cart Management'],
    },
    {
      title: 'Customer Churn Prediction',
      tech: ['Python', 'Scikit-learn', 'LightGBM'],
      description: 'Full ML workflow with data preprocessing, resampling, and hyperparameter tuning achieving strong ROC-AUC scores for actionable predictions.',
      icon: <Brain className="w-5 h-5" />,
      category: 'AI/ML',
      image: 'churn1.png',
      github: 'https://github.com/KaramAlali33/Customer_Churn_Prediction/blob/main/Customer_Churn_Prediction.ipynb',
      highlights: ['ML Pipeline', 'Hyperparameter Tuning', 'High ROC-AUC'],
    },
    {
      title: 'BMI Tracker & Profile Manager',
      tech: ['C#', '.NET WinForms', 'LINQ'],
      description: 'Desktop app for managing personal health profiles with input validation, BMI computation, and data visualization with sort/filter capabilities.',
      icon: <Database className="w-5 h-5" />,
      category: 'Desktop Dev',
      image: 'bmi1.png',
      github: 'https://github.com/KaramAlali33/MI-Tracker-Profile-Manager-',
      highlights: ['Data Validation', 'BMI Calculator', 'Visual Analytics'],
    },
  ];

  const skillGroups = [
    { title: 'Mobile Development', icon: <Smartphone className="w-5 h-5" />, skills: ['Flutter', 'Dart', 'UI/UX', 'State Management', 'Cross-Platform'] },
    { title: 'Backend & .NET', icon: <Code className="w-5 h-5" />, skills: ['C#', '.NET', 'WinForms', 'LINQ'] },
    { title: 'Programming', icon: <Code className="w-5 h-5" />, skills: ['Python', 'Java', 'C++', 'JavaScript', 'SQL'] },
    { title: 'Machine Learning & AI', icon: <Brain className="w-5 h-5" />, skills: ['Scikit-learn', 'LightGBM', 'Pandas', 'NumPy', 'Data Analysis'] },
    { title: 'Database & Storage', icon: <Database className="w-5 h-5" />, skills: ['SQL', 'Hive', 'Database Design', 'Local Storage'] },
    { title: 'Development Tools', icon: <Code className="w-5 h-5" />, skills: ['Git', 'GitHub', 'VS Code', 'Visual Studio'] },
  ];

  const stats = [
    { label: 'Projects Built', value: 10, suffix: '+' },
    { label: 'Technologies', value: 20, suffix: '+' },
    { label: 'GPA', value: 4.02, suffix: '/4' },
  ];

  // ─── Theme Classes ──────────────────────────────────────────────
  const dark = isDarkMode;
  const bg = dark
    ? 'bg-[#060918]'
    : 'bg-gradient-to-br from-slate-50 via-white to-slate-100';
  const textMain = dark ? 'text-gray-100' : 'text-slate-900';
  const textMuted = dark ? 'text-slate-400' : 'text-slate-600';
  const textHeading = dark ? 'text-white' : 'text-slate-900';
  const cardBg = dark
    ? 'bg-slate-900/60 border-slate-800/50 hover:border-emerald-500/30'
    : 'bg-white border-slate-200 hover:border-emerald-500/30 shadow-sm';
  const navBg = dark
    ? (isScrolled ? 'bg-[#060918]/90 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-slate-800/50' : 'bg-transparent border-b border-transparent')
    : (isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-200' : 'bg-transparent border-b border-transparent');

  return (
    <div className={`min-h-screen transition-colors duration-500 ${bg} ${textMain} ${!dark ? 'light-mode' : ''} relative overflow-x-hidden`}>
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Floating orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* ═══════ SCROLL PROGRESS BAR ═══════ */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
        style={{
          scaleX: smoothProgress,
          background: 'linear-gradient(90deg, #10b981, #06b6d4, #8b5cf6)',
        }}
      />

      {/* ═══════ NAVIGATION ═══════ */}
      <nav className={`fixed top-[3px] w-full z-50 transition-all duration-500 ${navBg}`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo / Name */}
            <a href="#" className="flex items-center gap-1 group">
              <div className={`w-10 h-10 flex items-center justify-center rounded overflow-hidden`}>
                <img src="logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className={`text-xl font-bold ${textHeading} hidden sm:inline tracking-tight`}>Karam<span className="text-emerald-500"></span></span>
            </a>

            {/* Nav Links */}
            <div className="flex items-center gap-6">
              {['projects', 'skills', 'education', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`nav-link text-sm font-medium capitalize transition-colors duration-300 ${activeSection === section
                    ? 'text-emerald-500'
                    : `${textMuted} hover:text-emerald-400`
                    }`}
                >
                  {section}
                </a>
              ))}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl transition-all duration-300 ${dark ? 'hover:bg-slate-800 text-slate-400 hover:text-emerald-400' : 'hover:bg-slate-100 text-slate-500 hover:text-emerald-600'
                  }`}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={dark ? 'moon' : 'sun'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══════ HERO SECTION ═══════ */}
      <section ref={heroRef} className="pt-28 pb-12 px-6 relative flex items-center overflow-hidden">
        {/* Hero gradient glow */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full ${dark ? 'bg-emerald-500/5' : 'bg-emerald-500/8'} blur-3xl pointer-events-none`} />

        <div className="max-w-6xl mx-auto relative w-full">
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Profile Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="flex-shrink-0 relative group p-6"
            >
              {/* Animated ring — tight on mobile, spacious on desktop */}
              <div className="absolute inset-2 md:-inset-4">
                <div className={`w-full h-full rounded-full border-2 border-dashed ${dark ? 'border-emerald-500/20' : 'border-emerald-500/15'} animate-[spin_20s_linear_infinite]`} />
              </div>
              {/* Glow — hidden on mobile to prevent overflow */}
              <div className={`absolute inset-4 md:-inset-2 bg-gradient-to-br from-emerald-500 via-cyan-500 to-violet-500 rounded-full blur-xl ${dark ? 'opacity-25' : 'opacity-15'} group-hover:opacity-40 transition-opacity duration-700 hidden md:block`} />
              <div className={`relative w-44 h-44 md:w-60 md:h-60 rounded-full overflow-hidden border-4 ${dark ? 'border-slate-800' : 'border-white'} shadow-2xl mx-auto`}>
                <img
                  src="Karam3.png"
                  alt="Karam Wasfi Alali"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Status badge */}
              <div className={`absolute bottom-4 right-2 md:right-2 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${dark ? 'bg-slate-900 border border-emerald-500/30 text-emerald-400' : 'bg-white border border-emerald-500/20 text-emerald-600'} shadow-lg`}>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Open to work
              </div>
            </motion.div>

            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="flex-1 text-center md:text-left"
            >
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 ${dark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border border-emerald-500/10'}`}>
                <MapPin className="w-3 h-3" />
                Amman, Jordan
              </div>

              <h1 className={`text-5xl md:text-7xl font-bold mb-4 leading-tight`}>
                <span className={textHeading}>Hi, I'm </span>
                <span className="gradient-text">Karam Alali</span>
              </h1>

              <div className={`text-xl md:text-2xl mb-6 h-8 ${dark ? 'text-slate-300' : 'text-slate-700'} font-light`}>
                <span>{typedText}</span>
                <span className="typewriter-cursor" />
              </div>

              <p className={`${textMuted} text-base md:text-lg mb-8 leading-relaxed max-w-xl`}>
                Crafting intelligent applications with{' '}
                <span className="text-emerald-500 font-semibold">Flutter</span>,{' '}
                <span className="text-cyan-500 font-semibold">Python</span>, and{' '}
                <span className="text-violet-500 font-semibold">.NET</span>.
                Passionate about mobile development and AI/ML solutions.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="glow-button px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                >
                  Get in Touch
                </motion.a>
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-8 py-3 rounded-xl font-semibold text-sm border-2 transition-all duration-300 ${dark ? 'border-slate-700 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400' : 'border-slate-300 text-slate-700 hover:border-emerald-500/50 hover:text-emerald-600'}`}
                >
                  View Projects
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}

        </div>
      </section>

      {/* ═══════ STATS BAR ═══════ */}
      <section className="py-12 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className={`grid grid-cols-3 gap-6 p-8 rounded-2xl border backdrop-blur-sm ${dark ? 'bg-slate-900/40 border-slate-800/50' : 'bg-white/80 border-slate-200'}`}
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ scale: 1.08, y: -4 }} className="text-center cursor-default">
                <div className={`text-3xl md:text-4xl font-bold mb-1 gradient-text`}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className={`text-xs md:text-sm ${textMuted} font-medium uppercase tracking-wider`}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ PROJECTS SECTION ═══════ */}
      <section id="projects" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 ${dark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border border-emerald-500/10'}`}>
              PORTFOLIO
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold ${textHeading}`}>
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </motion.div>

          {/* ── Dawam Featured Card ── */}
          <DawamCard
            dawam={projects.find(p => p.featuredFullStack)}
            dark={dark}
            textHeading={textHeading}
            textMuted={textMuted}
          />

          {/* ── ServiJo Featured Card ── */}
          <ServijoCard
            servijo={projects.find(p => p.featured)}
            dark={dark}
            textHeading={textHeading}
            textMuted={textMuted}
          />

          {/* ── Regular Projects Grid ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-2 gap-8"
          >
            {projects.filter(p => !p.featured && !p.featuredFullStack).map((project, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="card-3d cursor-pointer"
              >
                <div className={`card-3d-inner project-card backdrop-blur-sm border rounded-2xl overflow-hidden ${dark ? 'bg-slate-900/60 border-slate-800/50' : 'bg-white border-slate-200 shadow-sm'}`}>
                  {/* Project Image */}
                  <div className={`relative overflow-hidden h-44 ${dark ? 'bg-slate-950' : 'bg-slate-100'}`}>
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="project-image-overlay" />

                    {/* Category badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${dark ? 'bg-slate-900/80 text-emerald-400 border border-emerald-500/20' : 'bg-white/90 text-emerald-600 border border-emerald-500/10'}`}>
                      {project.category}
                    </div>

                    {/* GitHub Link */}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`absolute top-4 right-4 p-2.5 backdrop-blur-sm rounded-xl border transition-all hover:scale-110 ${dark ? 'bg-slate-900/80 border-slate-700 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-400' : 'bg-white/80 border-slate-200 hover:border-emerald-500/50 text-slate-600 hover:text-emerald-600'}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-emerald-500 border ${dark ? 'border-emerald-500/20' : 'border-emerald-500/10'}`}>
                        {project.icon}
                      </div>
                      <h3 className={`text-xl font-bold ${textHeading}`}>{project.title}</h3>
                    </div>

                    <p className={`${textMuted} text-sm mb-4 leading-relaxed`}>
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.highlights.map((h, i) => (
                        <span
                          key={i}
                          className={`px-2.5 py-1 rounded-md text-xs font-medium ${dark ? 'bg-slate-800/70 text-slate-400 border border-slate-700/50' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border ${dark ? 'border-emerald-500/20 text-emerald-300' : 'border-emerald-500/10 text-emerald-600'}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ SKILLS SECTION ═══════ */}
      <section id="skills" className={`py-24 px-6 ${dark ? 'bg-slate-900/20' : 'bg-slate-50/80'}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 ${dark ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-cyan-50 text-cyan-600 border border-cyan-500/10'}`}>
              EXPERTISE
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold ${textHeading}`}>
              Technical <span className="gradient-text">Skills</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillGroups.map((group, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-500 ${cardBg} group cursor-pointer`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-emerald-500 border ${dark ? 'border-emerald-500/20' : 'border-emerald-500/10'} group-hover:scale-110 transition-transform duration-300`}>
                    {group.icon}
                  </div>
                  <h3 className="text-base font-semibold text-emerald-500">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, sIdx) => (
                    <motion.span
                      key={sIdx}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`skill-tag px-3 py-1.5 rounded-lg text-sm border cursor-default ${dark ? 'bg-slate-800/70 text-slate-200 border-slate-700/50 hover:border-emerald-500/30 hover:text-emerald-300' : 'bg-white text-slate-700 border-slate-200 shadow-sm hover:border-emerald-500/30 hover:text-emerald-600'}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ EDUCATION SECTION ═══════ */}
      <section id="education" className="py-16 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 ${dark ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' : 'bg-violet-50 text-violet-600 border border-violet-500/10'}`}>
              EDUCATION
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold ${textHeading}`}>
              Academic <span className="gradient-text">Background</span>
            </h2>
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Timeline card */}
            <div className="relative pl-16">
              <div className="timeline-line" />
              <div className="timeline-dot" />

              <div className={`backdrop-blur-sm border rounded-2xl p-8 transition-all duration-500 ${cardBg}`}>
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-white shadow-md border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0 p-2">
                    <img src="JUST-Logo-01.png" alt="JUST Logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold ${textHeading} mb-1`}>Bachelor's in Computer Information Systems</h3>
                    <p className={`${dark ? 'text-slate-300' : 'text-slate-700'} text-lg mb-1`}>
                      Jordan University of Science and Technology
                    </p>
                    <p className={`text-sm ${dark ? 'text-slate-500' : 'text-slate-400'} font-mono mb-5`}>2022 — 2026</p>

                    <div className="flex flex-wrap gap-3 mb-6">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border ${dark ? 'border-emerald-500/20' : 'border-emerald-500/10'}`}>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className={`text-sm font-bold ${dark ? 'text-emerald-300' : 'text-emerald-700'}`}>GPA: 4.02/4.00</span>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${dark ? 'bg-slate-800/50 border-slate-700/50 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                        <Award className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-sm font-medium">Dean's List</span>
                      </div>
                    </div>

                    {/* Relevant Coursework */}
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>Relevant Coursework</p>
                      <div className="flex flex-wrap gap-2">
                        {['Data Structures', 'Algorithms', 'Software Engineering', 'Database Systems', 'Mobile Dev', 'Machine Learning', 'Web Development', 'OOP'].map((course, i) => (
                          <span key={i} className={`px-2.5 py-1 rounded-md text-xs font-medium border ${dark ? 'bg-slate-800/60 border-slate-700/60 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ CONTACT SECTION ═══════ */}
      <section id="contact" className={`py-24 px-6 relative border-t ${dark ? 'border-slate-800/50 bg-[#050816]' : 'border-slate-200 bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 ${dark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border border-emerald-500/10'}`}>
              CONTACT
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textHeading}`}>
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className={`${textMuted} text-lg max-w-md mx-auto`}>
              Have a project in mind or just want to chat? I'm always open to discussing new opportunities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            {/* Form */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`backdrop-blur-sm border rounded-3xl p-8 relative overflow-hidden ${dark ? 'bg-slate-900/60 border-slate-800/50' : 'bg-white border-slate-200 shadow-sm'}`}
            >
              <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-50 ${dark ? 'bg-emerald-500/20' : 'bg-emerald-500/10'} pointer-events-none`} />

              <h3 className={`text-2xl font-bold mb-6 ${textHeading}`}>Send me a message</h3>

              <form onSubmit={handleContactSubmit} className="relative z-10 space-y-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className={`text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`}>Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className={`w-5 h-5 ${dark ? 'text-slate-500 group-focus-within:text-emerald-400' : 'text-slate-400 group-focus-within:text-emerald-600'} transition-colors`} />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder=""
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl border outline-none transition-all duration-300 ${dark ? 'bg-slate-950/50 border-slate-800 focus:border-emerald-500/50 focus:bg-slate-900/80 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-200 focus:border-emerald-500/50 focus:bg-white text-slate-900 placeholder-slate-400'}`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className={`text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`}>Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className={`w-5 h-5 ${dark ? 'text-slate-500 group-focus-within:text-emerald-400' : 'text-slate-400 group-focus-within:text-emerald-600'} transition-colors`} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder=""
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl border outline-none transition-all duration-300 ${dark ? 'bg-slate-950/50 border-slate-800 focus:border-emerald-500/50 focus:bg-slate-900/80 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-200 focus:border-emerald-500/50 focus:bg-white text-slate-900 placeholder-slate-400'}`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className={`text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`}>Message</label>
                  <div className="relative group">
                    <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                      <MessageSquare className={`w-5 h-5 ${dark ? 'text-slate-500 group-focus-within:text-emerald-400' : 'text-slate-400 group-focus-within:text-emerald-600'} transition-colors`} />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="How can we help each other?"
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl border outline-none transition-all duration-300 resize-none ${dark ? 'bg-slate-950/50 border-slate-800 focus:border-emerald-500/50 focus:bg-slate-900/80 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-200 focus:border-emerald-500/50 focus:bg-white text-slate-900 placeholder-slate-400'}`}
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 mt-2 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${isSubmitting ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700' : submitSuccess ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/50' : 'glow-button bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-emerald-500/25'}`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                  ) : submitSuccess ? (
                    "Message Sent Successfully!"
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info Cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-4 justify-center"
            >
              {[
                { icon: <Mail className="w-7 h-7 group-hover:scale-110 transition-transform" />, label: "Email", value: "ikaramwasfi22@gmail.com", href: "mailto:ikaramwasfi22@gmail.com" },
                { icon: <Phone className="w-7 h-7 group-hover:scale-110 transition-transform" />, label: "Phone", value: "+962 79 7855945", href: "tel:+962797855945" },
              ].map((info, idx) => (
                <motion.a
                  key={idx}
                  variants={fadeUp}
                  href={info.href}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-6 p-6 rounded-2xl border transition-all duration-300 group ${dark ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800 text-slate-400 hover:text-emerald-400' : 'bg-white border-slate-200 hover:border-emerald-500/50 text-slate-600 hover:text-emerald-600'}`}
                >
                  <div className="flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className={`text-sm font-medium mb-1 transition-colors ${dark ? 'text-slate-500 group-hover:text-emerald-500/70' : 'text-slate-400 group-hover:text-emerald-600/70'}`}>{info.label}</h4>
                    <p className={`text-lg font-semibold transition-colors ${dark ? 'text-slate-200 group-hover:text-emerald-300' : 'text-slate-800 group-hover:text-emerald-700'}`}>{info.value}</p>
                  </div>
                </motion.a>
              ))}

              <motion.div variants={fadeUp} className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://github.com/KaramAlali33"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 flex justify-center items-center py-6 rounded-2xl border transition-all duration-300 group ${dark ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800 text-slate-400 hover:text-emerald-400' : 'bg-white border-slate-200 hover:border-emerald-500/50 text-slate-600 hover:text-emerald-600'}`}
                >
                  <Github className="w-7 h-7 group-hover:scale-110 transition-transform" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.linkedin.com/in/karam-alali-70b66623b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 flex justify-center items-center py-6 rounded-2xl border transition-all duration-300 group ${dark ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800 text-slate-400 hover:text-emerald-400' : 'bg-white border-slate-200 hover:border-emerald-500/50 text-slate-600 hover:text-emerald-600'}`}
                >
                  <Linkedin className="w-7 h-7 group-hover:scale-110 transition-transform" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className={`mt-12 pt-8 border-t ${dark ? 'border-slate-800/50' : 'border-slate-200'} text-center`}>
            <p className={`text-sm ${dark ? 'text-slate-600' : 'text-slate-400'}`}>
              © {new Date().getFullYear()} <span className={dark ? 'text-slate-400' : 'text-slate-600'}>Karam Wasfi Alali</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ExternalLink, Code, Brain, Smartphone, Database, Award, Sun, Moon, ChevronDown, MapPin, Download } from 'lucide-react';
import './App.css';

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

// ─── Main Component ──────────────────────────────────────────────────
const Portfolio = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const heroRef = useRef(null);

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
  const projects = [
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
    { label: 'Projects Built', value: 8, suffix: '+' },
    { label: 'Technologies', value: 20, suffix: '+' },
    { label: 'GPA', value: 4.03, suffix: '/4' },
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
            <a href="#" className="flex items-center gap-2 group">
              <img
                src="logo.png"
                alt="Karam Logo"
                className="w-8 h-8 object-contain rounded-lg group-hover:opacity-90 transition-opacity"
              />
              <span className={`text-sm font-semibold ${textHeading} hidden sm:inline`}>Karam<span className="text-emerald-500"></span></span>
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
      <section ref={heroRef} className="pt-32 pb-16 px-6 relative min-h-screen flex items-center overflow-hidden">
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
                  src="karam.jpg"
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

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-2 gap-8"
          >
            {projects.map((project, index) => (
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
                  <div className={`relative overflow-hidden h-64 ${dark ? 'bg-slate-950' : 'bg-slate-100'}`}>
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
      <section id="education" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
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
            className="max-w-3xl mx-auto"
          >
            {/* Timeline card */}
            <div className="relative pl-16">
              <div className="timeline-line" />
              <div className="timeline-dot" />

              <div className={`backdrop-blur-sm border rounded-2xl p-8 transition-all duration-500 ${cardBg}`}>
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-violet-500/20 border ${dark ? 'border-emerald-500/20' : 'border-emerald-500/10'} flex-shrink-0`}>
                    <Award className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold ${textHeading} mb-2`}>Bachelor's in Computer Information Systems</h3>
                    <p className={`${dark ? 'text-slate-300' : 'text-slate-700'} text-lg mb-1`}>
                      Jordan University of Science and Technology
                    </p>
                    <p className={`text-sm ${dark ? 'text-slate-500' : 'text-slate-400'} font-mono mb-5`}>2022 — 2026</p>

                    <div className="flex flex-wrap gap-3">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border ${dark ? 'border-emerald-500/20' : 'border-emerald-500/10'}`}>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className={`text-sm font-bold ${dark ? 'text-emerald-300' : 'text-emerald-700'}`}>GPA: 4.03/4.00</span>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${dark ? 'bg-slate-800/50 border-slate-700/50 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                        <Award className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-sm font-medium">Dean's List</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ CONTACT FOOTER ═══════ */}
      <footer id="contact" className={`py-20 px-6 border-t ${dark ? 'border-slate-800/50 bg-[#050816]' : 'border-slate-200 bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 ${dark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border border-emerald-500/10'}`}>
              CONTACT
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textHeading}`}>
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className={`${textMuted} text-lg max-w-md mx-auto`}>
              Feel free to reach out for collaborations or opportunities
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center gap-8"
          >
            {/* Email CTA */}
            <motion.a
              variants={fadeUp}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              href="mailto:ikaramwasfi22@gmail.com"
              className={`glow-button flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:-translate-y-1 ${dark ? 'bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 hover:border-emerald-500/40 text-white' : 'bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-500/10 hover:border-emerald-500/30 text-slate-900'}`}
            >
              <Mail className="w-5 h-5 text-emerald-500" />
              ikaramwasfi22@gmail.com
            </motion.a>

            {/* Phone CTA */}
            <motion.a
              variants={fadeUp}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              href="tel:+962797855945"
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:-translate-y-1 border ${dark ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/40 text-white' : 'bg-white border-slate-200 hover:border-emerald-500/30 text-slate-900'}`}
            >
              <Phone className="w-5 h-5 text-emerald-500" />
              +962 79 7855945
            </motion.a>

            {/* Social Icons */}
            <motion.div variants={fadeUp} className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/KaramAlali33"
                target="_blank"
                rel="noopener noreferrer"
                className={`social-icon p-4 rounded-2xl border ${dark ? 'bg-slate-900 border-slate-800 hover:border-emerald-500/40 text-slate-400 hover:text-emerald-400' : 'bg-white border-slate-200 hover:border-emerald-500/30 text-slate-600 hover:text-emerald-600'}`}
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/karam-alali-70b66623b/"
                target="_blank"
                rel="noopener noreferrer"
                className={`social-icon p-4 rounded-2xl border ${dark ? 'bg-slate-900 border-slate-800 hover:border-emerald-500/40 text-slate-400 hover:text-emerald-400' : 'bg-white border-slate-200 hover:border-emerald-500/30 text-slate-600 hover:text-emerald-600'}`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Footer bottom */}
          <div className={`mt-16 pt-8 border-t ${dark ? 'border-slate-800/50' : 'border-slate-200'} text-center`}>
            <p className={`${dark ? 'text-slate-600' : 'text-slate-400'} text-sm font-mono`}>
              © {new Date().getFullYear()} Karam Wasfi Alali
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
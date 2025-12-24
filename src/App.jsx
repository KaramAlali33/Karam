import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code, Brain, Smartphone, Database, ChevronLeft, ChevronRight, Award, Calendar, Sun, Moon } from 'lucide-react';

const Portfolio = () => {
  const [activeImageIndices, setActiveImageIndices] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const projects = [
    {
      title: 'ComputerPartsAPP',
      tech: ['Flutter', 'Dart', 'Hive'],
      description: 'E-commerce mobile application with product search, cart management, profile customization, and local data persistence for checkout history.',
      icon: <Smartphone className="w-5 h-5" />,
      category: 'Mobile Dev',
      images: [
        '/computerparts1.png',
        '/computerparts2.png',
        '/computerparts3.png',
        '/computerparts4.png'
      ],
      github: 'https://github.com/KaramAlali33/ComputerPartsAPP',
      highlights: ['Local Storage', 'Search Filter', 'Cart System']
    },
    {
      title: 'Salati Mobile App',
      tech: ['Flutter', 'Dart'],
      description: 'Grocery and food shopping app with clean, intuitive UI featuring category browsing, product carousels, and dynamic cart management.',
      icon: <Smartphone className="w-5 h-5" />,
      category: 'Mobile Dev',
      images: [
        '/salati1.png',
        '/salati2.png',
        '/salati3.png'
      ],
      github: 'https://github.com/KaramAlali33/Salati',
      highlights: ['Clean UI', 'Product Carousels', 'Cart Management']
    },
    {
      title: 'Customer Churn Prediction',
      tech: ['Python', 'Scikit-learn', 'LightGBM'],
      description: 'Full ML workflow with data preprocessing, resampling, and hyperparameter tuning achieving strong ROC-AUC scores for actionable predictions.',
      icon: <Brain className="w-5 h-5" />,
      category: 'AI/ML',
      images: [
        '/churn1.png',
        '/churn2.png'
      ],
      github: 'https://github.com/KaramAlali33/Customer_Churn_Prediction/blob/main/Customer_Churn_Prediction.ipynb',
      highlights: ['ML Pipeline', 'Hyperparameter Tuning', 'High ROC-AUC']
    },
    {
      title: 'BMI Tracker & Profile Manager',
      tech: ['C#', '.NET WinForms', 'LINQ'],
      description: 'Desktop app for managing personal health profiles with input validation, BMI computation, and data visualization with sort/filter capabilities.',
      icon: <Database className="w-5 h-5" />,
      category: 'Desktop Dev',
      images: [
        '/bmi1.png',
        '/bmi2.png',
        '/bmi3.png'
      ],
      github: 'https://github.com/KaramAlali33/MI-Tracker-Profile-Manager-',
      highlights: ['Data Validation', 'BMI Calculator', 'Visual Analytics']
    }
  ];

  const nextImage = (projectIndex, totalImages) => {
    setActiveImageIndices(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (projectIndex, totalImages) => {
    setActiveImageIndices(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const themeClasses = isDarkMode 
    ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100" 
    : "bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900";

  const navClasses = isDarkMode
    ? (isScrolled ? 'bg-slate-950/95 backdrop-blur-md shadow-lg shadow-slate-900/50' : 'bg-transparent')
    : (isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/50' : 'bg-transparent');

  const cardClasses = isDarkMode
    ? "bg-slate-900/50 border-slate-800 hover:border-emerald-500/30"
    : "bg-white border-slate-200 hover:border-emerald-500/30 shadow-sm";

  const textMuted = isDarkMode ? "text-slate-400" : "text-slate-600";
  const textHeading = isDarkMode ? "text-white" : "text-slate-900";

  return (
    <div className={`min-h-screen transition-colors duration-500 ${themeClasses}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navClasses} border-b ${isDarkMode ? 'border-slate-800/50' : 'border-slate-200'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={toggleTheme}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? ' text-emerald-400 hover:bg-slate-700' 
                  : ' text-emerald-600 hover:bg-slate-200'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4" />
              
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" />
              
                </>
              )}
            </button>
            <div className="flex gap-8">
              <a href="#projects" className={`text-sm ${textMuted} hover:text-emerald-400 transition-colors font-medium`}>Projects</a>
              <a href="#skills" className={`text-sm ${textMuted} hover:text-emerald-400 transition-colors font-medium`}>Skills</a>
              <a href="#education" className={`text-sm ${textMuted} hover:text-emerald-400 transition-colors font-medium`}>Education</a>
              <a href="#contact" className={`text-sm ${textMuted} hover:text-emerald-400 transition-colors font-medium`}>Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-b ${isDarkMode ? 'from-emerald-500/5' : 'from-emerald-500/10'} to-transparent`}></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Profile Photo */}
            <div className="flex-shrink-0 relative group">
              <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full blur-xl ${isDarkMode ? 'opacity-30' : 'opacity-20'} group-hover:opacity-50 transition-opacity`}></div>
              <div className={`relative w-56 h-56 rounded-full overflow-hidden border-4 ${isDarkMode ? 'border-slate-800' : 'border-white'} shadow-2xl ${isDarkMode ? 'shadow-emerald-500/20' : 'shadow-emerald-500/10'}`}>
                <img 
                  src="/karam.jpg" 
                  alt="Karam Wasfi Alali" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Hero Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block mb-4">
              </div>
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${textHeading}`}>
                Karam Wasfi Alali
              </h1>
              <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} mb-6 leading-relaxed font-light`}>
                Computer Information Systems Student & Junior Software Developer
              </p>
              <p className={`${textMuted} text-lg mb-8 leading-relaxed`}>
                Crafting intelligent applications with <span className="text-emerald-500 font-semibold">Flutter</span>, <span className="text-emerald-500 font-semibold">Python</span>, and <span className="text-emerald-500 font-semibold">.NET</span>. Passionate about mobile development and AI/ML solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-emerald-500" />
              <h2 className={`text-4xl font-bold ${textHeading}`}>Featured Projects</h2>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => {
              const currentImageIndex = activeImageIndices[index] || 0;
              return (
                <div
                  key={index}
                  className={`group backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl ${isDarkMode ? 'hover:shadow-emerald-500/10' : 'hover:shadow-emerald-500/5'} ${cardClasses}`}
                >
                  {/* Image Carousel */}
                  <div className={`relative overflow-hidden ${isDarkMode ? 'bg-slate-950' : 'bg-slate-100'} h-72`}>
                    <div className="relative h-full">
                      {project.images.map((img, imgIndex) => (
                        <div
                          key={imgIndex}
                          className={`absolute inset-0 transition-opacity duration-500 ${
                            imgIndex === currentImageIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <img 
                            src={img} 
                            alt={`${project.title} screenshot ${imgIndex + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            onError={(e) => {
                              e.target.src = `https://via.placeholder.com/600x400/${isDarkMode ? '1e293b/64748b' : 'f1f5f9/94a3b8'}?text=${project.title}`;
                            }}
                          />
                        </div>
                      ))}
                      
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-slate-900' : 'from-white/80'} via-transparent to-transparent opacity-60`}></div>
                      
                      {/* Navigation Arrows */}
                      {project.images.length > 1 && (
                        <>
                          <button
                            onClick={() => prevImage(index, project.images.length)}
                            className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 backdrop-blur-sm rounded-full border transition-all opacity-0 group-hover:opacity-100 ${
                              isDarkMode ? 'bg-slate-900/80 border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800' : 'bg-white/80 border-slate-200 hover:border-emerald-500/50 hover:bg-slate-50'
                            }`}
                            aria-label="Previous image"
                          >
                            <ChevronLeft className={`w-5 h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
                          </button>
                          <button
                            onClick={() => nextImage(index, project.images.length)}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 backdrop-blur-sm rounded-full border transition-all opacity-0 group-hover:opacity-100 ${
                              isDarkMode ? 'bg-slate-900/80 border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800' : 'bg-white/80 border-slate-200 hover:border-emerald-500/50 hover:bg-slate-50'
                            }`}
                            aria-label="Next image"
                          >
                            <ChevronRight className={`w-5 h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
                          </button>
                        </>
                      )}
                      
                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {project.images.map((_, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={() => setActiveImageIndices(prev => ({ ...prev, [index]: imgIndex }))}
                            className={`h-1.5 rounded-full transition-all ${
                              imgIndex === currentImageIndex 
                                ? 'w-8 bg-emerald-500' 
                                : (isDarkMode ? 'w-1.5 bg-slate-600 hover:bg-slate-500' : 'w-1.5 bg-slate-300 hover:bg-slate-400')
                            }`}
                            aria-label={`Go to image ${imgIndex + 1}`}
                          />
                        ))}
                      </div>
                      
                      {/* GitHub Link */}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`absolute top-4 right-4 p-2.5 backdrop-blur-sm rounded-lg border transition-all group/link ${
                          isDarkMode ? 'bg-slate-900/80 border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800' : 'bg-white/80 border-slate-200 hover:border-emerald-500/50 hover:bg-slate-50'
                        }`}
                      >
                        <ExternalLink className={`w-4 h-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} group-hover/link:text-emerald-500 transition-colors`} />
                      </a>
                    </div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl text-emerald-500 border ${isDarkMode ? 'border-emerald-500/20' : 'border-emerald-500/10'}`}>
                          {project.icon}
                        </div>
                        <div>
                          <h3 className={`text-xl font-semibold ${textHeading} mb-1`}>{project.title}</h3>
                          <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'} font-mono uppercase tracking-wider`}>{project.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className={`${textMuted} text-sm mb-4 leading-relaxed`}>
                      {project.description}
                    </p>
                    
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.highlights.map((highlight, i) => (
                        <span 
                          key={i}
                          className={`px-2 py-1 rounded text-xs font-medium border ${
                            isDarkMode ? 'bg-slate-800/50 text-slate-400 border-slate-700/50' : 'bg-slate-50 text-slate-600 border-slate-200'
                          }`}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span 
                          key={i}
                          className={`px-3 py-1.5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 text-emerald-600 rounded-lg text-xs font-mono border ${isDarkMode ? 'border-emerald-500/20 text-emerald-300' : 'border-emerald-500/10'}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-24 px-6 ${isDarkMode ? 'bg-slate-900/30' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-emerald-500" />
              <h2 className={`text-4xl font-bold ${textHeading}`}>Technical Skills</h2>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Mobile Development', icon: <Smartphone className="w-5 h-5 text-emerald-500" />, skills: ['Flutter', 'Dart', 'UI/UX', 'State Management', 'Cross-Platform'] },
              { title: 'Backend & .NET', icon: <Code className="w-5 h-5 text-emerald-500" />, skills: ['C#', '.NET', 'WinForms', 'LINQ'] },
              { title: 'Programming Languages', icon: <Code className="w-5 h-5 text-emerald-500" />, skills: ['Python', 'Java', 'C++', 'JavaScript', 'SQL'] },
              { title: 'Machine Learning & AI', icon: <Brain className="w-5 h-5 text-emerald-500" />, skills: ['Scikit-learn', 'LightGBM', 'Pandas', 'NumPy', 'Data Analysis'] },
              { title: 'Database & Storage', icon: <Database className="w-5 h-5 text-emerald-500" />, skills: ['SQL', 'Hive', 'Database Design', 'Local Storage'] },
              { title: 'Development Tools', icon: <Code className="w-5 h-5 text-emerald-500" />, skills: ['Git', 'GitHub', 'VS Code', 'Visual Studio'] }
            ].map((group, idx) => (
              <div key={idx} className={`backdrop-blur-sm border rounded-2xl p-8 transition-all duration-500 ${cardClasses}`}>
                <div className="flex items-center gap-3 mb-6">
                  {group.icon}
                  <h3 className="text-lg font-semibold text-emerald-500">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, sIdx) => (
                    <span key={sIdx} className={`px-3 py-1.5 rounded-lg text-sm border ${
                      isDarkMode ? 'bg-slate-800/70 text-slate-200 border-slate-700/50' : 'bg-white text-slate-700 border-slate-200 shadow-sm'
                    }`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-emerald-500" />
                <h2 className={`text-4xl font-bold ${textHeading}`}>Education</h2>
              </div>
            </div>
            
            <div className={`backdrop-blur-sm border rounded-2xl p-8 transition-all duration-500 ${cardClasses}`}>
              <div className="flex items-start gap-6">
                <div className={`p-4 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl border ${isDarkMode ? 'border-emerald-500/20' : 'border-emerald-500/10'}`}>
                  <Award className="w-8 h-8 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <h3 className={`text-2xl font-semibold ${textHeading} mb-2`}>Bachelor's in Computer Information Systems</h3>
                  <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} text-lg mb-2`}>Jordan University of Science and Technology</p>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'} font-mono mb-4`}>2022 - 2026</p>
                  
                  <div className={`inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border rounded-xl ${isDarkMode ? 'border-emerald-500/20' : 'border-emerald-500/10'}`}>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>GPA: 4.02/4.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className={`py-16 px-6 border-t ${isDarkMode ? 'border-slate-800/50 bg-slate-900/30' : 'border-slate-200 bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-emerald-500" />
              <h2 className={`text-3xl font-bold ${textHeading}`}>Let's Connect</h2>
            </div>
            <p className={`${textMuted} text-lg`}>Feel free to reach out for collaborations or opportunities</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
            <a 
              href="mailto:ikaramwasfi22@gmail.com" 
              className={`flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border rounded-xl transition-all group ${
                isDarkMode ? 'border-emerald-500/20 hover:border-emerald-500/40' : 'border-emerald-500/10 hover:border-emerald-500/30'
              }`}
            >
              <Mail className="w-5 h-5 text-emerald-500" />
              <span className={`${isDarkMode ? 'text-white group-hover:text-emerald-300' : 'text-slate-900 group-hover:text-emerald-600'} transition-colors`}>ikaramwasfi22@gmail.com</span>
            </a>
            
            <div className="flex gap-4">
              <a 
                href="https://github.com/KaramAlali33" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-3 border rounded-xl transition-all group ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-emerald-500/40 hover:bg-slate-800 text-slate-400 hover:text-emerald-400' : 'bg-white border-slate-200 hover:border-emerald-500/30 hover:bg-slate-50 text-slate-600 hover:text-emerald-600'
                }`}
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-3 border rounded-xl transition-all group ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-emerald-500/40 hover:bg-slate-800 text-slate-400 hover:text-emerald-400' : 'bg-white border-slate-200 hover:border-emerald-500/30 hover:bg-slate-50 text-slate-600 hover:text-emerald-600'
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className={`pt-8 border-t ${isDarkMode ? 'border-slate-800/50' : 'border-slate-200'} text-center`}>
            <p className={`${isDarkMode ? 'text-slate-500' : 'text-slate-400'} text-sm font-mono`}>© 2024 Karam Wasfi Alali </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
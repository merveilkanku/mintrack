import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X, User, MessageSquare, Database, ChevronRight, ArrowRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  onOpenLogin: () => void;
  onOpenContact: () => void;
  onOpenFeedback: () => void;
  isAdmin: boolean;
}

export const Layout = ({ children, onOpenLogin, onOpenContact, onOpenFeedback, isAdmin }: LayoutProps) => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [longPressTimer, setLongPressTimer] = React.useState<NodeJS.Timeout | null>(null);
  const location = useLocation();

  const handleLogoStart = () => {
    const timer = setTimeout(() => {
      onOpenLogin();
    }, 2000); // 2 seconds long press
    setLongPressTimer(timer);
  };

  const handleLogoEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(nextLang);
  };

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.project'), path: '/projets' },
    { name: t('nav.objectives'), path: '/#objectifs' },
    { name: t('nav.technology'), path: '/technologies' },
    { name: t('nav.news'), path: '/actualites' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-900 font-sans">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
          <div 
            className="flex items-center gap-3 cursor-pointer select-none"
            onMouseDown={handleLogoStart}
            onMouseUp={handleLogoEnd}
            onTouchStart={handleLogoStart}
            onTouchEnd={handleLogoEnd}
          >
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/20">M</div>
            <span className="text-white font-black tracking-tighter text-xl hidden sm:block">MINTRACK <span className="text-amber-500">RDC</span></span>
          </div>

          <div className="hidden lg:flex items-center gap-12">
            {navItems.map((item) => (
              item.path.startsWith('/#') ? (
                <a key={item.path} href={item.path.substring(1)} className="text-slate-400 hover:text-white text-sm font-bold uppercase tracking-[0.2em] transition-colors">{item.name}</a>
              ) : (
                <Link key={item.path} to={item.path} className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors ${location.pathname === item.path ? 'text-amber-500' : 'text-slate-400 hover:text-white'}`}>{item.name}</Link>
              )
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleLanguage} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-[11px] font-black uppercase tracking-widest px-4 py-2.5 rounded-full border border-white/10 transition-all">
              <Globe size={14} /> {i18n.language.toUpperCase().substring(0, 2)}
            </button>
            <button onClick={onOpenContact} className="hidden sm:block bg-amber-500 hover:bg-amber-600 text-slate-950 text-[11px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-all shadow-xl shadow-amber-500/20">
              {t('nav.contact')}
            </button>
            {isAdmin && (
              <button onClick={onOpenLogin} className="text-amber-500 hover:text-amber-400 transition-colors">
                <User size={20} />
              </button>
            )}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-white p-2">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="lg:hidden absolute top-full left-0 right-0 bg-slate-950 border-b border-slate-800 p-8 flex flex-col gap-6 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Menu</span>
                <button onClick={toggleLanguage} className="flex items-center gap-2 bg-amber-500/10 text-amber-500 text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-amber-500/20">
                  <Globe size={14} /> {i18n.language === 'fr' ? 'English' : 'Français'}
                </button>
              </div>
              {navItems.map((item) => (
                item.path.startsWith('/#') ? (
                  <a key={item.path} href={item.path.substring(1)} onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg font-black uppercase tracking-widest border-b border-slate-900 pb-4">{item.name}</a>
                ) : (
                  <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-black uppercase tracking-widest border-b border-slate-900 pb-4 ${location.pathname === item.path ? 'text-amber-500' : 'text-white'}`}>{item.name}</Link>
                )
              ))}
              <button onClick={() => { onOpenFeedback(); setIsMobileMenuOpen(false); }} className="bg-amber-500 text-slate-950 text-sm font-black uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20">
                <MessageSquare size={18} /> {t('nav.feedback')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>{children}</main>

      <footer className="py-20 border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-amber-500 rounded flex items-center justify-center">
                  <Database className="text-slate-900 w-6 h-6" />
                </div>
                <span className="text-2xl font-bold tracking-tighter text-white">MINTRACK <span className="text-amber-500">RDC</span></span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed">{t('footer.desc')}</p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">{t('footer.nav')}</h5>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><Link to="/projets" className="hover:text-amber-500 transition-colors">{t('footer.presentation')}</Link></li>
                <li><a href="/#objectifs" className="hover:text-amber-500 transition-colors">{t('footer.objectives')}</a></li>
                <li><Link to="/technologies" className="hover:text-amber-500 transition-colors">{t('footer.technology')}</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">{t('footer.contact')}</h5>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li className="cursor-pointer hover:text-amber-500 transition-colors" onClick={onOpenContact}>contact@mintrack-rdc.com</li>
                <li className="cursor-pointer hover:text-amber-500 transition-colors flex items-center gap-2" onClick={onOpenFeedback}><MessageSquare size={14} /> {t('footer.feedback')}</li>
                <li>Kinshasa, Gombe, RDC</li>
                <li>+243 000 000 000</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-slate-900 gap-6">
            <p className="text-slate-600 text-xs flex items-center gap-2">
              {t('footer.rights')} | v2.2
              <span 
                onClick={onOpenLogin}
                className="w-1 h-1 bg-slate-800 rounded-full cursor-default hover:bg-amber-500/20 transition-colors"
                title="Admin"
              />
            </p>
            <div className="flex gap-8">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-white transition-colors text-xs">Twitter</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-white transition-colors text-xs">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

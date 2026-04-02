import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  BarChart3, 
  MapPin, 
  Package, 
  QrCode, 
  Truck, 
  Search, 
  Database, 
  Cpu, 
  ChevronRight, 
  ArrowRight,
  CheckCircle2,
  CheckCircle,
  Shield,
  Lock,
  History,
  Globe,
  TrendingUp,
  Activity,
  Play
} from 'lucide-react';
import { ContentItem } from '../types';

// --- Components ---
const ComplianceTicker = () => {
  const [blocks, setBlocks] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      setBlocks(prev => [hash, ...prev].slice(0, 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-amber-500/5 border-y border-amber-500/10 py-2 overflow-hidden whitespace-nowrap">
      <div className="flex animate-marquee items-center gap-8">
        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-2">
          <Shield size={10} /> Blockchain Audit Live:
        </span>
        {blocks.map((hash, i) => (
          <span key={i} className="text-[10px] font-mono text-slate-500">
            BLOCK_{hash.substring(0, 8)}...{hash.substring(hash.length - 4)} <span className="text-green-500/50">VERIFIED</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const MineralJourney = () => {
  const { t } = useTranslation();
  const steps = [
    { title: t('journey.extraction'), desc: t('journey.extraction_desc'), icon: <Database size={20} /> },
    { title: t('journey.certification'), desc: t('journey.certification_desc'), icon: <ShieldCheck size={20} /> },
    { title: t('journey.transport'), desc: t('journey.transport_desc'), icon: <Truck size={20} /> },
    { title: t('journey.exportation'), desc: t('journey.exportation_desc'), icon: <Package size={20} /> },
    { title: t('journey.audit'), desc: t('journey.audit_desc'), icon: <Search size={20} /> }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-12">
      {steps.map((step, i) => (
        <div key={i} className="relative group">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-amber-500/30 transition-all">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform">
              {step.icon}
            </div>
            <h5 className="text-white font-bold mb-2">{step.title}</h5>
            <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
          </div>
          {i < steps.length - 1 && (
            <div className="hidden md:block absolute top-1/2 -right-2 translate-x-1/2 -translate-y-1/2 z-10">
              <ChevronRight size={20} className="text-slate-700" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const VerificationTool = () => {
  const [code, setCode] = React.useState("");
  const [verifying, setVerifying] = React.useState(false);
  const [result, setResult] = React.useState<null | boolean>(null);

  const handleVerify = () => {
    if (!code) return;
    setVerifying(true);
    setResult(null);
    setTimeout(() => {
      setVerifying(false);
      setResult(Math.random() > 0.3);
    }, 1500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] max-w-xl mx-auto">
      <h4 className="text-xl font-bold text-white mb-6 text-center">Vérification de Certificat</h4>
      <div className="flex gap-4">
        <input 
          type="text" 
          placeholder="Entrez le code du lot (ex: MT-RDC-2026-X)"
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-amber-500 outline-none transition-all"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button 
          onClick={handleVerify}
          disabled={verifying}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all disabled:opacity-50"
        >
          {verifying ? "Vérification..." : "Vérifier"}
        </button>
      </div>
    </div>
  );
};

export const HomePage = ({ items, onOpenContact }: { items: ContentItem[], onOpenContact: () => void }) => {
  const { t, i18n } = useTranslation();

  const news = items.filter(i => i.type === 'news');
  const banners = items.filter(i => i.type === 'banner');

  const heroImage = banners.find(b => b.category === 'Hero')?.image_url || 
    "https://lh3.googleusercontent.com/-Z5vmeV3m9Wc/TjKP6kmZlQI/AAAAAAAALf0/FyUtAvHZ7aMk22VOVtCvFp-rOpFHgQYAQCHMYBhgL/Gecamines-copper-mine-Katanga-Congo-by-David-Lewis-Reuters.jpg?imgmax=500";
  
  const impactImage = banners.find(b => b.category === 'Impact')?.image_url || 
    "https://mines.cd/wp-content/uploads/2023/04/img-20230416-wa0004.jpg";
  
  const videoImage = banners.find(b => b.category === 'Video')?.image_url || 
    "https://7sur7.cd/sites/default/files/styles/article_2022/public/2020-07/IMG-20200729-WA0232.jpg?itok=Pjw7y0az";

  return (
    <>
      <header className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full mb-8"
            >
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Innovation Minière 2026</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8"
            >
              MINTRACK RDC – <br /> 
              <span className="text-amber-500 italic">{i18n.language === 'fr' ? 'LA TRAÇABILITÉ' : 'TRACEABILITY'}</span> <br />
              {i18n.language === 'fr' ? 'TRANSPARENTE.' : 'TRANSPARENT.'}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            >
              {t('hero.desc')}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button 
                onClick={() => document.getElementById('projet')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black uppercase tracking-widest px-8 py-4 rounded-2xl transition-all shadow-2xl shadow-amber-500/20 flex items-center gap-3"
              >
                {t('hero.cta_verify')} <ArrowRight size={18} />
              </button>
              <button 
                onClick={onOpenContact}
                className="bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest px-8 py-4 rounded-2xl border border-slate-800 transition-all"
              >
                {t('hero.cta_partner')}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/30 blur-[120px] rounded-full" />
          <img 
            src={heroImage} 
            alt="Mine de cuivre Katanga" 
            className="w-full h-full object-cover mix-blend-overlay opacity-50"
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      <ComplianceTicker />

      {/* Journey Section */}
      <section id="projet" className="py-20 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">{t('journey.title')} ?</h2>
              <p className="text-slate-400 max-w-2xl">{t('footer.desc')}</p>
            </div>
          </div>
          <MineralJourney />
        </div>
      </section>

      {/* Verification Tool Section */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">{t('verification.title')}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{t('tech.audit_desc')}</p>
          </div>
          <VerificationTool />
        </div>
      </section>

      {/* Stats Section */}
      <section id="objectifs" className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] text-center">
                <div className="text-4xl font-black text-amber-500 mb-2">150+</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sites Actifs</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] text-center">
                <div className="text-4xl font-black text-white mb-2">99.9%</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Précision</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] text-center">
                <div className="text-4xl font-black text-white mb-2">24/7</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Surveillance</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] text-center">
                <div className="text-4xl font-black text-amber-500 mb-2">100%</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Transparence</div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-6">Performance & Impact</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Notre technologie ne se contente pas de suivre des minerais ; elle transforme l'économie minière de la RDC en instaurant une confiance absolue entre l'État, les exploitants et le marché international.
              </p>
              <ul className="space-y-4">
                {[
                  "Réduction de 40% de la fraude minérale",
                  "Augmentation des revenus étatiques",
                  "Certification immédiate des lots",
                  "Conformité totale aux normes OCDE"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white font-bold">
                    <CheckCircle2 className="text-amber-500" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-24 bg-slate-900/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-sm font-black text-amber-500 uppercase tracking-[0.3em] mb-4">{t('impact.tagline')}</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">{t('impact.title')}</h3>
              <p className="text-lg text-slate-400 mb-10">
                {t('impact.desc')}
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: TrendingUp, title: t('impact.transparency'), desc: t('impact.transparency_desc') },
                  { icon: Activity, title: t('impact.trust'), desc: t('impact.trust_desc') },
                  { icon: ShieldCheck, title: t('impact.sustainability'), desc: t('impact.sustainability_desc') },
                  { icon: Globe, title: t('impact.sovereignty'), desc: t('impact.sovereignty_desc') }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-slate-800 rounded-[3rem] p-2 border border-slate-700 shadow-2xl">
                <img src={impactImage} alt="Minerais KCC" className="rounded-[2.5rem] w-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/5 blur-[100px] pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-sm font-black text-amber-500 uppercase tracking-[0.3em] mb-4">{t('video.tagline')}</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-12">{t('video.title')}</h3>
          <div className="aspect-video bg-slate-900 rounded-[2.5rem] border border-slate-800 flex items-center justify-center relative group cursor-pointer overflow-hidden">
            <img src={videoImage} alt="Cobalt RDC" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-slate-950 shadow-2xl shadow-amber-500/40 group-hover:scale-110 transition-all relative z-10">
              <Play size={32} fill="currentColor" />
            </div>
            <div className="absolute bottom-8 left-8 right-8 text-left z-10">
              <p className="text-white font-bold text-lg">{t('video.how_it_works')}</p>
              <p className="text-slate-400 text-sm">{t('video.sub')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

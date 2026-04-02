import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText } from 'lucide-react';

interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhitepaperModal = ({ isOpen, onClose }: WhitepaperModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 p-12 rounded-[3rem] shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white">
              <X size={32} />
            </button>
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full mb-8">
                <FileText className="text-amber-500" size={14} />
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Document Stratégique 2026</span>
              </div>
              <h2 className="text-4xl font-black text-white mb-8 tracking-tighter">Livre Blanc : Souveraineté Minérale & Blockchain</h2>
              <div className="space-y-8 text-slate-400 leading-relaxed">
                <section>
                  <h3 className="text-white font-bold text-xl mb-4">1. Introduction</h3>
                  <p>La République Démocratique du Congo détient des ressources stratégiques pour la transition énergétique mondiale. Mintrack RDC propose une infrastructure de confiance pour valoriser ce patrimoine.</p>
                </section>
                <section>
                  <h3 className="text-white font-bold text-xl mb-4">2. Architecture Technologique</h3>
                  <p>Utilisation de registres distribués (Blockchain) pour garantir l'immuabilité des données d'extraction, de transport et de certification.</p>
                </section>
                <section>
                  <h3 className="text-white font-bold text-xl mb-4">3. Impact Socio-Économique</h3>
                  <p>Transparence accrue, réduction de la fraude, et augmentation des revenus étatiques pour le développement des infrastructures nationales.</p>
                </section>
              </div>
              <div className="mt-12 p-8 bg-slate-950 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-white font-bold">Version Complète (PDF)</p>
                  <p className="text-sm text-slate-500">4.2 MB • Publié le 15 Mars 2026</p>
                </div>
                <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-8 py-3 rounded-xl transition-all">
                  TÉLÉCHARGER
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

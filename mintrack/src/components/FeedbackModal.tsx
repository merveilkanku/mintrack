import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, MessageSquare, AlertCircle } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal = ({ isOpen, onClose }: FeedbackModalProps) => {
  const [sent, setSent] = useState(false);
  const [type, setType] = useState<'suggestion' | 'issue'>('suggestion');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white">
              <X size={24} />
            </button>
            
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-amber-500" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Merci !</h3>
                <p className="text-slate-400">Votre retour a été bien reçu.</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Donnez votre avis</h2>
                <p className="text-slate-400 text-sm mb-8">Aidez-nous à améliorer Mintrack RDC.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800 mb-4">
                    <button 
                      type="button"
                      onClick={() => setType('suggestion')}
                      className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all flex items-center justify-center gap-2 ${type === 'suggestion' ? 'bg-amber-500 text-slate-950' : 'text-slate-500 hover:text-white'}`}
                    >
                      <MessageSquare size={12} /> SUGGESTION
                    </button>
                    <button 
                      type="button"
                      onClick={() => setType('issue')}
                      className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all flex items-center justify-center gap-2 ${type === 'issue' ? 'bg-red-500 text-white' : 'text-slate-500 hover:text-white'}`}
                    >
                      <AlertCircle size={12} /> SIGNALER
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Message</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                      placeholder={type === 'suggestion' ? "Votre suggestion..." : "Décrivez le problème..."}
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className={`w-full font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-xl ${type === 'suggestion' ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/10' : 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/10'}`}
                  >
                    ENVOYER LE RETOUR
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

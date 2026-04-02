import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight, Calendar, Tag } from 'lucide-react';
import { ContentItem } from '../types';

interface PageProps {
  items: ContentItem[];
  title: string;
  subtitle: string;
}

export const ContentPage = ({ items, title, subtitle }: PageProps) => {
  const { t } = useTranslation();

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase">{title}</h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.length === 0 ? (
            <div className="col-span-full py-24 text-center border border-dashed border-slate-800 rounded-[3rem]">
              <p className="text-slate-500 italic">Aucun contenu disponible pour le moment.</p>
            </div>
          ) : (
            items.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-amber-500/30 transition-all flex flex-col h-full"
              >
                {item.image_url ? (
                  <div className="aspect-video overflow-hidden">
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  </div>
                ) : (
                  <div className="aspect-video bg-slate-800 flex items-center justify-center">
                    <Tag className="text-slate-700" size={48} />
                  </div>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-500 px-2 py-1 rounded">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <Calendar size={12} />
                      {item.date}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-amber-500 transition-colors">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-4 flex-1">{item.content}</p>
                  <button className="text-white font-bold text-sm flex items-center gap-2 group/btn">
                    {t('news.read_more')} <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

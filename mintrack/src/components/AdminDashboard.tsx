import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trash2, FileText, Plus, LogOut, Settings, BarChart3, Package, Database, Cpu, Image as ImageIcon } from 'lucide-react';
import { ContentItem } from '../types';

interface AdminDashboardProps {
  items: ContentItem[];
  onAddItem: (item: Omit<ContentItem, 'id'>) => Promise<void>;
  onDeleteItem: (id: string) => Promise<void>;
  onLogout: () => void;
}

export const AdminDashboard = ({ items, onAddItem, onDeleteItem, onLogout }: AdminDashboardProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Actualité');
  const [type, setType] = useState<'project' | 'news' | 'tech' | 'banner'>('news');
  const [imageUrl, setImageUrl] = useState('');

  React.useEffect(() => {
    if (type === 'banner') {
      setCategory('Hero');
    } else {
      setCategory('Actualité');
    }
  }, [type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    
    await onAddItem({
      title,
      content,
      category,
      type,
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      image_url: imageUrl || undefined
    });
    
    setTitle('');
    setContent('');
    setImageUrl('');
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter mb-2">PANNEAU D'ADMINISTRATION</h1>
            <p className="text-slate-500 text-sm">Gérez les publications du projet Mintrack RDC.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4 px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-slate-950 font-black">A</div>
              <div className="text-left">
                <p className="text-white text-xs font-bold">Administrateur</p>
                <p className="text-[10px] text-slate-500">Session Active</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-4 rounded-2xl border border-red-500/20 transition-all"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] sticky top-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                  <Plus size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">Nouvelle Publication</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Type de contenu</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'news', label: 'Actualité', icon: FileText },
                      { id: 'project', label: 'Projet', icon: Database },
                      { id: 'tech', label: 'Tech', icon: Cpu },
                      { id: 'banner', label: 'Grande Image', icon: ImageIcon }
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setType(t.id as any)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${type === t.id ? 'bg-amber-500 border-amber-500 text-slate-950' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'}`}
                      >
                        <t.icon size={16} />
                        <span className="text-[10px] font-bold uppercase">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Titre</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                    placeholder="Titre de la publication..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Catégorie / Emplacement</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                  >
                    {type === 'banner' ? (
                      <>
                        <option value="Hero">Bannière Accueil (Hero)</option>
                        <option value="Impact">Image Impact</option>
                        <option value="Video">Image Vidéo</option>
                      </>
                    ) : (
                      <>
                        <option>Actualité</option>
                        <option>Innovation</option>
                        <option>Infrastructure</option>
                        <option>Environnement</option>
                        <option>Logistique</option>
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">URL de l'image (Optionnel)</label>
                  <input 
                    type="text" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Contenu</label>
                  <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 h-32 resize-none"
                    placeholder="Détails de la publication..."
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 rounded-xl transition-all shadow-xl shadow-amber-500/20"
                >
                  PUBLIER MAINTENANT
                </button>
              </form>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Contenus publiés ({items.length})</h2>
              <div className="flex gap-2">
                {['all', 'news', 'project', 'tech', 'banner'].map((f) => (
                  <button 
                    key={f}
                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border border-slate-800 text-slate-500 hover:text-white hover:border-slate-700 transition-all"
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {items.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 border-dashed p-12 rounded-[2rem] text-center">
                  <FileText className="text-slate-700 mx-auto mb-4" size={48} />
                  <p className="text-slate-500">Aucun contenu publié pour le moment.</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id}
                    className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex justify-between items-start group"
                  >
                    <div className="flex gap-6">
                      {item.image_url && (
                        <img src={item.image_url} alt={item.title} className="w-24 h-24 rounded-2xl object-cover border border-slate-800" />
                      )}
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                            item.type === 'project' ? 'bg-blue-500/10 text-blue-500' : 
                            item.type === 'tech' ? 'bg-green-500/10 text-green-500' : 
                            item.type === 'banner' ? 'bg-purple-500/10 text-purple-500' :
                            'bg-amber-500/10 text-amber-500'
                          }`}>
                            {item.type === 'banner' ? 'Grande Image' : item.type}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-widest bg-slate-800 text-slate-400 px-2 py-1 rounded">
                            {item.category}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">{item.date}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-slate-400 text-sm line-clamp-2">{item.content}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => onDeleteItem(item.id)}
                      className="text-slate-600 hover:text-red-500 p-2 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

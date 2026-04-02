import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n';
import { supabase } from './lib/supabase';
import { ContentItem } from './types';

// Components
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ContentPage } from './components/ContentPage';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginModal } from './components/LoginModal';
import { ContactModal } from './components/ContactModal';
import { FeedbackModal } from './components/FeedbackModal';
import { WhitepaperModal } from './components/WhitepaperModal';

export default function App() {
  const { t } = useTranslation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      // We use the 'news' table but it will now store all types of content
      // If the 'type' column doesn't exist, we'll handle it gracefully
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Map data to our ContentItem type, providing defaults for missing fields
      if (data && data.length > 0) {
        const mappedItems: ContentItem[] = data.map((item: any) => ({
          ...item,
          type: item.type || 'news', // Default to news if type is missing
          category: item.category || 'Général'
        }));
        setItems(mappedItems);
      } else {
        // Fallback mock data for better initial experience and visibility
        const mockItems: ContentItem[] = [
          {
            id: 'mock-1',
            title: 'Modernisation du Site de Kamoa',
            content: 'Le projet Mintrack RDC a finalisé l\'installation des nouveaux capteurs IoT sur le site de Kamoa-Kakula, permettant un suivi en temps réel de l\'extraction.',
            date: '2 Avril 2026',
            category: 'Infrastructure',
            type: 'project',
            image_url: 'https://lh3.googleusercontent.com/-Z5vmeV3m9Wc/TjKP6kmZlQI/AAAAAAAALf0/FyUtAvHZ7aMk22VOVtCvFp-rOpFHgQYAQCHMYBhgL/Gecamines-copper-mine-Katanga-Congo-by-David-Lewis-Reuters.jpg?imgmax=500'
          },
          {
            id: 'mock-2',
            title: 'Nouveau Partenariat Blockchain',
            content: 'Signature d\'un accord stratégique pour l\'intégration de la technologie blockchain dans la certification des minerais 3T.',
            date: '1 Avril 2026',
            category: 'Innovation',
            type: 'news',
            image_url: 'https://mines.cd/wp-content/uploads/2023/04/img-20230416-wa0004.jpg'
          },
          {
            id: 'mock-3',
            title: 'Intelligence Artificielle et Logistique',
            content: 'Déploiement d\'un algorithme d\'IA pour optimiser les flux de transport entre les sites miniers et les ports d\'exportation.',
            date: '31 Mars 2026',
            category: 'Tech',
            type: 'tech',
            image_url: 'https://7sur7.cd/sites/default/files/styles/article_2022/public/2020-07/IMG-20200729-WA0232.jpg?itok=Pjw7y0az'
          }
        ];
        setItems(mockItems);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (item: Omit<ContentItem, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('news')
        .insert([{ ...item }])
        .select();
      
      if (error) throw error;
      if (data) {
        const newItem: ContentItem = {
          ...data[0],
          type: data[0].type || item.type,
          category: data[0].category || item.category
        };
        setItems([newItem, ...items]);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Erreur lors de la publication. Assurez-vous que la table "news" accepte les colonnes "type" et "image_url".');
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setItems(items.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Erreur lors de la suppression');
    }
  };

  if (isAdmin) {
    return (
      <AdminDashboard 
        items={items} 
        onAddItem={handleAddItem} 
        onDeleteItem={handleDeleteItem}
        onLogout={() => setIsAdmin(false)} 
      />
    );
  }

  return (
    <Router>
      <Layout 
        isAdmin={isAdmin}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
      >
        <Routes>
          <Route path="/" element={<HomePage items={items} onOpenContact={() => setIsContactOpen(true)} />} />
          <Route path="/projets" element={
            <ContentPage 
              items={items.filter(i => i.type === 'project')} 
              title={t('nav.project')} 
              subtitle="Découvrez les initiatives stratégiques de Mintrack RDC pour la modernisation du secteur minier."
            />
          } />
          <Route path="/actualites" element={
            <ContentPage 
              items={items.filter(i => i.type === 'news')} 
              title={t('nav.news')} 
              subtitle="Restez informé des dernières avancées, partenariats et rapports du secteur minier en RDC."
            />
          } />
          <Route path="/technologies" element={
            <ContentPage 
              items={items.filter(i => i.type === 'tech')} 
              title={t('nav.technology')} 
              subtitle="L'innovation au cœur de la traçabilité : Blockchain, IoT et Intelligence Artificielle."
            />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <LoginModal 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)} 
          onLogin={() => setIsAdmin(true)} 
        />
        <ContactModal 
          isOpen={isContactOpen} 
          onClose={() => setIsContactOpen(false)} 
        />
        <FeedbackModal 
          isOpen={isFeedbackOpen} 
          onClose={() => setIsFeedbackOpen(false)} 
        />
        <WhitepaperModal 
          isOpen={isWhitepaperOpen} 
          onClose={() => setIsWhitepaperOpen(false)} 
        />
      </Layout>
    </Router>
  );
}

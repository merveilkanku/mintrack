export interface ContentItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  type: 'project' | 'news' | 'tech' | 'banner';
  image_url?: string;
}

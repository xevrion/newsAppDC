import { Category } from '../types/news';
import Constants from 'expo-constants';

// Get your free API key from https://newsapi.org/
// API key is loaded from app.json (extra.newsApiKey)
export const NEWS_API_KEY = Constants.expoConfig?.extra?.newsApiKey || '';
export const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

export const CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: 'business', label: 'Business', icon: '💼' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'technology', label: 'Technology', icon: '💻' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
  { id: 'science', label: 'Science', icon: '🔬' },
];

export const DEFAULT_COUNTRY = 'us';
export const PAGE_SIZE = 20;
export const TOP_HEADLINES_COUNT = 5;
export const DEFAULT_LANGUAGE = 'en';
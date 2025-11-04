import axios from 'axios';
import { Article, Category, NewsApiResponse } from '../types/news';
import { NEWS_API_KEY, NEWS_API_BASE_URL, DEFAULT_COUNTRY, PAGE_SIZE, DEFAULT_LANGUAGE } from '../constants/news';

const api = axios.create({
  baseURL: NEWS_API_BASE_URL,
  params: {
    apiKey: NEWS_API_KEY,
  },
});

export const newsApi = {
  /**
   * Fetch top headlines for a specific category
   */
  getTopHeadlinesByCategory: async (category: Category, page: number = 1): Promise<Article[]> => {
    try {
      const response = await api.get<NewsApiResponse>('/top-headlines', {
        params: {
          category,
          country: DEFAULT_COUNTRY,
          pageSize: PAGE_SIZE,
          page,
        },
      });

      return response.data.articles.map(article => ({
        ...article,
        category,
      }));
    } catch (error) {
      console.error(`Error fetching ${category} headlines:`, error);
      throw error;
    }
  },

  /**
   * Fetch top 5 trending headlines across all categories
   */
  getTopTrendingHeadlines: async (): Promise<Article[]> => {
    try {
      const response = await api.get<NewsApiResponse>('/top-headlines', {
        params: {
          country: DEFAULT_COUNTRY,
          pageSize: 5,
          language: DEFAULT_LANGUAGE,
        },
      });

      return response.data.articles.map(article => ({
        ...article,
        category: 'general' as Category,
      }));
    } catch (error) {
      console.error('Error fetching trending headlines:', error);
      throw error;
    }
  },

  /**
   * Search articles by keyword
   */
  searchArticles: async (query: string, page: number = 1): Promise<Article[]> => {
    try {
      const response = await api.get<NewsApiResponse>('/everything', {
        params: {
          q: query,
          pageSize: PAGE_SIZE,
          page,
          sortBy: 'publishedAt',
          language: 'en',
        },
      });

      return response.data.articles;
    } catch (error) {
      console.error('Error searching articles:', error);
      throw error;
    }
  },
};

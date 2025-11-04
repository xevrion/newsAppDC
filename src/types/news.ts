export type Category = 'general' | 'business' | 'sports' | 'technology' | 'entertainment' | 'science';

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
  category?: Category;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface NewsError {
  status: string;
  code: string;
  message: string;
}

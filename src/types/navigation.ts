import { Article, Category } from './news';

export type RootStackParamList = {
  MainTabs: undefined;
  Article: { article: Article };
};

export type MainTabsParamList = {
  Home: undefined;
  Business: undefined;
  Sports: undefined;
  Technology: undefined;
  Entertainment: undefined;
  Science: undefined;
  Search: undefined;
};

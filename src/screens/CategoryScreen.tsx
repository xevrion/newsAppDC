import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Article, Category } from '../types/news';
import { newsApi } from '../services/newsApi';
import { ArticleCard } from '../components/ArticleCard';
import { ArticleCardSkeleton } from '../components/SkeletonLoader';
import { useTheme } from '../contexts/ThemeContext';
import { SPACING, FONT_SIZE } from '../constants/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CategoryScreenProps {
  category: Category;
  title: string;
  icon: string;
}

export const CategoryScreen: React.FC<CategoryScreenProps> = ({ category, title, icon }) => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, [category]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await newsApi.getTopHeadlinesByCategory(category);
      setArticles(data);
    } catch (error) {
      console.error(`Error fetching ${category} headlines:`, error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchArticles();
    setRefreshing(false);
  };

  const handleArticlePress = (article: Article) => {
    navigation.navigate('Article', { article });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerIcon}>{icon}</Text>
      <Text style={[styles.headerTitle, { color: theme.text }]}>{title}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {renderHeader()}
        <FlatList
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(item) => item.toString()}
          renderItem={() => <ArticleCardSkeleton />}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => `${item.url}-${index}`}
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            onPress={() => handleArticlePress(item)}
          />
        )}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No articles available
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  headerIcon: {
    fontSize: FONT_SIZE.xxl,
    marginRight: SPACING.md,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '700',
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FONT_SIZE.md,
  },
});

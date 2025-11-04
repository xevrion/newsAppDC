import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Article } from '../types/news';
import { newsApi } from '../services/newsApi';
import { ArticleCard } from '../components/ArticleCard';
import { useTheme } from '../contexts/ThemeContext';
import { SPACING, BORDER_RADIUS, FONT_SIZE } from '../constants/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setHasSearched(true);
      const data = await newsApi.searchArticles(query);
      setArticles(data);
    } catch (error) {
      console.error('Error searching articles:', error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  const handleArticlePress = useCallback((article: Article) => {
    navigation.navigate('Article', { article });
  }, [navigation]);

  const renderHeader = useMemo(() => (
    <View style={styles.header}>
      <Text style={[styles.headerTitle, { color: theme.text }]}>Search News</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, {
            backgroundColor: theme.surface,
            color: theme.text,
            borderColor: theme.border,
          }]}
          placeholder="Search for articles..."
          placeholderTextColor={theme.textSecondary}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: theme.primary }]}
          onPress={handleSearch}
          disabled={loading || !query.trim()}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  ), [theme, query, loading, handleSearch]);

  const renderEmptyState = useMemo(() => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
            Searching...
          </Text>
        </View>
      );
    }

    if (hasSearched && articles.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={[styles.emptyText, { color: theme.text }]}>
            No results found
          </Text>
          <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
            Try searching with different keywords
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyIcon}>📰</Text>
        <Text style={[styles.emptyText, { color: theme.text }]}>
          Search for news articles
        </Text>
        <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
          Enter keywords to find the latest news
        </Text>
      </View>
    );
  }, [loading, hasSearched, articles.length, theme]);

  const renderItem = useCallback(({ item }: { item: Article }) => (
    <ArticleCard
      article={item}
      onPress={() => handleArticlePress(item)}
      showCategory={true}
    />
  ), [handleArticlePress]);

  const keyExtractor = useCallback((item: Article, index: number) => `${item.url}-${index}`, []);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        data={articles}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZE.md,
    borderWidth: 1,
  },
  searchButton: {
    paddingHorizontal: SPACING.lg,
    height: 48,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
  centerContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xl * 2,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  emptyText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  emptySubtext: {
    fontSize: FONT_SIZE.md,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: FONT_SIZE.md,
    marginTop: SPACING.md,
  },
});

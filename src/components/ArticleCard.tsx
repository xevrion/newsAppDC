import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Article } from '../types/news';
import { useTheme } from '../contexts/ThemeContext';
import { formatDate } from '../utils/dateUtils';
import { SPACING, BORDER_RADIUS, FONT_SIZE } from '../constants/theme';
import { CATEGORIES } from '../constants/news';

interface ArticleCardProps {
  article: Article;
  onPress: () => void;
  showCategory?: boolean;
}

const DEFAULT_IMAGE = 'https://via.placeholder.com/400x300?text=No+Image';

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onPress, showCategory = false }) => {
  const { theme } = useTheme();

  const getCategoryInfo = () => {
    return CATEGORIES.find(cat => cat.id === article.category) || { label: 'General', icon: '📰' };
  };

  const categoryInfo = getCategoryInfo();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: article.urlToImage || DEFAULT_IMAGE }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        {showCategory && article.category && (
          <View style={[styles.categoryBadge, { backgroundColor: theme.primary }]}>
            <Text style={styles.categoryIcon}>{categoryInfo.icon}</Text>
            <Text style={styles.categoryText}>{categoryInfo.label}</Text>
          </View>
        )}
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {article.title}
        </Text>
        {article.description && (
          <Text style={[styles.description, { color: theme.textSecondary }]} numberOfLines={3}>
            {article.description}
          </Text>
        )}
        <View style={styles.footer}>
          <Text style={[styles.source, { color: theme.textSecondary }]} numberOfLines={1}>
            {article.source.name}
          </Text>
          <Text style={[styles.date, { color: theme.textSecondary }]}>
            {formatDate(article.publishedAt)}
          </Text>
        </View>
        <View style={[styles.readMoreButton, { backgroundColor: theme.primary }]}>
          <Text style={styles.readMoreText}>Read More</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SPACING.md,
    borderBottomWidth: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: '#E0E0E0',
  },
  content: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.xs,
  },
  categoryIcon: {
    fontSize: FONT_SIZE.xs,
    marginRight: 4,
  },
  categoryText: {
    fontSize: FONT_SIZE.xs,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  title: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    marginBottom: SPACING.sm,
    lineHeight: 20,
  },
  description: {
    fontSize: FONT_SIZE.sm,
    marginBottom: SPACING.sm,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  source: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
    flex: 1,
    marginRight: SPACING.sm,
  },
  date: {
    fontSize: FONT_SIZE.xs,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
  },
  readMoreText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
});

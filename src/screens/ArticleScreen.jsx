import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { formatFullDate } from '../utils/dateUtils';
import { SPACING, BORDER_RADIUS, FONT_SIZE } from '../constants/theme';

const DEFAULT_IMAGE = 'https://via.placeholder.com/800x400?text=No+Image';

export const ArticleScreen = ({ route }) => {
  const { article } = route.params;
  const { theme } = useTheme();

  const handleOpenUrl = async () => {
    try {
      const supported = await Linking.canOpenURL(article.url);
      if (supported) {
        await Linking.openURL(article.url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView>
        <Image
          source={{ uri: article.urlToImage || DEFAULT_IMAGE }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.text }]}>{article.title}</Text>

          <View style={styles.metadata}>
            <View style={[styles.sourceBadge, { backgroundColor: theme.surface }]}>
              <Text style={[styles.source, { color: theme.primary }]}>{article.source.name}</Text>
            </View>
            <Text style={[styles.date, { color: theme.textSecondary }]}>
              {formatFullDate(article.publishedAt)}
            </Text>
          </View>

          {article.author && (
            <Text style={[styles.author, { color: theme.textSecondary }]}>
              By {article.author}
            </Text>
          )}

          {article.description && (
            <Text style={[styles.description, { color: theme.text }]}>{article.description}</Text>
          )}

          {article.content && (
            <Text style={[styles.content_text, { color: theme.text }]}>
              {article.content.replace(/\[\+\d+ chars\]/, '')}
            </Text>
          )}

          <TouchableOpacity
            style={[styles.readFullButton, { backgroundColor: theme.primary }]}
            onPress={handleOpenUrl}
          >
            <Text style={styles.readFullText}>Read Full Article</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: '#E0E0E0',
  },
  content: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    marginBottom: SPACING.md,
    lineHeight: 32,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    flexWrap: 'wrap',
  },
  sourceBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.md,
  },
  source: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
  },
  date: {
    fontSize: FONT_SIZE.sm,
  },
  author: {
    fontSize: FONT_SIZE.sm,
    marginBottom: SPACING.md,
    fontStyle: 'italic',
  },
  description: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    marginBottom: SPACING.lg,
    lineHeight: 26,
  },
  content_text: {
    fontSize: FONT_SIZE.md,
    lineHeight: 24,
    marginBottom: SPACING.xl,
  },
  readFullButton: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  readFullText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
  },
});

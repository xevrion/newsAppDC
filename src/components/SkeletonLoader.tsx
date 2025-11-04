import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { SPACING, BORDER_RADIUS } from '../constants/theme';

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: any;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = 20,
  borderRadius = BORDER_RADIUS.sm,
  style,
}) => {
  const { theme, isDark } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: isDark ? '#3A3A3A' : '#E0E0E0',
          opacity,
        },
        style,
      ]}
    />
  );
};

export const ArticleCardSkeleton: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <SkeletonLoader width={100} height={100} borderRadius={BORDER_RADIUS.md} />
      <View style={styles.content}>
        <SkeletonLoader width="80%" height={16} style={{ marginBottom: SPACING.sm }} />
        <SkeletonLoader width="100%" height={14} style={{ marginBottom: SPACING.xs }} />
        <SkeletonLoader width="100%" height={14} style={{ marginBottom: SPACING.xs }} />
        <SkeletonLoader width="60%" height={14} style={{ marginBottom: SPACING.md }} />
        <View style={styles.footer}>
          <SkeletonLoader width={60} height={12} />
          <SkeletonLoader width={80} height={12} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SPACING.md,
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

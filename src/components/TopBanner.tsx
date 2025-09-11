import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

interface TopBannerProps {
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  textColor?: string;
}

const { width } = Dimensions.get('window');

export const TopBanner: React.FC<TopBannerProps> = ({
  title,
  subtitle,
  backgroundColor = '#007AFF',
  textColor = '#FFFFFF',
}) => {
  return (
    <View testID="top-banner-container" style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: textColor }]}>{subtitle}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.9,
  },
});

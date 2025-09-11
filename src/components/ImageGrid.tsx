import React from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

interface ImageGridItem {
  id: string;
  uri: string;
  title?: string;
}

interface ImageGridProps {
  images: ImageGridItem[];
  columns?: number;
  spacing?: number;
  onImagePress?: (item: ImageGridItem) => void;
  showTitles?: boolean;
}

const { width } = Dimensions.get('window');

export const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  columns = 2,
  spacing = 8,
  onImagePress,
  showTitles = false,
}) => {
  const itemWidth = (width - spacing * (columns + 1)) / columns;
  const itemHeight = itemWidth; // 1:1 aspect ratio (4:4)

  const renderImageItem = (item: ImageGridItem, index: number) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    
    const itemStyle = {
      width: itemWidth,
      height: itemHeight,
      marginLeft: col === 0 ? spacing : spacing / 2,
      marginRight: col === columns - 1 ? spacing : spacing / 2,
      marginTop: row === 0 ? spacing : spacing / 2,
      marginBottom: spacing / 2,
    };

    return (
      <TouchableOpacity
        key={item.id}
        testID="image-container"
        style={[styles.imageContainer, itemStyle]}
        onPress={() => onImagePress?.(item)}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: item.uri }}
          style={styles.image}
          resizeMode="cover"
        />
        {showTitles && item.title && (
          <View style={styles.titleOverlay}>
            <Text style={styles.titleText} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View testID="image-grid" style={styles.grid}>
        {images.map((item, index) => renderImageItem(item, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F2F2F7',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

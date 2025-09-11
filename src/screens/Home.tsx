import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TopBanner, ImageCarousel, ImageGrid, LanguageButton } from '../components/index';
import { 
  carouselImages,
  gridImages,
  bannerConfig, 
  carouselConfig, 
  gridConfig 
} from '../constants';

export const Home: React.FC = () => {
  const { t } = useTranslation();

  const handleImagePress = (item: { id: string; uri: string; title?: string }) => {
    Alert.alert(
      t('home.alerts.imagePressed'), 
      t('home.alerts.imagePressedMessage', { title: item.title || 'Image ' + item.id })
    );
  };

  return (
    <SafeAreaView testID="home-screen-container" style={styles.container}>
      <ScrollView testID="home-screen-scrollview" style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Language Button */}
        <LanguageButton style={styles.languageButton} />

        {/* Top Banner Section */}
        <TopBanner
          title={t('home.banner.title')}
          subtitle={t('home.banner.subtitle')}
          backgroundColor={bannerConfig.backgroundColor}
          textColor={bannerConfig.textColor}
        />

        {/* Image Carousel Section */}
        <ImageCarousel
          images={carouselImages}
          showIndicators={carouselConfig.showIndicators}
          autoPlay={carouselConfig.autoPlay}
          autoPlayInterval={carouselConfig.autoPlayInterval}
        />

        {/* Image Grid Section */}
        <ImageGrid
          images={gridImages}
          columns={gridConfig.columns}
          spacing={gridConfig.spacing}
          onImagePress={handleImagePress}
          showTitles={gridConfig.showTitles}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  languageButton: {
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'center',
  },
});

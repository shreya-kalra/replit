import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  style?: any;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ style }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <View style={[styles.container, style]}>
      {languages.map((language) => (
        <TouchableOpacity
          key={language.code}
          style={[
            styles.languageButton,
            i18n.language === language.code && styles.activeLanguageButton,
          ]}
          onPress={() => changeLanguage(language.code)}
        >
          <Text
            style={[
              styles.languageText,
              i18n.language === language.code && styles.activeLanguageText,
            ]}
          >
            {language.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  activeLanguageButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  languageText: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  activeLanguageText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

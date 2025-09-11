import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import { LanguageButton } from '../LanguageButton';

// Test wrapper with i18n provider
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <I18nextProvider i18n={i18n}>
    {children}
  </I18nextProvider>
);

describe('LanguageButton', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <LanguageButton />
      </TestWrapper>
    );
    expect(getByTestId('language-button')).toBeTruthy();
  });

  it('shows current language', () => {
    const { getByText } = render(
      <TestWrapper>
        <LanguageButton />
      </TestWrapper>
    );
    expect(getByText('English')).toBeTruthy();
  });

  it('opens modal when pressed', () => {
    const { getByTestId, getByText } = render(
      <TestWrapper>
        <LanguageButton />
      </TestWrapper>
    );
    
    const button = getByTestId('language-button');
    fireEvent.press(button);
    
    // Check for modal title in either language
    const modalTitle = getByText('Select Language') || getByText('Sélectionner la langue');
    expect(modalTitle).toBeTruthy();
  });

  it('shows language options in modal', () => {
    const { getByTestId, getAllByText } = render(
      <TestWrapper>
        <LanguageButton />
      </TestWrapper>
    );
    
    const button = getByTestId('language-button');
    fireEvent.press(button);
    
    const englishTexts = getAllByText('English');
    const frenchTexts = getAllByText('Français');
    expect(englishTexts.length).toBeGreaterThan(0);
    expect(frenchTexts.length).toBeGreaterThan(0);
  });

  it('has language option buttons', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <LanguageButton />
      </TestWrapper>
    );
    
    const button = getByTestId('language-button');
    fireEvent.press(button);
    
    expect(getByTestId('language-option-en')).toBeTruthy();
    expect(getByTestId('language-option-fr')).toBeTruthy();
  });
});

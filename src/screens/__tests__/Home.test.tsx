import React from 'react';
import { render } from '@testing-library/react-native';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import { Home } from '../Home';

// Test wrapper with i18n provider
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <I18nextProvider i18n={i18n}>
    {children}
  </I18nextProvider>
);

describe('Home', () => {

  it('renders without crashing', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    expect(getByTestId('home-screen-container')).toBeTruthy();
  });

  it('renders top banner with correct title', () => {
    const { getByText } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    expect(getByText('Welcome to Our App')).toBeTruthy();
    expect(getByText('Discover amazing content')).toBeTruthy();
  });

  it('renders language button', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    expect(getByTestId('language-button')).toBeTruthy();
  });

  it('renders image carousel', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    expect(getByTestId('carousel-scrollview')).toBeTruthy();
  });

  it('renders image grid', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    expect(getByTestId('image-grid')).toBeTruthy();
  });

  it('renders all carousel images', () => {
    const { getAllByTestId } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    const carouselImages = getAllByTestId('carousel-image-container');
    const gridImages = getAllByTestId('image-container');
    // Should have 4 carousel images + 8 grid images = 12 total
    expect(carouselImages).toHaveLength(4);
    expect(gridImages).toHaveLength(8);
  });

  it('shows carousel indicators', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    expect(getByTestId('indicator-container')).toBeTruthy();
  });

  it('shows grid image titles', () => {
    const { getByText } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    expect(getByText('Nature')).toBeTruthy();
    expect(getByText('City')).toBeTruthy();
    expect(getByText('Ocean')).toBeTruthy();
    expect(getByText('Mountains')).toBeTruthy();
  });

  it('renders grid images as pressable', () => {
    const { getAllByTestId } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    const gridImages = getAllByTestId('image-container');
    // Should have 8 grid images
    expect(gridImages).toHaveLength(8);
  });

  it('renders with correct scroll view', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    const scrollView = getByTestId('home-screen-scrollview');
    expect(scrollView).toBeTruthy();
    expect(scrollView.props.showsVerticalScrollIndicator).toBe(false);
  });

  it('renders safe area view', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    expect(getByTestId('home-screen-container')).toBeTruthy();
  });
});

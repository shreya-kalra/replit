import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ImageCarousel } from '../ImageCarousel';

const mockImages = [
  'https://picsum.photos/800/450?random=1',
  'https://picsum.photos/800/450?random=2',
  'https://picsum.photos/800/450?random=3',
];

describe('ImageCarousel', () => {
  it('renders all images', () => {
    const { getAllByTestId } = render(<ImageCarousel images={mockImages} />);
    const imageContainers = getAllByTestId('carousel-image-container');
    expect(imageContainers).toHaveLength(mockImages.length);
  });

  it('renders with single image', () => {
    const singleImage = [mockImages[0]];
    const { getAllByTestId } = render(<ImageCarousel images={singleImage} />);
    const imageContainers = getAllByTestId('carousel-image-container');
    expect(imageContainers).toHaveLength(1);
  });

  it('renders with empty images array', () => {
    const { queryByTestId } = render(<ImageCarousel images={[]} />);
    const imageContainers = queryByTestId('carousel-image-container');
    expect(imageContainers).toBeNull();
  });

  it('applies custom height', () => {
    const customHeight = 200;
    const { getByTestId } = render(
      <ImageCarousel images={mockImages} height={customHeight} />
    );
    const scrollView = getByTestId('carousel-scrollview');
    expect(scrollView.props.style).toEqual(expect.arrayContaining([
      expect.objectContaining({ height: customHeight })
    ]));
  });

  it('shows indicators when showIndicators is true', () => {
    const { getByTestId } = render(
      <ImageCarousel images={mockImages} showIndicators={true} />
    );
    const indicatorContainer = getByTestId('indicator-container');
    expect(indicatorContainer).toBeTruthy();
  });

  it('hides indicators when showIndicators is false', () => {
    const { queryByTestId } = render(
      <ImageCarousel images={mockImages} showIndicators={false} />
    );
    const indicatorContainer = queryByTestId('indicator-container');
    expect(indicatorContainer).toBeNull();
  });

  it('hides indicators when only one image', () => {
    const singleImage = [mockImages[0]];
    const { queryByTestId } = render(
      <ImageCarousel images={singleImage} showIndicators={true} />
    );
    const indicatorContainer = queryByTestId('indicator-container');
    expect(indicatorContainer).toBeNull();
  });

  it('renders correct number of indicators', () => {
    const { getByTestId } = render(
      <ImageCarousel images={mockImages} showIndicators={true} />
    );
    const indicatorContainer = getByTestId('indicator-container');
    const indicators = indicatorContainer.children;
    expect(indicators).toHaveLength(mockImages.length);
  });

  it('handles scroll events', () => {
    const { getByTestId } = render(<ImageCarousel images={mockImages} />);
    const scrollView = getByTestId('carousel-scrollview');
    
    // Simulate scroll event
    fireEvent.scroll(scrollView, {
      nativeEvent: {
        contentOffset: { x: 400, y: 0 },
      },
    });
    
    // Component should not crash
    expect(scrollView).toBeTruthy();
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ImageGrid } from '../ImageGrid';

const mockGridImages = [
  { id: '1', uri: 'https://picsum.photos/400/400?random=1', title: 'Image 1' },
  { id: '2', uri: 'https://picsum.photos/400/400?random=2', title: 'Image 2' },
  { id: '3', uri: 'https://picsum.photos/400/400?random=3', title: 'Image 3' },
  { id: '4', uri: 'https://picsum.photos/400/400?random=4', title: 'Image 4' },
];

describe('ImageGrid', () => {
  it('renders all images', () => {
    const { getAllByTestId } = render(<ImageGrid images={mockGridImages} />);
    const imageContainers = getAllByTestId('image-container');
    expect(imageContainers).toHaveLength(mockGridImages.length);
  });

  it('renders with empty images array', () => {
    const { queryByTestId } = render(<ImageGrid images={[]} />);
    const imageContainers = queryByTestId('image-container');
    expect(imageContainers).toBeNull();
  });

  it('renders with single image', () => {
    const singleImage = [mockGridImages[0]];
    const { getAllByTestId } = render(<ImageGrid images={singleImage} />);
    const imageContainers = getAllByTestId('image-container');
    expect(imageContainers).toHaveLength(1);
  });

  it('shows titles when showTitles is true', () => {
    const { getByText } = render(
      <ImageGrid images={mockGridImages} showTitles={true} />
    );
    expect(getByText('Image 1')).toBeTruthy();
    expect(getByText('Image 2')).toBeTruthy();
  });

  it('hides titles when showTitles is false', () => {
    const { queryByText } = render(
      <ImageGrid images={mockGridImages} showTitles={false} />
    );
    expect(queryByText('Image 1')).toBeNull();
    expect(queryByText('Image 2')).toBeNull();
  });

  it('calls onImagePress when image is pressed', () => {
    const mockOnImagePress = jest.fn();
    const { getAllByTestId } = render(
      <ImageGrid images={mockGridImages} onImagePress={mockOnImagePress} />
    );
    
    const firstImageContainer = getAllByTestId('image-container')[0];
    fireEvent.press(firstImageContainer);
    
    expect(mockOnImagePress).toHaveBeenCalledWith(mockGridImages[0]);
  });

  it('does not crash when onImagePress is not provided', () => {
    const { getAllByTestId } = render(<ImageGrid images={mockGridImages} />);
    const firstImageContainer = getAllByTestId('image-container')[0];
    
    expect(() => {
      fireEvent.press(firstImageContainer);
    }).not.toThrow();
  });

  it('renders with custom columns', () => {
    const { getByTestId } = render(
      <ImageGrid images={mockGridImages} columns={3} />
    );
    const grid = getByTestId('image-grid');
    expect(grid).toBeTruthy();
  });

  it('renders with custom spacing', () => {
    const { getByTestId } = render(
      <ImageGrid images={mockGridImages} spacing={16} />
    );
    const grid = getByTestId('image-grid');
    expect(grid).toBeTruthy();
  });

  it('handles images without titles', () => {
    const imagesWithoutTitles = [
      { id: '1', uri: 'https://picsum.photos/400/400?random=1' },
      { id: '2', uri: 'https://picsum.photos/400/400?random=2' },
    ];
    
    const { getAllByTestId } = render(
      <ImageGrid images={imagesWithoutTitles} showTitles={true} />
    );
    const imageContainers = getAllByTestId('image-container');
    expect(imageContainers).toHaveLength(2);
  });

  it('renders correct number of images in grid', () => {
    const { getAllByTestId } = render(<ImageGrid images={mockGridImages} />);
    const imageContainers = getAllByTestId('image-container');
    expect(imageContainers).toHaveLength(mockGridImages.length);
  });
});

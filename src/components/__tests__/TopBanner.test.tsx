import React from 'react';
import { render } from '@testing-library/react-native';
import { TopBanner } from '../TopBanner';

describe('TopBanner', () => {
  it('renders title correctly', () => {
    const { getByText } = render(<TopBanner title="Test Title" />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('renders subtitle when provided', () => {
    const { getByText } = render(
      <TopBanner title="Test Title" subtitle="Test Subtitle" />
    );
    expect(getByText('Test Subtitle')).toBeTruthy();
  });

  it('does not render subtitle when not provided', () => {
    const { queryByText } = render(<TopBanner title="Test Title" />);
    expect(queryByText('Test Subtitle')).toBeNull();
  });

  it('applies custom background color', () => {
    const { getByTestId } = render(
      <TopBanner title="Test Title" backgroundColor="#FF0000" />
    );
    const container = getByTestId('top-banner-container');
    expect(container.props.style).toEqual(expect.arrayContaining([
      expect.objectContaining({ backgroundColor: '#FF0000' })
    ]));
  });

  it('applies custom text color', () => {
    const { getByText } = render(
      <TopBanner title="Test Title" textColor="#000000" />
    );
    const title = getByText('Test Title');
    expect(title.props.style).toEqual(expect.arrayContaining([
      expect.objectContaining({ color: '#000000' })
    ]));
  });

  it('uses default colors when not provided', () => {
    const { getByText } = render(<TopBanner title="Test Title" />);
    const title = getByText('Test Title');
    expect(title.props.style).toEqual(expect.arrayContaining([
      expect.objectContaining({ color: '#FFFFFF' })
    ]));
  });

  it('renders with multiple lines of text', () => {
    const longTitle = 'This is a very long title that should wrap to multiple lines';
    const { getByText } = render(<TopBanner title={longTitle} />);
    expect(getByText(longTitle)).toBeTruthy();
  });
});

// flow: Home screen → Movie details → video player

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { View, Text, TouchableOpacity } from 'react-native';

const mockCatalogData = {
  items: [
    {
      id: 'test-item-1',
      title: 'Test Movie 1',
      description: 'Test description for movie 1',
      thumbnail: 'https://example.com/thumb1.jpg',
      streamUrl: 'https://example.com/stream1.m3u8',
      duration: 120
    },
    {
      id: 'test-item-2',
      title: 'Test Movie 2',
      description: 'Test description for movie 2',
      thumbnail: 'https://example.com/thumb2.jpg',
      streamUrl: 'https://example.com/stream2.mp4',
      duration: 180
    }
  ]
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockCatalogData),
  })
) as jest.Mock;

const MockVideoPlayer = ({ streamUrl, title, onBack }: any) => (
  <View testID="video-player">
    <Text testID="video-title">{title}</Text>
    <Text testID="video-stream">Stream: {streamUrl}</Text>
    <TouchableOpacity testID="back-button" onPress={onBack}>
      <Text>Back</Text>
    </TouchableOpacity>
  </View>
);

const MiniApp = () => {
  const [currentScreen, setCurrentScreen] = React.useState<'home' | 'details' | 'player'>('home');
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [items, setItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadCatalog = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 100));
        setItems(mockCatalogData.items);
        setLoading(false);
      } catch (err) {
        setError('Failed to load catalog');
        setLoading(false);
      }
    };

    loadCatalog();
  }, []);

  const goToDetails = (item: any) => {
    setSelectedItem(item);
    setCurrentScreen('details');
  };

  const goToPlayer = () => {
    setCurrentScreen('player');
  };

  const goBack = () => {
    if (currentScreen === 'player') {
      setCurrentScreen('details');
    } else if (currentScreen === 'details') {
      setCurrentScreen('home');
      setSelectedItem(null);
    }
  };

  if (currentScreen === 'home') {
    if (loading) {
      return (
        <View testID="loading-state">
          <Text testID="loading-text">Loading catalog...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View testID="error-state">
          <Text testID="error-text">{error}</Text>
        </View>
      );
    }

    return (
      <View testID="home-screen">
        <Text testID="home-title">OTT Demo - Home</Text>
        <View testID="catalog-grid">
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              testID={`catalog-item-${item.id}`}
              onPress={() => goToDetails(item)}
            >
              <View>
                <Text testID={`item-title-${item.id}`}>{item.title}</Text>
                <Text testID={`item-duration-${item.id}`}>{item.duration}s</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  if (currentScreen === 'details' && selectedItem) {
    return (
      <View testID="details-screen">
        <TouchableOpacity testID="back-to-home" onPress={goBack}>
          <Text>← Back</Text>
        </TouchableOpacity>
        <Text testID="details-title">{selectedItem.title}</Text>
        <Text testID="details-description">{selectedItem.description}</Text>
        <Text testID="details-duration">Duration: {selectedItem.duration} seconds</Text>
        <TouchableOpacity testID="play-button" onPress={goToPlayer}>
          <Text>▶ Play Video</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (currentScreen === 'player' && selectedItem) {
    return (
      <View testID="player-screen">
        <MockVideoPlayer
          streamUrl={selectedItem.streamUrl}
          title={selectedItem.title}
          onBack={goBack}
        />
      </View>
    );
  }

  return null;
};

describe('App Integration Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should complete full Home → Details → Player flow', async () => {
    const { getByTestId, getByText } = render(<MiniApp />);

    expect(getByTestId('loading-state')).toBeTruthy();
    expect(getByText('Loading catalog...')).toBeTruthy();

    await waitFor(() => {
      expect(getByTestId('home-screen')).toBeTruthy();
    });

    expect(getByText('OTT Demo - Home')).toBeTruthy();
    expect(getByText('Test Movie 1')).toBeTruthy();
    expect(getByText('Test Movie 2')).toBeTruthy();

    fireEvent.press(getByTestId('catalog-item-test-item-1'));

    await waitFor(() => {
      expect(getByTestId('details-screen')).toBeTruthy();
    });

    expect(getByText('Test Movie 1')).toBeTruthy();
    expect(getByText('Test description for movie 1')).toBeTruthy();
    expect(getByText('Duration: 120 seconds')).toBeTruthy();

    fireEvent.press(getByTestId('play-button'));

    await waitFor(() => {
      expect(getByTestId('player-screen')).toBeTruthy();
      expect(getByTestId('video-player')).toBeTruthy();
    });

    expect(getByText('Test Movie 1')).toBeTruthy();
    expect(getByText('Stream: https://example.com/stream1.m3u8')).toBeTruthy();
  });

  it('should handle navigation back through screens', async () => {
    const { getByTestId } = render(<MiniApp />);

    await waitFor(() => {
      expect(getByTestId('home-screen')).toBeTruthy();
    });

    fireEvent.press(getByTestId('catalog-item-test-item-2'));

    await waitFor(() => {
      expect(getByTestId('details-screen')).toBeTruthy();
    });

    fireEvent.press(getByTestId('play-button'));

    await waitFor(() => {
      expect(getByTestId('player-screen')).toBeTruthy();
    });

    fireEvent.press(getByTestId('back-button'));

    await waitFor(() => {
      expect(getByTestId('details-screen')).toBeTruthy();
    });

    fireEvent.press(getByTestId('back-to-home'));

    await waitFor(() => {
      expect(getByTestId('home-screen')).toBeTruthy();
    });
  });

  it('should display correct item data for different movies', async () => {
    const { getByTestId, getByText } = render(<MiniApp />);

    await waitFor(() => {
      expect(getByTestId('home-screen')).toBeTruthy();
    });

    fireEvent.press(getByTestId('catalog-item-test-item-2'));

    await waitFor(() => {
      expect(getByText('Test Movie 2')).toBeTruthy();
      expect(getByText('Test description for movie 2')).toBeTruthy();
      expect(getByText('Duration: 180 seconds')).toBeTruthy();
    });

    fireEvent.press(getByTestId('play-button'));

    await waitFor(() => {
      expect(getByText('Stream: https://example.com/stream2.mp4')).toBeTruthy();
    });
  });
});

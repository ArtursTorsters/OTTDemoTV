//  play/pause,progress tracking, and error

import { renderHook, act } from '@testing-library/react-native';
import { useVideoPlayer } from '../../src/hooks/useVideoPlayer';

const mockSeek = jest.fn();
const mockVideoRef = {
  current: {
    seek: mockSeek,
  },
};

describe('useVideoPlayer Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize with correct default state', () => {
    const { result } = renderHook(() => useVideoPlayer());

    expect(result.current.state).toEqual({
      paused: false,
      loading: true,
      duration: 0,
      currentTime: 0,
      error: null,
      muted: false,
      volume: 1.0,
    });
  });

  test('should toggle play/pause correctly', () => {
    const { result } = renderHook(() => useVideoPlayer());

    expect(result.current.state.paused).toBe(false);

    act(() => {
      result.current.actions.togglePlayPause();
    });

    expect(result.current.state.paused).toBe(true);

    act(() => {
      result.current.actions.togglePlayPause();
    });

    expect(result.current.state.paused).toBe(false);
  });

  test('should handle video load correctly', () => {
    const { result } = renderHook(() => useVideoPlayer());

    const mockLoadData = {
      duration: 120.5,
      currentTime: 0,
    };

    act(() => {
      result.current.actions.handleLoad(mockLoadData);
    });

    expect(result.current.state.loading).toBe(false);
    expect(result.current.state.duration).toBe(120.5);
    expect(result.current.state.paused).toBe(false);
    expect(result.current.state.muted).toBe(false);
    expect(result.current.state.error).toBe(null);
  });

  test('should handle progress updates', () => {
    const { result } = renderHook(() => useVideoPlayer());

    const mockProgressData = {
      currentTime: 45.2,
    };

    act(() => {
      result.current.actions.handleProgress(mockProgressData);
    });

    expect(result.current.state.currentTime).toBe(45.2);
  });

  test('should handle errors correctly', () => {
    const mockOnError = jest.fn();
    const { result } = renderHook(() => useVideoPlayer(mockOnError));

    const mockError = {
      error: {
        errorString: 'Network connection failed',
      },
    };

    act(() => {
      result.current.actions.handleError(mockError);
    });

    expect(result.current.state.loading).toBe(false);
    expect(result.current.state.error).toBe('Network connection failed');
    expect(mockOnError).toHaveBeenCalledWith('Network connection failed');
  });

  test('should handle video end correctly', () => {
    const { result } = renderHook(() => useVideoPlayer());

    act(() => {
      result.current.actions.handleProgress({ currentTime: 60 });
    });

    expect(result.current.state.currentTime).toBe(60);

    act(() => {
      result.current.actions.handleEnd();
    });

    expect(result.current.state.paused).toBe(true);
    expect(result.current.state.currentTime).toBe(0);
  });

  test('should format time correctly', () => {
    const { result } = renderHook(() => useVideoPlayer());

    expect(result.current.actions.formatTime(0)).toBe('0:00');
    expect(result.current.actions.formatTime(65)).toBe('1:05');
    expect(result.current.actions.formatTime(125)).toBe('2:05');
    expect(result.current.actions.formatTime(3661)).toBe('61:01');
  });

  test('should handle invalid time values', () => {
    const { result } = renderHook(() => useVideoPlayer());

    expect(result.current.actions.formatTime(NaN)).toBe('0:00');
    expect(result.current.actions.formatTime(-10)).toBe('0:00');
    expect(result.current.actions.formatTime(undefined as any)).toBe('0:00');
  });

  test('should calculate progress percentage correctly', () => {
    const { result } = renderHook(() => useVideoPlayer());

    act(() => {
      result.current.actions.handleLoad({ duration: 100 });
    });

    act(() => {
      result.current.actions.handleProgress({ currentTime: 0 });
    });
    expect(result.current.actions.getProgressPercentage()).toBe(0);

    act(() => {
      result.current.actions.handleProgress({ currentTime: 50 });
    });
    expect(result.current.actions.getProgressPercentage()).toBe(50);

    act(() => {
      result.current.actions.handleProgress({ currentTime: 100 });
    });
    expect(result.current.actions.getProgressPercentage()).toBe(100);
  });

  test('should handle edge cases for progress percentage', () => {
    const { result } = renderHook(() => useVideoPlayer());

    expect(result.current.actions.getProgressPercentage()).toBe(0);

    act(() => {
      result.current.actions.handleLoad({ duration: 0 });
    });
    expect(result.current.actions.getProgressPercentage()).toBe(0);
  });

  test('should handle volume changes', () => {
    const { result } = renderHook(() => useVideoPlayer());

    act(() => {
      result.current.actions.setVolume(0.5);
    });

    expect(result.current.state.volume).toBe(0.5);

    act(() => {
      result.current.actions.setVolume(1.5);
    });

    expect(result.current.state.volume).toBe(1.0);

    act(() => {
      result.current.actions.setVolume(-0.5);
    });

    expect(result.current.state.volume).toBe(0.0);
  });

  test('should toggle mute correctly', () => {
    const { result } = renderHook(() => useVideoPlayer());

    expect(result.current.state.muted).toBe(false);

    act(() => {
      result.current.actions.toggleMute();
    });

    expect(result.current.state.muted).toBe(true);

    act(() => {
      result.current.actions.toggleMute();
    });

    expect(result.current.state.muted).toBe(false);
  });
});

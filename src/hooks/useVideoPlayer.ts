import { useRef, useState } from 'react';

interface VideoState {
  paused: boolean;
  loading: boolean;
  duration: number;
  currentTime: number;
  error: string | null;
  muted: boolean;
  volume: number;
}

interface VideoActions {
  togglePlayPause: () => void;
  seekVideo: (seconds: number) => void;
  handleLoad: (data: any) => void;
  handleProgress: (data: any) => void;
  handleError: (error: any) => void;
  handleEnd: () => void;
  formatTime: (seconds: number) => string;
  getProgressPercentage: () => number;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

export const useVideoPlayer = (onError?: (error: string) => void) => {
  const videoRef = useRef<any>(null);

  const [state, setState] = useState<VideoState>({
    paused: false,
    loading: true,
    duration: 0,
    currentTime: 0,
    error: null,
    muted: false,
    volume: 1.0,
  });

  const actions: VideoActions = {
    togglePlayPause: () => {
      setState(prev => ({ ...prev, paused: !prev.paused }));
    },

    seekVideo: (seconds: number) => {
      if (videoRef.current) {
        const newTime = Math.max(0, Math.min(state.currentTime + seconds, state.duration));

        videoRef.current.seek(newTime);
        setState(prev => ({ ...prev, currentTime: newTime }));
      }
    },

    handleLoad: (data: any) => {
      setState(prev => ({
        ...prev,
        loading: false,
        duration: data.duration,
        error: null,
        paused: false,
        muted: false,
      }));
    },

    handleProgress: (data: any) => {
      setState(prev => ({
        ...prev,
        currentTime: data.currentTime,
      }));
    },

    handleError: (error: any) => {

      let errorMessage = 'error';

      if (error?.error?.errorString) {
        errorMessage = error.error.errorString;
      } else if (error?.error?.localizedDescription) {
        errorMessage = error.error.localizedDescription;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      if (!errorMessage || typeof errorMessage !== 'string') {
        errorMessage = 'Video playback failed. Please try again.';
      }

      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));

      if (onError) {
        onError(errorMessage);
      }
    },

    handleEnd: () => {
      setState(prev => ({ ...prev, paused: true, currentTime: 0 }));
    },

    formatTime: (seconds: number): string => {
      if (isNaN(seconds) || seconds < 0) {
        return '0:00';
      }

      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    },

    getProgressPercentage: (): number => {
      if (state.duration === 0 || isNaN(state.duration) || isNaN(state.currentTime)) {
        return 0;
      }
      return Math.min(100, Math.max(0, (state.currentTime / state.duration) * 100));
    },

    setVolume: (volume: number) => {
      const clampedVolume = Math.max(0, Math.min(1, volume));
      setState(prev => ({ ...prev, volume: clampedVolume }));
    },

    toggleMute: () => {
      setState(prev => ({ ...prev, muted: !prev.muted }));
    },
  };

  return {
    videoRef,
    state,
    actions,
  };
};

import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface UseControlsVisibilityOptions {
  hideDelay?: number;
  animationDuration?: number;
  isPaused?: boolean;
}

interface UseControlsVisibilityReturn {
  controlsVisible: boolean;
  controlsOpacity: Animated.Value;
  showControls: () => void;
  hideControls: () => void;
  handleUserInteraction: () => void;
  resetHideTimer: () => void;
}

export const useControlsVisibility = ({
  hideDelay = 4000,
  animationDuration = 200,
  isPaused = false,
}: UseControlsVisibilityOptions = {}): UseControlsVisibilityReturn => {
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsOpacity = useRef(new Animated.Value(1)).current;
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showControls = () => {
    setControlsVisible(true);
    Animated.timing(controlsOpacity, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
    resetHideTimer();
  };

  const hideControls = () => {
    Animated.timing(controlsOpacity, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start(() => {
      setControlsVisible(false);
    });
  };

  const resetHideTimer = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    if (!isPaused) {
      hideTimeoutRef.current = setTimeout(() => {
        hideControls();
      }, hideDelay);
    }
  };

  const handleUserInteraction = () => {
    if (!controlsVisible) {
      showControls();
    } else {
      resetHideTimer();
    }
  };

  useEffect(() => {
    if (isPaused) {
      showControls();
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    } else {
      resetHideTimer();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  useEffect(() => {
    showControls();

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    controlsVisible,
    controlsOpacity,
    showControls,
    hideControls,
    handleUserInteraction,
    resetHideTimer,
  };
};

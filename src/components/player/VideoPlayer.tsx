import React from 'react';
import {
  View,
  Text,
  BackHandler,
  Animated,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Video from 'react-native-video';
import { useVideoPlayer } from '../../hooks/useVideoPlayer';
import { useControlsVisibility } from '../../hooks/useControlsVisibility';
import { videoPlayerStyles as styles } from '../../styles/VideoPlayerStyles';
import LoadingState from '../state/LoadingState';
import { FocusableButton } from '../comon/FocusableButton';

interface VideoPlayerProps {
  streamUrl: string;
  onError?: (error: string) => void;
  onBack?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  streamUrl,
  onError,
  onBack,
}) => {
  const { videoRef, state, actions } = useVideoPlayer(onError);
  const { controlsOpacity, handleUserInteraction } = useControlsVisibility({
    hideDelay: 8000,
    animationDuration: 200,
    isPaused: state.paused,
  });

  React.useEffect(() => {
    if (Platform.isTV) {
      try {
        const { TVEventHandler } = require('react-native');
        const tvEventHandler = new TVEventHandler();
        tvEventHandler.enable(null, (cmp: any, evt: any) => {
          if (['down', 'up', 'left', 'right', 'select'].includes(evt.eventType)) {
            handleUserInteraction();
          }
        });
        return () => tvEventHandler.disable();
      } catch (error) {
      }
    }
  }, [handleUserInteraction]);

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        onBack?.();
        return true;
      });
      return () => backHandler.remove();
    }, [onBack]),
  );

  const handleControlPress = (action: () => void) => {
    action();
    handleUserInteraction();
  };

  if (state.error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Playback Error</Text>
        <Text style={styles.errorMessage}>{state.error}</Text>
        <FocusableButton
          style={styles.errorButton}
          focusedStyle={styles.focusedControl}
          onPress={() => onBack?.()}
        >
          <Text style={styles.errorButtonText}>← Go Back</Text>
        </FocusableButton>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: streamUrl }}
          style={styles.video}
          resizeMode="contain"
          paused={state.paused}
          onLoad={actions.handleLoad}
          onProgress={actions.handleProgress}
          onError={actions.handleError}
          onEnd={actions.handleEnd}
          controls={false}
          volume={1.0}
          bufferConfig={{
            minBufferMs: 1000,
            maxBufferMs: 3000,
            bufferForPlaybackMs: 500,
            bufferForPlaybackAfterRebufferMs: 1000,
          }}
        />
        {state.loading && <LoadingState message="Loading..." />}
        <View style={styles.videoOverlay} focusable={false} pointerEvents="none" />
      </View>

      <Animated.View
        style={[styles.controlsBar, { opacity: controlsOpacity, pointerEvents: 'auto' }]}
        focusable={false}
      >
        <View style={styles.progressSection}>
          <Text style={styles.timeText}>{actions.formatTime(state.currentTime)}</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View
                style={[styles.progressFill, { width: `${actions.getProgressPercentage()}%` }]}
              />
            </View>
          </View>
          <Text style={styles.timeText}>{actions.formatTime(state.duration)}</Text>
        </View>

        <View style={styles.controlButtons}>
          <FocusableButton
            style={styles.controlButton}
            focusedStyle={styles.focusedControl}
            onPress={() => handleControlPress(() => onBack?.())}
          >
            <Text style={styles.controlButtonText}>Back</Text>
          </FocusableButton>

          <FocusableButton
            style={styles.controlButton}
            focusedStyle={styles.focusedControl}
            onPress={() => handleControlPress(() => actions.seekVideo(-10))}
          >
            <Text style={styles.controlButtonText}>← 10s</Text>
          </FocusableButton>

          <FocusableButton
            style={styles.playPauseButton}
            focusedStyle={styles.focusedPlayButton}
            onPress={() => handleControlPress(actions.togglePlayPause)}
            isPrimary={true}
          >
            <Text style={styles.playPauseText}>
              {state.paused ? '▶' : '⏸'}
            </Text>
          </FocusableButton>

          <FocusableButton
            style={styles.controlButton}
            focusedStyle={styles.focusedControl}
            onPress={() => handleControlPress(() => actions.seekVideo(10))}
          >
            <Text style={styles.controlButtonText}>10s →</Text>
          </FocusableButton>
        </View>
      </Animated.View>
    </View>
  );
};

export default VideoPlayer;

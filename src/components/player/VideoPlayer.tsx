/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Animated,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Video from 'react-native-video';
import { useVideoPlayer } from '../../hooks/useVideoPlayer';
import { useControlsVisibility } from '../../hooks/useControlsVisibility';
import { videoPlayerStyles as styles } from '../../styles/VideoPlayerStyles';
import { colors } from '../../styles/theme';
import LoadingState from '../state/LoadingState';

interface VideoPlayerProps {
  streamUrl: string;
  onError?: (error: string) => void;
  onBack?: () => void;
}

// Focusable button component with primary color focus
const FocusableButton: React.FC<{
  onPress: () => void;
  style?: any;
  children: React.ReactNode;
  focusable?: boolean;
}> = ({ onPress, style, children, focusable = true }) => {
  const [focused, setFocused] = useState(false);

  return (
    <TouchableOpacity
      style={[
        style,
        focused && Platform.isTV && {
          backgroundColor: colors.primary, // Primary color when focused
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      focusable={focusable}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </TouchableOpacity>
  );
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  streamUrl,
  onError,
  onBack,
}) => {
  const { videoRef, state, actions } = useVideoPlayer(onError);

  const { controlsVisible, controlsOpacity, handleUserInteraction } =
    useControlsVisibility({
      hideDelay: 4000,
      animationDuration: 200,
      isPaused: state.paused,
    });

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (onBack) {
          onBack();
        }
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
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
          onPress={() => onBack?.()}
        >
          <Text style={styles.errorButtonText}>← Go Back</Text>
        </FocusableButton>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={handleUserInteraction}>
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
            muted={false}
            ignoreSilentSwitch="ignore"
            mixWithOthers="duck"
            playInBackground={false}
            playWhenInactive={false}
            reportBandwidth={true}
            bufferConfig={{
              minBufferMs: 1000,
              maxBufferMs: 3000,
              bufferForPlaybackMs: 500,
              bufferForPlaybackAfterRebufferMs: 1000,
            }}
          />

          {state.loading && <LoadingState message="Loading..." />}

          <TouchableWithoutFeedback onPress={handleUserInteraction}>
            <View style={styles.videoOverlay} />
          </TouchableWithoutFeedback>
        </View>

        <Animated.View
          style={[
            styles.controlsBar,
            {
              opacity: controlsOpacity,
              pointerEvents: controlsVisible ? 'auto' : 'none',
            },
          ]}
        >
          <View style={styles.progressSection}>
            <Text style={styles.timeText}>
              {actions.formatTime(state.currentTime)}
            </Text>

            <View style={styles.progressContainer}>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${actions.getProgressPercentage()}%` },
                  ]}
                />
              </View>
            </View>

            <Text style={styles.timeText}>
              {actions.formatTime(state.duration)}
            </Text>
          </View>

          <View style={styles.controlButtons}>
            <FocusableButton
              style={styles.controlButton}
              onPress={() => handleControlPress(() => onBack?.())}
            >
              <Text style={styles.controlButtonText}>Back</Text>
            </FocusableButton>

            <FocusableButton
              style={styles.controlButton}
              onPress={() => handleControlPress(() => actions.seekVideo(-10))}
            >
              <Text style={styles.controlButtonText}>← 10s</Text>
            </FocusableButton>

            <FocusableButton
              style={[styles.playPauseButton, {
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 30,
              }]}
              onPress={() => handleControlPress(actions.togglePlayPause)}
            >
              <Text style={[styles.playPauseText, { fontSize: 24 }]}>
                {state.paused ? '▶' : '⏸'}
              </Text>
            </FocusableButton>

            <FocusableButton
              style={styles.controlButton}
              onPress={() => handleControlPress(() => actions.seekVideo(10))}
            >
              <Text style={styles.controlButtonText}>10s →</Text>
            </FocusableButton>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VideoPlayer;

import { StyleSheet } from 'react-native';
import { colors, spacing, mixins, borderRadius } from './theme';

export const videoPlayerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  videoContainer: {
    flex: 1,
    position: 'relative',
  },

  video: {
    flex: 1,
    backgroundColor: colors.background,
  },

  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...mixins.center,
    backgroundColor: colors.background,
  },

  loadingText: {
    ...mixins.heading3,
    marginBottom: spacing.sm,
  },

  loadingSubtext: {
    ...mixins.bodySecondary,
    textAlign: 'center',
  },
  videoTitle: {
    ...mixins.bodyLarge,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  controlsBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },

  progressSection: {
    ...mixins.row,
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.md,
  },

  timeText: {
    ...mixins.caption,
    fontWeight: '600',
    color: colors.textSecondary,
    minWidth: 50,
    textAlign: 'center',
    fontSize: 12,
  },

  progressContainer: {
    flex: 1,
    height: 6,
  },

  progressTrack: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },

  controlButtons: {
    ...mixins.row,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  controlButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: 60,
    alignItems: 'center',
  },

  playPauseButton: {
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: 70,
    alignItems: 'center',
  },

  controlButtonText: {
    ...mixins.caption,
    fontWeight: '600',
    color: colors.textPrimary,
    fontSize: 12,
  },

  playPauseText: {
    ...mixins.body,
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 16,
  },

  focusedControl: {
    borderColor: colors.tvFocus,
    backgroundColor: 'rgba(0, 212, 255, 0.2)',
    transform: [{ scale: 1.05 }],
    shadowColor: colors.tvFocus,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },

  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },

  focusedPlayButton: {
    borderColor: colors.tvFocus,
    backgroundColor: colors.primary,
    transform: [{ scale: 1.08 }],
    shadowColor: colors.tvFocus,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },

  focusedText: {
    color: colors.textPrimary,
    textShadowColor: colors.tvFocus,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },

  errorContainer: {
    flex: 1,
    ...mixins.center,
    backgroundColor: colors.background,
    padding: spacing.xxl,
  },

  errorTitle: {
    ...mixins.heading2,
    color: colors.error,
    marginBottom: spacing.md,
  },

  errorMessage: {
    ...mixins.bodyLarge,
    textAlign: 'center',
    marginBottom: spacing.xl,
    color: colors.textSecondary,
  },

  errorButton: {
    ...mixins.buttonSecondary,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  errorButtonText: {
    ...mixins.bodyLarge,
    fontWeight: '600',
  },

  debugInfo: {
    marginTop: spacing.xs,
    alignSelf: 'center',
  },

  debugText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '500',
  },
});

import { StyleSheet } from 'react-native';
import { colors, spacing, mixins, borderRadius } from './theme';

export const detailStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollView: {
    flex: 1,
  },

  content: {
    padding: spacing.xxl,
    minHeight: '100%',
  },

  heroSection: {
    flexDirection: 'row',
    marginBottom: spacing.xxxl,
    gap: spacing.xxxl,
    alignItems: 'flex-start',
  },

  posterContainer: {
    position: 'relative',
    width: 320,
    flexShrink: 0,
  },

  poster: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceSecondary,
  },

  formatBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },

  formatText: {
    ...mixins.caption,
    color: colors.textPrimary,
    fontWeight: '700',
  },

  detailsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  title: {
    ...mixins.heading2,
    marginBottom: spacing.md,
  },

  metaContainer: {
    ...mixins.row,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },

  duration: {
    ...mixins.bodySecondary,
    fontWeight: '500',
  },

  separator: {
    ...mixins.bodySecondary,
  },

  quality: {
    ...mixins.bodySecondary,
    fontWeight: '500',
  },

  type: {
    ...mixins.bodySecondary,
    fontWeight: '500',
  },

  description: {
    ...mixins.bodyLarge,
    color: colors.textTertiary,
    lineHeight: spacing.lg * 1.5,
    marginBottom: spacing.xxxl,
  },

  buttonContainer: {
    ...mixins.row,
    gap: spacing.lg,
    alignItems: 'stretch',
  },

  playButton: {
    ...mixins.buttonPrimary,
    minWidth: 140,
  },

  playButtonText: {
    ...mixins.bodyLarge,
    fontWeight: '600',
  },

  backButton: {
    ...mixins.buttonSecondary,
    minWidth: 140,
  },

  backButtonText: {
    ...mixins.bodyLarge,
    fontWeight: '500',
  },

  // TV FOCUS STYLING FOR BUTTONS
  focusedButton: {
    borderWidth: 3,
    borderColor: colors.tvFocus,
    transform: [{ scale: 1.05 }],
    shadowColor: colors.tvFocus,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },

  focusedPrimaryText: {
    textShadowColor: colors.textPrimary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },

  focusedSecondaryText: {
    color: colors.tvFocus,
    textShadowColor: colors.tvFocus,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },

  additionalInfo: {
    marginTop: spacing.xxxl,
    paddingTop: spacing.xxxl,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
  },

  sectionTitle: {
    ...mixins.heading3,
    marginBottom: spacing.lg,
  },

  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.xl,
  },

  infoItem: {
    flex: 1,
  },

  infoLabel: {
    ...mixins.caption,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  infoValue: {
    ...mixins.body,
    fontWeight: '500',
  },
});

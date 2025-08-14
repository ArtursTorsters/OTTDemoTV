import { ViewStyle, TextStyle } from 'react-native';

export const colors = {
  background: '#000000',
  surface: '#1C1C1E',
  surfaceSecondary: '#2C2C2E',
  primary: '#007AFF',
  textPrimary: '#FFFFFF',
  textSecondary: '#8E8E93',
  textTertiary: '#CCCCCC',
  success: '#34C759',
  warning: '#FF6B00',
  error: '#FF3B30',
  tvFocus: '#007AFF',
  overlay: 'rgba(0, 0, 0, 0.8)',
  hlsBadge: '#FF6B00',
  mp4Badge: '#34C759',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
};

export const borderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

export const tv = {
  focusScale: 1.05,
  focusBorderWidth: 3,
  tileWidth: 300,
  tileSpacing: 20,
};

export const mixins = {
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,

  tvFocusable: (focused: boolean): ViewStyle => ({
    borderWidth: tv.focusBorderWidth,
    borderColor: focused ? colors.tvFocus : 'transparent',

    transform: [{ scale: focused ? tv.focusScale : 1 }],
  }),

  focused: {
    borderColor: colors.tvFocus ? colors.tvFocus : 'transparent',

  },

  buttonPrimary: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,

  buttonSecondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,

  heading1: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.textPrimary,
  } as TextStyle,

  heading2: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
  } as TextStyle,

  heading3: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.textPrimary,
  } as TextStyle,

  bodyLarge: {
    fontSize: 18,
    color: colors.textPrimary,
  } as TextStyle,

  body: {
    fontSize: 16,
    color: colors.textPrimary,
  } as TextStyle,

  bodySecondary: {
    fontSize: 14,
    color: colors.textSecondary,
  } as TextStyle,

  caption: {
    fontSize: 12,
    color: colors.textSecondary,
  } as TextStyle,
};

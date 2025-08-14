import { StyleSheet } from 'react-native';
import { colors, spacing, mixins} from './theme';

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },

  title: {
    ...mixins.heading1,
    marginBottom: spacing.sm,
  },

  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },

  sectionHeader: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },

  sectionTitle: {
    ...mixins.heading3,
    marginBottom: spacing.xs,
  },

  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  listContainer: {
    paddingHorizontal: spacing.xxl,
    paddingRight: spacing.xxl + spacing.lg,
    alignItems: 'flex-start'
  },

  movieRowContainer: {
    height: 300,
    marginBottom: spacing.lg,
    paddingTop: spacing.sm,
  },

  secondSection: {
    marginTop: spacing.lg,
  },

  emptyMessage: {
    ...mixins.body,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});

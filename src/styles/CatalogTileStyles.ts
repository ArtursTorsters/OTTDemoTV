import { StyleSheet } from 'react-native';


export const catalagoStyle = StyleSheet.create({
  container: {
    width: 180,
    marginBottom: 20,
  },

  thumbnailContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 250,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingSpinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  loadingText: { color: '#fff', fontSize: 18 },
  loadingSubtext: { color: '#fff', fontSize: 12 },
  durationBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 4,
  },
  durationText: { color: '#fff', fontSize: 12 },
  formatBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  formatText: { color: '#fff', fontSize: 12 },
  textContainer: { marginTop: 6 },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  description: { color: '#ccc', fontSize: 12 },
});

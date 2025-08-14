# React Native Android TV OTT Demo

A simple Android TV streaming app with catalog browsing, video details, and video playback.

## Quick Start

### Setup
```bash
git clone <repo-url>
cd ott-demo
npm install
```

### Run on Android TV Emulator
1. Start Android TV emulator from Android Studio
2. Start Metro bundler:
   ```bash
   npx react-native start
   ```
3. In another terminal, run the app:
   ```bash
   npx react-native run-android
   ```

### Run Tests
```bash
npm test
```

## Libraries Used

- **react-native-video** - Video playback (HLS/MP4 support)
- **@react-navigation/native** - Screen navigation
- **jest** - Testing framework
- **@testing-library/react-native** - Component testing

##  Features

- **Home**: Video catalog grid with thumbnails
- **Details**: Video info with play button
- **Player**: Video playback with auto-hiding controls
- **TV Navigation**: D-pad focus management

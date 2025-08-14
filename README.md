# React Native Android TV OTT Demo

A React Native streaming app built specifically for Android TV with catalog browsing, video details, and video playback functionality.

## Setup & Installation

### Prerequisites
- Node.js 18+
- Android Studio with Android TV emulator
- React Native development environment

### Install Dependencies
```bash
git clone <repository-url>
cd react-native-android-tv-demo
npm install
```

### Run on Android TV Emulator

1. **Start Android TV Emulator**
   - Open Android Studio
   - Start an Android TV emulator

2. **Start Metro Bundler**
   ```bash
   npx react-native start
   ```

3. **Run the App**
   ```bash
   npx react-native run-android
   ```
## Libraries Used

- **react-native-tvos@0.81.0-0** - TV-specific React Native build with proper focus handling
- **react-native-video@6.16.1** - Robust video playback with HLS/MP4 support and TV controls
- **@react-navigation/native@7.1.17** - Industry-standard navigation with screen management

### Run All Tests
```bash
npm test
```

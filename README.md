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
cd OTTDemoTV
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

- **react-native-video** - Video playback (HLS/MP4 support)
- **react-native-tvos@0.81.0-0** - TV-specific React Native build with proper focus handling
- **@react-navigation/native** - Screen navigation
- **jest** - Testing framework
- **@testing-library/react-native** - Component testing

### Run All Tests
```bash
npm test
```

### Current Limitations
- **Single Video Quality** - No adaptive bitrate selection
- **No Subtitles** - Subtitle support not implemented
- **Basic Progress Bar** - No scrubbing/seeking via progress bar
- **Simple Error Handling** - Generic error messages without retry mechanisms

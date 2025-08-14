
export class VideoUtils {
  /**
   * Format time in seconds to readable format (MM:SS or HH:MM:SS)
   */
  static formatTime(timeInSeconds: number): string {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) {
      return '0:00';
    }

    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Calculate progress percentage
   */
  static getProgressPercentage(currentTime: number, duration: number): number {
    if (duration <= 0 || currentTime < 0) {
      return 0;
    }
    return Math.min(100, (currentTime / duration) * 100);
  }

  /**
   * Validate video stream URL
   */
  static isValidStreamUrl(url: string): boolean {
    if (!url || typeof url !== 'string') {
      return false;
    }

    // Check for common video formats
    const videoFormats = ['.mp4', '.m3u8', '.mov', '.avi', '.mkv'];
    const hasValidFormat = videoFormats.some(format =>
      url.toLowerCase().includes(format)
    );

    // Check for valid URL structure
    const isValidUrl = url.startsWith('http') || url.startsWith('https');

    return isValidUrl && hasValidFormat;
  }

  /**
   * Get video format from URL
   */
  static getVideoFormat(url: string): 'HLS' | 'MP4' | 'Unknown' {
    if (url.includes('.m3u8')) {
      return 'HLS';
    } else if (url.includes('.mp4')) {
      return 'MP4';
    }
    return 'Unknown';
  }

  /**
   * Calculate time remaining
   */
  static getTimeRemaining(currentTime: number, duration: number): number {
    return Math.max(0, duration - currentTime);
  }

  /**
   * Determine if video should show controls
   */
  static shouldShowControls(
    lastInteraction: number,
    autoHideDelay: number = 5000
  ): boolean {
    return Date.now() - lastInteraction < autoHideDelay;
  }

  /**
   * Get human-readable error message
   */
  static getErrorMessage(error: any): string {
    if (typeof error === 'string') {
      return error;
    }

    if (error?.error?.localizedDescription) {
      return error.error.localizedDescription;
    }

    if (error?.message) {
      return error.message;
    }

    // Default error messages based on common issues
    const errorMap: { [key: string]: string } = {
      'network': 'Network connection error. Please check your internet connection.',
      'timeout': 'Video loading timed out. Please try again.',
      'format': 'Unsupported video format.',
      'unauthorized': 'Access denied. This video may not be available.',
    };

    // Try to match common error patterns
    const errorString = JSON.stringify(error).toLowerCase();
    for (const [key, message] of Object.entries(errorMap)) {
      if (errorString.includes(key)) {
        return message;
      }
    }

    return 'Video playback failed. Please try again.';
  }

  /**
   * Get optimal seek step based on video duration
   */
  static getSeekStep(duration: number): number {
    if (duration > 3600) { // > 1 hour
      return 30;
    } else if (duration > 1800) { // > 30 minutes
      return 15;
    } else {
      return 10;
    }
  }
}

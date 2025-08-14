
// movie structure
export interface MovieItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  streamUrl: string;
  duration: number;
}

export interface CatalogResponse {
  items: MovieItem[];
}

export interface CatalogTileProps {
  item: MovieItem;
  index: number;
  onPress?: (item: MovieItem) => void;
}
export type NavigationScreens = {
  Home: undefined;
  Details: { item: MovieItem };
  Player: { item: MovieItem };
};


export interface LoadingStateProps {
  message?: string;
}

export interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

// catalgo api
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  loading: boolean;
}

//player
export type PlayerState = 'loading' | 'playing' | 'paused' | 'error' | 'ended';

export interface VideoPlayerProps {
  streamUrl: string;
  onError?: (error: string) => void;
  onStateChange?: (state: PlayerState) => void;
}

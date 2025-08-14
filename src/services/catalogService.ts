import { CatalogResponse, MovieItem } from '../types';

const CATALOG: CatalogResponse = {
  items: [
    {
      id: 'bbb-hls',
      title: 'Big Buck Bunny (HLS)',
      description: 'Short animated film used as a demo stream.',
      thumbnail:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ4d816l2_N7O17rr8Cr9nta3z-7--j1ZGGe_9_oqz8zNzjVVPZ4_OdRRMGey-sQssCQBaubQ',
      streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      duration: 596,
    },

    {
      id: 'sintel-mp4',
      title: 'Sintel (MP4)',
      description: 'Open movie — MP4 fallback.',
      thumbnail:
        'https://resizing.flixster.com/lwylYKMnTXTpfziN5lzxWbSzrGQ=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10892939_v_h9_aa.jpg',
      streamUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      duration: 888,
    },
    {
      id: 'tears-hls',
      title: 'Tears of Steel (HLS)',
      description: 'Open movie — HLS stream.',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNT_sVMyAqZpYq81t-mdC5N8Ww0OL2GRbgHA&s',
      streamUrl: 'https://test-streams.mux.dev/tears-of-steel/playlist.m3u8',
      duration: 734,
    },
    {
      id: 'elephants-mp4',
      title: 'Elephant Dream (MP4)',
      description: 'Open movie — MP4 demo.',
      thumbnail:
        'https://upload.wikimedia.org/wikipedia/commons/0/0c/ElephantsDreamPoster.jpg',
      streamUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      duration: 653,
    },
    {
      id: 'bbb-mp4',
      title: 'Big Buck Bunny (MP4)',
      description: 'MP4 fallback of BBB.',
      thumbnail:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ4d816l2_N7O17rr8Cr9nta3z-7--j1ZGGe_9_oqz8zNzjVVPZ4_OdRRMGey-sQssCQBaubQ',
      streamUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      duration: 596,
    },
    {
      id: 'for-bigger-joyrides',
      title: 'For Bigger Joyrides (MP4)',
      description: 'Short demo clip.',
      thumbnail:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
      streamUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      duration: 75,
    },
  ],
};

export class CatalogService {
  static async fetchCatalog(): Promise<CatalogResponse> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      return CATALOG;
    } catch (error) {
      throw new Error('Failed to fetch catalog data');
    }
  }

  static getCatalogItem(id: string): MovieItem | undefined {
    return CATALOG.items.find(item => item.id === id);
  }

  static formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

}

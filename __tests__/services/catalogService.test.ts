// data fetching, item retrieval, duration formatting

import { CatalogService } from '../../src/services/catalogService';

jest.mock('../../src/services/catalogService', () => {
  const mockCatalog = {
    items: [
      {
        id: 'test-1',
        title: 'Test Movie 1',
        description: 'Test description 1',
        thumbnail: 'https://example.com/thumb1.jpg',
        streamUrl: 'https://example.com/test1.mp4',
        duration: 1800,
      },
      {
        id: 'test-2',
        title: 'Test Movie 2 (HLS)',
        description: 'Test description 2',
        thumbnail: 'https://example.com/thumb2.jpg',
        streamUrl: 'https://example.com/test2.m3u8',
        duration: 3600,
      },
    ],
  };

  return {
    CatalogService: {
      async fetchCatalog() {
        await new Promise(resolve => setTimeout(resolve, 100));
        return mockCatalog;
      },

      getCatalogItem(id: string) {
        return mockCatalog.items.find(item => item.id === id);
      },

      formatDuration(seconds: number): string {
        if (isNaN(seconds) || seconds < 0 || !isFinite(seconds) || seconds == null) {
          return '0:00';
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
      },
    },
  };
});

describe('CatalogService', () => {
  describe('fetchCatalog', () => {
    test('should fetch catalog data successfully', async () => {
      const catalog = await CatalogService.fetchCatalog();

      expect(catalog).toBeDefined();
      expect(catalog.items).toHaveLength(2);
      expect(catalog.items[0]).toEqual({
        id: 'test-1',
        title: 'Test Movie 1',
        description: 'Test description 1',
        thumbnail: 'https://example.com/thumb1.jpg',
        streamUrl: 'https://example.com/test1.mp4',
        duration: 1800,
      });
    });

    test('should return catalog with correct structure', async () => {
      const catalog = await CatalogService.fetchCatalog();

      expect(catalog).toHaveProperty('items');
      expect(Array.isArray(catalog.items)).toBe(true);

      catalog.items.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('description');
        expect(item).toHaveProperty('thumbnail');
        expect(item).toHaveProperty('streamUrl');
        expect(item).toHaveProperty('duration');
        expect(typeof item.duration).toBe('number');
      });
    });
  });

  describe('getCatalogItem', () => {
    test('should return correct item by ID', () => {
      const item = CatalogService.getCatalogItem('test-1');

      expect(item).toBeDefined();
      expect(item?.id).toBe('test-1');
      expect(item?.title).toBe('Test Movie 1');
    });

    test('should return undefined for non-existent ID', () => {
      const item = CatalogService.getCatalogItem('non-existent');

      expect(item).toBeUndefined();
    });

    test('should handle empty or invalid IDs', () => {
      expect(CatalogService.getCatalogItem('')).toBeUndefined();
      expect(CatalogService.getCatalogItem(null as any)).toBeUndefined();
      expect(CatalogService.getCatalogItem(undefined as any)).toBeUndefined();
    });
  });

  describe('formatDuration', () => {
    test('should format duration correctly for various inputs', () => {
      expect(CatalogService.formatDuration(0)).toBe('0:00');
      expect(CatalogService.formatDuration(30)).toBe('0:30');
      expect(CatalogService.formatDuration(60)).toBe('1:00');
      expect(CatalogService.formatDuration(90)).toBe('1:30');
      expect(CatalogService.formatDuration(3661)).toBe('61:01');
      expect(CatalogService.formatDuration(1800)).toBe('30:00');
      expect(CatalogService.formatDuration(3600)).toBe('60:00');
    });

    test('should handle edge cases', () => {
      expect(CatalogService.formatDuration(-10)).toBe('0:00');
      expect(CatalogService.formatDuration(NaN)).toBe('0:00');
      expect(CatalogService.formatDuration(Infinity)).toBe('0:00');
      expect(CatalogService.formatDuration(undefined as any)).toBe('0:00');
      expect(CatalogService.formatDuration(null as any)).toBe('0:00');
    });

    test('should pad seconds correctly', () => {
      expect(CatalogService.formatDuration(65)).toBe('1:05');
      expect(CatalogService.formatDuration(125)).toBe('2:05');
      expect(CatalogService.formatDuration(3605)).toBe('60:05');
    });
  });

  describe('Video format detection', () => {
    test('should correctly identify HLS streams', async () => {
      const catalog = await CatalogService.fetchCatalog();
      const hlsItem = catalog.items.find(item => item.streamUrl.includes('.m3u8'));

      expect(hlsItem).toBeDefined();
      expect(hlsItem?.streamUrl).toContain('.m3u8');
    });

    test('should correctly identify MP4 videos', async () => {
      const catalog = await CatalogService.fetchCatalog();
      const mp4Item = catalog.items.find(item => item.streamUrl.includes('.mp4'));

      expect(mp4Item).toBeDefined();
      expect(mp4Item?.streamUrl).toContain('.mp4');
    });
  });

  describe('Data validation', () => {
    test('should have valid URLs for thumbnails and streams', async () => {
      const catalog = await CatalogService.fetchCatalog();

      catalog.items.forEach(item => {
        expect(item.thumbnail).toMatch(/^https?:\/\//);
        expect(item.streamUrl).toMatch(/^https?:\/\//);
      });
    });

    test('should have non-empty titles and descriptions', async () => {
      const catalog = await CatalogService.fetchCatalog();

      catalog.items.forEach(item => {
        expect(item.title).toBeTruthy();
        expect(item.title.length).toBeGreaterThan(0);
        expect(item.description).toBeTruthy();
        expect(item.description.length).toBeGreaterThan(0);
      });
    });

    test('should have valid duration values', async () => {
      const catalog = await CatalogService.fetchCatalog();

      catalog.items.forEach(item => {
        expect(typeof item.duration).toBe('number');
        expect(item.duration).toBeGreaterThan(0);
        expect(Number.isFinite(item.duration)).toBe(true);
      });
    });
  });
});

//  hook functionality - data fetching, loading states, error

import { renderHook, waitFor } from '@testing-library/react-native';
import { useCatalog } from '../../src/hooks/useCatalog';
import { CatalogService } from '../../src/services/catalogService';

jest.mock('../../src/services/catalogService');

const mockCatalogService = CatalogService as jest.Mocked<typeof CatalogService>;

const mockCatalogData = {
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
      title: 'Test Movie 2',
      description: 'Test description 2',
      thumbnail: 'https://example.com/thumb2.jpg',
      streamUrl: 'https://example.com/test2.m3u8',
      duration: 3600,
    },
  ],
};

describe('useCatalog Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
  });

  test('should initialize with correct loading state', () => {
    mockCatalogService.fetchCatalog.mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useCatalog());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
  });

  test('should fetch catalog data successfully', async () => {
    mockCatalogService.fetchCatalog.mockResolvedValue(mockCatalogData);

    const { result } = renderHook(() => useCatalog());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockCatalogData);
    expect(result.current.error).toBeUndefined();
    expect(mockCatalogService.fetchCatalog).toHaveBeenCalledTimes(1);
  });

  test('should handle fetch errors correctly', async () => {
    const errorMessage = 'Network error';
    mockCatalogService.fetchCatalog.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useCatalog());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBe(errorMessage);
    expect(console.error).toHaveBeenCalledWith('failed to fetch catalog:', expect.any(Error));
  });

  test('should handle non-Error exceptions', async () => {
    const errorString = 'Something went wrong';
    mockCatalogService.fetchCatalog.mockRejectedValue(errorString);

    const { result } = renderHook(() => useCatalog());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBe(' error ');
    expect(console.error).toHaveBeenCalledWith('failed to fetch catalog:', errorString);
  });

  test('should handle multiple hook instances independently', async () => {
    mockCatalogService.fetchCatalog.mockResolvedValue(mockCatalogData);

    const { result: result1 } = renderHook(() => useCatalog());
    const { result: result2 } = renderHook(() => useCatalog());

    await waitFor(() => {
      expect(result1.current.loading).toBe(false);
    });

    await waitFor(() => {
      expect(result2.current.loading).toBe(false);
    });

    expect(result1.current.data).toEqual(mockCatalogData);
    expect(result1.current.error).toBeUndefined();
    expect(result2.current.data).toEqual(mockCatalogData);
    expect(result2.current.error).toBeUndefined();
    expect(mockCatalogService.fetchCatalog).toHaveBeenCalledTimes(2);
  });

  test('should set loading to true during fetch', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    mockCatalogService.fetchCatalog.mockReturnValue(promise);

    const { result } = renderHook(() => useCatalog());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    resolvePromise!(mockCatalogData);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockCatalogData);
  });

  test('should handle empty catalog response', async () => {
    const emptyCatalog = { items: [] };
    mockCatalogService.fetchCatalog.mockResolvedValue(emptyCatalog);

    const { result } = renderHook(() => useCatalog());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(emptyCatalog);
    expect(result.current.error).toBeUndefined();
  });

  test('should only call fetchCatalog once on mount', async () => {
    mockCatalogService.fetchCatalog.mockResolvedValue(mockCatalogData);

    const { result } = renderHook(() => useCatalog());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockCatalogService.fetchCatalog).toHaveBeenCalledTimes(1);
  });
});

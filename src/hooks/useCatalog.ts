import { useState, useEffect } from 'react';
import { CatalogResponse, ApiResponse } from '../types';
import { CatalogService } from '../services/catalogService';


export const useCatalog = (): ApiResponse<CatalogResponse> => {
  const [data, setData] = useState<CatalogResponse | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  const fetchCatalog = async () => {
    try {
      setLoading(true);
      setError(undefined);

      const catalogData = await CatalogService.fetchCatalog();
      setData(catalogData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ' error '
      setError(errorMessage);
      console.error('failed to fetch catalog:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  return {
    data,
    error,
    loading,
  };
};

// src/hooks/useWPS.ts
import { useState, useEffect, useCallback } from "react";
import {
  WPSProduct,
  WPSVehicleMake,
  WPSVehicleModel,
  WPSVehicleYear,
  WPSCursor,
  WPSCursorMeta,
  ProductFilters,
  CursorPaginatedResult,
} from "@/lib/wps-client";

// Generic API response type for cursor pagination
interface CursorApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: WPSCursorMeta;
}

// Enhanced hook for cursor-based API calls
function useCursorPaginatedApi<T>(
  endpoint: string,
  dependencies: any[] = [],
  initialPageSize: number = 24,
): CursorPaginatedResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<WPSCursor | null>(null);
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);
  const [pageSize] = useState<number>(initialPageSize);

  const fetchData = useCallback(
    async (requestCursor: string | null = null) => {
      try {
        setLoading(true);
        setError(null);

        // Add cursor parameter to endpoint if provided
        const url = new URL(endpoint, window.location.origin);
        if (requestCursor) {
          url.searchParams.set("cursor", requestCursor);
        }
        if (pageSize !== 24) {
          url.searchParams.set("pageSize", String(pageSize));
        }

        const response = await fetch(url.toString());
        const result: CursorApiResponse<T> = await response.json();

        if (result.success && result.data) {
          setData(result.data);

          // Set cursor information
          if (result.meta?.cursor) {
            setCursor(result.meta.cursor);
            setCurrentCursor(result.meta.cursor.current);
          }
        } else {
          setError(result.error || "Failed to fetch data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    },
    [endpoint, pageSize, ...dependencies],
  );

  const goToNextPage = useCallback(() => {
    if (cursor?.next) {
      fetchData(cursor.next);
    }
  }, [cursor, fetchData]);

  const goToPrevPage = useCallback(() => {
    if (cursor?.prev) {
      fetchData(cursor.prev);
    }
  }, [cursor, fetchData]);

  const goToFirstPage = useCallback(() => {
    setCurrentCursor(null);
    fetchData(null);
  }, [fetchData]);

  const resetPagination = useCallback(() => {
    setCurrentCursor(null);
    setCursor(null);
    fetchData(null);
  }, [fetchData]);

  useEffect(() => {
    fetchData(currentCursor);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    cursor,
    hasNextPage: cursor?.next !== null,
    hasPrevPage: cursor?.prev !== null,
    refetch: () => fetchData(currentCursor),
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    resetPagination,
  };
}

// Products Hook with Cursor Pagination
export function useProducts(filters: ProductFilters = {}) {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.category) params.set("category", filters.category);
  if (filters.vehicleId) params.set("vehicleId", filters.vehicleId);
  if (filters.brandId) params.set("brandId", filters.brandId);
  if (filters.pageSize) params.set("pageSize", String(filters.pageSize));
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);

  const endpoint = `/api/wps/products${params.toString() ? `?${params.toString()}` : ""}`;

  const result = useCursorPaginatedApi<WPSProduct[]>(
    endpoint,
    [
      filters.search,
      filters.category,
      filters.vehicleId,
      filters.brandId,
      filters.pageSize,
      filters.sortBy,
      filters.sortOrder,
    ],
    filters.pageSize || 24,
  );

  return {
    ...result,
    // Additional computed properties for products
    productCount: result.data?.length || 0,
    isEmpty: result.data?.length === 0,
  };
}

// Single Product Hook (no pagination needed)
export function useProduct(sku: string) {
  const [data, setData] = useState<WPSProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!sku) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/wps/products/${sku}`);
      const result: CursorApiResponse<WPSProduct> = await response.json();

      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || "Failed to fetch product");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [sku]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    product: data,
    loading: loading && !!sku,
    error: sku ? error : null,
    refetch: fetchData,
  };
}

// Vehicle Makes Hook (typically doesn't need pagination)
export function useVehicleMakes() {
  const [data, setData] = useState<WPSVehicleMake[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/wps/vehicles/makes");
      const result: CursorApiResponse<WPSVehicleMake[]> = await response.json();

      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || "Failed to fetch vehicle makes");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Vehicle Models Hook
export function useVehicleModels(makeId?: string) {
  const endpoint = makeId
    ? `/api/wps/vehicles/models?makeId=${makeId}`
    : "/api/wps/vehicles/models";

  const [data, setData] = useState<WPSVehicleModel[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!makeId) {
      setData(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(endpoint);
      const result: CursorApiResponse<WPSVehicleModel[]> =
        await response.json();

      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || "Failed to fetch vehicle models");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [makeId, endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Vehicle Years Hook
export function useVehicleYears(modelId?: string) {
  const endpoint = modelId
    ? `/api/wps/vehicles/years?modelId=${modelId}`
    : "/api/wps/vehicles/years";

  const [data, setData] = useState<WPSVehicleYear[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!modelId) {
      setData(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(endpoint);
      const result: CursorApiResponse<WPSVehicleYear[]> = await response.json();

      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || "Failed to fetch vehicle years");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [modelId, endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Vehicle Products Hook with Cursor Pagination
export function useVehicleProducts(vehicleId?: string, pageSize: number = 24) {
  const endpoint = vehicleId ? `/api/wps/vehicles/${vehicleId}/products` : "";

  const result = useCursorPaginatedApi<WPSProduct[]>(
    endpoint,
    [vehicleId],
    pageSize,
  );

  return {
    ...result,
    // Don't return data if no vehicleId
    data: vehicleId ? result.data : null,
    loading: vehicleId ? result.loading : false,
    error: vehicleId ? result.error : null,
  };
}

// WPS Connection Test Hook
export function useWPSConnection() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const testConnection = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/wps/test-connection");
      const result: CursorApiResponse<any> = await response.json();

      setIsConnected(result.success);
      if (!result.success) {
        setError(result.message || "Connection test failed");
      }
    } catch (err) {
      setIsConnected(false);
      setError(err instanceof Error ? err.message : "Connection test failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    testConnection();
  }, [testConnection]);

  return { isConnected, loading, error, testConnection };
}

// Search Hook with debouncing and cursor pagination
export function useProductSearch(query: string, delay: number = 500) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    setIsDebouncing(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsDebouncing(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  const result = useProducts({
    search: debouncedQuery,
    pageSize: 12,
  });

  return {
    ...result,
    loading: result.loading || isDebouncing,
    isDebouncing,
  };
}

// Hook for infinite scrolling with cursor pagination
export function useInfiniteProducts(filters: ProductFilters = {}) {
  const [allProducts, setAllProducts] = useState<WPSProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<WPSCursor | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (filters.search) params.set("search", filters.search);
      if (filters.category) params.set("category", filters.category);
      if (filters.vehicleId) params.set("vehicleId", filters.vehicleId);
      if (filters.brandId) params.set("brandId", filters.brandId);
      if (filters.pageSize) params.set("pageSize", String(filters.pageSize));
      if (filters.sortBy) params.set("sortBy", filters.sortBy);
      if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);

      // Add cursor for next page
      if (cursor?.next) {
        params.set("cursor", cursor.next);
      }

      const endpoint = `/api/wps/products${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await fetch(endpoint);
      const result: CursorApiResponse<WPSProduct[]> = await response.json();

      if (result.success && result.data) {
        if (cursor?.next) {
          // Append to existing products
          setAllProducts((prev) => [...prev, ...result.data!]);
        } else {
          // First load or reset
          setAllProducts(result.data);
        }

        // Update cursor and check if there are more items
        if (result.meta?.cursor) {
          setCursor(result.meta.cursor);
          setHasMore(result.meta.cursor.next !== null);
        } else {
          setHasMore(false);
        }
      } else {
        setError(result.error || "Failed to fetch products");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, cursor, filters]);

  const reset = useCallback(() => {
    setAllProducts([]);
    setCursor(null);
    setHasMore(true);
    setError(null);
  }, []);

  // Load initial data when filters change
  useEffect(() => {
    reset();
    loadMore();
  }, [
    filters.search,
    filters.category,
    filters.vehicleId,
    filters.brandId,
    filters.sortBy,
    filters.sortOrder,
  ]);

  return {
    products: allProducts,
    loading,
    error,
    hasMore,
    loadMore,
    reset,
    totalLoaded: allProducts.length,
  };
}

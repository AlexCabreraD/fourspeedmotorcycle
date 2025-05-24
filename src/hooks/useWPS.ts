// src/hooks/useWPS.ts
import { useState, useEffect, useCallback } from "react";
import {
  WPSProduct,
  WPSVehicleMake,
  WPSVehicleModel,
  WPSVehicleYear,
  WPSPaginationMeta,
  WPSPaginationLinks,
  ProductFilters,
} from "@/lib/wps-client";

// Generic API response type
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: WPSPaginationMeta;
  links?: WPSPaginationLinks;
}

// Pagination result type
interface PaginatedResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  } | null;
  refetch: () => Promise<void>;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

// Enhanced hook for paginated API calls
function usePaginatedApi<T>(
  endpoint: string,
  dependencies: any[] = [],
  initialPage: number = 1,
): PaginatedResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [pagination, setPagination] =
    useState<PaginatedResult<T>["pagination"]>(null);

  const fetchData = useCallback(
    async (page: number = currentPage) => {
      try {
        setLoading(true);
        setError(null);

        // Add page parameter to endpoint
        const url = new URL(endpoint, window.location.origin);
        if (page > 1) {
          url.searchParams.set("page", String(page));
        }

        const response = await fetch(url.toString());
        const result: ApiResponse<T> = await response.json();

        if (result.success && result.data) {
          setData(result.data);

          // Extract pagination info
          if (result.meta) {
            setPagination({
              currentPage: result.meta.current_page,
              totalPages: result.meta.last_page,
              totalItems: result.meta.total,
              itemsPerPage: result.meta.per_page,
              hasNextPage: result.meta.current_page < result.meta.last_page,
              hasPrevPage: result.meta.current_page > 1,
            });
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
    [endpoint, currentPage, ...dependencies],
  );

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      fetchData(page);
    },
    [fetchData],
  );

  const nextPage = useCallback(() => {
    if (pagination?.hasNextPage) {
      goToPage(currentPage + 1);
    }
  }, [pagination, currentPage, goToPage]);

  const prevPage = useCallback(() => {
    if (pagination?.hasPrevPage) {
      goToPage(currentPage - 1);
    }
  }, [pagination, currentPage, goToPage]);

  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    pagination,
    refetch: () => fetchData(currentPage),
    goToPage,
    nextPage,
    prevPage,
  };
}

// Products Hook with Pagination
export function useProducts(filters: ProductFilters = {}) {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.category) params.set("category", filters.category);
  if (filters.vehicleId) params.set("vehicleId", filters.vehicleId);
  if (filters.brandId) params.set("brandId", filters.brandId);
  if (filters.limit) params.set("limit", String(filters.limit));
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);

  const endpoint = `/api/wps/products${params.toString() ? `?${params.toString()}` : ""}`;

  return usePaginatedApi<WPSProduct[]>(
    endpoint,
    [
      filters.search,
      filters.category,
      filters.vehicleId,
      filters.brandId,
      filters.limit,
      filters.sortBy,
      filters.sortOrder,
    ],
    filters.page || 1,
  );
}

// Single Product Hook
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
      const result: ApiResponse<WPSProduct> = await response.json();

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

// Vehicle Makes Hook (no pagination needed - typically small dataset)
export function useVehicleMakes() {
  const [data, setData] = useState<WPSVehicleMake[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/wps/vehicles/makes");
      const result: ApiResponse<WPSVehicleMake[]> = await response.json();

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
      const result: ApiResponse<WPSVehicleModel[]> = await response.json();

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
      const result: ApiResponse<WPSVehicleYear[]> = await response.json();

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

// Vehicle Products Hook with Pagination
export function useVehicleProducts(vehicleId?: string, page: number = 1) {
  const endpoint = vehicleId ? `/api/wps/vehicles/${vehicleId}/products` : "";

  return usePaginatedApi<WPSProduct[]>(endpoint, [vehicleId], page);
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
      const result: ApiResponse<any> = await response.json();

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

// Search Hook with debouncing and pagination
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
    limit: 12,
  });

  return {
    ...result,
    loading: result.loading || isDebouncing,
    isDebouncing,
  };
}

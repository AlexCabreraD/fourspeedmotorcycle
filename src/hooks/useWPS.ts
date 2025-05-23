// src/hooks/useWPS.ts
import { useState, useEffect, useCallback } from "react";
import {
  WPSProduct,
  WPSVehicleMake,
  WPSVehicleModel,
  WPSVehicleYear,
  ProductFilters,
} from "@/lib/wps-client";

// Generic API response type
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    total?: number;
    page?: number;
    perPage?: number;
  };
}

// Generic hook for API calls
function useApi<T>(endpoint: string, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(endpoint);
      const result: ApiResponse<T> = await response.json();

      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || "Failed to fetch data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Products Hook
export function useProducts(filters: ProductFilters = {}) {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.category) params.set("category", filters.category);
  if (filters.vehicleId) params.set("vehicleId", filters.vehicleId);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));

  const endpoint = `/api/wps/products${params.toString() ? `?${params.toString()}` : ""}`;

  return useApi<WPSProduct[]>(endpoint, [
    filters.search,
    filters.category,
    filters.vehicleId,
    filters.page,
    filters.limit,
  ]);
}

// Single Product Hook
export function useProduct(sku: string) {
  const endpoint = sku ? `/api/wps/products/${sku}` : "";
  const { data, loading, error, refetch } = useApi<WPSProduct>(endpoint, [sku]);

  return {
    product: data,
    loading: loading && !!sku,
    error: sku ? error : null,
    refetch,
  };
}

// Vehicle Makes Hook
export function useVehicleMakes() {
  return useApi<WPSVehicleMake[]>("/api/wps/vehicles/makes");
}

// Vehicle Models Hook
export function useVehicleModels(makeId?: string) {
  const endpoint = makeId
    ? `/api/wps/vehicles/models?makeId=${makeId}`
    : "/api/wps/vehicles/models";

  return useApi<WPSVehicleModel[]>(endpoint, [makeId]);
}

// Vehicle Years Hook
export function useVehicleYears(modelId?: string) {
  const endpoint = modelId
    ? `/api/wps/vehicles/years?modelId=${modelId}`
    : "/api/wps/vehicles/years";

  return useApi<WPSVehicleYear[]>(endpoint, [modelId]);
}

// Vehicle Products Hook
export function useVehicleProducts(vehicleId?: string) {
  const endpoint = vehicleId ? `/api/wps/vehicles/${vehicleId}/products` : "";
  const { data, loading, error, refetch } = useApi<WPSProduct[]>(endpoint, [
    vehicleId,
  ]);

  return {
    data,
    loading: loading && !!vehicleId,
    error: vehicleId ? error : null,
    refetch,
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

// Search Hook with debouncing
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

  const {
    data: products,
    loading,
    error,
    refetch,
  } = useProducts({
    search: debouncedQuery,
    limit: 12,
  });

  return {
    products,
    loading: loading || isDebouncing,
    error,
    refetch,
    isDebouncing,
  };
}

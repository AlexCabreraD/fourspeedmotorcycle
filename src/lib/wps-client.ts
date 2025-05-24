// src/lib/wps-client.ts
import { z } from "zod";

// Environment variables validation
const wpsConfigSchema = z.object({
  apiUrl: z.string().url(),
  apiToken: z.string(),
});

const getWPSConfig = () => {
  const config = {
    apiUrl: process.env.WPS_API_URL || process.env.NEXT_PUBLIC_WPS_API_URL,
    apiToken:
      process.env.WPS_API_TOKEN || process.env.NEXT_PUBLIC_WPS_API_TOKEN,
  };

  try {
    return wpsConfigSchema.parse(config);
  } catch (error) {
    throw new Error(
      "WPS API configuration is missing or invalid. Please check your environment variables.",
    );
  }
};

// Updated type definitions based on actual WPS API response
export interface WPSProduct {
  id: string;
  sku: string;
  name: string;
  description?: string;
  price: number;
  listPrice?: number;
  dealerPrice?: number;
  brand?: string;
  brandId?: string;
  category?: string;
  productType?: string;
  images?: string[];
  inventory?: {
    quantity: number;
    inStock: boolean;
  };
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    weight?: number;
  };
  upc?: string;
  status?: string;
  mappPrice?: number;
  dropShipEligible?: boolean;
}

export interface WPSVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  engineSize?: string;
  vehicleType?: string;
}

export interface WPSVehicleMake {
  id: string;
  name: string;
}

export interface WPSVehicleModel {
  id: string;
  name: string;
  makeId: string;
}

export interface WPSVehicleYear {
  id: string;
  year: number;
  modelId: string;
}

// Proper WPS Pagination Types (based on documentation)
export interface WPSPaginationLinks {
  first?: string;
  last?: string;
  prev?: string;
  next?: string;
}

export interface WPSPaginationMeta {
  current_page: number;
  from?: number;
  last_page: number;
  path: string;
  per_page: number;
  to?: number;
  total: number;
}

export interface WPSApiResponse<T> {
  data: T;
  links?: WPSPaginationLinks;
  meta?: WPSPaginationMeta;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  vehicleId?: string;
  brandId?: string;
  productType?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// WPS API Raw Response Types (based on actual API structure)
interface WPSRawItem {
  id: number;
  brand_id: number;
  product_id: number;
  sku: string;
  name: string;
  list_price: string;
  standard_dealer_price: string;
  supplier_product_id?: string;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  upc?: string;
  status_id: string;
  status: string;
  product_type?: string;
  mapp_price: string;
  drop_ship_eligible: boolean;
  drop_ship_fee?: string;
  created_at: string;
  updated_at: string;
}

interface WPSRawImage {
  id: number;
  item_id: number;
  url: string;
  alt_text?: string;
  sort_order?: number;
}

// Main WPS API Client Class
export class WPSClient {
  private baseURL: string;
  private token: string;

  constructor() {
    const config = getWPSConfig();
    this.baseURL = config.apiUrl;
    this.token = config.apiToken;
  }

  // Generic fetch method with error handling
  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(
          `WPS API Error: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("WPS API fetch error:", error);
      throw error;
    }
  }

  // PRODUCT METHODS WITH PROPER PAGINATION
  async getProducts(
    filters: ProductFilters = {},
  ): Promise<WPSApiResponse<WPSProduct[]>> {
    const params = new URLSearchParams();

    // Add filters based on WPS API documentation
    if (filters.search) {
      params.set("search", filters.search);
    }
    if (filters.category || filters.productType) {
      params.set(
        "filter[product_type]",
        filters.category || filters.productType!,
      );
    }
    if (filters.brandId) {
      params.set("filter[brand_id]", filters.brandId);
    }

    // CORRECT WPS PAGINATION FORMAT
    params.set("page[size]", String(filters.limit || 24));
    if (filters.page && filters.page > 1) {
      params.set("page[number]", String(filters.page));
    }

    // Sorting (if supported by WPS API)
    if (filters.sortBy) {
      const sortDirection = filters.sortOrder === "desc" ? "-" : "";
      params.set("sort", `${sortDirection}${filters.sortBy}`);
    }

    // Always include inventory and images
    params.set("include", "inventory,images,brand");

    const queryString = params.toString();
    const endpoint = `/items${queryString ? `?${queryString}` : ""}`;

    console.log("WPS API Request:", `${this.baseURL}${endpoint}`);

    const response = await this.fetch<WPSApiResponse<WPSRawItem[]>>(endpoint);

    // Transform products with images
    const transformedProducts = await Promise.all(
      response.data.map(async (item) => {
        // Try to get images from included data first, then fetch separately if needed
        const images = await this.getProductImages(item.id.toString()).catch(
          () => [],
        );
        return transformWPSProduct(item, images);
      }),
    );

    return {
      data: transformedProducts,
      links: response.links,
      meta: response.meta,
    };
  }

  async getProductBySKU(sku: string): Promise<WPSProduct> {
    // Use filter approach for SKU search
    const params = new URLSearchParams();
    params.set("filter[sku]", sku);
    params.set("page[size]", "1");
    params.set("include", "inventory,images,brand");

    const response = await this.fetch<WPSApiResponse<WPSRawItem[]>>(
      `/items?${params.toString()}`,
    );

    if (!response.data || response.data.length === 0) {
      throw new Error(`Product with SKU ${sku} not found`);
    }

    const item = response.data[0];
    const images = await this.getProductImages(item.id.toString()).catch(
      () => [],
    );

    return transformWPSProduct(item, images);
  }

  async getProductById(id: string): Promise<WPSProduct> {
    const params = new URLSearchParams();
    params.set("include", "inventory,images,brand");

    const response = await this.fetch<WPSRawItem>(
      `/items/${id}?${params.toString()}`,
    );
    const images = await this.getProductImages(id).catch(() => []);

    return transformWPSProduct(response, images);
  }

  async getProductImages(itemId: string): Promise<WPSRawImage[]> {
    try {
      const response = await this.fetch<WPSApiResponse<WPSRawImage[]>>(
        `/items/${itemId}/images`,
      );
      return response.data || [];
    } catch (error) {
      console.warn(`Failed to fetch images for item ${itemId}:`, error);
      return [];
    }
  }

  async getMultipleProducts(ids: string[]): Promise<WPSProduct[]> {
    // Use filter for multiple IDs
    const params = new URLSearchParams();
    params.set("filter[id]", ids.join(","));
    params.set("include", "inventory,images,brand");
    params.set("page[size]", String(ids.length));

    const response = await this.fetch<WPSApiResponse<WPSRawItem[]>>(
      `/items?${params.toString()}`,
    );

    // Fetch images for all products in parallel
    const productsWithImages = await Promise.all(
      response.data.map(async (item) => {
        const images = await this.getProductImages(item.id.toString()).catch(
          () => [],
        );
        return transformWPSProduct(item, images);
      }),
    );

    return productsWithImages;
  }

  // VEHICLE METHODS WITH PROPER PAGINATION
  async getVehicleMakes(): Promise<WPSVehicleMake[]> {
    const params = new URLSearchParams();
    params.set("page[size]", "1000"); // Get all makes

    const response = await this.fetch<WPSApiResponse<any[]>>(
      `/vehiclemakes?${params.toString()}`,
    );
    return response.data.map((make: any) => ({
      id: make.id.toString(),
      name: make.name,
    }));
  }

  async getVehicleModels(makeId?: string): Promise<WPSVehicleModel[]> {
    const params = new URLSearchParams();
    params.set("page[size]", "1000"); // Get all models

    if (makeId) {
      params.set("filter[make_id]", makeId);
    }

    const response = await this.fetch<WPSApiResponse<any[]>>(
      `/vehiclemodels?${params.toString()}`,
    );
    return response.data.map((model: any) => ({
      id: model.id.toString(),
      name: model.name,
      makeId: model.make_id.toString(),
    }));
  }

  async getVehicleYears(modelId?: string): Promise<WPSVehicleYear[]> {
    const params = new URLSearchParams();
    params.set("page[size]", "1000"); // Get all years

    if (modelId) {
      params.set("filter[model_id]", modelId);
    }

    const response = await this.fetch<WPSApiResponse<any[]>>(
      `/vehicleyears?${params.toString()}`,
    );
    return response.data.map((year: any) => ({
      id: year.id.toString(),
      year: parseInt(year.year),
      modelId: year.model_id.toString(),
    }));
  }

  async getVehicles(
    page: number = 1,
    limit: number = 50,
  ): Promise<WPSApiResponse<WPSVehicle[]>> {
    const params = new URLSearchParams();
    params.set("page[size]", String(limit));
    if (page > 1) {
      params.set("page[number]", String(page));
    }

    const response = await this.fetch<WPSApiResponse<any[]>>(
      `/vehicles?${params.toString()}`,
    );

    return {
      data: response.data.map(transformWPSVehicle),
      links: response.links,
      meta: response.meta,
    };
  }

  async getItemsByVehicle(
    vehicleId: string,
    page: number = 1,
    limit: number = 24,
  ): Promise<WPSApiResponse<WPSProduct[]>> {
    const params = new URLSearchParams();
    params.set("page[size]", String(limit));
    if (page > 1) {
      params.set("page[number]", String(page));
    }
    params.set("include", "inventory,images,brand");

    const response = await this.fetch<WPSApiResponse<WPSRawItem[]>>(
      `/vehicles/${vehicleId}/items?${params.toString()}`,
    );

    // Fetch images for all products
    const productsWithImages = await Promise.all(
      response.data.map(async (item) => {
        const images = await this.getProductImages(item.id.toString()).catch(
          () => [],
        );
        return transformWPSProduct(item, images);
      }),
    );

    return {
      data: productsWithImages,
      links: response.links,
      meta: response.meta,
    };
  }

  // VEHICLE COMPATIBILITY
  async checkVehicleCompatibility(
    sku: string,
    vehicleId: string,
  ): Promise<boolean> {
    try {
      const vehicleItemsResponse = await this.getItemsByVehicle(
        vehicleId,
        1,
        1000,
      ); // Get many items to check
      return vehicleItemsResponse.data.some((item) => item.sku === sku);
    } catch (error) {
      console.error("Error checking vehicle compatibility:", error);
      return false;
    }
  }

  // UTILITY METHODS
  async testConnection(): Promise<boolean> {
    try {
      const params = new URLSearchParams();
      params.set("page[size]", "1");
      await this.fetch(`/vehiclemakes?${params.toString()}`);
      return true;
    } catch (error) {
      console.error("WPS API connection test failed:", error);
      return false;
    }
  }
}

// Create singleton instance
export const wpsClient = new WPSClient();

// Helper functions for data transformation
export function transformWPSProduct(
  wpsData: WPSRawItem,
  images: WPSRawImage[] = [],
): WPSProduct {
  return {
    id: wpsData.id.toString(),
    sku: wpsData.sku,
    name: wpsData.name,
    description: wpsData.supplier_product_id || "",
    price: parseFloat(wpsData.standard_dealer_price || "0"),
    listPrice: parseFloat(wpsData.list_price || "0"),
    dealerPrice: parseFloat(wpsData.standard_dealer_price || "0"),
    brand: "", // Will need to fetch from brand endpoint if needed
    brandId: wpsData.brand_id.toString(),
    category: wpsData.product_type || "",
    productType: wpsData.product_type || "",
    images: images.map((img) => img.url),
    inventory: {
      quantity: wpsData.status === "Active" ? 1 : 0,
      inStock: wpsData.status === "Active",
    },
    dimensions: {
      length: wpsData.length,
      width: wpsData.width,
      height: wpsData.height,
      weight: wpsData.weight,
    },
    upc: wpsData.upc || undefined,
    status: wpsData.status,
    mappPrice: parseFloat(wpsData.mapp_price || "0"),
    dropShipEligible: wpsData.drop_ship_eligible,
  };
}

export function transformWPSVehicle(wpsData: any): WPSVehicle {
  return {
    id: wpsData.id?.toString() || "",
    make: wpsData.make || "",
    model: wpsData.model || "",
    year: parseInt(wpsData.year) || 0,
    engineSize: wpsData.engine_size || wpsData.engineSize || "",
    vehicleType: wpsData.vehicle_type || wpsData.type || "",
  };
}

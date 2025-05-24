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

export interface WPSApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      total?: number;
      count?: number;
      per_page?: number;
      current_page?: number;
      total_pages?: number;
    };
  };
}

export interface ProductFilters {
  category?: string;
  search?: string;
  vehicleId?: string;
  brandId?: string;
  productType?: string;
  page?: number;
  limit?: number;
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

  // PRODUCT METHODS
  async getProducts(
    filters: ProductFilters = {},
  ): Promise<WPSApiResponse<WPSProduct[]>> {
    const params = new URLSearchParams();

    // Add filters based on WPS API documentation
    if (filters.search) {
      params.set("search", filters.search);
    }
    if (filters.category || filters.productType) {
      params.set("product_type", filters.category || filters.productType!);
    }
    if (filters.brandId) {
      params.set("brand_id", filters.brandId);
    }

    // // Pagination
    params.set("per_page", String(filters.limit || 24));
    if (filters.page) {
      params.set("page", String(filters.page));
    }

    const queryString = params.toString();
    const endpoint = `/items${queryString ? `?${queryString}` : ""}`;

    const response = await this.fetch<{ data: WPSRawItem[] }>(endpoint);

    // Transform and fetch images for each product
    const transformedProducts = await Promise.all(
      response.data.map(async (item) => {
        const images = await this.getProductImages(item.id.toString());
        return transformWPSProduct(item, images);
      }),
    );

    return {
      data: transformedProducts,
      meta: {
        pagination: {
          total: response.data.length, // WPS API doesn't provide total in this format
          current_page: filters.page || 1,
          per_page: filters.limit || 24,
        },
      },
    };
  }

  async getProductBySKU(sku: string): Promise<WPSProduct> {
    // First, search for the product by SKU
    const searchResponse = await this.fetch<{ data: WPSRawItem[] }>(
      `/items?sku=${sku}`,
    );

    if (!searchResponse.data || searchResponse.data.length === 0) {
      throw new Error(`Product with SKU ${sku} not found`);
    }

    const item = searchResponse.data[0];
    const images = await this.getProductImages(item.id.toString());

    return transformWPSProduct(item, images);
  }

  async getProductById(id: string): Promise<WPSProduct> {
    const response = await this.fetch<WPSRawItem>(`/items/${id}`);
    const images = await this.getProductImages(id);

    return transformWPSProduct(response, images);
  }

  async getProductImages(itemId: string): Promise<WPSRawImage[]> {
    try {
      const response = await this.fetch<{ data: WPSRawImage[] }>(
        `/items/${itemId}/images`,
      );
      return response.data || [];
    } catch (error) {
      console.warn(`Failed to fetch images for item ${itemId}:`, error);
      return [];
    }
  }

  async getMultipleProducts(ids: string[]): Promise<WPSProduct[]> {
    const idsString = ids.join(",");
    const response = await this.fetch<{ data: WPSRawItem[] }>(
      `/items/${idsString}`,
    );

    // Fetch images for all products in parallel
    const productsWithImages = await Promise.all(
      response.data.map(async (item) => {
        const images = await this.getProductImages(item.id.toString());
        return transformWPSProduct(item, images);
      }),
    );

    return productsWithImages;
  }

  async getProductVehicles(itemId: string): Promise<WPSVehicle[]> {
    try {
      const response = await this.fetch<{ data: any[] }>(
        `/items/${itemId}/vehicles`,
      );
      return response.data.map(transformWPSVehicle);
    } catch (error) {
      console.warn(`Failed to fetch vehicles for item ${itemId}:`, error);
      return [];
    }
  }

  // VEHICLE METHODS
  async getVehicleMakes(): Promise<WPSVehicleMake[]> {
    const response = await this.fetch<{ data: any[] }>("/vehiclemakes");
    return response.data.map((make: any) => ({
      id: make.id.toString(),
      name: make.name,
    }));
  }

  async getVehicleModels(makeId?: string): Promise<WPSVehicleModel[]> {
    const params = new URLSearchParams();
    if (makeId) {
      params.set("make_id", makeId);
    }

    const queryString = params.toString();
    const endpoint = `/vehiclemodels${queryString ? `?${queryString}` : ""}`;

    const response = await this.fetch<{ data: any[] }>(endpoint);
    return response.data.map((model: any) => ({
      id: model.id.toString(),
      name: model.name,
      makeId: model.make_id.toString(),
    }));
  }

  async getVehicleYears(modelId?: string): Promise<WPSVehicleYear[]> {
    const params = new URLSearchParams();
    if (modelId) {
      params.set("model_id", modelId);
    }

    const queryString = params.toString();
    const endpoint = `/vehicleyears${queryString ? `?${queryString}` : ""}`;

    const response = await this.fetch<{ data: any[] }>(endpoint);
    return response.data.map((year: any) => ({
      id: year.id.toString(),
      year: parseInt(year.year),
      modelId: year.model_id.toString(),
    }));
  }

  async getVehicles(): Promise<WPSVehicle[]> {
    const response = await this.fetch<{ data: any[] }>("/vehicles");
    return response.data.map(transformWPSVehicle);
  }

  async getItemsByVehicle(vehicleId: string): Promise<WPSProduct[]> {
    const response = await this.fetch<{ data: WPSRawItem[] }>(
      `/vehicles/${vehicleId}/items`,
    );

    // Fetch images for all products
    const productsWithImages = await Promise.all(
      response.data.map(async (item) => {
        const images = await this.getProductImages(item.id.toString());
        return transformWPSProduct(item, images);
      }),
    );

    return productsWithImages;
  }

  // VEHICLE COMPATIBILITY
  async checkVehicleCompatibility(
    sku: string,
    vehicleId: string,
  ): Promise<boolean> {
    try {
      const vehicleItems = await this.getItemsByVehicle(vehicleId);
      return vehicleItems.some((item) => item.sku === sku);
    } catch (error) {
      console.error("Error checking vehicle compatibility:", error);
      return false;
    }
  }

  // UTILITY METHODS
  async testConnection(): Promise<boolean> {
    try {
      await this.fetch("/vehiclemakes?per_page=1");
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
    description: wpsData.supplier_product_id || "", // Use supplier product ID as description for now
    price: parseFloat(wpsData.standard_dealer_price || "0"),
    listPrice: parseFloat(wpsData.list_price || "0"),
    dealerPrice: parseFloat(wpsData.standard_dealer_price || "0"),
    brand: "", // Will need to fetch from brand endpoint if needed
    brandId: wpsData.brand_id.toString(),
    category: wpsData.product_type || "",
    productType: wpsData.product_type || "",
    images: images.map((img) => img.url),
    inventory: {
      quantity: wpsData.status === "Active" ? 1 : 0, // Simplified - WPS doesn't provide quantity in this response
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

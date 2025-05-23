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

// Basic type definitions
export interface WPSProduct {
  id: string;
  sku: string;
  name: string;
  description?: string;
  price: number;
  brand?: string;
  category?: string;
  images?: string[];
  inventory?: {
    quantity: number;
    inStock: boolean;
  };
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
    total?: number;
    page?: number;
    perPage?: number;
  };
}

export interface ProductFilters {
  category?: string;
  search?: string;
  vehicleId?: string;
  page?: number;
  limit?: number;
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

    if (filters.search) {
      params.set("filter[name]", filters.search);
    }
    if (filters.category) {
      params.set("filter[category]", filters.category);
    }
    if (filters.vehicleId) {
      params.set("filter[vehicle]", filters.vehicleId);
    }

    // Include related data
    params.set("include", "inventory,images,brand");

    // Pagination
    params.set("page[size]", String(filters.limit || 24));
    if (filters.page) {
      params.set("page[number]", String(filters.page));
    }

    const queryString = params.toString();
    const endpoint = `/items${queryString ? `?${queryString}` : ""}`;

    return this.fetch<WPSApiResponse<WPSProduct[]>>(endpoint);
  }

  async getProductBySKU(sku: string): Promise<WPSProduct> {
    const endpoint = `/items/crutch/${sku}?include=inventory,images,features`;
    const response = await this.fetch<{ data: WPSProduct }>(endpoint);
    return response.data;
  }

  async getInventory(sku: string): Promise<any> {
    const endpoint = `/items/crutch/${sku}/inventory`;
    return this.fetch(endpoint);
  }

  // VEHICLE METHODS
  async getVehicleMakes(): Promise<WPSVehicleMake[]> {
    const response =
      await this.fetch<WPSApiResponse<WPSVehicleMake[]>>("/vehiclemakes");
    return response.data;
  }

  async getVehicleModels(makeId?: string): Promise<WPSVehicleModel[]> {
    const params = new URLSearchParams();
    if (makeId) {
      params.set("filter[make_id]", makeId);
    }

    const queryString = params.toString();
    const endpoint = `/vehiclemodels${queryString ? `?${queryString}` : ""}`;

    const response =
      await this.fetch<WPSApiResponse<WPSVehicleModel[]>>(endpoint);
    return response.data;
  }

  async getVehicleYears(modelId?: string): Promise<WPSVehicleYear[]> {
    const params = new URLSearchParams();
    if (modelId) {
      params.set("filter[model_id]", modelId);
    }

    const queryString = params.toString();
    const endpoint = `/vehicleyears${queryString ? `?${queryString}` : ""}`;

    const response =
      await this.fetch<WPSApiResponse<WPSVehicleYear[]>>(endpoint);
    return response.data;
  }

  async getVehicles(): Promise<WPSVehicle[]> {
    const response =
      await this.fetch<WPSApiResponse<WPSVehicle[]>>("/vehicles");
    return response.data;
  }

  async getItemsByVehicle(vehicleId: string): Promise<WPSProduct[]> {
    const endpoint = `/vehicles/${vehicleId}/items?include=inventory,images,brand`;
    const response = await this.fetch<WPSApiResponse<WPSProduct[]>>(endpoint);
    return response.data;
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
      await this.fetch("/vehiclemakes?page[size]=1");
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
export function transformWPSProduct(wpsData: any): WPSProduct {
  return {
    id: wpsData.id?.toString() || "",
    sku: wpsData.sku || "",
    name: wpsData.name || wpsData.title || "",
    description: wpsData.description || wpsData.summary || "",
    price: parseFloat(wpsData.price || wpsData.retail_price || "0"),
    brand: wpsData.brand?.name || wpsData.manufacturer || "",
    category: wpsData.category?.name || wpsData.primary_category || "",
    images: wpsData.images?.map((img: any) => img.url || img.src) || [],
    inventory: {
      quantity: parseInt(wpsData.inventory?.quantity || "0"),
      inStock: (wpsData.inventory?.quantity || 0) > 0,
    },
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

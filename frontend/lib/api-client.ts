import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import {
  Location,
  Prediction,
  PriorityItem,
  Execution,
  Image,
  Weather,
  Pickup,
  MapData,
  PredictionFilters,
  PaymentRecommendation,
} from './types';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Retry configuration
 */
interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  retryableStatuses: number[];
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  retryableStatuses: [408, 429, 500, 502, 503, 504],
};

/**
 * API Client for CaaS Waste Prediction Backend
 * Handles all HTTP requests to the backend API with retry logic and error handling
 */
class ApiClient {
  private client: AxiosInstance;
  private retryConfig: RetryConfig;

  constructor(retryConfig: Partial<RetryConfig> = {}) {
    this.retryConfig = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
    
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for adding auth tokens, logging, etc.
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('auth_token');
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const config = error.config as AxiosRequestConfig & { _retryCount?: number };
        
        // Initialize retry count
        if (!config._retryCount) {
          config._retryCount = 0;
        }

        // Check if we should retry
        const shouldRetry =
          config._retryCount < this.retryConfig.maxRetries &&
          error.response &&
          this.retryConfig.retryableStatuses.includes(error.response.status);

        if (shouldRetry) {
          config._retryCount++;
          
          // Exponential backoff
          const delay = this.retryConfig.retryDelay * Math.pow(2, config._retryCount - 1);
          await new Promise((resolve) => setTimeout(resolve, delay));
          
          console.log(`Retrying request (attempt ${config._retryCount}/${this.retryConfig.maxRetries})`);
          return this.client.request(config);
        }

        // Handle errors
        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Handle and transform errors into ApiError instances
   */
  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      // Server responded with error status
      const message = (error.response.data as any)?.message || error.message;
      return new ApiError(
        message,
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      // Request made but no response
      return new ApiError('Network error: No response from server');
    } else {
      // Something else happened
      return new ApiError(error.message);
    }
  }

  // Generic GET request
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  // Generic POST request
  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  // Generic PUT request
  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  // Generic DELETE request
  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }

  // Generic PATCH request
  async patch<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.patch<T>(url, data);
    return response.data;
  }

  // ============ Data Ingestion Endpoints ============

  /**
   * Ingest street image
   */
  async ingestImage(formData: FormData): Promise<Image> {
    return this.post<Image>('/ingest/image', formData);
  }

  /**
   * Ingest weather data
   */
  async ingestWeather(data: {
    timestamp: string;
    temperature: number;
    rainfall_probability: number;
    humidity: number;
  }): Promise<Weather> {
    return this.post<Weather>('/ingest/weather', data);
  }

  /**
   * Ingest pickup schedule
   */
  async ingestPickupSchedule(data: {
    location_id: string;
    scheduled_time: string;
    service_type: string;
  }): Promise<Pickup> {
    return this.post<Pickup>('/ingest/pickup_schedule', data);
  }

  // ============ Location Endpoints ============

  /**
   * Get all locations
   */
  async getLocations(wardId?: string): Promise<Location[]> {
    return this.get<Location[]>('/locations', wardId ? { ward_id: wardId } : undefined);
  }

  /**
   * Get location by ID
   */
  async getLocation(locationId: string): Promise<Location> {
    return this.get<Location>(`/locations/${locationId}`);
  }

  // ============ Prediction Endpoints ============

  /**
   * Get predictions with optional filters
   */
  async getPredictions(filters?: PredictionFilters): Promise<Prediction[]> {
    return this.get<Prediction[]>('/predictions', filters);
  }

  /**
   * Get prediction for specific location
   */
  async getPredictionForLocation(
    locationId: string,
    horizons?: number[]
  ): Promise<Prediction[]> {
    return this.get<Prediction[]>(`/predict/${locationId}`, 
      horizons ? { horizons: horizons.join(',') } : undefined
    );
  }

  // ============ Signal Endpoints ============

  /**
   * Get signals for a location
   */
  async getSignals(locationId: string): Promise<any> {
    return this.get(`/signals/${locationId}`);
  }

  // ============ Priority Queue Endpoints ============

  /**
   * Get priority queue
   */
  async getPriorityQueue(tier?: string): Promise<PriorityItem[]> {
    return this.get<PriorityItem[]>('/priorities', tier ? { tier } : undefined);
  }

  // ============ Execution Endpoints ============

  /**
   * Get all executions
   */
  async getExecutions(status?: string): Promise<Execution[]> {
    return this.get<Execution[]>('/executions', status ? { status } : undefined);
  }

  /**
   * Get execution by ID
   */
  async getExecution(executionId: string): Promise<Execution> {
    return this.get<Execution>(`/executions/${executionId}`);
  }

  /**
   * Dispatch cleanup (approve recommendation)
   */
  async dispatchCleanup(data: {
    location_id: string;
    priority_tier: string;
    notes?: string;
  }): Promise<Execution> {
    return this.post<Execution>('/cleanup/dispatch', data);
  }

  /**
   * Verify cleanup completion
   */
  async verifyCleanup(executionId: string, afterImageId: string): Promise<any> {
    return this.post(`/cleanup/verify`, {
      execution_id: executionId,
      after_image_id: afterImageId,
    });
  }

  // ============ Payment Endpoints ============

  /**
   * Approve payment
   */
  async approvePayment(data: {
    execution_id: string;
    decision: 'approve' | 'reject';
    notes?: string;
  }): Promise<any> {
    return this.post('/payment/approve', data);
  }

  // ============ Map Data Endpoints ============

  /**
   * Get map data for dashboard
   */
  async getMapData(wardId: string): Promise<MapData> {
    return this.get<MapData>(`/map/${wardId}`);
  }

  // ============ Audit Log Endpoints ============

  /**
   * Get audit logs
   */
  async getAuditLogs(filters?: {
    start_date?: string;
    end_date?: string;
    source?: string;
    data_type?: string;
  }): Promise<any[]> {
    return this.get('/audit-logs', filters);
  }

  // ============ System Health Endpoints ============

  /**
   * Get system health status
   */
  async getSystemHealth(): Promise<any> {
    return this.get('/health');
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

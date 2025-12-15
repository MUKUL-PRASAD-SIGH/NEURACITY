import { useState, useEffect, useCallback } from 'react';
import { apiClient, ApiError } from './api-client';
import { useAppStore } from './store';
import {
  Location,
  Prediction,
  PriorityItem,
  Execution,
  MapData,
  PredictionFilters,
} from './types';

/**
 * Hook state interface
 */
interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Generic hook for API calls with loading and error states
 */
function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('API call failed:', err);
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch all locations
 */
export function useLocations(wardId?: string): UseApiState<Location[]> {
  const setLocations = useAppStore((state) => state.setLocations);
  
  const result = useApi<Location[]>(
    () => apiClient.getLocations(wardId),
    [wardId]
  );

  // Update global store when data changes
  useEffect(() => {
    if (result.data) {
      setLocations(result.data);
    }
  }, [result.data, setLocations]);

  return result;
}

/**
 * Hook to fetch a single location
 */
export function useLocation(locationId: string | null): UseApiState<Location> {
  return useApi<Location>(
    () => {
      if (!locationId) throw new Error('Location ID is required');
      return apiClient.getLocation(locationId);
    },
    [locationId]
  );
}

/**
 * Hook to fetch predictions with optional filters
 */
export function usePredictions(filters?: PredictionFilters): UseApiState<Prediction[]> {
  const setPredictions = useAppStore((state) => state.setPredictions);
  
  const result = useApi<Prediction[]>(
    () => apiClient.getPredictions(filters),
    [JSON.stringify(filters)]
  );

  // Update global store when data changes
  useEffect(() => {
    if (result.data) {
      setPredictions(result.data);
    }
  }, [result.data, setPredictions]);

  return result;
}

/**
 * Hook to fetch predictions for a specific location
 */
export function usePredictionForLocation(
  locationId: string | null,
  horizons?: number[]
): UseApiState<Prediction[]> {
  return useApi<Prediction[]>(
    () => {
      if (!locationId) throw new Error('Location ID is required');
      return apiClient.getPredictionForLocation(locationId, horizons);
    },
    [locationId, JSON.stringify(horizons)]
  );
}

/**
 * Hook to fetch priority queue
 */
export function usePriorityQueue(tier?: string): UseApiState<PriorityItem[]> {
  const setPriorityQueue = useAppStore((state) => state.setPriorityQueue);
  
  const result = useApi<PriorityItem[]>(
    () => apiClient.getPriorityQueue(tier),
    [tier]
  );

  // Update global store when data changes
  useEffect(() => {
    if (result.data) {
      setPriorityQueue(result.data);
    }
  }, [result.data, setPriorityQueue]);

  return result;
}

/**
 * Hook to fetch executions
 */
export function useExecutions(status?: string): UseApiState<Execution[]> {
  const setExecutions = useAppStore((state) => state.setExecutions);
  
  const result = useApi<Execution[]>(
    () => apiClient.getExecutions(status),
    [status]
  );

  // Update global store when data changes
  useEffect(() => {
    if (result.data) {
      setExecutions(result.data);
    }
  }, [result.data, setExecutions]);

  return result;
}

/**
 * Hook to fetch a single execution
 */
export function useExecution(executionId: string | null): UseApiState<Execution> {
  return useApi<Execution>(
    () => {
      if (!executionId) throw new Error('Execution ID is required');
      return apiClient.getExecution(executionId);
    },
    [executionId]
  );
}

/**
 * Hook to fetch map data
 */
export function useMapData(wardId: string): UseApiState<MapData> {
  return useApi<MapData>(
    () => apiClient.getMapData(wardId),
    [wardId]
  );
}

/**
 * Hook to fetch signals for a location
 */
export function useSignals(locationId: string | null): UseApiState<any> {
  return useApi<any>(
    () => {
      if (!locationId) throw new Error('Location ID is required');
      return apiClient.getSignals(locationId);
    },
    [locationId]
  );
}

/**
 * Hook to fetch audit logs
 */
export function useAuditLogs(filters?: {
  start_date?: string;
  end_date?: string;
  source?: string;
  data_type?: string;
}): UseApiState<any[]> {
  return useApi<any[]>(
    () => apiClient.getAuditLogs(filters),
    [JSON.stringify(filters)]
  );
}

/**
 * Hook to fetch system health
 */
export function useSystemHealth(): UseApiState<any> {
  return useApi<any>(
    () => apiClient.getSystemHealth(),
    []
  );
}

/**
 * Hook for mutation operations (POST, PUT, DELETE)
 * Returns a function to trigger the mutation and state
 */
interface UseMutationState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  mutate: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

export function useMutation<T>(
  mutationFn: (...args: any[]) => Promise<T>
): UseMutationState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (...args: any[]): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await mutationFn(...args);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Mutation failed:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [mutationFn]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, mutate, reset };
}

/**
 * Hook for dispatching cleanup
 */
export function useDispatchCleanup() {
  return useMutation((data: {
    location_id: string;
    priority_tier: string;
    notes?: string;
  }) => apiClient.dispatchCleanup(data));
}

/**
 * Hook for verifying cleanup
 */
export function useVerifyCleanup() {
  return useMutation((executionId: string, afterImageId: string) =>
    apiClient.verifyCleanup(executionId, afterImageId)
  );
}

/**
 * Hook for approving payment
 */
export function useApprovePayment() {
  return useMutation((data: {
    execution_id: string;
    decision: 'approve' | 'reject';
    notes?: string;
  }) => apiClient.approvePayment(data));
}

/**
 * Hook for ingesting image
 */
export function useIngestImage() {
  return useMutation((formData: FormData) => apiClient.ingestImage(formData));
}

/**
 * Hook for ingesting weather data
 */
export function useIngestWeather() {
  return useMutation((data: {
    timestamp: string;
    temperature: number;
    rainfall_probability: number;
    humidity: number;
  }) => apiClient.ingestWeather(data));
}

/**
 * Hook for ingesting pickup schedule
 */
export function useIngestPickupSchedule() {
  return useMutation((data: {
    location_id: string;
    scheduled_time: string;
    service_type: string;
  }) => apiClient.ingestPickupSchedule(data));
}

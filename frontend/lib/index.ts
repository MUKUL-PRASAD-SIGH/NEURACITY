/**
 * Central export point for all lib utilities
 */

// API Client
export { apiClient, ApiError } from './api-client';

// Store
export { useAppStore } from './store';

// Hooks
export {
  useLocations,
  useLocation,
  usePredictions,
  usePredictionForLocation,
  usePriorityQueue,
  useExecutions,
  useExecution,
  useMapData,
  useSignals,
  useAuditLogs,
  useSystemHealth,
  useMutation,
  useDispatchCleanup,
  useVerifyCleanup,
  useApprovePayment,
  useIngestImage,
  useIngestWeather,
  useIngestPickupSchedule,
} from './hooks';

// Types
export type {
  Location,
  Image,
  Prediction,
  PriorityItem,
  Execution,
  Weather,
  Pickup,
  MapData,
  PredictionFilters,
  ConfidenceLevel,
  HorizonHours,
  PriorityTier,
  PaymentRecommendation,
  PaymentStatus,
} from './types';

// Config
export { config } from './config';

// Mock Data (for development/testing)
export {
  mockLocations,
  mockPredictions,
  mockPriorityQueue,
  mockExecutions,
  mockImages,
  mockWeather,
  mockPickups,
  mockMapData,
  mockAuditLogs,
  mockSystemHealth,
  mockApiClient,
} from './mock-data';

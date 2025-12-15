/**
 * Mock data for testing and development
 * Used when NEXT_PUBLIC_ENABLE_MOCK_DATA=true
 */

import {
  Location,
  Prediction,
  PriorityItem,
  Execution,
  Image,
  Weather,
  Pickup,
  MapData,
} from './types';

// Mock locations
export const mockLocations: Location[] = [
  {
    location_id: 'loc-001',
    ward_id: 'ward-001',
    geometry: {
      type: 'Point',
      coordinates: [77.5946, 12.9716], // Bangalore
    },
    area_weight: 3,
    location_type: 'street_corner',
    metadata: { name: 'MG Road Junction' },
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    location_id: 'loc-002',
    ward_id: 'ward-001',
    geometry: {
      type: 'Point',
      coordinates: [77.6012, 12.9698],
    },
    area_weight: 2,
    location_type: 'market',
    metadata: { name: 'Brigade Road Market' },
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    location_id: 'loc-003',
    ward_id: 'ward-001',
    geometry: {
      type: 'Point',
      coordinates: [77.5850, 12.9750],
    },
    area_weight: 1,
    location_type: 'residential',
    metadata: { name: 'Indiranagar 12th Main' },
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

// Mock predictions
export const mockPredictions: Prediction[] = [
  {
    prediction_id: 'pred-001',
    location_id: 'loc-001',
    prediction_timestamp: new Date().toISOString(),
    horizon_hours: 6,
    overflow_probability: 0.85,
    confidence_level: 'high',
    features: {},
    model_version: 'v1.0.0',
    created_at: new Date().toISOString(),
  },
  {
    prediction_id: 'pred-002',
    location_id: 'loc-001',
    prediction_timestamp: new Date().toISOString(),
    horizon_hours: 12,
    overflow_probability: 0.92,
    confidence_level: 'high',
    features: {},
    model_version: 'v1.0.0',
    created_at: new Date().toISOString(),
  },
  {
    prediction_id: 'pred-003',
    location_id: 'loc-002',
    prediction_timestamp: new Date().toISOString(),
    horizon_hours: 6,
    overflow_probability: 0.45,
    confidence_level: 'medium',
    features: {},
    model_version: 'v1.0.0',
    created_at: new Date().toISOString(),
  },
];

// Mock priority queue
export const mockPriorityQueue: PriorityItem[] = [
  {
    location_id: 'loc-001',
    location: mockLocations[0],
    priority_score: 2.55,
    tier: 'Critical',
    overflow_probability: 0.85,
    area_weight: 3,
    failure_history_factor: 1.0,
    response_time_recommendation: 'Immediate dispatch - within 6 hours',
    latest_prediction: mockPredictions[0],
  },
  {
    location_id: 'loc-002',
    location: mockLocations[1],
    priority_score: 1.8,
    tier: 'High',
    overflow_probability: 0.45,
    area_weight: 2,
    failure_history_factor: 2.0,
    response_time_recommendation: 'Schedule within 24 hours',
    latest_prediction: mockPredictions[2],
  },
  {
    location_id: 'loc-003',
    location: mockLocations[2],
    priority_score: 0.8,
    tier: 'Low',
    overflow_probability: 0.2,
    area_weight: 1,
    failure_history_factor: 4.0,
    response_time_recommendation: 'Regular schedule',
  },
];

// Mock executions
export const mockExecutions: Execution[] = [
  {
    execution_id: 'exec-001',
    location_id: 'loc-001',
    dispatch_time: '2024-01-15T10:00:00Z',
    completion_time: '2024-01-15T12:00:00Z',
    before_image_id: 'img-001',
    after_image_id: 'img-002',
    before_score: 0.85,
    after_score: 0.15,
    quality_score: 0.82,
    payment_recommendation: 'release',
    payment_status: 'pending',
    notes: 'Cleanup completed successfully',
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    execution_id: 'exec-002',
    location_id: 'loc-002',
    dispatch_time: '2024-01-15T14:00:00Z',
    before_image_id: 'img-003',
    before_score: 0.65,
    payment_recommendation: undefined,
    payment_status: 'pending',
    notes: 'In progress',
    created_at: '2024-01-15T14:00:00Z',
  },
];

// Mock images
export const mockImages: Image[] = [
  {
    image_id: 'img-001',
    location_id: 'loc-001',
    timestamp: '2024-01-15T09:00:00Z',
    image_url: '/mock-images/before-001.jpg',
    severity_score: 0.85,
    confidence: 0.92,
    quality_metrics: { resolution: '1920x1080', brightness: 0.7 },
    manual_label: 'overflow',
    created_at: '2024-01-15T09:00:00Z',
  },
  {
    image_id: 'img-002',
    location_id: 'loc-001',
    timestamp: '2024-01-15T12:00:00Z',
    image_url: '/mock-images/after-001.jpg',
    severity_score: 0.15,
    confidence: 0.95,
    quality_metrics: { resolution: '1920x1080', brightness: 0.75 },
    manual_label: 'clean',
    created_at: '2024-01-15T12:00:00Z',
  },
];

// Mock weather data
export const mockWeather: Weather[] = [
  {
    weather_id: 'weather-001',
    timestamp: new Date().toISOString(),
    temperature: 28.5,
    rainfall_probability: 0.65,
    humidity: 75,
    source: 'OpenWeatherMap',
    created_at: new Date().toISOString(),
  },
];

// Mock pickup schedules
export const mockPickups: Pickup[] = [
  {
    pickup_id: 'pickup-001',
    location_id: 'loc-001',
    scheduled_time: '2024-01-16T06:00:00Z',
    actual_time: undefined,
    missed: false,
    service_type: 'regular',
    vendor_id: 'vendor-001',
    created_at: '2024-01-15T00:00:00Z',
  },
];

// Mock map data
export const mockMapData: MapData = {
  locations: mockLocations.map((loc, idx) => ({
    ...loc,
    current_severity: [0.85, 0.45, 0.2][idx],
    severity_trend: ['increasing', 'stable', 'decreasing'][idx] as any,
    latest_image: mockImages[idx],
  })),
};

// Mock audit logs
export const mockAuditLogs = [
  {
    audit_id: 'audit-001',
    timestamp: new Date().toISOString(),
    source: 'street_camera',
    data_type: 'image',
    operation: 'ingest',
    quality_metrics: { resolution: '1920x1080' },
    user_id: 'system',
  },
  {
    audit_id: 'audit-002',
    timestamp: new Date().toISOString(),
    source: 'weather_api',
    data_type: 'weather',
    operation: 'ingest',
    quality_metrics: { api_response_time: 150 },
    user_id: 'system',
  },
];

// Mock system health
export const mockSystemHealth = {
  status: 'healthy',
  services: {
    database: { status: 'up', response_time: 5 },
    redis: { status: 'up', response_time: 2 },
    minio: { status: 'up', response_time: 8 },
    signal_engine: { status: 'up', response_time: 150 },
    prediction_engine: { status: 'up', response_time: 200 },
  },
  timestamp: new Date().toISOString(),
};

/**
 * Mock API client that returns mock data
 * Used for testing without a backend
 */
export const mockApiClient = {
  getLocations: async (wardId?: string): Promise<Location[]> => {
    await delay(500);
    return mockLocations;
  },

  getLocation: async (locationId: string): Promise<Location> => {
    await delay(300);
    const location = mockLocations.find((l) => l.location_id === locationId);
    if (!location) throw new Error('Location not found');
    return location;
  },

  getPredictions: async (): Promise<Prediction[]> => {
    await delay(500);
    return mockPredictions;
  },

  getPredictionForLocation: async (locationId: string): Promise<Prediction[]> => {
    await delay(400);
    return mockPredictions.filter((p) => p.location_id === locationId);
  },

  getPriorityQueue: async (tier?: string): Promise<PriorityItem[]> => {
    await delay(500);
    if (tier) {
      return mockPriorityQueue.filter((item) => item.tier === tier);
    }
    return mockPriorityQueue;
  },

  getExecutions: async (status?: string): Promise<Execution[]> => {
    await delay(500);
    return mockExecutions;
  },

  getExecution: async (executionId: string): Promise<Execution> => {
    await delay(300);
    const execution = mockExecutions.find((e) => e.execution_id === executionId);
    if (!execution) throw new Error('Execution not found');
    return execution;
  },

  getMapData: async (wardId: string): Promise<MapData> => {
    await delay(600);
    return mockMapData;
  },

  getSignals: async (locationId: string): Promise<any> => {
    await delay(400);
    return {
      location_id: locationId,
      rolling_average_7d: 0.65,
      trend_slope: 0.05,
      accumulation_rate: 0.08,
      decay_pattern: -0.15,
    };
  },

  getAuditLogs: async (): Promise<any[]> => {
    await delay(500);
    return mockAuditLogs;
  },

  getSystemHealth: async (): Promise<any> => {
    await delay(300);
    return mockSystemHealth;
  },

  dispatchCleanup: async (data: any): Promise<Execution> => {
    await delay(400);
    return {
      ...mockExecutions[0],
      execution_id: `exec-${Date.now()}`,
      location_id: data.location_id,
      notes: data.notes || '',
    };
  },

  verifyCleanup: async (executionId: string, afterImageId: string): Promise<any> => {
    await delay(500);
    return {
      execution_id: executionId,
      after_image_id: afterImageId,
      quality_score: 0.85,
      verification_status: 'completed',
    };
  },

  approvePayment: async (data: any): Promise<any> => {
    await delay(400);
    return {
      execution_id: data.execution_id,
      payment_status: data.decision === 'approve' ? 'approved' : 'rejected',
      notes: data.notes,
    };
  },

  ingestImage: async (formData: FormData): Promise<Image> => {
    await delay(800);
    return mockImages[0];
  },

  ingestWeather: async (data: any): Promise<Weather> => {
    await delay(400);
    return mockWeather[0];
  },

  ingestPickupSchedule: async (data: any): Promise<Pickup> => {
    await delay(400);
    return mockPickups[0];
  },
};

// Helper function to simulate network delay
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

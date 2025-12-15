/**
 * Core type definitions for CaaS Waste Prediction MVP
 */

// Location types
export interface Location {
  location_id: string;
  ward_id: string;
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  area_weight: number; // 1-3
  location_type: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Image types
export interface Image {
  image_id: string;
  location_id: string;
  timestamp: string;
  image_url: string;
  severity_score: number; // 0-1
  confidence: number; // 0-1
  quality_metrics?: Record<string, any>;
  manual_label?: 'clean' | 'moderate' | 'overflow';
  created_at: string;
}

// Prediction types
export type ConfidenceLevel = 'low' | 'medium' | 'high';
export type HorizonHours = 6 | 12 | 24;

export interface Prediction {
  prediction_id: string;
  location_id: string;
  prediction_timestamp: string;
  horizon_hours: HorizonHours;
  overflow_probability: number; // 0-1
  confidence_level: ConfidenceLevel;
  features?: Record<string, any>;
  model_version: string;
  created_at: string;
}

// Priority types
export type PriorityTier = 'Critical' | 'High' | 'Medium' | 'Low';

export interface PriorityItem {
  location_id: string;
  location: Location;
  priority_score: number;
  tier: PriorityTier;
  overflow_probability: number;
  area_weight: number;
  failure_history_factor: number;
  response_time_recommendation: string;
  latest_prediction?: Prediction;
}

// Execution types
export type PaymentRecommendation = 'release' | 'partial' | 'hold';
export type PaymentStatus = 'pending' | 'approved' | 'rejected';

export interface Execution {
  execution_id: string;
  location_id: string;
  dispatch_time: string;
  completion_time?: string;
  before_image_id: string;
  after_image_id?: string;
  before_score: number;
  after_score?: number;
  quality_score?: number;
  payment_recommendation?: PaymentRecommendation;
  payment_status?: PaymentStatus;
  notes: string;
  created_at: string;
}

// Weather types
export interface Weather {
  weather_id: string;
  timestamp: string;
  temperature: number; // Celsius
  rainfall_probability: number; // 0-1
  humidity: number; // 0-100
  source: string;
  created_at: string;
}

// Pickup types
export interface Pickup {
  pickup_id: string;
  location_id: string;
  scheduled_time: string;
  actual_time?: string;
  missed: boolean;
  service_type: string;
  vendor_id?: string;
  created_at: string;
}

// Map data types
export interface MapData {
  locations: Array<Location & {
    current_severity?: number;
    severity_trend?: 'increasing' | 'stable' | 'decreasing';
    latest_image?: Image;
  }>;
}

// Dashboard filter types
export interface PredictionFilters {
  confidence_level?: ConfidenceLevel;
  horizon_hours?: HorizonHours;
  location_id?: string;
  min_probability?: number;
}

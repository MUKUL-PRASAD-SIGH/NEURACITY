/**
 * Application configuration
 * Centralizes environment variables and app settings
 */

export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1',
  },
  
  // Map Configuration
  map: {
    styleUrl: process.env.NEXT_PUBLIC_MAP_STYLE_URL || 'https://demotiles.maplibre.org/style.json',
    defaultCenter: [77.5946, 12.9716] as [number, number], // Bangalore coordinates [lng, lat]
    defaultZoom: 12,
  },
  
  // Feature Flags
  features: {
    enableMockData: process.env.NEXT_PUBLIC_ENABLE_MOCK_DATA === 'true',
  },
  
  // Severity thresholds for color coding
  severity: {
    low: 0.25,
    medium: 0.50,
    high: 0.75,
  },
  
  // Priority tier thresholds
  priority: {
    critical: 2.0,
    high: 1.5,
    medium: 1.0,
  },
  
  // Quality score thresholds for payment recommendations
  quality: {
    release: 0.80,
    partial: 0.50,
  },
} as const;

export default config;

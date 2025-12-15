/**
 * Tests for API Client
 * These tests verify the API client functionality with mock endpoints
 */

import { apiClient, ApiError } from '../api-client';

// Mock axios
jest.mock('axios', () => {
  const mockAxios: any = {
    create: jest.fn(function() { return mockAxios; }),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  };
  return mockAxios;
});

describe('ApiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Error Handling', () => {
    it('should create ApiError with status code and data', () => {
      const error = new ApiError('Test error', 404, { detail: 'Not found' });
      
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(404);
      expect(error.data).toEqual({ detail: 'Not found' });
      expect(error.name).toBe('ApiError');
    });

    it('should create ApiError without status code', () => {
      const error = new ApiError('Network error');
      
      expect(error.message).toBe('Network error');
      expect(error.statusCode).toBeUndefined();
      expect(error.data).toBeUndefined();
    });
  });

  describe('API Methods', () => {
    it('should have all required endpoint methods', () => {
      expect(typeof apiClient.getLocations).toBe('function');
      expect(typeof apiClient.getLocation).toBe('function');
      expect(typeof apiClient.getPredictions).toBe('function');
      expect(typeof apiClient.getPredictionForLocation).toBe('function');
      expect(typeof apiClient.getPriorityQueue).toBe('function');
      expect(typeof apiClient.getExecutions).toBe('function');
      expect(typeof apiClient.getExecution).toBe('function');
      expect(typeof apiClient.dispatchCleanup).toBe('function');
      expect(typeof apiClient.verifyCleanup).toBe('function');
      expect(typeof apiClient.approvePayment).toBe('function');
      expect(typeof apiClient.getMapData).toBe('function');
      expect(typeof apiClient.getSignals).toBe('function');
      expect(typeof apiClient.getAuditLogs).toBe('function');
      expect(typeof apiClient.getSystemHealth).toBe('function');
      expect(typeof apiClient.ingestImage).toBe('function');
      expect(typeof apiClient.ingestWeather).toBe('function');
      expect(typeof apiClient.ingestPickupSchedule).toBe('function');
    });
  });

  describe('Generic HTTP Methods', () => {
    it('should have generic HTTP methods', () => {
      expect(typeof apiClient.get).toBe('function');
      expect(typeof apiClient.post).toBe('function');
      expect(typeof apiClient.put).toBe('function');
      expect(typeof apiClient.delete).toBe('function');
      expect(typeof apiClient.patch).toBe('function');
    });
  });
});

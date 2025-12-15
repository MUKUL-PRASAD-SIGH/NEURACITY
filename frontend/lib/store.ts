import { create } from 'zustand';
import { Location, Prediction, PriorityItem, Execution, PriorityTier } from './types';

/**
 * Global state management using Zustand
 */

interface AppState {
  // Locations
  locations: Location[];
  setLocations: (locations: Location[]) => void;
  getLocationById: (id: string) => Location | undefined;
  
  // Predictions
  predictions: Prediction[];
  setPredictions: (predictions: Prediction[]) => void;
  getPredictionsByLocation: (locationId: string) => Prediction[];
  
  // Priority Queue
  priorityQueue: PriorityItem[];
  setPriorityQueue: (queue: PriorityItem[]) => void;
  getPriorityItemsByTier: (tier: PriorityTier) => PriorityItem[];
  
  // Executions
  executions: Execution[];
  setExecutions: (executions: Execution[]) => void;
  getExecutionById: (id: string) => Execution | undefined;
  getActiveExecutions: () => Execution[];
  getCompletedExecutions: () => Execution[];
  
  // UI State
  selectedLocationId: string | null;
  setSelectedLocationId: (id: string | null) => void;
  
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // Filters
  predictionFilters: {
    confidenceLevel?: string;
    horizonHours?: number;
    minProbability?: number;
  };
  setPredictionFilters: (filters: any) => void;
  clearPredictionFilters: () => void;
  
  priorityTierFilter: PriorityTier | null;
  setPriorityTierFilter: (tier: PriorityTier | null) => void;
  
  // Actions
  reset: () => void;
}

const initialState = {
  locations: [],
  predictions: [],
  priorityQueue: [],
  executions: [],
  selectedLocationId: null,
  isLoading: false,
  error: null,
  predictionFilters: {},
  priorityTierFilter: null,
};

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  ...initialState,
  
  // Location actions
  setLocations: (locations) => set({ locations }),
  getLocationById: (id: string) => {
    return get().locations.find((loc) => loc.location_id === id);
  },
  
  // Prediction actions
  setPredictions: (predictions) => set({ predictions }),
  getPredictionsByLocation: (locationId: string) => {
    return get().predictions.filter((pred) => pred.location_id === locationId);
  },
  
  // Priority Queue actions
  setPriorityQueue: (priorityQueue) => set({ priorityQueue }),
  getPriorityItemsByTier: (tier: PriorityTier) => {
    return get().priorityQueue.filter((item) => item.tier === tier);
  },
  
  // Execution actions
  setExecutions: (executions) => set({ executions }),
  getExecutionById: (id: string) => {
    return get().executions.find((exec) => exec.execution_id === id);
  },
  getActiveExecutions: () => {
    return get().executions.filter((exec) => !exec.completion_time);
  },
  getCompletedExecutions: () => {
    return get().executions.filter((exec) => exec.completion_time);
  },
  
  // UI State actions
  setSelectedLocationId: (selectedLocationId) => set({ selectedLocationId }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  
  // Filter actions
  setPredictionFilters: (filters) => 
    set((state) => ({ 
      predictionFilters: { ...state.predictionFilters, ...filters } 
    })),
  clearPredictionFilters: () => set({ predictionFilters: {} }),
  
  setPriorityTierFilter: (priorityTierFilter) => set({ priorityTierFilter }),
  
  // Reset all state
  reset: () => set(initialState),
}));

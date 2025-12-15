# API Client and Hooks Usage Examples

This document provides examples of how to use the API client and custom hooks in the CaaS Waste Prediction frontend.

## Table of Contents
- [Direct API Client Usage](#direct-api-client-usage)
- [Using Custom Hooks](#using-custom-hooks)
- [Using Zustand Store](#using-zustand-store)
- [Error Handling](#error-handling)
- [Mock Data for Testing](#mock-data-for-testing)

## Direct API Client Usage

### Basic GET Request
```typescript
import { apiClient } from '@/lib/api-client';

// Fetch all locations
const locations = await apiClient.getLocations();

// Fetch locations for specific ward
const wardLocations = await apiClient.getLocations('ward-001');

// Fetch single location
const location = await apiClient.getLocation('loc-001');
```

### POST Request (Dispatch Cleanup)
```typescript
import { apiClient } from '@/lib/api-client';

const execution = await apiClient.dispatchCleanup({
  location_id: 'loc-001',
  priority_tier: 'Critical',
  notes: 'High priority cleanup needed',
});
```

### Error Handling with API Client
```typescript
import { apiClient, ApiError } from '@/lib/api-client';

try {
  const predictions = await apiClient.getPredictions();
} catch (error) {
  if (error instanceof ApiError) {
    console.error('API Error:', error.message);
    console.error('Status Code:', error.statusCode);
    console.error('Response Data:', error.data);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Using Custom Hooks

### Fetching Locations
```typescript
import { useLocations } from '@/lib/hooks';

function LocationsList() {
  const { data: locations, loading, error, refetch } = useLocations();

  if (loading) return <div>Loading locations...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {locations?.map((location) => (
          <li key={location.location_id}>{location.metadata?.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Fetching Predictions with Filters
```typescript
import { usePredictions } from '@/lib/hooks';

function PredictionsDashboard() {
  const { data: predictions, loading, error } = usePredictions({
    confidence_level: 'high',
    horizon_hours: 6,
    min_probability: 0.7,
  });

  if (loading) return <div>Loading predictions...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {predictions?.map((pred) => (
        <div key={pred.prediction_id}>
          <p>Probability: {(pred.overflow_probability * 100).toFixed(1)}%</p>
          <p>Confidence: {pred.confidence_level}</p>
        </div>
      ))}
    </div>
  );
}
```

### Using Mutation Hooks
```typescript
import { useDispatchCleanup } from '@/lib/hooks';

function CleanupApprovalButton({ locationId }: { locationId: string }) {
  const { mutate, loading, error, data } = useDispatchCleanup();

  const handleApprove = async () => {
    const result = await mutate({
      location_id: locationId,
      priority_tier: 'Critical',
      notes: 'Approved for immediate cleanup',
    });

    if (result) {
      console.log('Cleanup dispatched:', result.execution_id);
    }
  };

  return (
    <div>
      <button onClick={handleApprove} disabled={loading}>
        {loading ? 'Dispatching...' : 'Approve Cleanup'}
      </button>
      {error && <p className="error">{error}</p>}
      {data && <p className="success">Cleanup dispatched successfully!</p>}
    </div>
  );
}
```

### Fetching Priority Queue
```typescript
import { usePriorityQueue } from '@/lib/hooks';

function PriorityQueueView() {
  const { data: queue, loading, error } = usePriorityQueue();

  if (loading) return <div>Loading priority queue...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {queue?.map((item) => (
        <div key={item.location_id} className={`tier-${item.tier.toLowerCase()}`}>
          <h3>{item.location.metadata?.name}</h3>
          <p>Priority Score: {item.priority_score.toFixed(2)}</p>
          <p>Tier: {item.tier}</p>
          <p>Overflow Probability: {(item.overflow_probability * 100).toFixed(1)}%</p>
          <p>Recommendation: {item.response_time_recommendation}</p>
        </div>
      ))}
    </div>
  );
}
```

### Filtering Priority Queue by Tier
```typescript
import { usePriorityQueue } from '@/lib/hooks';

function CriticalLocations() {
  const { data: criticalItems, loading, error } = usePriorityQueue('Critical');

  if (loading) return <div>Loading critical locations...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Critical Priority Locations</h2>
      {criticalItems?.map((item) => (
        <div key={item.location_id}>
          <p>{item.location.metadata?.name}</p>
          <p>Score: {item.priority_score.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
```

## Using Zustand Store

### Reading from Store
```typescript
import { useAppStore } from '@/lib/store';

function LocationSelector() {
  const locations = useAppStore((state) => state.locations);
  const selectedLocationId = useAppStore((state) => state.selectedLocationId);
  const setSelectedLocationId = useAppStore((state) => state.setSelectedLocationId);

  return (
    <select 
      value={selectedLocationId || ''} 
      onChange={(e) => setSelectedLocationId(e.target.value)}
    >
      <option value="">Select a location</option>
      {locations.map((loc) => (
        <option key={loc.location_id} value={loc.location_id}>
          {loc.metadata?.name}
        </option>
      ))}
    </select>
  );
}
```

### Using Store Selectors
```typescript
import { useAppStore } from '@/lib/store';

function ActiveExecutionsList() {
  const getActiveExecutions = useAppStore((state) => state.getActiveExecutions);
  const activeExecutions = getActiveExecutions();

  return (
    <div>
      <h2>Active Cleanups ({activeExecutions.length})</h2>
      {activeExecutions.map((exec) => (
        <div key={exec.execution_id}>
          <p>Location: {exec.location_id}</p>
          <p>Dispatched: {new Date(exec.dispatch_time).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
```

### Combining Hooks and Store
```typescript
import { useLocations } from '@/lib/hooks';
import { useAppStore } from '@/lib/store';

function LocationsWithSelection() {
  // Hook automatically updates the store
  const { loading, error } = useLocations();
  
  // Read from store
  const locations = useAppStore((state) => state.locations);
  const selectedLocationId = useAppStore((state) => state.selectedLocationId);
  const setSelectedLocationId = useAppStore((state) => state.setSelectedLocationId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {locations.map((loc) => (
        <button
          key={loc.location_id}
          onClick={() => setSelectedLocationId(loc.location_id)}
          className={selectedLocationId === loc.location_id ? 'selected' : ''}
        >
          {loc.metadata?.name}
        </button>
      ))}
    </div>
  );
}
```

## Error Handling

### Global Error State
```typescript
import { useAppStore } from '@/lib/store';

function ErrorDisplay() {
  const error = useAppStore((state) => state.error);
  const clearError = useAppStore((state) => state.clearError);

  if (!error) return null;

  return (
    <div className="error-banner">
      <p>{error}</p>
      <button onClick={clearError}>Dismiss</button>
    </div>
  );
}
```

### Setting Global Error
```typescript
import { apiClient } from '@/lib/api-client';
import { useAppStore } from '@/lib/store';

async function fetchDataWithGlobalError() {
  const setError = useAppStore.getState().setError;
  
  try {
    const data = await apiClient.getLocations();
    return data;
  } catch (error) {
    setError(error instanceof Error ? error.message : 'An error occurred');
    return null;
  }
}
```

## Mock Data for Testing

### Using Mock API Client
```typescript
import { mockApiClient } from '@/lib/mock-data';

// In development, you can use mock data
const locations = await mockApiClient.getLocations();
const predictions = await mockApiClient.getPredictions();
```

### Conditional Mock Usage
```typescript
import { apiClient } from '@/lib/api-client';
import { mockApiClient } from '@/lib/mock-data';
import { config } from '@/lib/config';

// Use mock data if feature flag is enabled
const client = config.features.enableMockData ? mockApiClient : apiClient;

const locations = await client.getLocations();
```

### Testing with Mock Data
```typescript
import { mockLocations, mockPredictions } from '@/lib/mock-data';

describe('LocationsList', () => {
  it('should render locations', () => {
    // Use mock data in tests
    const locations = mockLocations;
    
    expect(locations).toHaveLength(3);
    expect(locations[0].location_id).toBe('loc-001');
  });
});
```

## Advanced Patterns

### Polling for Updates
```typescript
import { useEffect } from 'react';
import { usePredictions } from '@/lib/hooks';

function PredictionsWithPolling() {
  const { data, loading, error, refetch } = usePredictions();

  useEffect(() => {
    // Poll every 30 seconds
    const interval = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  }, [refetch]);

  // ... render component
}
```

### Optimistic Updates
```typescript
import { useAppStore } from '@/lib/store';
import { useDispatchCleanup } from '@/lib/hooks';

function OptimisticCleanupButton({ locationId }: { locationId: string }) {
  const setExecutions = useAppStore((state) => state.setExecutions);
  const executions = useAppStore((state) => state.executions);
  const { mutate } = useDispatchCleanup();

  const handleDispatch = async () => {
    // Optimistic update
    const tempExecution = {
      execution_id: 'temp-' + Date.now(),
      location_id: locationId,
      dispatch_time: new Date().toISOString(),
      before_image_id: '',
      before_score: 0,
      notes: 'Dispatching...',
      created_at: new Date().toISOString(),
    };
    
    setExecutions([...executions, tempExecution]);

    // Actual API call
    const result = await mutate({
      location_id: locationId,
      priority_tier: 'Critical',
      notes: 'Approved',
    });

    if (result) {
      // Replace temp with real execution
      setExecutions([
        ...executions.filter((e) => e.execution_id !== tempExecution.execution_id),
        result,
      ]);
    }
  };

  return <button onClick={handleDispatch}>Dispatch Cleanup</button>;
}
```

## Best Practices

1. **Use hooks for data fetching** - They handle loading states and errors automatically
2. **Use mutations for write operations** - They provide loading states and error handling
3. **Store global state in Zustand** - Use for data that needs to be shared across components
4. **Handle errors gracefully** - Always show user-friendly error messages
5. **Use mock data during development** - Enable with `NEXT_PUBLIC_ENABLE_MOCK_DATA=true`
6. **Leverage retry logic** - The API client automatically retries failed requests
7. **Use TypeScript types** - All types are exported from `@/lib/types`

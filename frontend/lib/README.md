# API Client and State Management

This directory contains the core utilities for API communication and state management in the CaaS Waste Prediction frontend.

## Overview

The implementation provides:
- **API Client** with automatic retry logic and error handling
- **Custom React Hooks** for data fetching with loading/error states
- **Zustand Store** for global state management
- **TypeScript Types** for type safety
- **Mock Data** for development and testing

## Files

### Core Files

- **`api-client.ts`** - Axios-based API client with retry logic and typed endpoints
- **`hooks.ts`** - Custom React hooks for data fetching and mutations
- **`store.ts`** - Zustand store for global state management
- **`types.ts`** - TypeScript type definitions
- **`config.ts`** - Application configuration
- **`index.ts`** - Central export point

### Development & Testing

- **`mock-data.ts`** - Mock data and mock API client for testing
- **`USAGE_EXAMPLES.md`** - Comprehensive usage examples and best practices
- **`__tests__/api-client.test.ts`** - Unit tests for API client

## Features

### API Client Features

✅ **Automatic Retry Logic**
- Retries failed requests up to 3 times
- Exponential backoff strategy
- Configurable retry conditions (408, 429, 500, 502, 503, 504)

✅ **Error Handling**
- Custom `ApiError` class with status codes and response data
- Automatic error transformation
- Network error detection

✅ **Type Safety**
- Fully typed API methods
- TypeScript interfaces for all requests/responses
- Generic HTTP methods (GET, POST, PUT, DELETE, PATCH)

✅ **Comprehensive Endpoints**
- Data ingestion (images, weather, schedules)
- Locations management
- Predictions with filters
- Priority queue
- Executions and verification
- Payment approvals
- Map data
- Audit logs
- System health

### Custom Hooks Features

✅ **Data Fetching Hooks**
- `useLocations()` - Fetch all locations
- `useLocation(id)` - Fetch single location
- `usePredictions(filters)` - Fetch predictions with filters
- `usePredictionForLocation(id)` - Fetch predictions for location
- `usePriorityQueue(tier)` - Fetch priority queue
- `useExecutions(status)` - Fetch executions
- `useExecution(id)` - Fetch single execution
- `useMapData(wardId)` - Fetch map data
- `useSignals(locationId)` - Fetch signals
- `useAuditLogs(filters)` - Fetch audit logs
- `useSystemHealth()` - Fetch system health

✅ **Mutation Hooks**
- `useDispatchCleanup()` - Dispatch cleanup action
- `useVerifyCleanup()` - Verify cleanup completion
- `useApprovePayment()` - Approve payment
- `useIngestImage()` - Ingest street image
- `useIngestWeather()` - Ingest weather data
- `useIngestPickupSchedule()` - Ingest pickup schedule

✅ **Hook Features**
- Automatic loading states
- Error handling
- Refetch capability
- Store integration (auto-updates global state)
- TypeScript support

### Zustand Store Features

✅ **State Management**
- Locations state
- Predictions state
- Priority queue state
- Executions state
- UI state (selected location, loading, errors)
- Filter state

✅ **Selectors**
- `getLocationById(id)` - Get location by ID
- `getPredictionsByLocation(id)` - Get predictions for location
- `getPriorityItemsByTier(tier)` - Get priority items by tier
- `getExecutionById(id)` - Get execution by ID
- `getActiveExecutions()` - Get active executions
- `getCompletedExecutions()` - Get completed executions

✅ **Actions**
- Set/update state
- Clear errors
- Reset filters
- Reset entire store

## Quick Start

### 1. Fetch Data with Hooks

```typescript
import { useLocations, usePredictions } from '@/lib';

function MyComponent() {
  const { data: locations, loading, error, refetch } = useLocations();
  const { data: predictions } = usePredictions({ confidence_level: 'high' });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {locations?.map(loc => <div key={loc.location_id}>{loc.metadata?.name}</div>)}
    </div>
  );
}
```

### 2. Use Mutations

```typescript
import { useDispatchCleanup } from '@/lib';

function ApprovalButton({ locationId }: { locationId: string }) {
  const { mutate, loading, error } = useDispatchCleanup();

  const handleApprove = async () => {
    const result = await mutate({
      location_id: locationId,
      priority_tier: 'Critical',
      notes: 'Approved',
    });
    
    if (result) {
      console.log('Success:', result.execution_id);
    }
  };

  return (
    <button onClick={handleApprove} disabled={loading}>
      {loading ? 'Dispatching...' : 'Approve'}
    </button>
  );
}
```

### 3. Access Global State

```typescript
import { useAppStore } from '@/lib';

function LocationSelector() {
  const locations = useAppStore(state => state.locations);
  const selectedId = useAppStore(state => state.selectedLocationId);
  const setSelectedId = useAppStore(state => state.setSelectedLocationId);

  return (
    <select value={selectedId || ''} onChange={e => setSelectedId(e.target.value)}>
      {locations.map(loc => (
        <option key={loc.location_id} value={loc.location_id}>
          {loc.metadata?.name}
        </option>
      ))}
    </select>
  );
}
```

### 4. Direct API Calls

```typescript
import { apiClient } from '@/lib';

async function fetchData() {
  try {
    const locations = await apiClient.getLocations();
    const predictions = await apiClient.getPredictions({ confidence_level: 'high' });
    return { locations, predictions };
  } catch (error) {
    console.error('API Error:', error);
  }
}
```

## Testing

### Using Mock Data

Enable mock data in `.env.local`:
```
NEXT_PUBLIC_ENABLE_MOCK_DATA=true
```

Use mock API client:
```typescript
import { mockApiClient } from '@/lib';

const locations = await mockApiClient.getLocations();
```

### Test Page

Visit `/api-test` to see a live demonstration of all hooks and API methods working with mock data.

### Running Tests

```bash
npm test
```

## Configuration

### Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1

# Feature Flags
NEXT_PUBLIC_ENABLE_MOCK_DATA=false

# Map Configuration
NEXT_PUBLIC_MAP_STYLE_URL=https://demotiles.maplibre.org/style.json
```

### Retry Configuration

Customize retry behavior when creating API client:

```typescript
import { ApiClient } from '@/lib/api-client';

const customClient = new ApiClient({
  maxRetries: 5,
  retryDelay: 2000,
  retryableStatuses: [408, 429, 500, 502, 503, 504],
});
```

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React Components                      │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ├─────────────┐
                  │             │
                  ▼             ▼
         ┌────────────┐  ┌─────────────┐
         │   Hooks    │  │   Store     │
         │ (hooks.ts) │  │ (store.ts)  │
         └─────┬──────┘  └──────┬──────┘
               │                │
               └────────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │  API Client   │
                │(api-client.ts)│
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │   Backend     │
                │   REST API    │
                └───────────────┘
```

## Best Practices

1. **Use hooks for data fetching** - They handle loading/error states automatically
2. **Use mutations for write operations** - They provide proper state management
3. **Store shared state in Zustand** - Use for data needed across components
4. **Handle errors gracefully** - Always show user-friendly error messages
5. **Use TypeScript types** - Leverage type safety for all API calls
6. **Test with mock data** - Use mock API client during development
7. **Leverage retry logic** - API client automatically retries failed requests

## Documentation

For detailed examples and patterns, see:
- **`USAGE_EXAMPLES.md`** - Comprehensive usage guide
- **`/api-test`** - Live demonstration page

## Requirements Validation

This implementation satisfies task requirements:

✅ Create API client utility with axios - **DONE**
- Axios-based client with typed methods
- Retry logic with exponential backoff
- Error handling with custom ApiError class

✅ Set up Zustand stores for global state - **DONE**
- Complete store with locations, predictions, priority queue, executions
- Selectors for data access
- Actions for state updates

✅ Implement error handling and retry logic - **DONE**
- Automatic retry for network errors (3 attempts)
- Exponential backoff strategy
- Custom error transformation

✅ Create hooks for data fetching - **DONE**
- 11 data fetching hooks (useLocations, usePredictions, etc.)
- 6 mutation hooks (useDispatchCleanup, etc.)
- Loading/error states built-in
- Store integration

✅ Test API client with mock endpoints - **DONE**
- Mock data utilities
- Mock API client
- Test page at `/api-test`
- Unit tests in `__tests__/`

## Next Steps

The API client and state management are now ready for use. Next tasks:
1. Integrate hooks into existing pages (dashboard, predictions, etc.)
2. Connect to real backend API when available
3. Add authentication token management
4. Implement WebSocket support for real-time updates (if needed)

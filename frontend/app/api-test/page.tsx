'use client';

import { useState } from 'react';
import {
  useLocations,
  usePredictions,
  usePriorityQueue,
  useExecutions,
  useSystemHealth,
  useDispatchCleanup,
  mockApiClient,
} from '@/lib';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { Alert } from '@/components/Alert';

/**
 * API Test Page
 * Demonstrates API client and hooks functionality with mock data
 */
export default function ApiTestPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [testing, setTesting] = useState(false);

  // Test hooks
  const locations = useLocations();
  const predictions = usePredictions();
  const priorityQueue = usePriorityQueue();
  const executions = useExecutions();
  const systemHealth = useSystemHealth();
  const dispatchCleanup = useDispatchCleanup();

  const addResult = (message: string) => {
    setTestResults((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runTests = async () => {
    setTesting(true);
    setTestResults([]);

    try {
      // Test 1: Fetch locations
      addResult('Testing getLocations...');
      const locs = await mockApiClient.getLocations();
      addResult(`✓ Fetched ${locs.length} locations`);

      // Test 2: Fetch single location
      addResult('Testing getLocation...');
      const loc = await mockApiClient.getLocation('loc-001');
      addResult(`✓ Fetched location: ${loc.metadata?.name}`);

      // Test 3: Fetch predictions
      addResult('Testing getPredictions...');
      const preds = await mockApiClient.getPredictions();
      addResult(`✓ Fetched ${preds.length} predictions`);

      // Test 4: Fetch priority queue
      addResult('Testing getPriorityQueue...');
      const queue = await mockApiClient.getPriorityQueue();
      addResult(`✓ Fetched ${queue.length} priority items`);

      // Test 5: Fetch executions
      addResult('Testing getExecutions...');
      const execs = await mockApiClient.getExecutions();
      addResult(`✓ Fetched ${execs.length} executions`);

      // Test 6: Fetch system health
      addResult('Testing getSystemHealth...');
      const health = await mockApiClient.getSystemHealth();
      addResult(`✓ System status: ${health.status}`);

      // Test 7: Dispatch cleanup
      addResult('Testing dispatchCleanup...');
      const execution = await mockApiClient.dispatchCleanup({
        location_id: 'loc-001',
        priority_tier: 'Critical',
        notes: 'Test cleanup',
      });
      addResult(`✓ Cleanup dispatched: ${execution.execution_id}`);

      addResult('✅ All tests passed!');
    } catch (error) {
      addResult(`❌ Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setTesting(false);
    }
  };

  const testDispatchMutation = async () => {
    const result = await dispatchCleanup.mutate({
      location_id: 'loc-001',
      priority_tier: 'Critical',
      notes: 'Test dispatch from mutation hook',
    });

    if (result) {
      addResult(`✓ Mutation successful: ${result.execution_id}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">API Client & Hooks Test Page</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Locations Hook Test */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Locations Hook</h2>
          {locations.loading && <Spinner />}
          {locations.error && <Alert variant="error" message={locations.error} />}
          {locations.data && (
            <div>
              <p className="mb-2">Loaded {locations.data.length} locations</p>
              <ul className="list-disc list-inside">
                {locations.data.slice(0, 3).map((loc) => (
                  <li key={loc.location_id}>{loc.metadata?.name || loc.location_id}</li>
                ))}
              </ul>
              <Button onClick={locations.refetch} variant="secondary" className="mt-2">
                Refresh
              </Button>
            </div>
          )}
        </Card>

        {/* Predictions Hook Test */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Predictions Hook</h2>
          {predictions.loading && <Spinner />}
          {predictions.error && <Alert variant="error" message={predictions.error} />}
          {predictions.data && (
            <div>
              <p className="mb-2">Loaded {predictions.data.length} predictions</p>
              <ul className="list-disc list-inside">
                {predictions.data.slice(0, 3).map((pred) => (
                  <li key={pred.prediction_id}>
                    {pred.horizon_hours}h: {(pred.overflow_probability * 100).toFixed(1)}%
                  </li>
                ))}
              </ul>
              <Button onClick={predictions.refetch} variant="secondary" className="mt-2">
                Refresh
              </Button>
            </div>
          )}
        </Card>

        {/* Priority Queue Hook Test */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Priority Queue Hook</h2>
          {priorityQueue.loading && <Spinner />}
          {priorityQueue.error && <Alert variant="error" message={priorityQueue.error} />}
          {priorityQueue.data && (
            <div>
              <p className="mb-2">Loaded {priorityQueue.data.length} priority items</p>
              <ul className="list-disc list-inside">
                {priorityQueue.data.slice(0, 3).map((item) => (
                  <li key={item.location_id}>
                    {item.tier}: {item.priority_score.toFixed(2)}
                  </li>
                ))}
              </ul>
              <Button onClick={priorityQueue.refetch} variant="secondary" className="mt-2">
                Refresh
              </Button>
            </div>
          )}
        </Card>

        {/* Executions Hook Test */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Executions Hook</h2>
          {executions.loading && <Spinner />}
          {executions.error && <Alert variant="error" message={executions.error} />}
          {executions.data && (
            <div>
              <p className="mb-2">Loaded {executions.data.length} executions</p>
              <ul className="list-disc list-inside">
                {executions.data.slice(0, 3).map((exec) => (
                  <li key={exec.execution_id}>
                    {exec.completion_time ? 'Completed' : 'Active'}: {exec.location_id}
                  </li>
                ))}
              </ul>
              <Button onClick={executions.refetch} variant="secondary" className="mt-2">
                Refresh
              </Button>
            </div>
          )}
        </Card>

        {/* System Health Hook Test */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">System Health Hook</h2>
          {systemHealth.loading && <Spinner />}
          {systemHealth.error && <Alert variant="error" message={systemHealth.error} />}
          {systemHealth.data && (
            <div>
              <p className="mb-2">Status: <strong>{systemHealth.data.status}</strong></p>
              <ul className="list-disc list-inside">
                {Object.entries(systemHealth.data.services).slice(0, 3).map(([name, service]: [string, any]) => (
                  <li key={name}>
                    {name}: {service.status}
                  </li>
                ))}
              </ul>
              <Button onClick={systemHealth.refetch} variant="secondary" className="mt-2">
                Refresh
              </Button>
            </div>
          )}
        </Card>

        {/* Mutation Hook Test */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Dispatch Cleanup Mutation</h2>
          <Button 
            onClick={testDispatchMutation} 
            disabled={dispatchCleanup.loading}
          >
            {dispatchCleanup.loading ? 'Dispatching...' : 'Test Dispatch'}
          </Button>
          {dispatchCleanup.error && (
            <Alert variant="error" message={dispatchCleanup.error} className="mt-2" />
          )}
          {dispatchCleanup.data && (
            <Alert 
              variant="success" 
              message={`Dispatched: ${dispatchCleanup.data.execution_id}`}
              className="mt-2" 
            />
          )}
        </Card>
      </div>

      {/* API Test Runner */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">API Test Runner</h2>
        <p className="mb-4">
          Run comprehensive tests of all API endpoints using mock data
        </p>
        <Button onClick={runTests} disabled={testing}>
          {testing ? 'Running Tests...' : 'Run All Tests'}
        </Button>

        {testResults.length > 0 && (
          <div className="mt-4 p-4 bg-gray-100 rounded max-h-96 overflow-y-auto">
            <h3 className="font-semibold mb-2">Test Results:</h3>
            {testResults.map((result, idx) => (
              <div key={idx} className="text-sm font-mono mb-1">
                {result}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Documentation Link */}
      <Card className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Documentation</h2>
        <p className="text-gray-600">
          For detailed usage examples and best practices, see{' '}
          <code className="bg-gray-100 px-2 py-1 rounded">frontend/lib/USAGE_EXAMPLES.md</code>
        </p>
      </Card>
    </div>
  );
}

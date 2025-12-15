import Layout from '@/components/Layout';

export default function SystemHealthPage() {
  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">System Health</h1>
        
        {/* Service status cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">API Gateway</h3>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600">Status: Operational</p>
            <p className="text-sm text-gray-600">Response Time: 45ms</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Signal Engine</h3>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600">Status: Operational</p>
            <p className="text-sm text-gray-600">Inference Time: 180ms</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Prediction Engine</h3>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600">Status: Operational</p>
            <p className="text-sm text-gray-600">Prediction Time: 850ms</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Database</h3>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600">Status: Operational</p>
            <p className="text-sm text-gray-600">Connections: 12/50</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Object Storage</h3>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600">Status: Operational</p>
            <p className="text-sm text-gray-600">Usage: 45GB/2TB</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Weather API</h3>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600">Status: Degraded</p>
            <p className="text-sm text-gray-600">Using fallback data</p>
          </div>
        </div>

        {/* Recent errors and fallbacks */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Errors & Fallbacks</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600">Error logs and fallback activations will be displayed here.</p>
          </div>
        </div>

        {/* Performance metrics */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Performance Metrics</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600">Real-time performance charts will be implemented in future tasks.</p>
            <p className="text-sm text-gray-500 mt-2">Targets: API &lt;500ms, Scoring &lt;200ms</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

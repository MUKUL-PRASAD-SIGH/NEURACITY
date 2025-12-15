import Layout from '@/components/Layout';

export default function PriorityQueuePage() {
  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Priority Queue</h1>
        
        {/* Tier filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-md font-medium hover:bg-red-200">
              Critical (3)
            </button>
            <button className="px-4 py-2 bg-orange-100 text-orange-700 rounded-md font-medium hover:bg-orange-200">
              High (7)
            </button>
            <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-md font-medium hover:bg-yellow-200">
              Medium (12)
            </button>
            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-md font-medium hover:bg-green-200">
              Low (8)
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200">
              All (30)
            </button>
          </div>
        </div>

        {/* Priority queue list */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recommended Interventions</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600">Priority queue data will be loaded from backend in future tasks.</p>
            <p className="text-sm text-gray-500 mt-2">Includes drag-and-drop reordering and approval workflow</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import Layout from '@/components/Layout';

export default function ExecutionsPage() {
  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Cleanup Executions</h1>
        
        {/* Status tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button className="px-6 py-3 border-b-2 border-blue-500 text-blue-600 font-medium">
                Active (5)
              </button>
              <button className="px-6 py-3 border-b-2 border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 font-medium">
                Pending Verification (3)
              </button>
              <button className="px-6 py-3 border-b-2 border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 font-medium">
                Completed (45)
              </button>
            </nav>
          </div>
        </div>

        {/* Executions list */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Active Cleanups</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600">Execution tracking data will be loaded from backend in future tasks.</p>
            <p className="text-sm text-gray-500 mt-2">Includes before/after image comparison and quality scoring</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

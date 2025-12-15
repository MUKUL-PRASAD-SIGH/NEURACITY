import Layout from '@/components/Layout';

export default function MapPage() {
  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">City Health Map</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="text-gray-600">Interactive map will be implemented in future tasks.</p>
              <p className="text-sm text-gray-500 mt-2">Using MapLibre GL for visualization</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

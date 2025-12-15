import Layout from '@/components/Layout';

export default function PaymentsPage() {
  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Payment Recommendations</h1>
        
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Release (Full)</p>
                <p className="text-2xl font-bold text-green-600 mt-1">8</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Partial Payment</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">3</p>
              </div>
              <div className="text-3xl">⚠️</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hold (Follow-up)</p>
                <p className="text-2xl font-bold text-red-600 mt-1">2</p>
              </div>
              <div className="text-3xl">🛑</div>
            </div>
          </div>
        </div>

        {/* Payment recommendations list */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Pending Approvals</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600">Payment recommendations will be loaded from backend in future tasks.</p>
            <p className="text-sm text-gray-500 mt-2">Based on quality scores and verification images</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

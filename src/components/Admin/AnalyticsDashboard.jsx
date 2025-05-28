
import { useState, useEffect } from 'react';

function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    lowStockItems: 0,
    recentOrders: [],
    topProducts: [],
    revenueChart: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/analytics', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const StatCard = ({ title, value, icon, color = 'bg-ss_purple' }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color} text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`$${analytics.totalRevenue.toLocaleString()}`}
          icon="💰"
          color="bg-green-500"
        />
        <StatCard 
          title="Total Orders" 
          value={analytics.totalOrders}
          icon="📦"
          color="bg-blue-500"
        />
        <StatCard 
          title="Total Products" 
          value={analytics.totalProducts}
          icon="🏪"
          color="bg-ss_purple"
        />
        <StatCard 
          title="Low Stock Items" 
          value={analytics.lowStockItems}
          icon="⚠️"
          color="bg-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {analytics.recentOrders.map(order => (
              <div key={order.id} className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customerEmail}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${order.total}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {analytics.topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500">
                    #{index + 1}
                  </span>
                  <img 
                    src={product.image || '/assets/Images/chef-knife1.jpg'} 
                    alt={product.name}
                    className="w-8 h-8 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} sold</p>
                  </div>
                </div>
                <p className="font-semibold">${product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart integration coming soon</p>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;

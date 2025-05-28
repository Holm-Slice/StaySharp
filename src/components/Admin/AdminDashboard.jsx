
import { useState, useEffect } from 'react';
import ProductManager from './ProductManager';
import OrderManager from './OrderManager';
import AnalyticsDashboard from './AnalyticsDashboard';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        const response = await fetch('/api/admin/verify', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('adminToken', token);
        setIsAuthenticated(true);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center text-ss_purple mb-6">
            Admin Login
          </h1>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-ss_purple"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-ss_purple"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-ss_purple text-white py-2 rounded-md hover:bg-ss_pale_purple transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'orders', label: 'Orders', icon: '📋' },
    { id: 'analytics', label: 'Analytics', icon: '📊' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-ss_purple">
              Stay Sharp Admin
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex space-x-8 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-ss_purple text-white'
                  : 'text-gray-600 hover:text-ss_purple'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="bg-white rounded-lg shadow-sm">
          {activeTab === 'products' && <ProductManager />}
          {activeTab === 'orders' && <OrderManager />}
          {activeTab === 'analytics' && <AnalyticsDashboard />}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

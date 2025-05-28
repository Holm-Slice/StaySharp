
import { useState, useEffect } from 'react';

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/products', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    try {
      const url = editingProduct 
        ? `/api/admin/products/${editingProduct.id}`
        : '/api/admin/products';
      
      const method = editingProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchProducts();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      image: product.image
    });
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      image: ''
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Product Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-ss_purple text-white px-4 py-2 rounded-md hover:bg-ss_pale_purple transition-colors"
        >
          Add Product
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h3>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-ss_purple"
              required
            />
            
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-ss_purple"
              required
            />
            
            <input
              type="number"
              placeholder="Stock Quantity"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-ss_purple"
              required
            />
            
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-ss_purple"
              required
            />
            
            <input
              type="url"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-ss_purple"
            />
            
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-ss_purple md:col-span-2"
              rows="3"
              required
            />
            
            <div className="md:col-span-2 flex space-x-4">
              <button
                type="submit"
                className="bg-ss_purple text-white px-6 py-2 rounded-md hover:bg-ss_pale_purple transition-colors"
              >
                {editingProduct ? 'Update' : 'Create'} Product
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      src={product.image || '/assets/Images/chef-knife1.jpg'} 
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded mr-4"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.description?.substring(0, 50)}...
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.stock > 10 ? 'bg-green-100 text-green-800' :
                    product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.stock} units
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-ss_purple hover:text-ss_pale_purple"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManager;

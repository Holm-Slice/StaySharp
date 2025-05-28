
function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-1 aspect-h-1">
        <img 
          src={product.image || '/assets/Images/chef-knife1.jpg'} 
          alt={product.name}
          title={product.name}
          className="w-full h-64 object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-ss_purple">
            ${product.price}
          </span>
          
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-ss_purple text-white hover:bg-ss_pale_purple'
            }`}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
        
        {product.stock > 0 && product.stock <= 5 && (
          <p className="text-orange-500 text-sm mt-2">
            Only {product.stock} left in stock!
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductCard;

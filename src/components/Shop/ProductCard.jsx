import PropTypes from "prop-types";

function ProductCard({ product, onAddToCart }) {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div className="bg-white border-2 border-ss_purple shadow-[8px_8px_0px_#453393] hover:shadow-[12px_12px_0px_#453393] hover:scale-105 transition-all duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={product.image || "/assets/Images/chef-knife1.jpg"}
          alt={product.name}
          className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
        />
        
        {/* Category Badge */}
        <div className="absolute top-2 left-2 bg-ss_purple text-white px-2 py-1 text-xs font-medium rounded">
          {product.category}
        </div>
        
        {/* Stock Warning */}
        {product.stock > 0 && product.stock <= 3 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 text-xs font-medium rounded">
            Only {product.stock} left!
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-title font-bold text-lg text-center text-ss_purple">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 text-center mt-1">
            {product.brand} • {product.style} • {product.length}
          </p>
          <p className="text-sm text-gray-500 text-center mt-2 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="text-center">
          <p className="text-xl font-bold text-ss_purple">
            ${product.price}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-3 px-4 font-medium uppercase text-sm transition-colors duration-300 border-2 ${
            product.stock === 0
              ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
              : "bg-ss_purple text-white border-ss_purple hover:bg-white hover:text-ss_purple"
          }`}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
    length: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    description: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
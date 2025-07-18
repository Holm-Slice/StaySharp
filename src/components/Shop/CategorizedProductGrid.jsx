import React from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

function CategorizedProductGrid({ products, onAddToCart }) {
  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  // Define category order
  const categoryOrder = ["Knives", "Utensils", "Other"];

  // Get category descriptions
  const getCategoryDescription = (category) => {
    switch (category) {
      case "Knives":
        return "Professional kitchen knives for every culinary need";
      case "Utensils":
        return "Essential tools and accessories for food preparation";
      case "Other":
        return "Specialized equipment and maintenance tools";
      default:
        return "";
    }
  };

  if (!products.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products available</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {categoryOrder.map((category) => {
        const categoryProducts = groupedProducts[category];

        if (!categoryProducts || categoryProducts.length === 0) {
          return null;
        }

        return (
          <div key={category} className="category-section">
            {/* Category Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-ss_purple mb-2">
                {category}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {getCategoryDescription(category)}
              </p>
              <div className="mt-4 w-24 h-1 bg-ss_purple mx-auto"></div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.slice(0, 3).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

CategorizedProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default CategorizedProductGrid;

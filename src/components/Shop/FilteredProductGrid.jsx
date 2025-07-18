import React from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

function FilteredProductGrid({
  products,
  onAddToCart,
  groupByCategory = true,
  filters = {},
}) {
  // Show "No results" message if no products match filters
  if (!products.length) {
    const isFiltered =
      filters.search ||
      filters.category !== "all" ||
      filters.brand !== "all" ||
      filters.minPrice ||
      filters.maxPrice;

    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {isFiltered
              ? "No products match your filters"
              : "No products available"}
          </h3>
          <p className="text-gray-500">
            {isFiltered
              ? "Try adjusting your search criteria or clearing filters."
              : "Check back later for new products."}
          </p>
        </div>
      </div>
    );
  }

  // If not grouping by category or only one category, show simple grid
  if (!groupByCategory || filters.category !== "all") {
    return (
      <div className="space-y-6">
        {/* Results Summary */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            {products.length} product{products.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Simple Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    );
  }

  // Group products by category for categorized view
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

  return (
    <div className="space-y-12">
      {/* Results Summary */}
      <div className="text-center">
        <p className="text-gray-600">
          {products.length} product{products.length !== 1 ? "s" : ""} found
        </p>
      </div>

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
              <p className="text-sm text-gray-500 mt-2">
                {categoryProducts.length} item
                {categoryProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.map((product) => (
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

FilteredProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  groupByCategory: PropTypes.bool,
  filters: PropTypes.object,
};

export default FilteredProductGrid;

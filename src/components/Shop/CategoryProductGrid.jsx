import React, { useState } from "react";
import ProductCard from "./ProductCard";

function CategoryProductGrid({
  products,
  onAddToCart,
  groupByCategory = true,
  filters = {},
}) {
  const [expandedCategories, setExpandedCategories] = useState({});

  // Items to show initially per category
  const INITIAL_ITEMS_PER_CATEGORY = 3;

  // Show "No results" message if no products match filters
  if (!products.length) {
    const isFiltered =
      filters.search || filters.category !== "all" || filters.brand !== "all";

    return (
      <div className="text-center py-16">
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
              ? "Try adjusting your search or filters."
              : "Check back later for new products."}
          </p>
        </div>
      </div>
    );
  }

  // If not grouping by category, show simple grid
  if (!groupByCategory) {
    return (
      <div className="space-y-6">
        {/* Results Summary */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            {products.length} product{products.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Simple Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
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

  const toggleCategoryExpansion = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="space-y-16">
      {/* Results Summary */}
      <div className="text-center">
        <p className="text-gray-600">
          {products.length} product{products.length !== 1 ? "s" : ""} found
          across {Object.keys(groupedProducts).length} categories
        </p>
      </div>

      {categoryOrder.map((category, index) => {
        const categoryProducts = groupedProducts[category];

        if (!categoryProducts || categoryProducts.length === 0) {
          return null;
        }

        const isExpanded = expandedCategories[category];
        const shouldShowSeeMore =
          categoryProducts.length > INITIAL_ITEMS_PER_CATEGORY;
        const productsToShow = isExpanded
          ? categoryProducts
          : categoryProducts.slice(0, INITIAL_ITEMS_PER_CATEGORY);

        return (
          <div key={category} className="category-section">
            {/* Category Divider (except for first category) */}
            {index > 0 && (
              <div className="border-t border-gray-200 pt-16 -mt-8"></div>
            )}

            {/* Category Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-ss_purple mb-3">
                {category}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
                {getCategoryDescription(category)}
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-1 bg-ss_purple"></div>
                <span className="text-sm text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
                  {categoryProducts.length} item
                  {categoryProducts.length !== 1 ? "s" : ""}
                </span>
                <div className="w-12 h-1 bg-ss_purple"></div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 px-4">
              {productsToShow.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>

            {/* View More/Less Button */}
            {shouldShowSeeMore && (
              <div className="text-center">
                <button
                  onClick={() => toggleCategoryExpansion(category)}
                  className="inline-flex items-center px-8 py-3 font-medium uppercase text-sm transition-all duration-[1300ms] border-4 bg-ss_purple text-white border-ss_purple hover:bg-white hover:text-ss_purple hover:scale-105"
                >
                  {isExpanded ? (
                    <>
                      <span>Show Less</span>
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>
                        View More (
                        {categoryProducts.length - INITIAL_ITEMS_PER_CATEGORY}{" "}
                        more)
                      </span>
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CategoryProductGrid;

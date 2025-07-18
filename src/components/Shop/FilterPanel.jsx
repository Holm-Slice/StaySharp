import React, { useState } from "react";

function FilterPanel({ products, onFilterChange, filters }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get unique categories from products
  const categories = [...new Set(products.map((product) => product.category))];

  // Get price range from products
  const prices = products.map((product) => product.price);
  const minPrice = Math.floor(Math.min(...prices));
  const maxPrice = Math.ceil(Math.max(...prices));

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const clearFilters = () => {
    onFilterChange("clear");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="md:hidden w-full flex items-center justify-between p-3 bg-ss_purple text-white rounded-lg mb-4"
      >
        <span className="font-semibold">Filters</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
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
      </button>

      {/* Filter Content */}
      <div className={`${isExpanded ? "block" : "hidden"} md:block space-y-6`}>
        {/* Search */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Search Products
          </label>
          <input
            type="text"
            placeholder="Search by name or brand..."
            value={filters.search || ""}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ss_purple focus:border-ss_purple"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category || "all"}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ss_purple focus:border-ss_purple"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Price Range
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ss_purple focus:border-ss_purple"
              min={minPrice}
              max={maxPrice}
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ""}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ss_purple focus:border-ss_purple"
              min={minPrice}
              max={maxPrice}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Range: ${minPrice} - ${maxPrice}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy || "name"}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ss_purple focus:border-ss_purple"
          >
            <option value="name">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
            <option value="category">Category</option>
          </select>
        </div>

        {/* Brand Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Brand
          </label>
          <select
            value={filters.brand || "all"}
            onChange={(e) => handleFilterChange("brand", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ss_purple focus:border-ss_purple"
          >
            <option value="all">All Brands</option>
            {[...new Set(products.map((product) => product.brand))].map(
              (brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              )
            )}
          </select>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}

export default FilterPanel;

import React from "react";

function StreamlinedFilterBar({ products, onFilterChange, filters }) {
  // Get unique categories and brands from products
  const categories = [...new Set(products.map((product) => product.category))];
  const brands = [...new Set(products.map((product) => product.brand))];

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const clearFilters = () => {
    onFilterChange("clear");
  };

  // Check if any filters are active
  const hasActiveFilters =
    filters.search ||
    filters.category !== "all" ||
    filters.brand !== "all" ||
    filters.sortBy !== "name";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Search Bar */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search || ""}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ss_purple focus:border-ss_purple transition-all duration-300"
            />
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Category Filter */}
          <select
            value={filters.category || "all"}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ss_purple focus:border-ss_purple text-sm transition-all duration-300"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Brand Filter */}
          <select
            value={filters.brand || "all"}
            onChange={(e) => handleFilterChange("brand", e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ss_purple focus:border-ss_purple text-sm transition-all duration-300"
          >
            <option value="all">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={filters.sortBy || "name"}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ss_purple focus:border-ss_purple text-sm transition-all duration-300"
          >
            <option value="name">A-Z</option>
            <option value="name-desc">Z-A</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-500">Filters:</span>
            {filters.search && (
              <span className="px-2 py-1 bg-ss_purple text-white text-xs rounded-full transition-all duration-300 hover:scale-105 cursor-default">
                "{filters.search}"
              </span>
            )}
            {filters.category !== "all" && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full transition-all duration-300 hover:scale-105 cursor-default">
                {filters.category}
              </span>
            )}
            {filters.brand !== "all" && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full transition-all duration-300 hover:scale-105 cursor-default">
                {filters.brand}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default StreamlinedFilterBar;

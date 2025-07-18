// Utility functions for filtering and sorting products

export const filterProducts = (products, filters) => {
  if (!products || products.length === 0) return [];

  let filteredProducts = [...products];

  // Search filter
  if (filters.search && filters.search.trim() !== "") {
    const searchTerm = filters.search.toLowerCase().trim();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
  }

  // Category filter
  if (filters.category && filters.category !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === filters.category
    );
  }

  // Brand filter
  if (filters.brand && filters.brand !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.brand === filters.brand
    );
  }

  // Price range filter
  if (filters.minPrice && filters.minPrice !== "") {
    const minPrice = parseFloat(filters.minPrice);
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice
    );
  }

  if (filters.maxPrice && filters.maxPrice !== "") {
    const maxPrice = parseFloat(filters.maxPrice);
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= maxPrice
    );
  }

  // Sort products
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "name":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "category":
        filteredProducts.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        // Default to name sorting
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  return filteredProducts;
};

export const getFilteredCategories = (products, filters) => {
  const filteredProducts = filterProducts(products, filters);
  const categories = {};

  filteredProducts.forEach((product) => {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
  });

  return categories;
};

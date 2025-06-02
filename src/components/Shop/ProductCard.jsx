import React from "react";

function ProductCard({ product, onAddToCart }) {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div className="flex flex-col justify-center items-center p-2 md:p-4">
      <main className="bg-white border-2 border-ss_purple w-full p-3 md:p-6 md:grid md:grid-cols-2 md:gap-4 shadow-[8px_8px_0px_#453393] hover:transition-transform md:hover:scale-110 hover:duration-[2000ms] duration-[3000ms] cursor-pointer gap-3 overflow-hidden">
        <div className="relative w-full h-48 md:h-auto overflow-hidden">
          <img
            src={product.image || "/assets/Images/chef-knife1.jpg"}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
        <section className="flex flex-col h-full justify-between">
          <div>
            <h1 className="font-title font-bold text-xl md:text-2xl text-center">
              {product.name}
            </h1>
            <h2 className="text-lg md:text-xl text-gray-500 font-light my-2 md:my-3 text-center">
              {product.description}
            </h2>
          </div>

          <div className="flex flex-col items-center space-y-2 mt-4">
            <p className="font-light text-black text-center text-sm md:text-base">
              ${product.price}
            </p>
            {product.stock > 0 && product.stock <= 3 && (
              <p className="text-orange-500 text-sm">
                Only {product.stock} left in stock!
              </p>
            )}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="bg-ss_purple text-white uppercase py-2 px-6 w-full max-w-48 hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] border-4 border-ss_purple text-sm md:text-base min-h-[44px] flex items-center justify-center"
              style={{ display: 'block !important', visibility: 'visible !important', opacity: '1 !important' }}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductCard;
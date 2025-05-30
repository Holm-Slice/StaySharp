function ProductCard({ product, onAddToCart }) {
  return (
    <div className="flex flex-col justify-center items-center p-4 m-4 md:p-8 md:m-8 overflow-hidden">
      <main className="bg-white border-2 border-ss_purple w-full max-w-xs md:max-w-lg p-4 md:p-8 md:grid md:grid-cols-2 md:gap-8 shadow-[8px_8px_0px_#453393] hover:transition-transform hover:scale-110 hover:duration-[3000ms] duration-[4000ms] cursor-pointer gap-4 overflow-hidden">
        <div className="relative w-full h-48 md:h-auto overflow-hidden">
          <img
            src={product.image || "/assets/Images/chef-knife1.jpg"}
            alt={product.name}
            title={product.name}
            className="object-cover w-full h-full"
          />
        </div>

        <section>
          <h1 className="font-title font-bold text-xl md:text-2xl text-center">
            {product.name}
          </h1>

          <h2 className="text-lg md:text-xl text-gray-500 font-light my-2 md:my-3 text-center">
            {product.description}
          </h2>

          <section className="flex items-center justify-center my-2 md:my-4">
            <button
              onClick={() => onAddToCart(product)}
              disabled={product.stock === 0}
              className="bg-ss_purple text-white uppercase py-1 px-2 md:pt-2 md:pb-1 md:px-4 flex-grow hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] md:flex-none border-4 border-ss_purple"
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </section>

          <p className="font-light text-black text-center text-sm md:text-base">
            ${product.price}
          </p>

          {product.stock > 0 && product.stock <= 5 && (
            <p className="text-orange-500 text-sm mt-2 text-center">
              Only {product.stock} left in stock!
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default ProductCard;

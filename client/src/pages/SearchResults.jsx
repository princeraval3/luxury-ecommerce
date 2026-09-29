import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchProducts } from "../services/productService";

const SearchResults = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);

        if (!query.trim()) {
          setProducts([]);
          return;
        }

        const data = await searchProducts(query);

        if (data.success) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("search error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-sm">
          searching products...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Heading */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
          search results
        </p>

        <h1 className="text-2xl sm:text-3xl font-serif">
          results for "{query}"
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          {products.length} product
          {products.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* No Results */}
      {products.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-serif mb-2">
            no products found
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            try searching with a different product name or category.
          </p>

          <Link
            to="/shop"
            className="bg-black text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-gray-800 transition"
          >
            continue shopping
          </Link>
        </div>
      ) : (
        /* Product Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="group"
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    no image
                  </div>
                )}

                {/* Out of Stock */}
                {product.stock <= 0 && (
                  <div className="absolute top-2 left-2 bg-black text-white text-[9px] px-2 py-1 uppercase tracking-wide">
                    out of stock
                  </div>
                )}

                {/* Featured */}
                {product.isFeatured && (
                  <div className="absolute top-2 right-2 bg-white text-black text-[9px] px-2 py-1 uppercase tracking-wide">
                    featured
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="pt-3">
                <p className="text-[10px] uppercase tracking-widest text-gray-400">
                  {product.brand || product.category}
                </p>

                <h2 className="text-sm sm:text-base font-medium mt-1 line-clamp-2">
                  {product.name}
                </h2>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm sm:text-base font-semibold">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </span>

                  {product.discount > 0 && (
                    <span className="text-[10px] sm:text-xs text-gray-400">
                      {product.discount}% off
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
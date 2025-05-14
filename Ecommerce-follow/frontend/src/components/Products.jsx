import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../store/slices/productSlice";
import Card from "./Card";

const Products = () => {
  const dispatch = useDispatch();
  const { allProducts, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Products
        </h1>

        {/* Loading State */}
        {status === 'loading' && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {status === 'failed' && (
          <div className="text-center py-8">
            <p className="text-red-500">Error: {error || "Failed to load products"}</p>
          </div>
        )}

        {/* Products Grid */}
        {status === 'succeeded' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProducts.map((product) => (
              <Card key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
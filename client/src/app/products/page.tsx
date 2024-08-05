"use client";

import { useState } from "react";
import Image from "next/image";
import { PlusCircleIcon, SearchIcon } from "lucide-react";

import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";

import { Header } from "@/app/(components)/Header";
import { Rating } from "@/app/(components)/Rating";
import { CreateProductModal } from "@/app/products/CreateProductModal";

interface ProductFormData {
  productId: string;
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // getting data from redux toolkit setup using searchTerm //
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  // create product mutation from redux toolkit setup //
  const [createProduct] = useCreateProductMutation();
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="py-4 text-center text-red-500">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="w-full mx-auto pb-5">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 m-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 rounded bg-white"
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="mb-6 flex justify-between items-center">
        <Header name="Products" />
        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2 px-4 flex items-center font-bold text-gray-200 rounded bg-blue-500 hover:bg-blue-700"
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Create
          Product
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div className="">Loading...</div>
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className="w-full max-w-full mx-auto p-4 border rounded-md shadow"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={`https://s3-inventory-management-app.s3.us-west-1.amazonaws.com/product${
                    Math.floor(Math.random() * 3) + 1
                  }.png`}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="w-36 h-36 mb-3 rounded-2xl"
                />
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="text-gray-800">${product.price.toFixed(2)}</p>
                <div className="mt-1 text-sm text-gray-600">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="mt-2 flex items-center">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;

import { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";

import { Header } from "@/app/(components)/Header";

interface ProductFormData {
  productId: string;
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
}

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
}

const labelCssStyles = "block text-sm font-medium text-gray-700";
const inputCssStyles =
  "w-full mb-2 p-2 block border-2 border-gray-500 rounded-md";

export const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState<ProductFormData>({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  if (!isOpen) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  return (
    <div className="w-full h-full z-20 fixed inset-0 overflow-y-auto bg-opacity-50 bg-gray-600">
      <div className="w-96 mx-auto p-5 relative top-20 border rounded-md shadow-lg bg-white">
        <Header name="Create New Product" className="text-center" />

        <form onSubmit={handleSubmit} className="mt-5">
          {/* NAME */}
          <label htmlFor="name" className={labelCssStyles}>
            Product Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputCssStyles}
          />

          {/* PRODUCT PRICE */}
          <label htmlFor="price" className={labelCssStyles}>
            Product Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            className={inputCssStyles}
          />

          {/* PRODUCT STOCK QUANTITY */}
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Product Stock Quantity
          </label>
          <input
            id="stockQuantity"
            name="stockQuantity"
            type="number"
            value={formData.stockQuantity}
            onChange={handleChange}
            required
            className={inputCssStyles}
          />

          {/* PRODUCT RATING */}
          <label htmlFor="rating" className={labelCssStyles}>
            Product Rating
          </label>
          <input
            id="rating"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            required
            className={inputCssStyles}
          />

          {/* CREATE ACTIONS */}
          <div className="mt-4 flex justify-center gap-2">
            <button
              type="submit"
              className="px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-700"
            >
              Create
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white rounded bg-gray-500 hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import {
  FiUploadCloud,
  FiX,
  FiPlus,
  FiPackage,
  FiDollarSign,
  FiTag,
  FiLayers,
  FiCheckCircle,
} from "react-icons/fi";

import { createProduct } from "../services/productService";
import { getCategories } from "../services/categoryService";

const subCategories = [
  "Dresses",
  "Tops & Blouses",
  "Trousers",
  "Jackets & Coats",
  "Knitwear",
  "Skirts",
];

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    subCategory: "",
    brand: "",
    stock: "",
    featured: false,
  });

  const [categories, setCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [currentColor, setCurrentColor] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(true);

  // fetch categories from database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);

        const response = await getCategories();

        if (response.success) {
          setCategories(response.categories);
        }
      } catch (error) {
        console.error("failed to fetch categories:", error);
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Size Selector Toggle
  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  // Add Color Tag
  const handleAddColor = (e) => {
    e.preventDefault();

    if (
      currentColor.trim() &&
      !colors.includes(currentColor.trim())
    ) {
      setColors([...colors, currentColor.trim()]);
      setCurrentColor("");
    }
  };

  const removeColor = (colorToRemove) => {
    setColors(colors.filter((c) => c !== colorToRemove));
  };

  // Image Upload Preview Handler
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 5) {
      alert("maximum 5 images are allowed");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Create Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("discount", formData.discount);
      data.append("category", formData.category);
      data.append("subCategory", formData.subCategory);
      data.append("brand", formData.brand);
      data.append("stock", formData.stock);

      // backend me field ka naam isFeatured hai
      data.append("isFeatured", formData.featured);

      // sizes
      selectedSizes.forEach((size) => {
        data.append("sizes", size);
      });

      // colors
      colors.forEach((color) => {
        data.append("colors", color);
      });

      // images
      images.forEach((image) => {
        data.append("images", image.file);
      });

      const response = await createProduct(data);

      console.log("product created:", response);

      alert("product added successfully");

      // reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        discount: "",
        category: "",
        subCategory: "",
        brand: "",
        stock: "",
        featured: false,
      });

      setSelectedSizes([]);
      setColors([]);
      setCurrentColor("");
      setImages([]);
    } catch (error) {
      console.error("product create error:", error);

      alert(
        error.response?.data?.message ||
          "failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-4 sm:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold mb-1">
              ADMIN CONTROL PANEL
            </p>

            <h1 className="text-2xl sm:text-4xl font-serif text-gray-900 font-medium">
              Add New Product
            </h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* LEFT 2 COLUMNS */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Info Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
              <h2 className="text-base font-serif font-medium text-gray-900 border-b border-gray-100 pb-3">
                General Information
              </h2>

              {/* Product Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Product Name *
                </label>

                <input
                  type="text"
                  required
                  placeholder="e.g. Silk Tailored Blazer"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Description *
                </label>

                <textarea
                  rows="5"
                  required
                  placeholder="Write a detailed product description..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black transition resize-none"
                ></textarea>
              </div>
            </div>

            {/* Pricing & Stock */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
              <h2 className="text-base font-serif font-medium text-gray-900 border-b border-gray-100 pb-3">
                Pricing & Inventory
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Price */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                    Price (₹) *
                  </label>

                  <input
                    type="number"
                    required
                    placeholder="18500"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black transition"
                  />
                </div>

                {/* Discount */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                    Discount (%)
                  </label>

                  <input
                    type="number"
                    placeholder="10"
                    value={formData.discount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discount: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black transition"
                  />
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                    Stock Quantity *
                  </label>

                  <input
                    type="number"
                    required
                    placeholder="50"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stock: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black transition"
                  />
                </div>
              </div>
            </div>

            {/* Multiple Images Upload */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
              <h2 className="text-base font-serif font-medium text-gray-900 border-b border-gray-100 pb-3">
                Product Images
              </h2>

              <label className="border-2 border-dashed border-gray-300 hover:border-black bg-gray-50/50 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer transition text-center group">
                <FiUploadCloud className="text-3xl text-gray-400 group-hover:text-black transition mb-2" />

                <p className="text-xs font-semibold text-gray-800">
                  Click to upload{" "}
                  <span className="font-normal text-gray-500">
                    or drag and drop
                  </span>
                </p>

                <p className="text-[10px] text-gray-400 mt-1">
                  PNG, JPG or WEBP (Max 5MB per file)
                </p>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* Image Previews */}
              {images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-xl overflow-hidden group border border-gray-200"
                    >
                      <img
                        src={img.url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1.5 right-1.5 bg-black/70 hover:bg-red-500 text-white p-1 rounded-full text-xs transition"
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Category & Brand */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
              <h2 className="text-base font-serif font-medium text-gray-900 border-b border-gray-100 pb-3">
                Organization
              </h2>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Category *
                </label>

                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black transition cursor-pointer"
                >
                  <option value="">
                    {categoryLoading
                      ? "Loading Categories..."
                      : "Select Category"}
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category._id}
                      value={category.name}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub Category */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Sub Category
                </label>

                <select
                  value={formData.subCategory}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subCategory: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black transition cursor-pointer"
                >
                  <option value="">Select Sub Category</option>

                  {subCategories.map((sc) => (
                    <option key={sc} value={sc}>
                      {sc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Brand Name
                </label>

                <input
                  type="text"
                  placeholder="LUXE"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brand: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black transition"
                />
              </div>
            </div>

            {/* Sizes & Colors */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
              <h2 className="text-base font-serif font-medium text-gray-900 border-b border-gray-100 pb-3">
                Variants
              </h2>

              {/* Sizes */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                  Available Sizes
                </label>

                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSize(s)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                        selectedSizes.includes(s)
                          ? "bg-black text-white border-black"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:border-black"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Colors
                </label>

                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="e.g. Black, Rose Gold"
                    value={currentColor}
                    onChange={(e) =>
                      setCurrentColor(e.target.value)
                    }
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-black transition"
                  />

                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="px-3 py-2 bg-black text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition"
                  >
                    <FiPlus />
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {colors.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-[11px] font-medium px-2.5 py-1 rounded-md border border-gray-200"
                    >
                      {c}

                      <button
                        type="button"
                        onClick={() => removeColor(c)}
                        className="text-gray-400 hover:text-black"
                      >
                        <FiX />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured & Submit */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featured: e.target.checked,
                    })
                  }
                  className="w-4 h-4 accent-black rounded cursor-pointer"
                />

                <span className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Mark as Featured Product
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#111111] text-white text-xs uppercase tracking-widest font-semibold rounded-xl hover:bg-[#C5A059] hover:text-black transition duration-200 shadow-sm mt-2 disabled:opacity-50"
              >
                {loading ? "Publishing..." : "Publish Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
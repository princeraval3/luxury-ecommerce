import  { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiPlus, FiX, FiArrowLeft } from "react-icons/fi";

import { updateProduct } from "../services/productService";

const categories = [
  "Women",
  "Men",
  "Accessories",
  "Footwear",
];

const subCategories = [
  "Dresses",
  "Tops & Blouses",
  "Trousers",
  "Jackets & Coats",
  "Knitwear",
  "Skirts",
];

const sizeOptions = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
];

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

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

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [currentColor, setCurrentColor] = useState("");

  const [oldImages, setOldImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const [loading, setLoading] = useState(false);

  // =========================
  // LOAD PRODUCT DATA
  // =========================

  useEffect(() => {
    if (!product) {
      navigate("/admin/products");
      return;
    }

    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      discount: product.discount || "",
      category: product.category || "",
      subCategory: product.subCategory || "",
      brand: product.brand || "",
      stock: product.stock || "",
      featured: product.isFeatured || false,
    });

    setSelectedSizes(product.sizes || []);
    setColors(product.colors || []);
    setOldImages(product.images || []);
  }, [product, navigate]);

  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // SIZE
  // =========================

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  // =========================
  // COLOR
  // =========================

  const addColor = () => {
    const color = currentColor.trim();

    if (!color) return;

    if (colors.includes(color)) {
      return;
    }

    setColors((prev) => [...prev, color]);
    setCurrentColor("");
  };

  const removeColor = (color) => {
    setColors((prev) =>
      prev.filter((item) => item !== color)
    );
  };

  // =========================
  // IMAGE CHANGE
  // =========================

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    if (files.length > 5) {
      alert("maximum 5 images are allowed");
      return;
    }

    const imageData = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setNewImages(imageData);
  };

  // =========================
  // SUBMIT
  // =========================

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

      data.append("isFeatured", formData.featured);

      selectedSizes.forEach((size) => {
        data.append("sizes", size);
      });

      colors.forEach((color) => {
        data.append("colors", color);
      });

      newImages.forEach((image) => {
        data.append("images", image.file);
      });

      const response = await updateProduct(
        product._id,
        data
      );

      console.log("product updated:", response);

      alert("product updated successfully");

      navigate("/admin/products");
    } catch (error) {
      console.error("update product error:", error);

      alert(
        error.response?.data?.message ||
          "failed to update product"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // PRODUCT NOT FOUND
  // =========================

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-8">

        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-5"
        >
          <FiArrowLeft />
          back to products
        </button>

        <h1 className="text-2xl md:text-3xl font-semibold">
          edit product
        </h1>

        <p className="text-gray-500 mt-1">
          update your product information
        </p>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white rounded-2xl p-5 md:p-8 shadow-sm"
      >

        {/* BASIC INFORMATION */}
        <div className="mb-8">

          <h2 className="text-lg font-semibold mb-5">
            basic information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* NAME */}
            <div>
              <label className="block text-sm font-medium mb-2">
                product name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* BRAND */}
            <div>
              <label className="block text-sm font-medium mb-2">
                brand
              </label>

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="mt-5">

            <label className="block text-sm font-medium mb-2">
              description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

          </div>

        </div>

        {/* PRICE */}
        <div className="mb-8">

          <h2 className="text-lg font-semibold mb-5">
            pricing & stock
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div>
              <label className="block text-sm font-medium mb-2">
                price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                discount
              </label>

              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

          </div>

        </div>

        {/* CATEGORY */}
        <div className="mb-8">

          <h2 className="text-lg font-semibold mb-5">
            category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <label className="block text-sm font-medium mb-2">
                category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">
                  select category
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                sub category
              </label>

              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">
                  select sub category
                </option>

                {subCategories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>

            </div>

          </div>

        </div>

        {/* SIZES */}
        <div className="mb-8">

          <h2 className="text-lg font-semibold mb-4">
            sizes
          </h2>

          <div className="flex flex-wrap gap-3">

            {sizeOptions.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-5 py-2 rounded-lg border ${
                  selectedSizes.includes(size)
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {size}
              </button>
            ))}

          </div>

        </div>

        {/* COLORS */}
        <div className="mb-8">

          <h2 className="text-lg font-semibold mb-4">
            colors
          </h2>

          <div className="flex gap-3">

            <input
              type="text"
              value={currentColor}
              onChange={(e) =>
                setCurrentColor(e.target.value)
              }
              placeholder="enter color"
              className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

            <button
              type="button"
              onClick={addColor}
              className="px-5 bg-black text-white rounded-lg flex items-center gap-2"
            >
              <FiPlus />
              add
            </button>

          </div>

          <div className="flex flex-wrap gap-2 mt-4">

            {colors.map((color) => (
              <div
                key={color}
                className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg"
              >
                <span>{color}</span>

                <button
                  type="button"
                  onClick={() => removeColor(color)}
                >
                  <FiX />
                </button>
              </div>
            ))}

          </div>

        </div>

        {/* OLD IMAGES */}
        <div className="mb-8">

          <h2 className="text-lg font-semibold mb-4">
            current images
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

            {oldImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden border"
              >
                <img
                  src={image}
                  alt="product"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

          </div>

        </div>

        {/* NEW IMAGES */}
        <div className="mb-8">

          <h2 className="text-lg font-semibold mb-4">
            replace images
          </h2>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-lg p-3"
          />

          {newImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5">

              {newImages.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden border"
                >
                  <img
                    src={image.url}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

            </div>
          )}

          <p className="text-sm text-gray-500 mt-2">
            upload new images only if you want to replace the current images
          </p>

        </div>

        {/* FEATURED */}
        <div className="mb-8">

          <label className="flex items-center gap-3 cursor-pointer">

            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5"
            />

            <span className="font-medium">
              featured product
            </span>

          </label>

        </div>

        {/* BUTTON */}
        <div className="flex gap-3">

          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-6 py-3 border rounded-lg"
          >
            cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-black text-white rounded-lg py-3 font-medium disabled:opacity-50"
          >
            {loading
              ? "updating..."
              : "update product"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default EditProduct;
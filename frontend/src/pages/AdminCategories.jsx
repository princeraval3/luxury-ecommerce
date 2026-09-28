import React, { useEffect, useState } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
} from "react-icons/fi";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  // =========================
  // GET CATEGORIES
  // =========================

  const loadCategories = async () => {
    try {
      setLoading(true);

      const data = await getCategories();

      setCategories(data?.categories || []);
    } catch (error) {
      console.error("get categories error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setName("");
    setDescription("");
    setImage("");
    setEditingId(null);
  };

  // =========================
  // ADD / UPDATE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("category name is required");
      return;
    }

    try {
      setLoading(true);

      const categoryData = {
        name,
        description,
        image,
        isActive: true,
      };

      if (editingId) {
        await updateCategory(
          editingId,
          categoryData
        );

        alert("category updated successfully");
      } else {
        await createCategory(categoryData);

        alert("category created successfully");
      }

      resetForm();

      await loadCategories();
    } catch (error) {
      console.error("category error:", error);

      alert(
        error.response?.data?.message ||
          "something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (category) => {
    setEditingId(category._id);
    setName(category.name || "");
    setDescription(category.description || "");
    setImage(category.image || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCategory(id);

      setCategories((prev) =>
        prev.filter((category) => category._id !== id)
      );

      alert("category deleted successfully");
    } catch (error) {
      console.error("delete category error:", error);

      alert(
        error.response?.data?.message ||
          "failed to delete category"
      );
    }
  };

  // =========================
  // SEARCH
  // =========================

  const filteredCategories = categories.filter(
    (category) =>
      category.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-2xl md:text-3xl font-semibold">
            category management
          </h1>

          <p className="text-gray-500 mt-1">
            create and manage product categories
          </p>

        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl p-5 md:p-7 shadow-sm mb-8">

          <h2 className="text-lg font-semibold mb-5">
            {editingId
              ? "edit category"
              : "add category"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* NAME */}
            <div>

              <label className="block text-sm font-medium mb-2">
                category name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="e.g. watches"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />

            </div>

            {/* DESCRIPTION */}
            <div>

              <label className="block text-sm font-medium mb-2">
                description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="category description"
                rows="3"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />

            </div>

            {/* IMAGE */}
            <div>

              <label className="block text-sm font-medium mb-2">
                image url
              </label>

              <input
                type="text"
                value={image}
                onChange={(e) =>
                  setImage(e.target.value)
                }
                placeholder="https://..."
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />

            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">

              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50"
              >
                <FiPlus />

                {loading
                  ? "saving..."
                  : editingId
                  ? "update category"
                  : "add category"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="border px-6 py-3 rounded-lg"
                >
                  cancel
                </button>
              )}

            </div>

          </form>

        </div>

        {/* SEARCH */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-5">

          <div className="relative">

            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="search category..."
              className="w-full border rounded-lg pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

          </div>

        </div>

        {/* CATEGORY LIST */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <div className="p-5 border-b">

            <h2 className="font-semibold">
              categories ({filteredCategories.length})
            </h2>

          </div>

          {loading && categories.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              loading categories...
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              no categories found
            </div>
          ) : (
            <div className="divide-y">

              {filteredCategories.map((category) => (
                <div
                  key={category._id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >

                  <div className="flex items-center gap-4">

                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                        no image
                      </div>
                    )}

                    <div>

                      <h3 className="font-semibold">
                        {category.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {category.description ||
                          "no description"}
                      </p>

                    </div>

                  </div>

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        handleEdit(category)
                      }
                      className="border rounded-lg p-3 hover:bg-gray-50"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(category._id)
                      }
                      className="border border-red-200 text-red-500 rounded-lg p-3 hover:bg-red-50"
                    >
                      <FiTrash2 />
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default AdminCategories;
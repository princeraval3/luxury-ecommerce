import React, { useEffect, useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import { getProducts, deleteProduct } from "../services/productService";

const AdminProducts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [deleteLoading, setDeleteLoading] = useState(null);

  const [error, setError] = useState("");

  // =========================
  // GET ALL PRODUCTS
  // =========================

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      setProducts(data?.products || []);
    } catch (error) {
      console.error("failed to load products:", error);

      setError(error.response?.data?.message || "failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD PRODUCTS ON PAGE LOAD
  // =========================

  useEffect(() => {
    loadProducts();
  }, []);

  // =========================
  // DELETE PRODUCT
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "are you sure you want to delete this product?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleteLoading(id);

      await deleteProduct(id);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id),
      );

      alert("product deleted successfully");
    } catch (error) {
      console.error("delete product error:", error);

      alert(error.response?.data?.message || "failed to delete product");
    } finally {
      setDeleteLoading(null);
    }
  };

  // =========================
  // SEARCH
  // =========================

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    return (
      product.name?.toLowerCase().includes(searchText) ||
      product.category?.toLowerCase().includes(searchText) ||
      product.brand?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex relative overflow-x-hidden">
      {/* =========================
          MOBILE OVERLAY
      ========================= */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-[#111111] text-white z-50 transition-transform duration-300 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* logo */}

          <div className="p-6 flex items-center justify-between border-b border-gray-800">
            <h1 className="text-xl font-serif tracking-[0.2em]">
              LUXE{" "}
              <span className="text-[10px] text-[#C5A059] tracking-widest uppercase">
                Admin
              </span>
            </h1>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* navigation */}

          <nav className="p-4 space-y-1.5 text-xs font-medium">
            <Link
              to="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition"
            >
              Dashboard
            </Link>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#222222] text-[#C5A059] font-semibold">
              Products
            </div>

            <button className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition">
              Orders
            </button>

            <button className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition">
              Users
            </button>

            <button className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition">
              Settings
            </button>
          </nav>
        </div>
      </aside>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="flex-1 min-w-0">
        {/* =========================
            TOP NAVBAR
        ========================= */}

        <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-gray-200"
            >
              <FiMenu />
            </button>

            <div>
              <h2 className="text-xl font-serif text-gray-900">Products</h2>

              <p className="text-xs text-gray-500 mt-1">
                Manage your product catalog
              </p>
            </div>
          </div>

          {/* ADD PRODUCT */}

          <Link to="/add-product">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-gray-800 transition">
              <FiPlus />
              Add Product
            </button>
          </Link>
        </header>

        {/* =========================
            CONTENT
        ========================= */}

        <main className="p-4 sm:p-8 max-w-7xl mx-auto">
          {/* SEARCH */}

          <div className="bg-white p-4 rounded-2xl border border-gray-200 mb-6">
            <div className="relative max-w-md">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* ERROR */}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* PRODUCTS */}

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* HEADER */}

            <div className="p-5 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">
                All Products
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                {products.length} products in your catalog
              </p>
            </div>

            {/* LOADING */}

            {loading ? (
              <div className="p-16 text-center">
                <div className="w-8 h-8 border-2 border-black border-t-[#C5A059] rounded-full animate-spin mx-auto"></div>

                <p className="text-sm text-gray-500 mt-4">
                  loading products...
                </p>
              </div>
            ) : (
              <>
                {/* DESKTOP TABLE */}

                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-5 py-4 text-[11px] uppercase tracking-wider text-gray-500">
                          Product
                        </th>

                        <th className="text-left px-5 py-4 text-[11px] uppercase tracking-wider text-gray-500">
                          Category
                        </th>

                        <th className="text-left px-5 py-4 text-[11px] uppercase tracking-wider text-gray-500">
                          Price
                        </th>

                        <th className="text-left px-5 py-4 text-[11px] uppercase tracking-wider text-gray-500">
                          Stock
                        </th>

                        <th className="text-right px-5 py-4 text-[11px] uppercase tracking-wider text-gray-500">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr
                          key={product._id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition"
                        >
                          {/* PRODUCT */}

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.images?.[0]}
                                alt={product.name}
                                className="w-12 h-12 rounded-xl object-cover"
                              />

                              <div>
                                <p className="text-sm font-semibold text-gray-900">
                                  {product.name}
                                </p>

                                <p className="text-[11px] text-gray-400">
                                  ID: #{product._id}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* CATEGORY */}

                          <td className="px-5 py-4">
                            <span className="text-xs text-gray-600">
                              {product.category}
                            </span>
                          </td>

                          {/* PRICE */}

                          <td className="px-5 py-4">
                            <span className="text-sm font-semibold text-gray-900">
                              ₹{Number(product.price || 0).toLocaleString()}
                            </span>
                          </td>

                          {/* STOCK */}

                          <td className="px-5 py-4">
                            <span
                              className={`text-xs font-semibold ${
                                product.stock > 0
                                  ? "text-emerald-600"
                                  : "text-red-500"
                              }`}
                            >
                              {product.stock > 0
                                ? `${product.stock} in stock`
                                : "Out of stock"}
                            </span>
                          </td>

                          {/* ACTIONS */}

                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-2">
                              {/* VIEW */}

                              <button
                                className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
                                title="View"
                              >
                                <FiEye />
                              </button>

                              {/* EDIT */}

                               <button className="p-2 rounded-lg border border-gray-200">
                          <FiEdit2 />
                          <Link
  to={`/admin/products/edit/${product._id}`}
  state={{ product }}
  className="..."
>
  
</Link>
                        </button>

                              {/* DELETE */}

                              <button
                                onClick={() => handleDelete(product._id)}
                                disabled={deleteLoading === product._id}
                                className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition disabled:opacity-50"
                                title="Delete"
                              >
                                {deleteLoading === product._id ? (
                                  <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <FiTrash2 />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* MOBILE CARDS */}

                <div className="md:hidden divide-y divide-gray-100">
                  {filteredProducts.map((product) => (
                    <div key={product._id} className="p-4">
                      <div className="flex gap-3">
                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />

                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-900">
                            {product.name}
                          </h4>

                          <p className="text-xs text-gray-500 mt-1">
                            {product.category}
                          </p>

                          <p className="text-sm font-semibold mt-2">
                            ₹{Number(product.price || 0).toLocaleString()}
                          </p>

                          <p
                            className={`text-xs mt-1 font-semibold ${
                              product.stock > 0
                                ? "text-emerald-600"
                                : "text-red-500"
                            }`}
                          >
                            {product.stock > 0
                              ? `${product.stock} in stock`
                              : "Out of stock"}
                          </p>
                        </div>
                      </div>

                      {/* MOBILE ACTIONS */}

                      <div className="flex justify-end gap-2 mt-4">
                        <button className="p-2 rounded-lg border border-gray-200">
                          <FiEye />
                        </button>

                        <button className="p-2 rounded-lg border border-gray-200">
                          <FiEdit2 />
                          <Link
  to={`/admin/products/edit/${product._id}`}
  state={{ product }}
  className="..."
>
  
</Link>
                        </button>

                        <button
                          onClick={() => handleDelete(product._id)}
                          disabled={deleteLoading === product._id}
                          className="p-2 rounded-lg border border-red-200 text-red-500 disabled:opacity-50"
                        >
                          {deleteLoading === product._id ? (
                            <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <FiTrash2 />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* NO PRODUCTS */}

                {filteredProducts.length === 0 && (
                  <div className="p-12 text-center">
                    <p className="text-sm text-gray-500">
                      {search ? "no products found" : "no products available"}
                    </p>

                    {!search && (
                      <Link
                        to="/add-product"
                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-black text-white rounded-full text-xs"
                      >
                        <FiPlus />
                        Add Product
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminProducts;

import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiTrash2,
  FiLock,
  FiUnlock,
  FiEye,
} from "react-icons/fi";

import {
  getUsers,
  toggleBlockUser,
  deleteUser,
} from "../services/userService";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);

  // =========================
  // GET USERS
  // =========================

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await getUsers();

      setUsers(data?.users || []);
    } catch (error) {
      console.error("get users error:", error);

      alert(
        error.response?.data?.message ||
          "failed to get users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // =========================
  // SEARCH
  // =========================

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText)
    );
  });

  // =========================
  // BLOCK / UNBLOCK
  // =========================

  const handleBlock = async (user) => {
    const action = user.isBlocked
      ? "unblock"
      : "block";

    const confirmAction = window.confirm(
      `are you sure you want to ${action} this user?`
    );

    if (!confirmAction) return;

    try {
      const data = await toggleBlockUser(user._id);

      setUsers((prev) =>
        prev.map((item) =>
          item._id === user._id
            ? {
                ...item,
                isBlocked: data.user.isBlocked,
              }
            : item
        )
      );

      alert(data.message);
    } catch (error) {
      console.error("block user error:", error);

      alert(
        error.response?.data?.message ||
          "failed to update user"
      );
    }
  };

  // =========================
  // DELETE USER
  // =========================

  const handleDelete = async (user) => {
    const confirmDelete = window.confirm(
      `are you sure you want to delete ${user.name}?`
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(user._id);

      setUsers((prev) =>
        prev.filter((item) => item._id !== user._id)
      );

      alert("user deleted successfully");
    } catch (error) {
      console.error("delete user error:", error);

      alert(
        error.response?.data?.message ||
          "failed to delete user"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-2xl md:text-3xl font-semibold">
            user management
          </h1>

          <p className="text-gray-500 mt-1">
            manage registered users
          </p>

        </div>

        {/* SEARCH */}

        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">

          <div className="relative">

            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="search by name or email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border rounded-lg pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              total users
            </p>

            <h2 className="text-2xl font-semibold mt-1">
              {users.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              active users
            </p>

            <h2 className="text-2xl font-semibold mt-1">
              {
                users.filter(
                  (user) => !user.isBlocked
                ).length
              }
            </h2>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              blocked users
            </p>

            <h2 className="text-2xl font-semibold mt-1">
              {
                users.filter(
                  (user) => user.isBlocked
                ).length
              }
            </h2>
          </div>

        </div>

        {/* USERS */}

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <div className="p-5 border-b">

            <h2 className="font-semibold">
              users ({filteredUsers.length})
            </h2>

          </div>

          {loading ? (
            <div className="p-10 text-center text-gray-500">
              loading users...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              no users found
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="border-b text-left text-sm text-gray-500">

                    <th className="px-5 py-4">
                      user
                    </th>

                    <th className="px-5 py-4">
                      email
                    </th>

                    <th className="px-5 py-4">
                      role
                    </th>

                    <th className="px-5 py-4">
                      status
                    </th>

                    <th className="px-5 py-4">
                      actions
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredUsers.map((user) => (

                    <tr
                      key={user._id}
                      className="border-b last:border-b-0"
                    >

                      {/* USER */}

                      <td className="px-5 py-4">

                        <div>
                          <p className="font-medium">
                            {user.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            {user._id}
                          </p>
                        </div>

                      </td>

                      {/* EMAIL */}

                      <td className="px-5 py-4 text-sm">
                        {user.email}
                      </td>

                      {/* ROLE */}

                      <td className="px-5 py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {user.role}
                        </span>

                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            user.isBlocked
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {user.isBlocked
                            ? "blocked"
                            : "active"}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-5 py-4">

                        <div className="flex gap-2">

                          {/* VIEW */}

                          <button
                            onClick={() =>
                              setSelectedUser(user)
                            }
                            className="border rounded-lg p-2 hover:bg-gray-50"
                            title="view user"
                          >
                            <FiEye />
                          </button>

                          {/* BLOCK */}

                          {user.role !== "admin" && (
                            <button
                              onClick={() =>
                                handleBlock(user)
                              }
                              className="border rounded-lg p-2 hover:bg-gray-50"
                              title={
                                user.isBlocked
                                  ? "unblock user"
                                  : "block user"
                              }
                            >
                              {user.isBlocked ? (
                                <FiUnlock />
                              ) : (
                                <FiLock />
                              )}
                            </button>
                          )}

                          {/* DELETE */}

                          {user.role !== "admin" && (
                            <button
                              onClick={() =>
                                handleDelete(user)
                              }
                              className="border border-red-200 text-red-500 rounded-lg p-2 hover:bg-red-50"
                              title="delete user"
                            >
                              <FiTrash2 />
                            </button>
                          )}

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

      {/* USER DETAILS MODAL */}

      {selectedUser && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl w-full max-w-md p-6">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-xl font-semibold">
                user details
              </h2>

              <button
                onClick={() =>
                  setSelectedUser(null)
                }
                className="text-gray-500"
              >
                ✕
              </button>

            </div>

            <div className="space-y-4">

              <div>
                <p className="text-sm text-gray-500">
                  name
                </p>

                <p className="font-medium">
                  {selectedUser.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  email
                </p>

                <p className="font-medium">
                  {selectedUser.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  role
                </p>

                <p className="font-medium">
                  {selectedUser.role}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  status
                </p>

                <p className="font-medium">
                  {selectedUser.isBlocked
                    ? "blocked"
                    : "active"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  joined
                </p>

                <p className="font-medium">
                  {selectedUser.createdAt
                    ? new Date(
                        selectedUser.createdAt
                      ).toLocaleDateString()
                    : "-"}
                </p>
              </div>

            </div>

            <button
              onClick={() =>
                setSelectedUser(null)
              }
              className="w-full bg-black text-white py-3 rounded-lg mt-7"
            >
              close
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default UserManagement;
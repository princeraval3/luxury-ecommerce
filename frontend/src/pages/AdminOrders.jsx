import { useEffect, useState } from "react";
import {
  getOrders,
  updateOrderStatus,
} from "../services/orderService";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const data = await updateOrderStatus(id, status);

      if (data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === id
              ? {
                  ...order,
                  orderStatus: status,
                }
              : order
          )
        );
      }
    } catch (error) {
      console.error("failed to update order:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p>loading orders...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          order management
        </h1>

        <p className="text-gray-500 mt-1">
          manage customer orders and order status
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="border rounded-lg p-8 text-center">
          <p className="text-gray-500">
            no orders found
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left p-4">
                  order
                </th>

                <th className="text-left p-4">
                  customer
                </th>

                <th className="text-left p-4">
                  items
                </th>

                <th className="text-left p-4">
                  total
                </th>

                <th className="text-left p-4">
                  payment
                </th>

                <th className="text-left p-4">
                  status
                </th>

                <th className="text-left p-4">
                  date
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b"
                >
                  <td className="p-4">
                    #{order._id.slice(-6)}
                  </td>

                  <td className="p-4">
                    <div>
                      <p className="font-medium">
                        {order.user?.name || "unknown"}
                      </p>

                      <p className="text-gray-500 text-xs">
                        {order.user?.email || "no email"}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    {order.items?.length || 0}
                  </td>

                  <td className="p-4 font-medium">
                    ₹{order.totalAmount}
                  </td>

                  <td className="p-4">
                    <div>
                      <p>
                        {order.paymentMethod}
                      </p>

                      <p className="text-xs text-gray-500">
                        {order.paymentStatus}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }
                      className="border rounded-md px-3 py-2"
                    >
                      <option value="pending">
                        pending
                      </option>

                      <option value="confirmed">
                        confirmed
                      </option>

                      <option value="shipped">
                        shipped
                      </option>

                      <option value="delivered">
                        delivered
                      </option>

                      <option value="cancelled">
                        cancelled
                      </option>
                    </select>
                  </td>

                  <td className="p-4">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
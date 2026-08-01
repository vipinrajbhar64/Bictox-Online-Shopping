import { useEffect, useState } from "react";
import { getOrderHistory } from "../../services/orderService";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await getOrderHistory();

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 py-20">No Orders Found</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow border p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-bold text-lg">
                    Order #{order._id.slice(-6)}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <span className="px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold">
                    {order.orderStatus}
                  </span>

                  <p className="font-bold text-cyan-600 mt-2">
                    ₹{order.totalAmount}
                  </p>
                </div>
              </div>

              <hr className="mb-4" />

              {order.products.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between py-2 border-b last:border-none"
                >
                  <div>
                    <h3 className="font-medium">{item.product?.name}</h3>

                    <p className="text-sm text-gray-500">
                      Qty : {item.quantity}
                    </p>
                  </div>

                  <div className="font-semibold">₹{item.price}</div>
                </div>
              ))}
              <div className="mt-6 flex justify-end">
                <Link
                  to={`/orders/${order._id}`}
                  className="px-5 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Orders;

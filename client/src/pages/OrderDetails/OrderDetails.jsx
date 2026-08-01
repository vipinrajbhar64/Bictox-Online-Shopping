import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleOrder } from "../../services/orderService";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    try {
      const res = await getSingleOrder(id);

      if (res.data.success) {
        setOrder(res.data.order);
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to load order");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (!order) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Order Details</h1>

      <div className="bg-white rounded-2xl shadow border p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-bold text-xl mb-4">Shipping Address</h2>

            <p>{order.shippingAddress.fullName}</p>

            <p>{order.shippingAddress.phone}</p>

            <p>{order.shippingAddress.address}</p>

            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}
            </p>

            <p>{order.shippingAddress.pincode}</p>

            <p>{order.shippingAddress.country}</p>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-4">Order Summary</h2>

            <p>Subtotal : ₹{order.subtotal}</p>

            <p>Delivery : ₹{order.deliveryCharge}</p>

            <p>Discount : ₹{order.discount}</p>

            <p className="font-bold mt-2">Total : ₹{order.totalAmount}</p>

            <p className="mt-3">
              <p>
                Payment Method :
                <span className="font-semibold ml-2">
                  {order.paymentMethod}
                </span>
              </p>

              <p>
                Payment Status :
                <span
                  className={`font-semibold ml-2 ${
                    order.paymentStatus === "Paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </p>

              <p>
                Order Status :
                <span className="font-semibold ml-2 text-cyan-600">
                  {order.orderStatus}
                </span>
              </p>
            </p>
          </div>
        </div>

        <hr className="my-8" />

        <h2 className="font-bold text-xl mb-5">Products</h2>

        {order.products.map((item) => (
          <div key={item._id} className="flex justify-between border-b py-4">
            <div>
              <h3 className="font-semibold">{item.product.name}</h3>

              <p>Qty : {item.quantity}</p>
            </div>

            <div className="font-bold">₹{item.price}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderDetails;

import { useState } from "react";
import { useEffect } from "react";
import { getCart } from "../../services/cartService";
import { placeOrder } from "../../services/orderService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  createPaymentOrder,
  verifyPayment,
} from "../../services/paymentService";

const Checkout = () => {
  const [address, setAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await getCart();

      if (res.data.success) {
        setCartItems(res.data.cartItems);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    try {
      // 1. Place Order First (creates MongoDB order)
      const orderRes = await placeOrder({
        fullName: address.fullName,
        phone: address.phone,
        address: address.address,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country,
        paymentMethod,
      });

      if (!orderRes.data.success) {
        return toast.error("Order Failed");
      }

      const order = orderRes.data.order;

      // COD Flow
      if (paymentMethod === "COD") {
        toast.success("Order Placed Successfully 🎉");
        navigate("/order-success");
        return;
      }

      // 2. Create Razorpay Order
      const paymentRes = await createPaymentOrder(order.totalAmount);

      const razorpayOrder = paymentRes.data.order;

      // 3. Razorpay Popup
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Bictox Online Shopping",
        description: "Order Payment",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            const verifyRes = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order._id,
            });

            if (verifyRes.data.success) {
              toast.success("Payment Successful 🎉");
              navigate("/order-success");
            } else {
              toast.error("Payment Verification Failed");
            }
          } catch (err) {
            console.log(err);
            toast.error("Payment Verification Failed");
          }
        },

        prefill: {
          name: address.fullName,
          contact: address.phone,
        },

        theme: {
          color: "#06b6d4",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Order Failed");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT */}

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-8">Shipping Address</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={address.fullName}
                onChange={handleChange}
                className="border rounded-xl p-4 outline-none focus:border-cyan-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={address.email}
                onChange={handleChange}
                className="border rounded-xl p-4 outline-none focus:border-cyan-500"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={address.phone}
                onChange={handleChange}
                className="border rounded-xl p-4 outline-none focus:border-cyan-500"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleChange}
                className="border rounded-xl p-4 outline-none focus:border-cyan-500"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleChange}
                className="border rounded-xl p-4 outline-none focus:border-cyan-500"
              />

              <input
                type="text"
                name="pincode"
                placeholder="PIN Code"
                value={address.pincode}
                onChange={handleChange}
                className="border rounded-xl p-4 outline-none focus:border-cyan-500"
              />
              {/* Country */}

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>

                <input
                  type="text"
                  value="India"
                  readOnly
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>

            <textarea
              rows="5"
              name="address"
              placeholder="Full Address"
              value={address.address}
              onChange={handleChange}
              className="border rounded-xl p-4 outline-none focus:border-cyan-500 w-full mt-6 resize-none"
            />
          </div>

          {/* RIGHT */}

          <div className="bg-white rounded-3xl shadow-md p-8 h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-5">
              {cartItems.map((item) => {
                const product = item.product;

                return (
                  <div key={item._id} className="flex gap-4 border-b pb-4">
                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>

                      <p className="text-gray-500 text-sm">
                        Qty : {item.quantity}
                      </p>

                      <p className="text-cyan-600 font-bold mt-1">
                        ₹{product.price}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <hr className="my-6" />

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>
                  ₹
                  {cartItems.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0,
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>

                <span className="text-green-600">FREE</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>

                <span className="text-cyan-600">
                  ₹
                  {cartItems.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0,
                  )}
                </span>
              </div>

              {/* Payment Method */}

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Payment Method</h3>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:border-cyan-500">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                    />

                    <span>Cash On Delivery</span>
                  </label>

                  <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:border-cyan-500">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "UPI"}
                      onChange={() => setPaymentMethod("UPI")}
                    />

                    <span>UPI Payment</span>
                  </label>

                  <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:border-cyan-500">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "CARD"}
                      onChange={() => setPaymentMethod("CARD")}
                    />

                    <span>Credit / Debit Card</span>
                  </label>
                </div>
              </div>

              {/* Coupon */}

              <div className="mt-8">
                <h3 className="font-bold mb-3">Coupon</h3>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon Code"
                    className="flex-1 border rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
                  />

                  <button className="bg-cyan-600 text-white px-5 rounded-xl">
                    Apply
                  </button>
                </div>
              </div>

              {/* Security */}

              <div className="mt-8 bg-cyan-50 rounded-2xl p-5">
                <p className="text-sm">🔒 Secure Checkout</p>

                <p className="text-sm mt-2">🚚 Free Delivery</p>

                <p className="text-sm mt-2">↩ Easy Return Policy</p>
              </div>

              {/* Place Order */}

              <button
                onClick={handlePlaceOrder}
                className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold text-lg hover:scale-[1.02] transition"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Checkout;

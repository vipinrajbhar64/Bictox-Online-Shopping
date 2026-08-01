import { FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white rounded-3xl shadow-lg p-10 max-w-lg w-full text-center">
        <FiCheckCircle className="mx-auto text-green-500 mb-5" size={90} />

        <h1 className="text-3xl font-bold text-gray-800">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-500 mt-4 leading-7">
          Thank you for shopping with
          <span className="font-semibold text-cyan-600"> Bictox</span>
          .
          <br />
          Your order has been placed successfully.
        </p>

        <div className="mt-8 space-y-4">
          <Link
            to="/orders"
            className="block w-full py-3 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition"
          >
            View My Orders
          </Link>

          <Link
            to="/shop"
            className="block w-full py-3 rounded-xl border border-cyan-600 text-cyan-600 font-semibold hover:bg-cyan-50 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;

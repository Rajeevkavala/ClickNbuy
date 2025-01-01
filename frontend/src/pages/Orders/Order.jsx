import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
  useGetRazorpayKeyQuery,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // PayPal Integration
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  // Razorpay Integration
  const {
    data: razorpay,
    isLoading: loadingRazorpay,
    error: errorRazorpay,
  } = useGetRazorpayKeyQuery();

  useEffect(() => {
    const loadPayPalScript = async () => {
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": paypal.clientId,
          currency: "INR",
        },
      });
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    };

    if (!loadingPayPal && !errorPayPal && paypal?.clientId && order && !order.isPaid) {
      if (!window.paypal) {
        loadPayPalScript();
      }
    }
  }, [paypal, loadingPayPal, errorPayPal, order, paypalDispatch]);

  // PayPal order approval handler
  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      await payOrder({ orderId, details });
      refetch();
      toast.success("Order has been paid successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const createOrder = (data, actions) =>
    actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }], // Pass the total price of the order here
      })
      .then((orderID) => orderID);

  const onError = (err) => {
    toast.error(err.message);
  };

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order marked as delivered!");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  // Razorpay payment handler
  const handleRazorpayPayment = async () => {
    try {
      const options = {
        key: razorpay.keyId, // Razorpay key ID
        amount: order.totalPrice * 100, // Convert to paise
        currency: "INR",
        name: "Click n Buy",
        description: "Order Payment",
        image: "/logo.png", // Optional image for Razorpay popup
        handler: async (response) => {
          try {
            const details = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };

            // Update order payment status in backend
            await payOrder({ orderId, details });

            // Refetch to get the updated order status
            refetch();

            toast.success("Order has been paid successfully!");
          } catch (err) {
            toast.error(err?.data?.message || err.message);
          }
        },
        prefill: {
          name: order.user.username,
          email: order.user.email,
          contact: order.user.phone || "1234567890",
        },
        theme: {
          color: "#F37254", // Customize Razorpay popup color
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err?.data?.message || "Error initializing Razorpay payment.");
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || "Something went wrong"}</Message>
  ) : (
    <div className="container text-white flex flex-col md:flex-row w-[80vw] ml-[10rem]">
      {/* Order Items Section */}
      <div className="md:w-2/3 pr-4">
        <div className="border gray-300 mt-5 pb-4 mb-5">
          {order.orderItems.length === 0 ? (
            <Message>Order is empty</Message>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-[80%]">
                <thead className="border-b-2">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Product</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="p-2">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>
                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-center">{item.price}</td>
                      <td className="p-2 text-center">
                        ₹ {(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="md:w-1/3">
        <div className="mt-5 border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Shipping</h2>
          <p className="mb-4">
            <strong className="text-pink-500">Order:</strong> {order._id}
          </p>
          <p className="mb-4">
            <strong className="text-pink-500">Name:</strong> {order.user.username}
          </p>
          <p className="mb-4">
            <strong className="text-pink-500">Email:</strong> {order.user.email}
          </p>
          <p className="mb-4">
            <strong className="text-pink-500">Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
          <p className="mb-4">
            <strong className="text-pink-500">Method:</strong> {order.paymentMethod}
          </p>
          {order.isPaid ? (
            <Message variant="success">Paid on {order.paidAt}</Message>
          ) : (
            <Message variant="danger">Not Paid</Message>
          )}
        </div>

        <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Items</span>
          <span>₹ {order.itemsPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>₹ {order.shippingPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>₹ {order.taxPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span>₹ {order.totalPrice}</span>
        </div>

        {!order.isPaid && (
          <div>
            {loadingPay && <Loader />}
            {isPending ? (
              <Loader />
            ) : (
              <>
                {/* PayPal Integration */}
                {paypal && (
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  />
                )}
                {/* Razorpay Integration */}
                {razorpay && (
                  <button
                    type="button"
                    className="bg-pink-500 text-white w-full py-2 mt-4"
                    onClick={handleRazorpayPayment}
                  >
                    Pay with Razorpay
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <button
            type="button"
            className="bg-pink-500 text-white w-full py-2"
            onClick={deliverHandler}
          >
            Mark As Delivered
          </button>
        )}
      </div>
    </div>
  );
};

export default Order;

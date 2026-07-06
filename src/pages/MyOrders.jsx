import React from "react";
import { useSelector } from "react-redux";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useGlobalContext } from "../provider/GlobalProvider";

const MyOrders = () => {
    const orders = useSelector((state) => state.orders.order);

    const steps = [
        "Pending",
        "Confirmed",
        "Processing",
        "Packed",
        "Shipped",
        "Out For Delivery",
        "Delivered",
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered":
                return "bg-green-500";
            case "Cancelled":
                return "bg-red-500";
            case "Out For Delivery":
                return "bg-orange-500";
            case "Shipped":
                return "bg-indigo-500";
            default:
                return "bg-blue-500";
        }
    };
    const { fetchOrder } = useGlobalContext();
    const handleCancelOrder = async (id) => {
    const confirmCancel = window.confirm(
        "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {

        const response = await Axios({
            url: `${SummaryApi.cancelOrder.url}/${id}`,
            method: "delete"
        });

        if (response.data.success) {
            toast.success(response.data.message);
            fetchOrder();
        }

    } catch (error) {
        AxiosToastError(error);
    }
};


    return (
        <div className="min-h-screen bg-gray-50">
            {/* HEADER */}
            <div className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        My Orders
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Track all your purchased products
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4">
                {!orders?.length && <NoData />}

                <div className="space-y-5">
                    {orders?.map((order) => {
                        const currentStep = steps.indexOf(
                            order?.order_status
                        );

                        return (
                            <div
                                key={order._id}
                                className="bg-white rounded-xl shadow-md border overflow-hidden"
                            >
                                {/* TOP SECTION */}
                                <div className="bg-gray-100 px-5 py-3 flex flex-wrap justify-between gap-3">
                                    <div>
                                        <h3 className="font-bold text-gray-800">
                                            Order ID
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {order.orderId}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-gray-800">
                                            Ordered On
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleString()}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-gray-800">
                                            Amount
                                        </h3>
                                        <p className="font-semibold text-green-600">
                                            ৳ {order.totalAmt}
                                        </p>
                                    </div>
                                </div>

                                {/* PRODUCT */}
                                <div className="p-5">
                                    <div className="flex flex-col md:flex-row gap-5">
                                        <img
                                            src={
                                                order?.product_details?.image?.[0]
                                            }
                                            alt={
                                                order?.product_details?.name
                                            }
                                            className="w-32 h-32 object-contain border rounded-lg p-2 bg-white"
                                        />

                                        <div className="flex-1">
                                            <h2 className="font-semibold text-lg text-gray-800">
                                                {
                                                    order?.product_details
                                                        ?.name
                                                }
                                            </h2>

                                            <p className="text-gray-500 mt-2">
                                                Quantity :{" "}
                                                {order?.quantity || 1}
                                            </p>

                                            <p className="text-gray-500">
                                                Payment :
                                                <span className="font-medium ml-1">
                                                    {
                                                        order?.payment_status
                                                    }
                                                </span>
                                            </p>

                                            {/* STATUS BADGE */}
                                            <div className="mt-4">
                                                <span className="font-semibold">
                                                    Delivery Status :
                                                </span>

                                                <span
                                                    className={`ml-3 px-3 py-1 rounded-full text-white text-sm ${getStatusColor(
                                                        order?.order_status
                                                    )}`}
                                                >
                                                    {order?.order_status ||
                                                        "Pending"}
                                                </span>
                                            </div>
                                            {
    ["Pending", "Confirmed", "Processing"].includes(
        order?.order_status
    ) && (
        <button
            onClick={() =>
                handleCancelOrder(order._id)
            }
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
        >
            Cancel Order
        </button>
    )
}
                                        </div>
                                    </div>

                                    {/* DELIVERY TRACKER */}
                                    {order?.order_status !== "Cancelled" && (
                                        <>
                                            <div className="mt-6">
                                                <h3 className="font-semibold text-gray-700 mb-3">
                                                    Delivery Progress
                                                </h3>

                                                <div className="flex flex-wrap gap-2">
                                                    {steps.map(
                                                        (step, index) => (
                                                            <div
                                                                key={step}
                                                                className={`px-3 py-2 rounded-full text-sm font-medium transition-all
                                                                ${
                                                                    index <=
                                                                    currentStep
                                                                        ? "bg-green-500 text-white"
                                                                        : "bg-gray-200 text-gray-600"
                                                                }`}
                                                            >
                                                                {index <=
                                                                currentStep
                                                                    ? "✓ "
                                                                    : ""}
                                                                {step}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* CANCELLED */}
                                    {order?.order_status ===
                                        "Cancelled" && (
                                        <div className="mt-5 bg-red-50 border border-red-200 text-red-600 rounded-lg p-3">
                                            This order has been cancelled.
                                        </div>
                                    )}
                                    
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
        
    );
};

export default MyOrders;
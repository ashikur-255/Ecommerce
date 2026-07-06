import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    const groupOrdersByOrderId = (orders) => {
        const grouped = {};

        orders.forEach((order) => {
            const key = order.orderId;

            if (!grouped[key]) {
                grouped[key] = {
                    ...order,
                    products: [],
                };
            }

            grouped[key].products.push({
                _id: order._id,
                productId: order.productId,
                product_details: order.product_details,
                subTotalAmt: order.subTotalAmt,
                totalAmt: order.totalAmt,
            });
        });

        return Object.values(grouped);
    };

    const fetchOrders = async () => {
        try {
            setLoading(true);

            const response = await Axios({
                ...SummaryApi.adminOrders,
            });

            if (response.data.success) {
                const groupedOrders = groupOrdersByOrderId(
                    response.data.data
                );

                setOrders(groupedOrders);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, status) => {
        try {
            const response = await Axios({
                ...SummaryApi.updateOrderStatus,
                data: {
                    orderId,
                    status,
                },
            });

            if (response.data.success) {
                toast.success("Order status updated");
                fetchOrders();
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    const handleDeleteOrder = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this order?"
        );

        if (!confirmDelete) return;

        try {
            const response = await Axios({
                ...SummaryApi.deleteOrder,
                data: {
                    orderId: id,
                },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                fetchOrders();
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter((order) => {
        const customerName =
            order?.userId?.name?.toLowerCase() || "";

        const phone =
            order?.delivery_address?.mobile ||
            order?.userId?.mobile ||
            "";

        const orderId =
            order?.orderId?.toLowerCase() || "";

        const search = searchTerm.toLowerCase();

        const matchesSearch =
            customerName.includes(search) ||
            phone.toString().includes(search) ||
            orderId.includes(search);

        let matchesDate = true;

        if (selectedDate) {
            const orderDate = new Date(order.createdAt)
                .toISOString()
                .split("T")[0];

            matchesDate = orderDate === selectedDate;
        }

        return matchesSearch && matchesDate;
    });

    if (loading) {
        return (
            <div className="p-5">
                <h2 className="text-xl font-semibold">
                    Loading Orders...
                </h2>
            </div>
        );
    }

    return (
        <div className="p-5">
            {/* Header */}
            <div className="bg-white shadow rounded-lg p-5 mb-5">
                <h1 className="text-2xl font-bold">
                    Manage Orders
                </h1>
                <p className="text-gray-500">
                    View and manage customer orders
                </p>
            </div>

            {/* Search & Filter */}
            <div className="bg-white shadow rounded-xl p-5 mb-5">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-2">
                            Search Customer / Phone / Order ID
                        </label>

                        <input
                            type="text"
                            placeholder="Search here..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                            className="
                                w-full
                                border
                                rounded-lg
                                p-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">
                            Filter By Date
                        </label>

                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) =>
                                setSelectedDate(e.target.value)
                            }
                            className="
                                w-full
                                border
                                rounded-lg
                                p-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-gray-600">
                        Total Orders Found :
                        <span className="font-bold ml-2">
                            {filteredOrders.length}
                        </span>
                    </p>

                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setSelectedDate("");
                        }}
                        className="
                            px-4
                            py-2
                            bg-gray-700
                            text-white
                            rounded-lg
                            hover:bg-gray-800
                        "
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Orders */}
            {filteredOrders.length === 0 ? (
                <div className="bg-white p-10 rounded-lg shadow text-center">
                    No Orders Found
                </div>
            ) : (
                <div className="space-y-5">
                    {filteredOrders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-xl shadow border p-5"
                        >
                            <div className="grid md:grid-cols-2 gap-5">
                                {/* Customer */}
                                <div>
                                    <h3 className="font-bold text-lg mb-2">
                                        Customer Details
                                    </h3>

                                    <p>
                                        <strong>Name:</strong>{" "}
                                        {order?.userId?.name}
                                    </p>

                                    <p>
                                        <strong>Email:</strong>{" "}
                                        {order?.userId?.email}
                                    </p>

                                    <p>
                                        <strong>Phone:</strong>{" "}
                                        {order?.delivery_address
                                            ?.mobile ||
                                            order?.userId
                                                ?.mobile ||
                                            "Not Available"}
                                    </p>
                                </div>

                                {/* Address */}
                                <div>
                                    <h3 className="font-bold text-lg mb-2">
                                        Delivery Address
                                    </h3>

                                    <p>
                                        {
                                            order
                                                ?.delivery_address
                                                ?.address_line
                                        }
                                    </p>

                                    <p>
                                        {
                                            order
                                                ?.delivery_address
                                                ?.city
                                        }
                                    </p>

                                    <p>
                                        {
                                            order
                                                ?.delivery_address
                                                ?.state
                                        }
                                    </p>

                                    <p>
                                        {
                                            order
                                                ?.delivery_address
                                                ?.country
                                        }
                                    </p>

                                    <p>
                                        {
                                            order
                                                ?.delivery_address
                                                ?.pincode
                                        }
                                    </p>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="grid md:grid-cols-3 gap-5">
                                {/* Product */}
                                <div>
                                    <h3 className="font-bold mb-2">
                                        Product
                                    </h3>

                                    {order?.product_details
                                        ?.image?.[0] && (
                                        <img
                                            src={
                                                order
                                                    .product_details
                                                    .image[0]
                                            }
                                            alt=""
                                            className="w-24 h-24 object-cover rounded border"
                                        />
                                    )}

                                    <p className="mt-2">
                                        {
                                            order
                                                ?.product_details
                                                ?.name
                                        }
                                    </p>

                                    <p className="text-sm font-semibold text-blue-600">
                                        Quantity:{" "}
                                        {order?.quantity || 1}
                                    </p>
                                </div>

                                {/* Payment */}
                                <div>
                                    <h3 className="font-bold mb-2">
                                        Payment
                                    </h3>

                                    <p>
                                        <strong>
                                            Payment:
                                        </strong>{" "}
                                        {
                                            order.payment_status
                                        }
                                    </p>

                                    <p>
                                        <strong>
                                            Total BDT:
                                        </strong>{" "}
                                        {order.totalAmt}
                                    </p>

                                    <p>
                                        <strong>
                                            Order ID:
                                        </strong>{" "}
                                        {order.orderId}
                                    </p>
                                </div>

                                {/* Status */}
                                <div>
                                    <h3 className="font-bold mb-2">
                                        Order Status
                                    </h3>

                                    <select
                                        value={
                                            order.order_status ||
                                            "Pending"
                                        }
                                        onChange={(e) =>
                                            updateStatus(
                                                order._id,
                                                e.target
                                                    .value
                                            )
                                        }
                                        className="border rounded-lg p-2 w-full"
                                    >
                                        <option value="Pending">
                                            Pending
                                        </option>
                                        <option value="Processing">
                                            Processing
                                        </option>
                                        <option value="Shipped">
                                            Shipped
                                        </option>
                                        <option value="Delivered">
                                            Delivered
                                        </option>
                                        <option value="Cancelled">
                                            Cancelled
                                        </option>
                                    </select>

                                    {order.order_status ===
                                        "Cancelled" && (
                                        <button
                                            onClick={() =>
                                                handleDeleteOrder(
                                                    order._id
                                                )
                                            }
                                            className="
                                                mt-3
                                                w-full
                                                px-4
                                                py-2
                                                rounded-lg
                                                bg-red-600
                                                text-white
                                                hover:bg-red-700
                                            "
                                        >
                                            Delete Order
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 text-sm text-gray-500">
                                Ordered:{" "}
                                {new Date(
                                    order.createdAt
                                ).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageOrders;
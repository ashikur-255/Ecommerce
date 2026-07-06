import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    orderId: {
        type: String,
        required: true,
        unique: true
    },

    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
        required: true
    },

    product_details: {
        name: String,
        image: Array
    },

    quantity: {
        type: Number,
        default: 1
    },

    paymentId: {
        type: String,
        default: ""
    },

    payment_status: {
        type: String,
        default: ""
    },

    order_status: {
        type: String,
        enum: [
            "Pending",
            "Confirmed",
            "Packed",
            "Shipped",
            "Out For Delivery",
            "Delivered",
            "Cancelled"
        ],
        default: "Pending"
    },

    delivery_address: {
        type: mongoose.Schema.ObjectId,
        ref: "address"
    },

    subTotalAmt: {
        type: Number,
        default: 0
    },

    totalAmt: {
        type: Number,
        default: 0
    },

    invoice_receipt: {
        type: String,
        default: ""
    }

},
{
    timestamps: true
});

const OrderModel = mongoose.model("order", orderSchema);

export default OrderModel;
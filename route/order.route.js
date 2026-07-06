import { Router } from "express";
import auth from "../middleware/auth.js";

import {
    CashOnDeliveryOrderController,
    paymentController,
    webhookStripe,
    getOrderDetailsController,
    getAllOrdersController,
    updateOrderStatusController,
    deleteOrderController,
    cancelOrderController
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post(
    "/cash-on-delivery",
    auth,
    CashOnDeliveryOrderController
);

orderRouter.post(
    "/checkout",
    auth,
    paymentController
);

orderRouter.get(
    "/order-list",
    auth,
    getOrderDetailsController
);

orderRouter.get(
    "/admin-orders",
    auth,
    getAllOrdersController
);

orderRouter.put(
    "/update-status",
    auth,
    updateOrderStatusController
);
orderRouter.delete(
    "/delete-order",
    auth,
    deleteOrderController
);
orderRouter.delete(
    "/cancel-order/:id",
    auth,
    cancelOrderController
);

export default orderRouter;
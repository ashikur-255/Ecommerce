import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createContext, useContext } from "react";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

import toast from "react-hot-toast";

import { pricewithDiscount } from "../utils/PriceWithDiscount";

import { handleAddItemCart } from "../store/cartProduct";
import {
    handleAddAddress,
    clearAddress,
} from "../store/addressSlice";

import { setOrder } from "../store/orderSlice";
import { logout } from "../store/userSlice";

export const GlobalContext = createContext(null);

// ======================
// SAFE CUSTOM HOOK
// ======================
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error(
            "useGlobalContext must be used inside GlobalProvider"
        );
    }

    return context;
};

// ======================
// PROVIDER
// ======================
const GlobalProvider = ({ children }) => {
    const dispatch = useDispatch();

    const cartItem = useSelector(
        (state) => state?.cartItem?.cart || []
    );

    const user = useSelector(
        (state) => state?.user
    );

    // ======================
    // CART API
    // ======================

    const fetchCartItem = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getCartItem,
            });

            const { data } = response;

            if (data?.success) {
                dispatch(handleAddItemCart(data.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateCartItem = async (id, qty) => {
        try {
            const response = await Axios({
                ...SummaryApi.updateCartItemQty,
                data: {
                    _id: id,
                    qty,
                },
            });

            const { data } = response;

            if (data?.success) {
                await fetchCartItem();
                return data;
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    const deleteCartItem = async (cartId) => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCartItem,
                data: {
                    _id: cartId,
                },
            });

            const { data } = response;

            if (data?.success) {
                toast.success(data.message);
                await fetchCartItem();
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    // ======================
    // ADDRESS API
    // ======================

    const fetchAddress = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getAddress,
            });

            const { data } = response;

            if (data?.success) {
                dispatch(handleAddAddress(data.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    // ======================
    // ORDER API
    // ======================

    const fetchOrder = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getOrderItems,
            });

            const { data } = response;

            if (data?.success) {
                dispatch(setOrder(data.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    // ======================
    // LOGOUT
    // ======================

    const handleLogoutOut = () => {
        localStorage.clear();

        dispatch(handleAddItemCart([]));
        dispatch(clearAddress());
        dispatch(logout());
    };

    // ======================
    // DERIVED CART VALUES
    // ======================

    const totalQty = useMemo(() => {
        return cartItem.reduce(
            (acc, curr) => acc + (curr?.quantity || 0),
            0
        );
    }, [cartItem]);

    const totalPrice = useMemo(() => {
        return cartItem.reduce((acc, curr) => {
            const finalPrice = pricewithDiscount(
                curr?.productId?.price || 0,
                curr?.productId?.discount || 0
            );

            return (
                acc +
                finalPrice * (curr?.quantity || 0)
            );
        }, 0);
    }, [cartItem]);

    const notDiscountTotalPrice = useMemo(() => {
        return cartItem.reduce((acc, curr) => {
            return (
                acc +
                (curr?.productId?.price || 0) *
                    (curr?.quantity || 0)
            );
        }, 0);
    }, [cartItem]);

    // ======================
    // USER-SPECIFIC DATA LOAD
    // ======================

    useEffect(() => {
        if (!user?._id) return;

        fetchCartItem();
        fetchAddress();
        fetchOrder();
    }, [user?._id]);

    // ======================
    // CONTEXT VALUE
    // ======================

    const value = {
        fetchCartItem,
        updateCartItem,
        deleteCartItem,

        fetchAddress,
        fetchOrder,

        handleLogoutOut,

        totalPrice,
        totalQty,
        notDiscountTotalPrice,

        cartItem,
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
import React from "react";
import { Link } from "react-router-dom";

import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { valideURLConvert } from "../utils/valideURLConvert";
import { pricewithDiscount } from "../utils/PriceWithDiscount";

import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ data }) => {
  // Prevent crashes if data is missing
  if (!data) return null;

  const {
    _id,
    name = "Product",
    image = [],
    unit = "",
    price = 0,
    discount = 0,
    stock = 0,
  } = data;

  const imageUrl =
    image?.length > 0
      ? image[0]
      : "https://via.placeholder.com/300x300?text=No+Image";

  const finalPrice = pricewithDiscount(price, discount);

  const productUrl = `/product/${valideURLConvert(name)}-${_id}`;

  return (
    <Link
      to={productUrl}
      aria-label={name}
      className="
        group
        bg-white
        border
        rounded-xl
        overflow-hidden
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        transition-all
        duration-300
        p-3 lg:p-4
        flex
        flex-col
        gap-3
        min-w-[170px]
        lg:min-w-[240px]
      "
    >
      {/* Product Image */}
      <div className="relative w-full h-32 lg:h-44 bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className="
            w-full
            h-full
            object-contain
            group-hover:scale-105
            transition-transform
            duration-300
          "
        />

        {discount > 0 && (
          <span
            className="
              absolute
              top-2
              left-2
              bg-green-600
              text-white
              text-xs
              font-medium
              px-2
              py-1
              rounded-full
            "
          >
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Delivery Badge */}
      <div className="flex items-center gap-2">
        <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full">
          ⚡ 10 Min Delivery
        </span>
      </div>

      {/* Product Name */}
      <h3
        className="
          font-semibold
          text-gray-800
          text-sm
          lg:text-base
          line-clamp-2
          min-h-[40px]
        "
      >
        {name}
      </h3>

      {/* Unit */}
      <p className="text-gray-500 text-sm">
        {unit}
      </p>

      {/* Price & Cart */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="font-bold text-gray-900">
            {DisplayPriceInRupees(finalPrice)}
          </span>

          {discount > 0 && (
            <span className="text-xs text-gray-400 line-through">
              {DisplayPriceInRupees(price)}
            </span>
          )}
        </div>

        {stock === 0 ? (
          <span
            className="
              text-red-500
              text-xs
              font-medium
              border
              border-red-200
              bg-red-50
              px-3
              py-1
              rounded-md
            "
          >
            Out of Stock
          </span>
        ) : (
          <AddToCartButton data={data} />
        )}
      </div>
    </Link>
  );
};

export default React.memo(CardProduct);
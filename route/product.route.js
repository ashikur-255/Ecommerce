import { Router } from "express";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/Admin.js";

import {
  createProductController,
  deleteProductDetails,
  getProductByCategory,
  getProductByCategoryAndSubCategory,
  getProductController,
  getProductDetails,
  searchProduct,
  updateProductDetails,
} from "../controllers/product.controller.js";

const productRouter = Router();

// CREATE PRODUCT (admin only)
productRouter.post("/create", auth, admin, createProductController);

// GET ALL PRODUCTS
productRouter.post("/get", getProductController);

// GET BY CATEGORY
productRouter.post("/get-product-by-category", getProductByCategory);

// FIXED TYPO HERE
productRouter.post(
  "/get-product-by-category-and-subcategory",
  getProductByCategoryAndSubCategory
);

// GET SINGLE PRODUCT DETAILS
productRouter.post("/get-product-details", getProductDetails);

// UPDATE PRODUCT (admin only)
productRouter.put("/update-product-details", auth, admin, updateProductDetails);

// DELETE PRODUCT (admin only)
productRouter.delete("/delete-product", auth, admin, deleteProductDetails);

// SEARCH PRODUCT
productRouter.post("/search-product", searchProduct);

export default productRouter;
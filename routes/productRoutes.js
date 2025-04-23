import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import validateRequest from "../middlewares/validateRequest.js";
import { productValidator } from "../middlewares/validators.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", productValidator, validateRequest, createProduct);
router.put("/:id", productValidator, validateRequest, updateProduct);
router.delete("/:id", deleteProduct);

export default router;

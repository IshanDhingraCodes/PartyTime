import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller.js";

const categoryRouter = express.Router();

categoryRouter.post("/", authenticateToken, createCategory);
categoryRouter.put("/:id", authenticateToken, updateCategory);
categoryRouter.delete("/:id", authenticateToken, deleteCategory);

categoryRouter.get("/", getCategories);

export default categoryRouter;

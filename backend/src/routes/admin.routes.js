import express from "express";
import {
  changePassword,
  checkAuth,
  login,
  logout,
} from "../controllers/admin.controller.js";
import { authenticateToken } from "../middleware/auth.js";
const adminRouter = express.Router();

adminRouter.post("/login", login);
adminRouter.post("/logout", logout);
adminRouter.post("/change-password", authenticateToken, changePassword);
adminRouter.get("/me", authenticateToken, checkAuth);

export default adminRouter;

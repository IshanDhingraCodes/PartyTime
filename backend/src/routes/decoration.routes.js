import express from "express";
import multer from "multer";
import { authenticateToken } from "../middleware/auth.js";
import {
  createDecoration,
  deleteDecoration,
  getDecoration,
  getDecorations,
  updateDecoration,
} from "../controllers/decoration.controller.js";

const decorationRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

decorationRouter.post(
  "/",
  authenticateToken,
  upload.single("image"),
  createDecoration
);
decorationRouter.put(
  "/:id",
  authenticateToken,
  upload.single("image"),
  updateDecoration
);
decorationRouter.delete("/:id", authenticateToken, deleteDecoration);

decorationRouter.get("/", getDecorations);
decorationRouter.get("/:id", getDecoration);

export default decorationRouter;

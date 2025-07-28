import express from "express";
import {
  createMessage,
  deleteMessage,
  getMessages,
} from "../controllers/message.controller.js";
import { authenticateToken } from "../middleware/auth.js";

const messageRouter = express.Router();

messageRouter.post("/", createMessage);
messageRouter.get("/", authenticateToken, getMessages);
messageRouter.delete("/:id", authenticateToken, deleteMessage);

export default messageRouter;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import adminRouter from "./routes/admin.routes.js";
import categoryRouter from "./routes/category.routes.js";
import decorationRouter from "./routes/decoration.routes.js";
import messageRouter from "./routes/message.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/admin", adminRouter);
app.use("/categories", categoryRouter);
app.use("/decorations", decorationRouter);
app.use("/messages", messageRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

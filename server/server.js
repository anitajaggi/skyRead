import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";

import categoryRouter from "./routes/categoryRouter.js";
import userRouter from "./routes/userRouter.js";
import contactRouter from "./routes/contactRouter.js";
import articleRouter from "./routes/articleRouter.js";
import commentRouter from "./routes/CommentRouter.js";

const app = express();
dotenv.config();
connectDB();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/api", (req, res) => {
  res.json({ message: "API is working!" });
});

app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/contacts", contactRouter);
app.use("/api/articles", articleRouter);
app.use("/api/comments", commentRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

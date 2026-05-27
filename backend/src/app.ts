import cookieParser from "cookie-parser";
import express from "express";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "Backend running" });
});

export default app;

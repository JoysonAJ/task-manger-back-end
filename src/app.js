import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// imports of the routes
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";



app.use("/app/users",userRoutes)
app.use("/app/task",taskRoutes)



export { app };

import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Route
import authRouter from "./Route/auth.route.js";
import userRouter from "./Route/user.route.js";
import contestRouter from "./Route/contest.route.js";
import ticketRouter from "./Route/ticket.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const Client_Url =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL_PRODUCTION
    : process.env.CLIENT_URL_DEVELOPMENT;

app.use(cors({ origin: Client_Url, credentials: true }));

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/contest/", contestRouter);
app.use("/api/v1/ticket/", ticketRouter);

export default app;

import express from "express";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://lavender-lark-113297.hostingersite.com",
            "https://www.lavender-lark-113297.hostingersite.com"
        ],
        credentials: true,
    })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// test route
app.get("/", (req, res) => {
    res.send("API is working");
});

// routes
import userRouter from "./routes/user.routes.js";

app.use("/api/v1", userRouter);

export default app;
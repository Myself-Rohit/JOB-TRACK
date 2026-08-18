import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import connectToDB from "./config/connectToDB.js";
import authRoute from "./routes/auth.routes.js";
import applicationRoute from "./routes/application.routes.js";
import prolfileRoute from "./routes/profile.routes.js";

const app = express();
dotenv.config({ path: "./backend/.env" });
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);
const port = process.env.PORT || 3001;
const __dirname = path.resolve();
connectToDB()
  .then(() => {
    console.log("Connected to MonngoDB");
    app.listen(port, () => {
      console.log(`app listening at port: ${port}`);
    });
  })
  .catch((err) => console.log(`Error connecting MongoDB: ${err.message}`));
app.use("/api/auth", authRoute);
app.use("/api/application", applicationRoute);
app.use("/api/profile", prolfileRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

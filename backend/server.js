import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./config/connectToDB.js";
import authRoute from "./routes/auth.routes.js";

const app = express();
dotenv.config({ path: "./backend/.env" });
app.use(express.json());
app.use(cookieParser());
app.use(cors());
const port = process.env.PORT || 3001;
connectToDB()
  .then(() => {
    console.log("Connected to MonngoDB");
    app.listen(port, () => {
      console.log(`app listening at port: ${port}`);
    });
  })
  .catch((err) => console.log(`Error connecting MongoDB: ${err.message}`));
app.use("/api/auth", authRoute);

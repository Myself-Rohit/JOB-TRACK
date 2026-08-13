import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./config/connectToDB.js";
const app = express();
dotenv.config();
app.use(express.json());
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

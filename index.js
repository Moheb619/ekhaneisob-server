import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// import routes start
import usersRouter from "./routes/users.js";
import authRoute from "./routes/auth.js";
import productsRouter from "./routes/products.js";
import categoriesRouter from "./routes/categories.js";
import cartsRouter from "./routes/carts.js";
// import routes end

// Initialize express to app
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
  next();
});

// Config Public Folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config environment
dotenv.config();
mongoose.set("strictQuery", true);
// mongoose.set("strictPopulate", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares use start
app.use(express.static(__dirname + "/public/"));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//middlewares use end

// File Upload Start
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
// File Upload End

// All routes start
app.use("/api/users", usersRouter);
app.use("/api/auth", authRoute);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/carts", cartsRouter);
// All routes end

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(5000, () => {
  connect();
  console.log("Connected to backend.");
});

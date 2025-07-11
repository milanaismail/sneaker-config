var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const adminRouter = require("./routes/api/v1/admin");
var orderRouter = require("./routes/api/v1/orders");
var usersRouter = require("./routes/api/v1/users");

const mongoose = require("mongoose");
const uri =
  "mongodb+srv://milanais:n5c3yhOc74zRUdDR@cluster0.8mhkb.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("Error connecting to MongoDB Atlas:", error));

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "https://frontend-eaoe.onrender.com", "https://threejs-sneaker-configurator.onrender.com", "https://sneaker-config.onrender.com", "https://sneaker-threejs-dun.vercel.app"], // Allow your local dev server and deployed Vercel frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    credentials: true, // If your API uses cookies or other credentials
  })
);
app.options("*", cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins or specify the exact domain
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

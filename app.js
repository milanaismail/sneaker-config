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
const uri = "mongodb+srv://milanais:exF4C2AqiKzb0fqx@cluster0.8mhkb.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri)
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
    origin: "http://localhost:5173", // Allow requests from your Vue dev server
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    credentials: true, // If your API uses cookies or other credentials
  })
);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/admin", adminRouter);
// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, "frontend/dist")));

// Catch-all route to serve the Vite app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

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

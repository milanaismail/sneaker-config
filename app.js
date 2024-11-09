// app.js
const express = require("express");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const orderRouter = require("./routes/api/v1/orders");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth"); // Nieuw toegevoegd

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

require("dotenv").config();


app.use("/api/v1/orders", orderRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter); // Voeg auth-routes toe

// Error handling
app.use((req, res, next) => next(createError(404)));
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).json({ status: "error", data: { message: err.message } });
});


module.exports = app;

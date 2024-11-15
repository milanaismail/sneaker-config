var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const admin = require("./middleware/admin");
var orderRouter = require("./routes/api/v1/orders");
var usersRouter = require("./routes/api/v1/users");

const mongoose = require("mongoose");
const uri = "mongodb+srv://milanais:exF4C2AqiKzb0fqx@cluster0.8mhkb.mongodb.net/sneaker-config?retryWrites=true&w=majority";

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

app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/users", usersRouter);

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

routes/api/v1/orders.js
var express = require("express");
var router = express.Router();

// Importeer controllers
const ordersController = require("../../../controllers/api/v1/orders.js");

// GET /api/v1/orders - Get all orders
router.get("/", async (req, res) => {

  });

// GET /api/v1/orders/:id - Get a specific order by ID
router.get("/:id", async (req, res) => {
  
  });

// Voegt een bestelling toe aan het systeem
router.post("/", ordersController.create);

// Update de status van een bestelling (admin-only)
router.put("/:id", admin, ordersController.update);
router.patch("/:id", admin, ordersController.update);

// Verwijdert een bestelling (admin-only)
router.delete("/:id", admin, ordersController.remove);

module.exports = router;

controllers/api/v1/orders.js
// GET /api/v1/orders - Haalt alle bestellingen op
const getAll = (req, res) => {
  const sortby = req.query.sortby;
  // Voeg hier logica toe om alle bestellingen op te halen en te sorteren op 'votes' of 'date'
  res.json({ message: "GET all orders", sortby });
};

// GET /api/v1/orders/:id - Haalt details op voor één specifieke bestelling
const get = (req, res) => {
  const orderId = req.params.id;
  // Voeg hier logica toe om de bestelling met orderId op te halen
  res.json({ message: `GET order with ID ${orderId}` });
};

// POST /api/v1/orders - Voegt een nieuwe bestelling toe
const create = (req, res) => {
  const { shoeSize, laceColor, customerContact } = req.body;
  // Voeg hier logica toe om de bestelling op te slaan
  res.status(201).json({ message: "Order created", shoeSize, laceColor, customerContact });
};

// PUT/PATCH /api/v1/orders/:id - Update de status van een bestelling (alleen voor admins)
const update = (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  // Voeg hier logica toe om de status van de bestelling te updaten
  res.json({ message: `Order ${orderId} updated`, status });
};

// DELETE /api/v1/orders/:id - Verwijdert een bestelling (alleen voor admins)
const remove = (req, res) => {
  const orderId = req.params.id;
  // Voeg hier logica toe om de bestelling te verwijderen
  res.json({ message: `Order ${orderId} deleted` });
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
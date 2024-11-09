// controllers/api/v1/orders.js
const getAll = (req, res) => {
  const sortby = req.query.sortby;
  res.json({ status: "success", data: { message: "GET all orders", sortby } });
};

const get = (req, res) => {
  const orderId = req.params.id;
  res.json({ status: "success", data: { message: `GET order with ID ${orderId}` } });
};

const create = (req, res) => {
  const { shoeSize, laceColor, customerContact } = req.body;
  res.status(201).json({
    status: "success",
    data: { message: "Order created", shoeSize, laceColor, customerContact },
  });
};

const update = (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  res.json({ status: "success", data: { message: `Order ${orderId} updated`, status } });
};

const remove = (req, res) => {
  const orderId = req.params.id;
  res.json({ status: "success", data: { message: `Order ${orderId} deleted` } });
};

module.exports = { getAll, get, create, update, remove };

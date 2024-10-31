const getAll = (req, res) => {
  res.send("GET all orders");
};

const get = (req, res) => {
  res.send("GET specific order");
};

const create = (req, res) => {
  res.send("POST order");
};

const update = (req, res) => {
  res.send("PUT/PATCH order");
};

const remove = (req, res) => {
  res.send("DELETE order");
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
